import React from 'react';
import '@mantine/core/styles.css';

import { MantineProvider as MantineCoreProvider } from '@mantine/core';
type Props = {
  children: React.ReactNode;
};

export default function MantineProvider({ children }: Props) {
  return <MantineCoreProvider>{children}</MantineCoreProvider>;
}
