import main from '../css/main.module.css';
import { numOfThemes } from './CVDisplay';

const ZoomInput = props =>
{
	const mappedVal = map(props.scale, 4, 24, 0, 100);
	return <label className={main.zoomInput}>
		Zoom: {+mappedVal.toFixed(1)}%
		<input
			value={props.scale}
			onChange={props.onChange}
			type='range'
			step='0.1'
			min='4'
			max='24' />
	</label>
}

const ThemeChooser = props =>
{
	const onChange = e =>
	{
		const value = Math.abs(e.target.value - 1) % numOfThemes;
		props.onChange(value);
	}

	return <label className={main.themeInput}>
		Change Theme:
		<input
			value={props.value + 1}
			onChange={onChange}
			type='number' />
	</label>
}

const Button = props => <button
	className={main.displayControlsInput}
	aria-label={props.ariaLabel || null}
	onClick={props.onClick || null}>
	{props.children}
</button>;

const map = (num, x1, y1, x2, y2) => (num - x1) * (y2 - x2) / (y1 - x1) + x2;
const DisplayControls = props =>
{
	const handleZoomChange = e => props.setScale(+e.target.value);
	return <div className={main.displayControls}>
		<ZoomInput
			onChange={handleZoomChange}
			scale={props.curScale} />
		<ThemeChooser value={props.curTheme} onChange={props.onChangeTheme} />
		<Button onClick={window.print}>Save to PDF</Button>
		<Button onClick={props.onLoadExample}>Load example</Button>
	</div>
}

export default DisplayControls;
