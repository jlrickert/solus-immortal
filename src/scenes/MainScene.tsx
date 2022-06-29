import { useApp, useTick } from "@inlet/react-pixi";
import * as React from "react";

import { GameMap } from "../gameSlice";
import { Background } from "../prefabs/Background";
import { Ship } from "../prefabs/Ship";
import { Viewport } from "../components/Viewport";

export const MainScene: React.FC<{ map: GameMap }> = ({ map }) => {
	const [x, setX] = React.useState(0);
	const [y, setY] = React.useState(0);
	const app = useApp();

	useTick((delta) => {
		setX((x) => (x + 1 * delta) % map.width);
		setY((y) => (y + 1 * delta) % map.height);
	});

	const { height: screenHeight, width: screenWidth } = app.view;
	return (
		<Viewport
			worldHeight={map.height}
			worldWidth={map.width}
			screenWidth={screenWidth}
			screenHeight={screenHeight}
		>
			<Background x={0} y={0} height={map.height} width={map.width} />
			<Ship
				color={0xff0000}
				scale={1}
				x={x}
				y={500}
				rotation={Math.PI / 2}
			/>
			<Ship color={0xff0000} scale={1} x={400} y={y} rotation={Math.PI} />
		</Viewport>
	);
};
