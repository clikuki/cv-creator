import main from '../css/main.module.css';
import Theme1 from './themes/theme1';

const CVDisplay = props =>
{
	const StyleObj = styleList[props.theme];
	return <div className={main.cvWrapper} style={{ fontSize: props.scale }}>
		<StyleObj
			info={props.info} />
	</div>
}

export const styleList = [
	Theme1,
]

export default CVDisplay;
