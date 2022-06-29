import { Stage as PixiStage } from "@inlet/react-pixi";
import * as React from "react";
import { ReactReduxContext } from "react-redux";
import { makeGameMap } from "./gameSlice";
import { MainScene } from "./scenes/MainScene";

const ContextBridge: React.FC<{
	children: React.ReactNode;
	Context: React.Context<any>;
	render: (node: React.ReactElement) => React.ReactNode;
}> = ({ children, Context, render }) => {
	return (
		<Context.Consumer>
			{(value) =>
				render(
					<Context.Provider value={value}>
						{children}
					</Context.Provider>
				)
			}
		</Context.Consumer>
	);
};

const Stage: React.FC<React.ComponentProps<typeof PixiStage>> = ({
	children,
	...props
}) => {
	return (
		<ContextBridge
			Context={ReactReduxContext}
			render={(children) => <PixiStage {...props}>{children}</PixiStage>}
		>
			{children}
		</ContextBridge>
	);
};

export const App: React.FC = () => {
	return (
		<Stage
			className="w-screen h-screen overflow-hidden"
			width={window.innerWidth}
			height={window.innerHeight}
			options={{
				antialias: true,
				resolution: window.devicePixelRatio,
				autoDensity: true,
				resizeTo: window,
			}}
		>
			<MainScene
				map={makeGameMap({
					width: 2000,
					height: 2000,
					players: ["jack", "ai"],
				})}
			/>
		</Stage>
	);
};

export default App;
