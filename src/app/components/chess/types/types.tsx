export type YCells = [8, 7, 6, 5, 4, 3, 2, 1];
export type XCells = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export type Coordinate = {
  x: XCells[number];
  y: YCells[number];
  yIndex: number;
  xIndex: number;
};

export interface Piece {
  id: number;
  coordinate: Coordinate;
  color: 'black' | 'white';
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
  isMoved: boolean;
  isAlive: boolean;
}

export type KingPiece = Piece & { type: 'king' };
export type QueenPiece = Piece & { type: 'queen' };
export type BishopPiece = Piece & { type: 'bishop' };
export type KnightPiece = Piece & { type: 'knight' };
export type RookPiece = Piece & { type: 'rook' };
export type PawnPiece = Piece & { type: 'pawn' };
