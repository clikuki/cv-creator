import { useState } from 'react';
import emptyAvatar from '../empty_avatar.png';
import getPhotoUrl from '../getPhotoUrl';
import style1 from '../css/style1.module.css';

const Style1 = props =>
{
	const [imgSrc, setImgSrc] = useState(emptyAvatar);
	const { info } = props;

	if (info.personal.photo)
	{
		getPhotoUrl(info.personal.photo)
			.then(setImgSrc)
			.catch(err => console.error(err));
	}

	return <div className={style1.page}>
		<div className={style1.header}>
			<h2 className={style1.name}>
				{info.personal.firstName || ''} {info.personal.lastName || ''}
			</h2>
			<p className={style1.title}>{info.personal.title}</p>
		</div>
		<div className={style1.body}>
			<h3>Description</h3>
			<p>{info.personal.description}</p>
			<h3>Experience</h3>
			{[...info.work, { key: 'fakeItem' }].map(item =>
			{
				return <div key={item.key} className={style1.timeline}>
					<p className={style1.date}>
						{item.startDate || 'From'} - {item.endDate || 'To'}
					</p>
					<div className={style1.details}>
						<h4>{item.position || 'Position'}</h4>
						<p>{item.company || 'Company'}, {item.city || 'City'}</p>
					</div>
				</div>
			})}
			<h3>Education</h3>
			{[...info.education, { key: 'fakeItem' }].map(item =>
			{
				return <div key={item.key} className={style1.timeline}>
					<p className={style1.date}>
						{item.startDate || 'From'} - {item.endDate || 'To'}
					</p>
					<div className={style1.details}>
						<h4>{item.school || 'University'}, {item.city || 'City'}</h4>
						<p>Degree: {item.degree || ''}</p>
						<p>Subject: {item.subject || ''}</p>
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

export default Style1;