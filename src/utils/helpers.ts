import {
  Coordinate,
  Piece,
  XCells,
  YCells,
} from '@/app/components/chess/types/types';

const xIndexMap: Record<XCells[number], number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};

const yIndexMap: Record<YCells[number], number> = {
  8: 0,
  7: 1,
  6: 2,
  5: 3,
  4: 4,
  3: 5,
  2: 6,
  1: 7,
};

export const isValidCoordinate = (coordinate: Coordinate): boolean => {
  return (
    xIndexMap[coordinate.x] === coordinate.xIndex &&
    yIndexMap[coordinate.y] === coordinate.yIndex
  );
};

export const getCoordinateFromPosition = (
  position: `${XCells[number]}${YCells[number]}`,
): Coordinate => {
  const x = position[0] as XCells[number];
  const y = parseInt(position[1]) as YCells[number];

  return {
    x,
    y,
    xIndex: xIndexMap[x],
    yIndex: yIndexMap[y],
  };
};

export const hasPieceBetweenCoordinates = (
  start: Coordinate,
  end: Coordinate,
  piece: Piece,
  pieces: Piece[],
): boolean => {
  const hasPieceAtStart = pieces.some(
    (p) =>
      p.coordinate.xIndex === start.xIndex &&
      p.coordinate.yIndex === start.yIndex &&
      p.isAlive &&
      p.id !== piece.id,
  );

  if (hasPieceAtStart) {
    return true;
  }

  if (start.xIndex === end.xIndex && start.yIndex === end.yIndex) {
    return false;
  }

  const dx = end.xIndex - start.xIndex;
  const dy = end.yIndex - start.yIndex;

  const alphaX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
  const alphaY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

  console.log('🚀 ~ alphaX:', alphaX);
  console.log('🚀 ~ alphaY:', alphaY);

  const newStart = {
    ...start,
    xIndex: start.xIndex + alphaX,
    yIndex: start.yIndex + alphaY,
  };

  return hasPieceBetweenCoordinates(newStart, end, piece, pieces);
};

export const isValidMoveKnight = (
  piece: Piece,
  coordinate: Coordinate,
): boolean => {
  const { xIndex, yIndex } = piece.coordinate;
  const { xIndex: newXIndex, yIndex: newYIndex } = coordinate;
  const dx = Math.abs(newXIndex - xIndex);
  const dy = Math.abs(newYIndex - yIndex);
  return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
};

export const isValidMoveBishop = (
  piece: Piece,
  coordinate: Coordinate,
  pieces: Piece[],
): boolean => {
  const { xIndex, yIndex } = piece.coordinate;
  const { xIndex: newXIndex, yIndex: newYIndex } = coordinate;
  return (
    Math.abs(newXIndex - xIndex) === Math.abs(newYIndex - yIndex) &&
    !hasPieceBetweenCoordinates(piece.coordinate, coordinate, piece, pieces)
  );
};

export const isValidMoveRook = (
  piece: Piece,
  coordinate: Coordinate,
  pieces: Piece[],
): boolean => {
  const { xIndex, yIndex } = piece.coordinate;
  const { xIndex: newXIndex, yIndex: newYIndex } = coordinate;
  return (
    (xIndex === newXIndex || yIndex === newYIndex) &&
    !hasPieceBetweenCoordinates(piece.coordinate, coordinate, piece, pieces)
  );
};

export const isValidMoveQueen = (
  piece: Piece,
  coordinate: Coordinate,
  pieces: Piece[],
) => {
  return (
    (isValidMoveBishop(piece, coordinate, pieces) ||
      isValidMoveRook(piece, coordinate, pieces)) &&
    !hasPieceBetweenCoordinates(piece.coordinate, coordinate, piece, pieces)
  );
};

export const isValidMoveKing = (
  piece: Piece,
  coordinate: Coordinate,
): boolean => {
  const { xIndex, yIndex } = piece.coordinate;
  const { xIndex: newXIndex, yIndex: newYIndex } = coordinate;
  const dx = Math.abs(newXIndex - xIndex);
  const dy = Math.abs(newYIndex - yIndex);
  return dx <= 1 && dy <= 1;
};

export const isValidMovePawn = (
  piece: Piece,
  coordinate: Coordinate,
): boolean => {
  const { xIndex, yIndex } = piece.coordinate;
  const { xIndex: newXIndex, yIndex: newYIndex } = coordinate;
  const dx = Math.abs(newXIndex - xIndex);
  const dy = newYIndex - yIndex;

  return dx === 0 && (piece.isMoved ? dy === -1 : dy === -1 || dy === -2);
};

