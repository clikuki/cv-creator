import { useState } from "react";
import CVDisplay from "./CVDisplay";
import InfoEditor from "./InfoEditor";
import DisplayControls from "./DisplayControls";
import main from '../css/main.module.css';
import { nanoid } from "nanoid";

const Header = () => <h1 className={main.header}>
	CV Creator
</h1>

const App = () =>
{
	const [educationInfo, setEducationInfo] = useState([]);
	const [workInfo, setWorkInfo] = useState([]);
	const [skills, setSkills] = useState([]);
	const [personalInfo, setPersonalInfo] = useState({});
	const [displayScale, setDisplayScale] = useState(12);
	const [curTheme, setTheme] = useState(0);

	const handleLoadExample = () =>
	{
		setPersonalInfo({
			firstName: 'Billy',
			lastName: 'Boggins',
			title: 'Graphic Designer',
			email: 'BillyBoggins@gmail.com',
			address: 'Somewhereland',
			phoneNum: '1-208-3846-8937',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sit facere. Enim, ducimus facilis? Culpa, totam nesciunt officiis eveniet distinctio voluptatem? Voluptates asperiores neque cum tenetur, deserunt hic quia cupiditate ipsa illum sapiente iusto necessitatibus, porro suscipit quibusdam autem repellendus dicta facere earum quaerat. Consequatur perspiciatis ducimus ea architecto officia!',
		})

		setEducationInfo([
			{
				school: 'University of Stuff',
				city: 'Somewhereland',
				degree: 'Bachelors',
				subject: 'Science',
				startDate: '2003',
				endDate: '2006',
				key: nanoid(),
			}
		])

		setWorkInfo([
			{
				company: 'BEEG Inc.',
				city: 'Big city',
				position: 'Graphic Designer',
				startDate: '2006',
				endDate: 'Present',
				key: nanoid(),
			}
		])

		setSkills([
			{
				skill: 'Excellent team leader',
				key: nanoid(),
			},
			{
				skill: 'Great planner',
				key: nanoid(),
			},
			{
				skill: 'Quick thinker',
				key: nanoid(),
			},
		]);
	}

	return <div className={main.container}>
		<div className={main.sidebar}>
			<Header />
			<DisplayControls
				curScale={displayScale}
				curTheme={curTheme}
				setScale={setDisplayScale}
				onLoadExample={handleLoadExample}
				onChangeTheme={setTheme} />
			<InfoEditor
				personalInfo={personalInfo}
				workInfo={workInfo}
				educationInfo={educationInfo}
				skills={skills}
				setPersonalInfo={setPersonalInfo}
				setEducationInfo={setEducationInfo}
				setWorkInfo={setWorkInfo}
				setSkills={setSkills} />
		</div>
		<CVDisplay
			theme={curTheme}
			scale={displayScale}
			info={{
				personal: personalInfo,
				work: workInfo,
				education: educationInfo,
				skills,
			}} />
	</div>
}

export default App;
