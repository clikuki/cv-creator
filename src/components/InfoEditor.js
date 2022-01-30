import { useState } from "react"
import { nanoid } from "nanoid";
import css from '../css/infoEditor.module.css';
console.log(css);

const PersonalInfo = props =>
{
	const { personalInfo } = props;
	const onChange = ({ target }) =>
	{
		const value = target.value;
		const type = target.dataset.type;
		props.onChange(type, value);
	}

	return <div className={css.section}>
		<h2>Personal Info</h2>
		<input value={personalInfo.firstName} onChange={onChange} data-type='firstName' placeholder="First name" type='text' />
		<input value={personalInfo.lastName} onChange={onChange} data-type='lastName' placeholder="Last name" type='text' />
		<input value={personalInfo.photo} onChange={onChange} data-type='photo' placeholder="Photo" type='file' accept=".png,.jpg,.webp" />
		<input value={personalInfo.email} onChange={onChange} data-type='email' placeholder="Email" type='email' />
		<input value={personalInfo.phoneNum} onChange={onChange} data-type='phoneNum' placeholder="Phone number" type='text' />
		<input value={personalInfo.address} onChange={onChange} data-type='address' placeholder="Address" type='text' />
		<input value={personalInfo.description} onChange={onChange} data-type='description' placeholder="Description" type='text' />
	</div>
}

const EducationInfo = props =>
{
	const onChangeBase = (target, key) =>
	{
		const value = target.value;
		const type = target.dataset.type;
		props.onChange(type, key, value);
	}

	const schoolSections = props.educationInfo.map(info =>
	{
		const onChange = ({ target }) => onChangeBase(target, info.key);
		return <div key={info.key} className={css.section}>
			<input value={info.school} onChange={onChange} data-type='school' placeholder="School name" type='text' />
			<input value={info.city} onChange={onChange} data-type='city' placeholder="City" type='text' />
			<input value={info.degree} onChange={onChange} data-type='degree' placeholder="Degree" type='text' />
			<input value={info.startDate} onChange={onChange} data-type='startDate' placeholder="Studied from" type='date' />
			<input value={info.endDate} onChange={onChange} data-type='endDate' placeholder="Studied until" type='date' />
		</div>
	})

	return <div className={css.section}>
		<h2>Education</h2>
		{schoolSections}
	</div>
}

const InfoEditor = () =>
{
	const [personalInfo, setPersonalInfo] = useState({
		firstName: '',
		lastName: '',
		photo: '',
		email: '',
		phoneNum: '',
		address: '',
		description: '',
	});

	const getEducationTemplate = () =>
	({
		school: '',
		city: '',
		degree: '',
		startDate: '',
		endDate: '',
		key: nanoid(),
	})

	const [educationInfo, setEducationInfo] = useState([getEducationTemplate()]);

	const handlePersonalInfoChange = (type, value) =>
	{
		setPersonalInfo({
			...personalInfo,
			[type]: value,
		})
	}

	const handleEducationInfoChange = (type, key, value) =>
	{
		if (type === 'add')
		{
			setEducationInfo(educationInfo.concat(getEducationTemplate()));
		}
		else if (type === 'delete')
		{
			const index = educationInfo.findIndex(x => x.key === key);
			const top = educationInfo.slice(0, index);
			const bottom = educationInfo.slice(index + 1);

			setEducationInfo(top.concat(bottom));
		}
		else
		{
			const index = educationInfo.findIndex(x => x.key === key);
			const item = educationInfo[index];
			const top = educationInfo.slice(0, index);
			const bottom = educationInfo.slice(index + 1);

			setEducationInfo(top.concat({
				...item,
				[type]: value,
			}, bottom))
		}
	}

	return <div className={css.infoEditor}>
		<PersonalInfo personalInfo={personalInfo} onChange={handlePersonalInfoChange} />
		<EducationInfo educationInfo={educationInfo} onChange={handleEducationInfoChange} />
	</div>
}

export default InfoEditor;
