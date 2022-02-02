import main from '../css/main.module.css';
import { nanoid } from "nanoid";

const PersonalSection = props =>
{
	const { personalInfo } = props;
	const onChange = (e) =>
	{
		const value = e.target?.files?.[0] || e.target.value;
		const type = e.target.dataset.type;
		props.onChange(type, value);
	}

	return <div className={main.section}>
		<h2 className={main.sectionHeader}>Personal Info</h2>
		<input value={personalInfo.firstName || ''} onChange={onChange} data-type='firstName' placeholder="First name" type='text' />
		<input value={personalInfo.lastName || ''} onChange={onChange} data-type='lastName' placeholder="Last name" type='text' />
		<input value={personalInfo.title || ''} onChange={onChange} data-type='title' placeholder="Title" type='text' />
		<input onChange={onChange} data-type='photo' placeholder="Photo" type='file' accept=".png,.jpg,.webp" />
		<input value={personalInfo.email || ''} onChange={onChange} data-type='email' placeholder="Email" type='email' />
		<input value={personalInfo.phoneNum || ''} onChange={onChange} data-type='phoneNum' placeholder="Phone number" type='text' />
		<input value={personalInfo.address || ''} onChange={onChange} data-type='address' placeholder="Address" type='text' />
		<textarea value={personalInfo.description || ''} onChange={onChange} data-type='description' placeholder="Description" type='text' />
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
			<input value={info.school || ''} onChange={onChange} data-type='school' placeholder="School name" type='text' />
			<input value={info.city || ''} onChange={onChange} data-type='city' placeholder="City" type='text' />
			<input value={info.degree || ''} onChange={onChange} data-type='degree' placeholder="Degree" type='text' />
			<input value={info.subject || ''} onChange={onChange} data-type='subject' placeholder="Subject" type='text' />
			<input value={info.startDate || ''} onChange={onChange} data-type='startDate' placeholder="Studied from" type='text' />
			<input value={info.endDate || ''} onChange={onChange} data-type='endDate' placeholder="Studied until" type='text' />
			<button onClick={onDelete}>Delete section</button>
		</div>
	})

	return <div className={main.section}>
		<h2 className={main.sectionHeader}>Education</h2>
		{schoolSections}
		<button onClick={props.onAdd}>Add section</button>
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
			<input value={info.company || ''} onChange={onChange} data-type='company' placeholder="Company" type='text' />
			<input value={info.city || ''} onChange={onChange} data-type='city' placeholder="City" type='text' />
			<input value={info.position || ''} onChange={onChange} data-type='position' placeholder="Position" type='text' />
			<input value={info.startDate || ''} onChange={onChange} data-type='startDate' placeholder="Worked from" type='text' />
			<input value={info.endDate || ''} onChange={onChange} data-type='endDate' placeholder="Worked until" type='text' />
			<button onClick={onDelete}>Delete section</button>
		</div>
	})

	return <div className={main.section}>
		<h2 className={main.sectionHeader}>Work experience</h2>
		{schoolSections}
		<button onClick={props.onAdd}>Add section</button>
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
