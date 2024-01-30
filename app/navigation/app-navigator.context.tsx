import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {RewardsScreen} from '../screens/rewards.screen';
import {HistoryScreen} from '../screens/history.screen';
import {RewardListScreen} from '../screens/reward-lists.screen';
import {RootStackParamList} from './types';

const {Navigator, Screen} = createBottomTabNavigator<RootStackParamList>();

const selectedTab = (route: any) => {
  switch (route.name) {
    case 'Rewards':
    case 'RewardList':
      return 0;
    case 'History':
      return 1;
  }
};

const BottomTabBar = ({navigation, state}: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={selectedTab(state.routes[state.index])}
    onSelect={index => {
      navigation.navigate(state.routeNames[index]);
    }}>
    <BottomNavigationTab title="Rewards" />
    <BottomNavigationTab title="History" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    tabBar={props => <BottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="RewardList" component={RewardListScreen} />
    <Screen name="History" component={HistoryScreen} />
    <Screen name="Rewards" component={RewardsScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
