import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Card,
  Layout,
  List,
  ListItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {SchemaContext} from '../schema/schema.context';
import {RewardDraw} from '../schema/reward-draw.model';

const {useQuery} = SchemaContext;

export const HistoryScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const draws = useQuery(RewardDraw).sorted('createdAt', true);

  const renderItem = ({item}: {item: RewardDraw}) => (
    <ListItem
      title={item.reward?.name ?? 'No reward'}
      description={item.createdAt.toDateString()}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <Card style={styles.card}>
          <List data={draws} renderItem={renderItem} />
        </Card>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 48,
    right: 48,
  },
  input: {
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 16,
  },
  createButton: {
    width: 100,
  },
});
