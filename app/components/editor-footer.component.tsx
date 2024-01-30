import {Button, StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {View, ViewProps} from 'react-native';

export type EditorFooterProps = {
  onCreate: () => void;
  onCancel: () => void;
};

export const EditorFooter = (
  props: ViewProps & EditorFooterProps,
): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const {onCreate, onCancel, ...rest} = props;

  return (
    <View {...rest} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="small"
        status="basic"
        onPress={onCancel}>
        Cancel
      </Button>
      <Button style={styles.footerControl} size="small" onPress={onCreate}>
        Create
      </Button>
    </View>
  );
};

const themedStyles = StyleService.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
