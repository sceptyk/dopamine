import {
  Button,
  Card,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {Reward} from '../schema/reward.model';
import {RewardList} from '../schema/reward-list.model';
import {SchemaContext} from '../schema/schema.context';
import {RewardDraw} from '../schema/reward-draw.model';
import {useFocusEffect} from '@react-navigation/native';

const {useRealm} = SchemaContext;

export type RandomRewardProps = {
  list: RewardList;
  rewards: Reward[];
};

export const RandomReward = (props: RandomRewardProps) => {
  const styles = useStyleSheet(themedStyles);
  const realm = useRealm();
  const [drawnReward, setDrawnReward] = useState<string | null | undefined>();

  const {rewards, list} = props;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setDrawnReward(undefined);
      };
    }, []),
  );

  useEffect(() => {
    if (!rewards.length) setDrawnReward(undefined);
  }, [rewards]);

  const drawRandomReward = () => {
    const rewardOdds = 1 - Math.min(list.noRewardOdds, 1);

    const enabledRewards = rewards.filter(reward => reward.enabled);
    const itemCompleteWeights = enabledRewards.map(reward => {
      const daysFromLastDraw =
        (new Date().getTime() - reward.lastDrawn.getTime()) / (1000 * 60 * 60);
      return reward.weight * Math.max(daysFromLastDraw, 1);
    });

    const weightSum = itemCompleteWeights.reduce(
      (weight, current) => current + weight,
      0,
    );

    const randomValue = Math.random();
    let reward: Reward | null = null;

    if (randomValue < rewardOdds) {
      const randomWeightThreshold = (randomValue / rewardOdds) * weightSum;

      let currentWeightSum = 0;
      let index = 0;
      while (index < itemCompleteWeights.length) {
        currentWeightSum += itemCompleteWeights[index];

        if (currentWeightSum > randomWeightThreshold) break;

        index++;
      }

      reward = enabledRewards[index];
    }
    setDrawnReward(reward ? reward.name : null);

    realm.write(() => {
      if (reward) reward.lastDrawn = new Date();
      return new RewardDraw(realm, reward);
    });
  };

  return (
    <Card style={styles.card}>
      <Text category="h3" style={styles.drawnReward}>
        {drawnReward ? drawnReward : drawnReward === null ? 'No reward' : '...'}
      </Text>
      <Button onPress={drawRandomReward} status="basic">
        Draw reward
      </Button>
    </Card>
  );
};

const themedStyles = StyleService.create({
  card: {
    margin: 8,
  },
  drawnReward: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: 24,
  },
});
