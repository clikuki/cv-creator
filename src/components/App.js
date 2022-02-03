import { useState } from "react";
import CVDisplay from "./CVDisplay";
import InfoEditor from "./InfoEditor";
import DisplayControls from "./DisplayControls";
import main from '../css/main.module.css';

const Header = () => <h1 className={main.header}>
	CV Creator
</h1>

const App = () =>
{
	const [educationInfo, setEducationInfo] = useState([]);
	const [workInfo, setWorkInfo] = useState([]);
	const [personalInfo, setPersonalInfo] = useState({});
	const [displayScale, setDisplayScale] = useState(16);

	return <div className={main.container}>
		<div className={main.sidebar}>
			<Header />
			<DisplayControls
				scale={displayScale}
				setScale={setDisplayScale} />
			<InfoEditor
				personalInfo={personalInfo}
				workInfo={workInfo}
				educationInfo={educationInfo}
				setPersonalInfo={setPersonalInfo}
				setEducationInfo={setEducationInfo}
				setWorkInfo={setWorkInfo} />
		</div>
		<CVDisplay
			scale={displayScale}
			info={{
				personal: personalInfo,
				work: workInfo,
				education: educationInfo,
			}} />
	</div>
}

export default App;
