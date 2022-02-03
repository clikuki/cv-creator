import main from '../css/main.module.css';

const map = (num, x1, y1, x2, y2) => (num - x1) * (y2 - x2) / (y1 - x1) + x2;
const DisplayControls = props =>
{
	const onChange = e => props.setScale(+e.target.value);
	const mappedVal = map(props.scale, 4, 24, 0, 100);
	return <div className={main.displayControls}>
		<label>
			<input
				value={props.scale}
				onChange={onChange}
				type='range'
				step='0.1'
				min='4'
				max='24' />
			Zoom: {+mappedVal.toFixed(1)}%
		</label>
		<button onClick={window.print}>Print to PDF</button>
	</div>
}

export default DisplayControls;
