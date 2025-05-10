import React from 'react';
import { YCells } from './Cell';
import clsx from 'clsx';

type Props = {
  yCells: YCells;
  className?: string;
  position?: 'left' | 'right';
};

export default function YLabels({ yCells, className, position }: Props) {
  return (
    <div
      className={clsx(
        'absolute  flex w-8 flex-col h-full items-center font-bold',
        position === 'left' ? '-left-8' : '-right-8',
        className,
      )}
    >
      {yCells.map((item) => (
        <div
          key={item}
          className='flex-1 flex justify-center items-center w-full'
        >
          {item}
        </div>
      ))}
    </div>
  );
}
