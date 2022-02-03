import { createRef } from 'react';
import main from '../css/main.module.css';
import Style1 from './style1';

const CVDisplay = props =>
{
	const StyleObj = styleList[0];
	let ref = createRef();

	// setTimeout(() =>
	// {
	// 	const elem = ref.current;
	// 	if (elem)
	// 	{
	// 		console.log(elem, elem.print)
	// 		elem.print();
	// 	}
	// }, 2000)

	return <div className={main.cvWrapper} style={{ fontSize: props.scale }} ref={ref}>
		<StyleObj
			info={props.info} />
	</div>
}

export const styleList = [
	Style1,
]

export default CVDisplay;
