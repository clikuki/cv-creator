import main from '../css/main.module.css';
import getPhotoUrl from '../getPhotoUrl';
import { nanoid } from "nanoid";
import { createRef } from 'react';

const FileInput = props =>
{
	const inputRef = createRef();
	const onClick = () => inputRef.current?.click();
	return <label className={main.customFileInput}>
		<input
			type='file'
			onChange={props.onChange || null}
			data-type={props.dataType || null}
			accept={props.accept || null}
			ref={inputRef} />
		<Button ariaLabel='File selector' onClick={onClick}>
			{props.children}
		</Button>
	</label>
}

const TextInput = props => <input
	value={props.value || ''}
	placeholder={props.placeholder || null}
	onChange={props.onChange || null}
	data-type={props.dataType || null}
	className={main.sectionInput}
	type='text' />

const Button = props => <button
	className={main.sectionInput}
	aria-label={props.ariaLabel || null}
	onClick={props.onClick || null}>
	{props.children}
</button>;

const PersonalSection = props =>
{
	const { personalInfo } = props;
	const onChange = async e =>
	{
		const type = e.target.dataset.type;
		const file = e.target?.files?.[0];
		const value = e.target.value;
		let newVal = value;

		if (file)
		{
			try
			{
				newVal = {
					name: value,
					url: await getPhotoUrl(file),
				};
			}
			catch (err)
			{
				console.error(err);
				return;
			}
		}

		props.onChange(type, newVal);
	}

	return <div className={main.section}>
		<h2 className={main.sectionHeader}>Personal Info</h2>
		<FileInput onChange={onChange} dataType='photo' accept="image/*" >
			Select photo
		</ FileInput>
		<TextInput value={personalInfo.firstName} onChange={onChange} dataType='firstName' placeholder="First name" />
		<TextInput value={personalInfo.lastName} onChange={onChange} dataType='lastName' placeholder="Last name" />
		<TextInput value={personalInfo.title} onChange={onChange} dataType='title' placeholder="Title" />
		<TextInput value={personalInfo.email} onChange={onChange} dataType='email' placeholder="Email" />
		<TextInput value={personalInfo.phoneNum} onChange={onChange} dataType='phoneNum' placeholder="Phone number" />
		<TextInput value={personalInfo.address} onChange={onChange} dataType='address' placeholder="Address" />
		<TextInput value={personalInfo.description} onChange={onChange} dataType='description' placeholder="Description" />
	</div>
}

const WorkSection = props =>
{
	const onChangeBase = (target, key) =>
	{
		const value = target.value;
		const type = target.dataset.type;
		props.onChange(type, key, value);
	}

	const schoolSections = props.workInfo.map(info =>
	{
		const { key } = info;
		const onChange = ({ target }) => onChangeBase(target, key);
		const onDelete = () => props.onDelete(key);
		return <div key={key} className={main.section}>
			<TextInput value={info.company} onChange={onChange} dataType='company' placeholder="Company" />
			<TextInput value={info.city} onChange={onChange} dataType='city' placeholder="City" />
			<TextInput value={info.position} onChange={onChange} dataType='position' placeholder="Position" />
			<TextInput value={info.startDate} onChange={onChange} dataType='startDate' placeholder="Worked from" />
			<TextInput value={info.endDate} onChange={onChange} dataType='endDate' placeholder="Worked until" />
			<Button onClick={onDelete}>Delete section</Button>
		</div>
	})

	return <div className={main.section}>
		<h2 className={main.sectionHeader}>Work experience</h2>
		{schoolSections}
		<Button onClick={props.onAdd}>Add section</Button>
	</div>
}

const EducationSection = props =>
{
	const onChangeBase = (target, key) =>
	{
		const value = target.value;
		const type = target.dataset.type;
		props.onChange(type, key, value);
	}

	const schoolSections = props.educationInfo.map(info =>
	{
		const { key } = info;
		const onChange = ({ target }) => onChangeBase(target, key);
		const onDelete = () => props.onDelete(key);
		return <div key={key} className={main.section}>
			<TextInput value={info.school} onChange={onChange} dataType='school' placeholder="School name" />
			<TextInput value={info.city} onChange={onChange} dataType='city' placeholder="City" />
			<TextInput value={info.degree} onChange={onChange} dataType='degree' placeholder="Degree" />
			<TextInput value={info.subject} onChange={onChange} dataType='subject' placeholder="Subject" />
			<TextInput value={info.startDate} onChange={onChange} dataType='startDate' placeholder="Studied from" />
			<TextInput value={info.endDate} onChange={onChange} dataType='endDate' placeholder="Studied until" />
			<Button onClick={onDelete}>Delete section</Button>
		</div>
	})

	return <div className={main.section}>
		<h2 className={main.sectionHeader}>Education</h2>
		{schoolSections}
		<Button onClick={props.onAdd}>Add section</Button>
	</div>
}

const getDynamicSectionEvents = (arr, setFunc) => [
	(type, key, value) => // onChange
	{
		const index = arr.findIndex(x => x.key === key);
		const item = arr[index];
		const top = arr.slice(0, index);
		const bottom = arr.slice(index + 1);

		setFunc(top.concat({
			...item,
			[type]: value,
		}, bottom))
	},
	(key) => // onDelete
	{
		const index = arr.findIndex(x => x.key === key);
		const top = arr.slice(0, index);
		const bottom = arr.slice(index + 1);

		setFunc(top.concat(bottom));
	},
	// onAdd
	() => setFunc(arr.concat({ key: nanoid() })),
]

const getStaticSectionEvent = (obj, setFunc) => (type, value) =>
{
	setFunc({
		...obj,
		[type]: value,
	})
}

const InfoEditor = props =>
{
	const handlePersonalInfoChange = getStaticSectionEvent(props.personalInfo, props.setPersonalInfo);
	const [
		handleEducationInfoChange,
		handleEducationInfoDelete,
		handleEducationInfoAdd,
	] = getDynamicSectionEvents(props.educationInfo, props.setEducationInfo);

	const [
		handleWorkInfoChange,
		handleWorkInfoDelete,
		handleWorkInfoAdd,
	] = getDynamicSectionEvents(props.workInfo, props.setWorkInfo);

	return <div className={main.infoEditor}>
		<PersonalSection personalInfo={props.personalInfo} onChange={handlePersonalInfoChange} />
		<EducationSection
			educationInfo={props.educationInfo}
			onChange={handleEducationInfoChange}
			onAdd={handleEducationInfoAdd}
			onDelete={handleEducationInfoDelete} />
		<WorkSection
			workInfo={props.workInfo}
			onChange={handleWorkInfoChange}
			onAdd={handleWorkInfoAdd}
			onDelete={handleWorkInfoDelete} />
	</div>
}

export default InfoEditor;
