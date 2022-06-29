import { Graphics } from "@inlet/react-pixi";
import * as React from "react";

type Draw = Required<React.ComponentProps<typeof Graphics>>["draw"];

export type RectangleProps = Readonly<
	Pick<
		React.ComponentProps<typeof Graphics>,
		"x" | "y" | "anchor" | "height" | "width" | "scale" | "rotation"
	> & {
		color?: number;
		width: number;
		height: number;
	}
>;
//  Readonly<{
// 	x?: number;
// 	y?: number;
// 	width: number;
// 	height: number;
// 	rotation?: number;
// 	scale?: number;
// 	color?: number;
// 	anchor?: React.ComponentProps<typeof Graphics>["anchor"];
// }>;
export const Rectangle: React.FC<RectangleProps> = (props) => {
	const draw = React.useCallback<Draw>(
		(g) => {
			g.lineStyle(10, props.color ?? 0xff0000).drawRect(
				0,
				0,
				props.width,
				props.height
			);
		},
		[props.color, props.height, props.width]
	);
	return (
		<Graphics
			draw={draw}
			x={props.x}
			y={props.y}
			height={props.height}
			width={props.width}
			scale={props.scale}
			rotation={props.rotation}
			anchor={props.anchor}
		/>
	);
};
