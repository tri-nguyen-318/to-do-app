import { chessActions } from '@/redux/chess/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons';
import invariant from 'tiny-invariant';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import {
  faChessBishop as faChessBishopSolid,
  faChessKing as faChessKingSolid,
  faChessKnight as faChessKnightSolid,
  faChessPawn as faChessPawnSolid,
  faChessQueen as faChessQueenSolid,
  faChessRook as faChessRookSolid,
  IconDefinition as IconDefinitionSolid,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import './Piece.scss';
import { Coordinate, Piece } from './types/types';
import { selectPieces, selectSelectedPiece } from '@/redux/chess/selectors';
import { isValidMove } from '@/utils/helpers';

const iconMap = (
  color: Piece['color'],
): Record<Piece['type'], IconDefinition | IconDefinitionSolid> => ({
  pawn: color === 'white' ? faChessPawn : faChessPawnSolid,
  rook: color === 'white' ? faChessRook : faChessRookSolid,
  knight: color === 'white' ? faChessKnight : faChessKnightSolid,
  bishop: color === 'white' ? faChessBishop : faChessBishopSolid,
  queen: color === 'white' ? faChessQueen : faChessQueenSolid,
  king: color === 'white' ? faChessKing : faChessKingSolid,
});

type Props = {
  coordinate?: Coordinate;
  piece: Piece;
  style: React.CSSProperties;
};

export default function PieceComponent({ piece, coordinate, style }: Props) {
  const dispatch = useAppDispatch();

  const selectedPiece = useAppSelector(selectSelectedPiece);
  const pieces = useAppSelector(selectPieces);

  const icon = iconMap(piece.color)[piece.type];

  const onSelectPiece = (e: React.MouseEvent<HTMLDivElement>) => {
    if (piece.isAlive && coordinate) {
      e.stopPropagation();
      if (
        selectedPiece &&
        selectedPiece?.color !== piece.color &&
        isValidMove(selectedPiece, coordinate, pieces)
      ) {
        dispatch(chessActions.killPiece({ id: piece.id }));
        dispatch(chessActions.movePiece(coordinate));
        return;
      }
      dispatch(chessActions.selectPiece(piece));
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({ element: el });
  }, []);

  return (
    <div
      ref={ref}
      className='w-4/5 h-4/5 piece'
      onClick={onSelectPiece}
      style={style}
    >
      <FontAwesomeIcon
        icon={icon}
        width='100%'
        height='100%'
      />
    </div>
  );
}
