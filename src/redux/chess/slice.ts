import { Coordinate, Piece } from '@/app/components/chess/types/types';
import { getInitialPieces } from '@/utils/helpers';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  pieces: Piece[];
  selectedPiece: Piece | null;
}

const initialState = {
  pieces: getInitialPieces(),
  selectedPiece: null,
} satisfies InitialState as InitialState;

const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    newNormalGame(state) {
      state.pieces = getInitialPieces();
    },
    selectPiece(state, action: PayloadAction<Piece>) {
      state.selectedPiece = action.payload;
    },
    movePiece(state, action: PayloadAction<Coordinate>) {
      if (state.selectedPiece) {
        state.pieces = state.pieces.map((piece) => {
          if (piece.id === state.selectedPiece?.id) {
            return {
              ...piece,
              coordinate: action.payload,
              isMoved: true,
            };
          }
          return piece;
        });

        state.selectedPiece = null;
      }
    },
    killPiece(state, action: PayloadAction<{ id: number }>) {
      state.pieces = state.pieces.map((piece) => {
        if (piece.id === action.payload.id) {
          return {
            ...piece,
            isAlive: false,
          };
        }
        return piece;
      });
    },
    deselectPiece(state) {
      state.selectedPiece = null;
    },
  },
});

export const chessActions = chessSlice.actions;
export default chessSlice.reducer;
