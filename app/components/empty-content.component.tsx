import React from 'react';
import {PropsWithChildren} from 'react';
import {Text} from 'react-native';

export const EmptyContent = (props: PropsWithChildren) => {
  return <Text>{props.children}</Text>;
};
