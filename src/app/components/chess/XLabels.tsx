import React from 'react';
import { XCells } from './Cell';
import clsx from 'clsx';

type Props = {
  xCells: XCells;
  className?: string;
  position?: 'top' | 'bottom';
};

export default function XLabels({ xCells, className, position }: Props) {
  return (
    <div
      className={clsx(
        'absolute flex w-full h-8 font-bold',
        position === 'top' ? '-top-8' : '-bottom-8',
        className,
      )}
    >
      {xCells.map((item) => (
        <div
          key={item}
          className='flex-1 flex items-center justify-center'
        >
          {item}
        </div>
      ))}
    </div>
  );
}
