import React from 'react';
import { Button } from '@mantine/core';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

const MantineButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button
      variant="filled"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default MantineButton;
