'use client';
import MantineButton from '@/components/MantineButton';
import { chessActions } from '@/redux/chess/slice';
import { useAppDispatch } from '@/redux/hooks';
import { useTimer } from 'react-timer-hook';
import React from 'react';
import dayjs from 'dayjs';

export default function Sidebar() {
  const dispatch = useAppDispatch();

  const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: dayjs().add(15, 'minutes').toDate(),
    autoStart: false,
    onExpire: () => console.warn('onExpire called'),
    interval: 1000,
  });

  const onNewGame = () => {
    dispatch(chessActions.newNormalGame());
  };

  return (
    <div className='basis-xs h-full md:min-w-64 p-4 flex gap-2 flex-col'>
      <div
        className='flex font-medium text-5xl justify-center'
        style={{
          color: 'var(--mantine-color-blue-6)',
        }}
      >
        <div>{minutes}</div>
        <div>:</div>
        <div>{String(seconds).length !== 1 ? seconds : `0${seconds}`}</div>
      </div>

      <MantineButton
        variant='default'
        onClick={() => {
          start();
        }}
      >
        Start game
      </MantineButton>
      <MantineButton onClick={onNewGame}>New game</MantineButton>
    </div>
  );
}
