import { Sprite, TilingSprite } from "@inlet/react-pixi";
import darkRift from "./Dark_Rift_2012.jpg";

export type BackgroundProps = Readonly<
	Omit<
		React.ComponentProps<typeof TilingSprite>,
		"image" | "tilePosition"
	> & {
		height: number;
		width: number;
	}
>;

export const Background: React.FC<BackgroundProps> = (props) => {
	return (
		<Sprite
			// image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/placeholder.png"
			image={darkRift}
			{...props}
		/>
	);
};
