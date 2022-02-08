import emptyAvatar from '../../empty_avatar.png';
import css from '../../css/theme2.module.css';

const Sidebar = props =>
{
	const { info } = props;
	return <div className={css.sidebar}>
		<img src={info.personal.photo?.url || emptyAvatar} alt='Portrait of self' />
		<h2 className={css.name}>
			<span>
				{info.personal.firstName || ''} {info.personal.lastName || ''}
			</span>
		</h2>
		<p className={css.title}>
			<span>{info.personal.title}</span>
		</p>
		<h3>Personal Details</h3>
		<h4>Address</h4>
		<p>{info.personal.address}</p>
		<h4>Phone Number</h4>
		<p>{info.personal.phoneNum}</p>
		<h4>Email</h4>
		<p>{info.personal.email}</p>
	</div>
}

const DateRange = props => <p className={css.date}>
	{props.startDate || 'From'} - {props.endDate || 'To'}
</p>

const WorkItem = props =>
{
	const { item } = props;
	return <div className={css.timeline}>
		<DateRange startDate={item.startDate} endDate={item.endDate} />
		<div className={css.details}>
			<h4>{item.position || 'Position'}</h4>
			<p>{item.company || 'Company'}, {item.city || 'City'}</p>
		</div>
	</div>
}

const EducationItem = props =>
{
	const { item } = props;
	return <div className={css.timeline}>
		<DateRange startDate={item.startDate} endDate={item.endDate} />
		<div className={css.details}>
			<h4>{item.school || 'University'}, {item.city || 'City'}</h4>
			<p>Degree: {item.degree || ''}</p>
			<p>Subject: {item.subject || ''}</p>
		</div>
	</div>
}

const Body = props =>
{
	const { info } = props;
	const workItems = info.work.concat({ key: 'fakeItem' })
		.map(item => <WorkItem key={item.key} item={item} />);
	const educationItems = info.education.concat({ key: 'fakeItem' })
		.map(item => <EducationItem key={item.key} item={item} />);

	return <div className={css.body}>
		<h3>Description</h3>
		<p>{info.personal.description}</p>
		<h3>Experience</h3>
		{workItems}
		<h3>Education</h3>
		{educationItems}
	</div>
}

const Theme = props =>
{
	const { info } = props;

	return <div className={css.page}>
		<Sidebar info={info} />
		<Body info={info} />
	</div>
}

export default Theme;