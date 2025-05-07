'use client';

import {
  selectIsSelectedCell,
  selectPieceInCell,
  selectPieces,
  selectSelectedPiece,
} from '@/redux/chess/selectors';
import { chessActions } from '@/redux/chess/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isValidCoordinate, isValidMove } from '@/utils/helpers';
import clsx from 'clsx';
import { Coordinate } from './types/types';
import PieceComponent from './Piece';

type Props = {
  coordinate: Coordinate;
};

export default function Cell({ coordinate }: Props) {
  if (!isValidCoordinate(coordinate)) {
    throw new Error(
      'Invalid coordinate: xIndex and yIndex do not match x and y values',
    );
  }

  const pieces = useAppSelector(selectPieces);

  const { xIndex, yIndex } = coordinate;
  const isEven = (xIndex + yIndex) % 2 === 0;
  const isTopLeft = xIndex === 0 && yIndex === 0;
  const isTopRight = xIndex === 7 && yIndex === 0;
  const isBottomLeft = xIndex === 0 && yIndex === 7;
  const isBottomRight = xIndex === 7 && yIndex === 7;

  const piece = useAppSelector((state) => selectPieceInCell(state, coordinate));

  const selectedPiece = useAppSelector(selectSelectedPiece);

  const isCellValidToMove = () => {
    if (selectedPiece) {
      return isValidMove(selectedPiece, coordinate, pieces);
    }
    return false;
  };

  const getBackground = () => {
    if (isSelectedCell) return 'var(--cell-background-selected)';
    if (!isEven) return 'var(--cell-background)';
  };

  const isSelectedCell = useAppSelector((state) =>
    selectIsSelectedCell(state, coordinate),
  );

  const dispatch = useAppDispatch();

  const onClickCell = () => {
    if (isCellValidToMove()) {
      dispatch(chessActions.movePiece(coordinate));
    } else {
      dispatch(chessActions.deselectPiece());
    }
  };

  return (
    <div
      className={clsx(
        isEven && 'bg-white',
        isTopLeft && 'rounded-tl',
        isTopRight && 'rounded-tr',
        isBottomLeft && 'rounded-bl',
        isBottomRight && 'rounded-br',
        'flex items-center justify-center aspect-square',
      )}
      style={{
        background: getBackground(),
      }}
      onClick={onClickCell}
    >
      {isCellValidToMove() && (
        <div
          className='w-2 h-2 rounded-full absolute'
          style={{
            background: 'var(--cell-background-valid)',
          }}
        />
      )}
      {!!piece && (
        <PieceComponent
          piece={piece}
          key={piece.id}
          coordinate={coordinate}
        />
      )}
    </div>
  );
}
