import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  RewardList: undefined;
  Rewards: {listId: string};
  History: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  BottomTabScreenProps<RootStackParamList, T>;
