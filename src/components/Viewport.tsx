import * as React from "react";
import * as PIXI from "pixi.js";
import { PixiComponent, useApp } from "@inlet/react-pixi";
import { Viewport as PixiViewport, IViewportOptions } from "pixi-viewport";

export type ViewportProps = Readonly<
	IViewportOptions & {
		children?: React.ReactNode;
	}
>;

export interface PixiComponentViewportProps extends ViewportProps {
	app: PIXI.Application;
	children?: React.ReactNode;
}

const PixiComponentViewport = PixiComponent("Viewport", {
	create: (props: PixiComponentViewportProps) => {
		const viewport = new PixiViewport({
			...props,
			passiveWheel: false,
			ticker: props.app.ticker,
			interaction: props.app.renderer.plugins.interaction,
		});
		viewport.drag().pinch().wheel().clamp({ direction: "all" }).clampZoom({
			minWidth: 100,
			minHeight: 100,
			maxWidth: props.worldWidth,
			maxHeight: props.worldHeight,
		});
		return viewport;
	},
});

export const Viewport = (props: ViewportProps) => {
	const app = useApp();
	return (
		<PixiComponentViewport app={app} {...props}>
			{props.children}
		</PixiComponentViewport>
	);
};
