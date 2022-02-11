import themeCss from '../../css/theme3.module.css';
import timeline from '../../css/timeline.module.css';

const Header = props =>
{
	const { personal } = props.info;
	return <div className={themeCss.header}>
		{
			personal.photo ?
				<img src={personal.photo} alt='Portrait of self' /> : ''
		}
		<h2 className={themeCss.name}>
			<span>
				{personal.firstName || ''}
			</span>
			<span>
				{personal.lastName || ''}
			</span>
		</h2>
		<p className={themeCss.title}>{personal.title}</p>
	</div>
}

const DateRange = props => <p className={timeline.date}>
	{props.startDate || 'From'} - {props.endDate || 'To'}
</p>

const WorkItem = props =>
{
	const { item } = props;
	return <div className={timeline.timeline}>
		<DateRange startDate={item.startDate} endDate={item.endDate} />
		<div className={timeline.details}>
			<h4>{item.position || 'Position'}</h4>
			<p>{item.company || 'Company'}, {item.city || 'City'}</p>
		</div>
	</div>
}

const EducationItem = props =>
{
	const { item } = props;
	return <div className={timeline.timeline}>
		<DateRange startDate={item.startDate} endDate={item.endDate} />
		<div className={timeline.details}>
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

	return <div className={themeCss.body}>
		<h3><span>Description</span></h3>
		<p>{info.personal.description}</p>
		<h3><span>Work experience</span></h3>
		{workItems}
		<h3><span>Education</span></h3>
		{educationItems}
	</div>
}

const Sidebar = props =>
{
	const { info } = props;

	const skills = info.skills.flatMap(item =>
	{
		if (!item.skill) return [];
		else return [<p key={item.key}>{item.skill}</p>];
	})

	return <div className={themeCss.sidebar}>
		<h3><span>Details</span></h3>
		<h4>Address</h4>
		<p>{info.personal.address}</p>
		<h4>Phone Number</h4>
		<p>{info.personal.phoneNum}</p>
		<h4>Email</h4>
		<p>{info.personal.email}</p>
		{
			skills.length ? <h3><span>Skills</span></h3> : ''
		}
		{skills}
	</div>
}

const Theme = props =>
{
	const { info } = props;

	return <div className={themeCss.page}>
		<Header info={info} />
		<Sidebar info={info} />
		<Body info={info} />
	</div>
}

export default Theme;