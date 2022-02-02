import main from '../css/main.module.css';
import Style1 from './style1';

const CVDisplay = props =>
{
	const StyleObj = styleList[0];
	return <div className={main.cvWrapper}>
		<StyleObj info={props.info} />
	</div>
}

export const styleList = [
	Style1,
]

export default CVDisplay;
