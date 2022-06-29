import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { absurd } from "fp-ts/lib/function";
import type { RootState } from "./store";

export type Coord = Readonly<{ x: number; y: number }>;
export type Planet = Readonly<{
	kind: "PLANET";
	size: number;
	gravity: number;
}>;
export type Star = Readonly<{
	kind: "STAR";
	size: number;
	gravity: number;
}>;
export type Ship = Readonly<{ kind: "SHIP"; id: string }>;
export type Missile = Readonly<{ kind: "MISSILE"; id: string }>;
export type Laser = Readonly<{ kind: "LASER"; id: string }>;

export type GameMap = Readonly<{
	height: number;
	width: number;
	players: readonly string[];
}>;

export const makeGameMap = (gameMap: GameMap): GameMap => {
	return gameMap;
};

export type GameObject = (Ship | Planet | Star | Missile | Laser) & {
	id: number;
	coord: Coord;
	owner: string | null;
};

type NewGameState = Readonly<{
	kind: "NEW_GAME";
}>;
type CurrentGameState = Readonly<{
	kind: "GAME";
	playerName: string;
	selected: string | null;
	gameObjects: readonly GameObject[];
	map: GameMap;
}>;
export type GameState = NewGameState | CurrentGameState;

type MakeGameObject<E extends { kind: string }> = Omit<GameObject & E, "kind">;

export const makePlanet = (props: MakeGameObject<Planet>): GameObject => {
	return {
		...props,
		kind: "PLANET",
	};
};

export const makeCoord = (x: number, y: number): Coord => ({ x, y });

const makeNewGame = (): GameState => {
	return { kind: "NEW_GAME" };
};

const makeGame = (
	playerName: string,
	height?: number,
	width?: number
): GameState => {
	return {
		kind: "GAME",
		playerName,
		gameObjects: [],
		selected: null,
		map: makeGameMap({
			width: width ?? 800,
			height: height ?? 800,
			players: [playerName, "ai"],
		}),
	};
};

const initialState = makeNewGame();

export const gameSlice = createSlice({
	name: "gameState",
	initialState,
	reducers: {
		startGame: (state, action: PayloadAction<{ playerName: string }>) => {
			switch (state.kind) {
				case "NEW_GAME": {
					return makeGame(action.payload.playerName);
				}
				case "GAME": {
					return makeGame(action.payload.playerName);
				}

				default: {
					return absurd(state);
				}
			}
		},
		select: (state, action: PayloadAction<{ id: string }>) => {},
	},
});

export const { startGame } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGame = (state: RootState) => state.game;
export const selectMapDimensions = (
	state: RootState
): Pick<GameMap, "height" | "width"> | null => {
	switch (state.game.kind) {
		case "NEW_GAME": {
			return null;
		}
		case "GAME": {
			const map = state.game.map;
			return { width: map.width, height: map.height };
		}

		default: {
			return absurd(state.game);
		}
	}
};

export const gameReducer = gameSlice.reducer;
