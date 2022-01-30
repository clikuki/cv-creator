import { useState } from 'react';
import css from '../css/cvDisplay.module.css';

const Style1 = props =>
{
	const [imgSrc, setImgSrc] = useState(null);
	const { info } = props;

	if (info.personal.photo)
	{
		const fileReader = new FileReader();
		fileReader.onload = () => setImgSrc(fileReader.result);
		fileReader.readAsDataURL(info.personal.photo);
	}

	return <>
		<div>
			<h1>
				{`${info.personal.firstName} ${info.personal.lastName}`}
			</h1>
			<span>{info.personal.title}</span>
		</div>
		<div>
			<img src={imgSrc} alt='Portrait of self' />
		</div>
		<div></div>
	</>
}

const CVDisplay = props =>
{
	return <div className={css.wrapper}>
		<div className={css.cvDisplay}>
			<Style1 info={props.info} />
		</div>
	</div>
}

export default CVDisplay;
