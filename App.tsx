import React from 'react';
import 'react-native-get-random-values';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './app/navigation/app-navigator.context';
import {SchemaContext} from './app/schema/schema.context';
import {Appearance} from 'react-native';
import {theme} from './app/config/theme';

export default () => {
  const colorScheme = Appearance.getColorScheme();
  const coloredTheme = {
    ...(colorScheme === 'dark' ? eva.dark : eva.light),
    ...theme,
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={coloredTheme}>
        <SchemaContext.RealmProvider>
          <AppNavigator />
        </SchemaContext.RealmProvider>
      </ApplicationProvider>
    </>
  );
};
