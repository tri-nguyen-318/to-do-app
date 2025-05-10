import React from 'react';
import '@mantine/core/styles.css';

import {
  createTheme,
  MantineProvider as MantineCoreProvider,
} from '@mantine/core';
type Props = {
  children: React.ReactNode;
};

const theme = createTheme({});

export default function MantineProvider({ children }: Props) {
  return <MantineCoreProvider theme={theme}>{children}</MantineCoreProvider>;
}
