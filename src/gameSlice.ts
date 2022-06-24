import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { absurd } from "fp-ts/lib/function";
import type { RootState } from "./store";

type NewGameState = Readonly<{
	kind: "NEW_GAME";
}>;
type CurrentGameState = Readonly<{
	kind: "CURRENT_GAME";
	playerName: string;
}>;
type GameState = NewGameState | CurrentGameState;

const makeNewGame = (): GameState => {
	return { kind: "NEW_GAME" };
};

const makeCurrentGame = (playerName: string): GameState => {
	return { kind: "CURRENT_GAME", playerName };
};

// Define the initial state using that type
const initialState = makeNewGame();

export const gameSlice = createSlice({
	name: "gameState",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		startGame: (state, action: PayloadAction<string>) => {
			switch (state.kind) {
				case "NEW_GAME": {
					return makeCurrentGame(action.payload);
				}
				case "CURRENT_GAME": {
					return state;
				}

				default: {
					return absurd(state);
				}
			}
		},
	},
});

export const { startGame } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGame = (state: RootState) => state.game;

export const gameReducer = gameSlice.reducer;
