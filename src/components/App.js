import { useState } from "react";
import CVDisplay from "./CVDisplay";
import InfoEditor from "./InfoEditor";
import main from '../css/main.module.css';

const Header = () => <h1 className={main.header}>
	CV Creator
</h1>

const App = () =>
{
	const [educationInfo, setEducationInfo] = useState([]);
	const [workInfo, setWorkInfo] = useState([]);
	const [personalInfo, setPersonalInfo] = useState({});

	return <>
		<div className={main.sidebar}>
			<Header />
			<InfoEditor
				personalInfo={personalInfo}
				workInfo={workInfo}
				educationInfo={educationInfo}
				setPersonalInfo={setPersonalInfo}
				setEducationInfo={setEducationInfo}
				setWorkInfo={setWorkInfo} />
		</div>
		<CVDisplay
			info={{
				personal: personalInfo,
				work: workInfo,
				education: educationInfo,
			}} />
	</>
}

export default App;
