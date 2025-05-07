import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Coordinate, Piece } from '@/app/components/chess/types/types';

export const selectPieces = (state: RootState) => state.chess.pieces;
export const selectPiecesUnAlive = createSelector(
  selectPieces,
  (_, color: Piece['color']) => color,
  (pieces: Piece[], color) =>
    pieces.filter((piece) => !piece.isAlive && piece.color === color),
);

export const selectSelectedPiece = (state: RootState) =>
  state.chess.selectedPiece;
export const selectIsSelectedCell = createSelector(
  selectSelectedPiece,
  (_, coordinate: Coordinate) => coordinate,
  (selectedPiece, coordinate) => {
    return (
      selectedPiece &&
      selectedPiece.coordinate.xIndex === coordinate.xIndex &&
      selectedPiece.coordinate.yIndex === coordinate.yIndex
    );
  },
);
export const selectPieceInCell = createSelector(
  selectPieces,
  (_, coordinate: Coordinate) => coordinate,
  (pieces: Piece[], coordinate: Coordinate) => {
    return pieces.find((piece) => {
      return (
        piece.coordinate.xIndex === coordinate.xIndex &&
        piece.coordinate.yIndex === coordinate.yIndex &&
        piece.isAlive
      );
    });
  },
);
