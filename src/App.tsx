import { Graphics, Stage } from "@inlet/react-pixi";
import * as React from "react";

type Draw = Required<React.ComponentProps<typeof Graphics>>["draw"];

const Overlay: React.FC = () => {
	return <div></div>;
};

const ShipA: React.FC<{
	color: number;
	scale: number;
	rotation: number;
	x: number;
	y: number;
}> = ({ color, scale, x, y, rotation }) => {
	const draw = React.useCallback<Draw>(
		(g) => {
			g.clear();
			g.beginFill(color);
			g.moveTo(4, 0); // top point
			g.lineTo(0, 10); // bottom left
			g.lineTo(4, 8); // bottom mid point
			g.lineTo(8, 10); // bottom right
			g.endFill();
		},
		[color]
	);
	return (
		<Graphics draw={draw} scale={scale} x={x} y={y} rotation={rotation} />
	);
};

export const App: React.FC = () => {
	const [x, setX] = React.useState(0);

	React.useEffect(() => {
		const pid = setInterval(() => {
			setX((x) => (x + 20) % 1920);
		}, 1000 / 60);
		return () => {
			clearInterval(pid);
		};
	}, []);
	return (
		<div>
			<header className="App-header"></header>
			<h1 className="text-3xl font-bold underline">Hello World</h1>
			<Overlay />
			<Stage width={1920} height={1080}>
				<ShipA
					color={0xff0000}
					scale={2}
					x={x}
					y={500}
					rotation={Math.PI / 6}
				/>
			</Stage>
		</div>
	);
};

export default App;
