import { useState } from 'react';
import main from '../css/main.module.css';
import style1 from '../css/style1.module.css';

const Style1 = props =>
{
	const [imgSrc, setImgSrc] = useState(null);
	const { info } = props;

	if (info.personal.photo)
	{
		const fileReader = new FileReader();
		fileReader.onload = () => setImgSrc(fileReader.result);
		fileReader.readAsDataURL(info.personal.photo);
	}

	return <div className={style1.page}>
		<div className={style1.header}>
			<h2>
				{`${info.personal.firstName} ${info.personal.lastName}`}
			</h2>
			<p>{info.personal.title}</p>
		</div>
		<div className={style1.body}>
			<h3>Description</h3>
			<p>{info.personal.description}</p>
			<h4>Experience</h4>
			{info.work.map(item =>
			{
				return <div key={item.key} className={style1.timeline}>
					<p className={style1.date}>
						{item.startDate} - {item.endDate}
					</p>
					<div className={style1.details}>
						<h4>{item.position}</h4>
						<p>{item.company}, {item.city}</p>
					</div>
				</div>
			})}
			<h4>Education</h4>
			{info.education.map(item =>
			{
				return <div key={item.key} className={style1.timeline}>
					<p className={style1.date}>
						{item.startDate} - {item.endDate}
					</p>
					<div className={style1.details}>
						<h4>{item.school},{item.city}</h4>
						<p>Degree: {item.degree}</p>
						<p>Subject: {item.subject}</p>
					</div>
				</div>
			})}
		</div>
		<div className={style1.sidebar}>
			{imgSrc ? <img src={imgSrc} alt='Portrait of self' /> : ''}
			<h3>Personal Details</h3>
			<h4>Address</h4>
			<p>{info.personal.address}</p>
			<h4>Phone Number</h4>
			<p>{info.personal.phoneNum}</p>
			<h4>Email</h4>
			<p>{info.personal.email}</p>
		</div>
	</div>
}

const CVDisplay = props =>
{
	return <div className={main.cvWrapper}>
		<Style1 info={props.info} />
	</div>
}

export default CVDisplay;
