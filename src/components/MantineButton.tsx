import React, { ComponentProps } from 'react';
import { Button, ButtonProps } from '@mantine/core';

// type Props = ComponentProps<typeof Button> ;
type Props = ButtonProps & {
  onClick: () => void;
};

const MantineButton: React.FC<Props> = ({
  color,
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      color={color}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MantineButton;
