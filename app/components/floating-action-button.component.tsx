import React from 'react';
import {
  Button,
  ButtonProps,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

export const FloatingActionButton = (props: ButtonProps) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Button style={styles.fab} {...props}>
      {props.children}
    </Button>
  );
};

const themedStyles = StyleService.create({
  fab: {
    zIndex: 1,
    position: 'absolute',
    bottom: 48,
    right: 48,
  },
});
