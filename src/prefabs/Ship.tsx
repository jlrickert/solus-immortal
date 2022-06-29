import { Graphics } from "@inlet/react-pixi";
import * as React from "react";

type Draw = Required<React.ComponentProps<typeof Graphics>>["draw"];

export type ShipProps = Readonly<{
	color: number;
	scale: number;
	rotation: number;
	x: number;
	y: number;
}>;
export const Ship: React.FC<ShipProps> = ({ color, scale, x, y, rotation }) => {
	const draw = React.useCallback<Draw>(
		(g) => {
			g.clear();
			g.beginFill(color);
			g.moveTo(8, 0); // top point
			g.lineTo(0, 20); // bottom left
			g.lineTo(8, 16); // bottom mid point
			g.lineTo(16, 20); // bottom right
			g.endFill();
		},
		[color]
	);
	return (
		<Graphics
			draw={draw}
			scale={scale}
			x={x}
			y={y}
			anchor={0.5}
			zIndex={10}
			rotation={rotation}
		/>
	);
};
