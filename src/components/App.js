import { useState } from "react";
import CVDisplay from "./CVDisplay";
import InfoEditor from "./InfoEditor";
import '../css/main.module.css';

const App = () =>
{
	const [educationInfo, setEducationInfo] = useState([]);
	const [workInfo, setWorkInfo] = useState([]);
	const [personalInfo, setPersonalInfo] = useState({
		firstName: '',
		lastName: '',
		title: '',
		photo: '',
		email: '',
		phoneNum: '',
		address: '',
		description: '',
	});

	return <>
		<InfoEditor
			personalInfo={personalInfo}
			workInfo={workInfo}
			educationInfo={educationInfo}
			setPersonalInfo={setPersonalInfo}
			setEducationInfo={setEducationInfo}
			setWorkInfo={setWorkInfo} />
		<CVDisplay
			info={{
				personal: personalInfo,
				work: workInfo,
				education: educationInfo,
			}} />
	</>
}

export default App;