export const hasPieceInCoordinate = (
  coordinate: Coordinate,
  pieces: Piece[],
): boolean => {
  return pieces.some(
    (piece) =>
      piece.coordinate.xIndex === coordinate.xIndex &&
      piece.coordinate.yIndex === coordinate.yIndex &&
      piece.isAlive,
  );
};

export const isValidMove = (
  piece: Piece,
  coordinate: Coordinate,
  pieces: Piece[],
): boolean => {
  if (hasPieceInCoordinate(coordinate, pieces)) {
    return false;
  }

  switch (piece.type) {
    case 'knight': {
      return isValidMoveKnight(piece, coordinate);
    }
    case 'bishop': {
      return isValidMoveBishop(piece, coordinate, pieces);
    }
    case 'rook': {
      return isValidMoveRook(piece, coordinate, pieces);
    }
    case 'queen': {
      return isValidMoveQueen(piece, coordinate, pieces);
    }
    case 'king': {
      return isValidMoveKing(piece, coordinate);
    }
    case 'pawn': {
      return isValidMovePawn(piece, coordinate);
    }

    default:
      return false;
  }
};

export const getInitialPieces = (): Piece[] => {
  return [
    {
      id: 1,
      coordinate: getCoordinateFromPosition('A7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 2,
      coordinate: getCoordinateFromPosition('B7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 3,
      coordinate: getCoordinateFromPosition('C7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 4,
      coordinate: getCoordinateFromPosition('D7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 5,
      coordinate: getCoordinateFromPosition('E7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 6,
      coordinate: getCoordinateFromPosition('F7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 7,
      coordinate: getCoordinateFromPosition('G7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 8,
      coordinate: getCoordinateFromPosition('H7'),
      color: 'black',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 9,
      coordinate: getCoordinateFromPosition('A8'),
      color: 'black',
      type: 'rook',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 10,
      coordinate: getCoordinateFromPosition('B8'),
      color: 'black',
      type: 'knight',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 11,
      coordinate: getCoordinateFromPosition('C8'),
      color: 'black',
      type: 'bishop',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 12,
      coordinate: getCoordinateFromPosition('D8'),
      color: 'black',
      type: 'queen',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 13,
      coordinate: getCoordinateFromPosition('E8'),
      color: 'black',
      type: 'king',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 14,
      coordinate: getCoordinateFromPosition('F8'),
      color: 'black',
      type: 'bishop',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 15,
      coordinate: getCoordinateFromPosition('G8'),
      color: 'black',
      type: 'knight',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 16,
      coordinate: getCoordinateFromPosition('H8'),
      color: 'black',
      type: 'rook',
      isMoved: false,
      isAlive: true,
    },

    // White pieces
    {
      id: 17,
      coordinate: getCoordinateFromPosition('A2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 18,
      coordinate: getCoordinateFromPosition('B2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 19,
      coordinate: getCoordinateFromPosition('C2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 20,
      coordinate: getCoordinateFromPosition('D2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 21,
      coordinate: getCoordinateFromPosition('E2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 22,
      coordinate: getCoordinateFromPosition('F2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 23,
      coordinate: getCoordinateFromPosition('G2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 24,
      coordinate: getCoordinateFromPosition('H2'),
      color: 'white',
      type: 'pawn',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 25,
      coordinate: getCoordinateFromPosition('A1'),
      color: 'white',
      type: 'rook',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 26,
      coordinate: getCoordinateFromPosition('B1'),
      color: 'white',
      type: 'knight',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 27,
      coordinate: getCoordinateFromPosition('C1'),
      color: 'white',
      type: 'bishop',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 28,
      coordinate: getCoordinateFromPosition('D1'),
      color: 'white',
      type: 'queen',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 29,
      coordinate: getCoordinateFromPosition('E1'),
      color: 'white',
      type: 'king',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 30,
      coordinate: getCoordinateFromPosition('F1'),
      color: 'white',
      type: 'bishop',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 31,
      coordinate: getCoordinateFromPosition('G1'),
      color: 'white',
      type: 'knight',
      isMoved: false,
      isAlive: true,
    },
    {
      id: 32,
      coordinate: getCoordinateFromPosition('H1'),
      color: 'white',
      type: 'rook',
      isMoved: false,
      isAlive: true,
    },
  ];
};
