import main from '../css/main.module.css';
import Theme1 from './themes/theme1';

const themesList = [
	Theme1,
]

const CVDisplay = props =>
{
	const StyleObj = themesList[props.theme];
	return <div className={main.cvWrapper} style={{ fontSize: props.scale }}>
		<StyleObj
			info={props.info} />
	</div>
}

export const numOfThemes = themesList.length;
export default CVDisplay;
