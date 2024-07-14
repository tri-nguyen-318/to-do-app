'use client';

import MantineButton from '@/components/MantineButton';
import React from 'react';

type Props = {};

export default function NewTaskButton({}: Props) {
  const onAddNewTask = () => {
    console.log('Add new task');
  };

  return <MantineButton onClick={onAddNewTask}>Add new task</MantineButton>;
}
