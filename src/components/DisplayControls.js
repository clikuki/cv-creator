import main from '../css/main.module.css';

const PrintBtn = () => <button onClick={window.print}>Save to PDF</button>
const GenerateDummyCV = props => <button onClick={props.onLoadExample}>Load example</button>
const ZoomInput = props =>
{
	const { fontSizeRange: range } = props;
	const mappedVal = map(props.scale, ...range, 0, 100);
	return <label>
		<input
			value={props.scale}
			onChange={props.onChange}
			type='range'
			step='0.1'
			min={range[0]}
			max={range[1]} />
		Zoom: {+mappedVal.toFixed(1)}%
	</label>
}

const map = (num, x1, y1, x2, y2) => (num - x1) * (y2 - x2) / (y1 - x1) + x2;
const DisplayControls = props =>
{
	const onChange = e => props.setScale(+e.target.value);
	return <div className={main.displayControls}>
		<ZoomInput
			onChange={onChange}
			scale={props.scale}
			fontSizeRange={[4, 24]} />
		<PrintBtn />
		<GenerateDummyCV onLoadExample={props.onLoadExample} />
	</div>
}

export default DisplayControls;
