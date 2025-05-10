import React from 'react';
import Cell from './Cell';
import clsx from 'clsx';
import './Board.scss';
import YLabels from './YLabels';
import XLabels from './XLabels';
import { XCells, YCells } from './types/types';

export default function Board() {
  const yCells: YCells = [8, 7, 6, 5, 4, 3, 2, 1];
  const xCells: XCells = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div
      className={clsx(
        'aspect-square rounded-lg board relative flex-1 overflow-hidden',
      )}
    >
      <YLabels
        yCells={yCells}
        position='left'
      />
      <YLabels
        yCells={yCells}
        position='right'
      />
      <XLabels
        xCells={xCells}
        position='top'
      />
      <XLabels
        xCells={xCells}
        className='bottom'
      />

      <div className={clsx('grid grid-cols-8 h-full board-content')}>
        {yCells.map((y, yIndex) => {
          return xCells.map((x, xIndex) => {
            return (
              <Cell
                key={`${y}${x}`}
                coordinate={{
                  x: x,
                  y: y,
                  yIndex: yIndex,
                  xIndex: xIndex,
                }}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
