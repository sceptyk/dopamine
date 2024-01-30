import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Card,
  Icon,
  Layout,
  List,
  ListItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {SchemaContext} from '../schema/schema.context';
import {RewardList} from '../schema/reward-list.model';
import {FloatingActionButton} from '../components/floating-action-button.component';
import {RewardListEditor} from '../components/reward-list-editor.component';
import {EmptyContent} from '../components/empty-content.component';
import {ScreenProps} from '../navigation/types';

const {useQuery, useRealm} = SchemaContext;

export const RewardListScreen = ({navigation}: ScreenProps<'RewardList'>) => {
  const styles = useStyleSheet(themedStyles);
  const realm = useRealm();
  const rewardLists = useQuery(RewardList);
  const [isEditorModalOpen, setEditorModalOpen] = useState(false);

  const navigateRewardsScreen = (item: RewardList) => {
    navigation.navigate('Rewards', {
      listId: item._id.toHexString(),
    });
  };

  const removeReward = (item: RewardList) => {
    realm.write(() => {
      realm.delete(item);
    });
  };

  const renderRemoveButton = (item: RewardList) => (
    <Button
      size="small"
      status="danger"
      appearance="ghost"
      accessoryLeft={<Icon name="trash-outline" />}
      onPress={() => removeReward(item)}
    />
  );
  const renderItem = ({item}: any) => (
    <ListItem
      title={item.name}
      accessoryRight={() => renderRemoveButton(item)}
      onPress={() => navigateRewardsScreen(item)}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <RewardListEditor
          visible={isEditorModalOpen}
          onClose={() => setEditorModalOpen(false)}
        />
        <Card style={styles.card}>
          {!rewardLists.length ? (
            <EmptyContent>No lists yet</EmptyContent>
          ) : (
            <List data={rewardLists} renderItem={renderItem} />
          )}
        </Card>
        <FloatingActionButton
          onPress={() => setEditorModalOpen(true)}
          accessoryRight={<Icon name="folder-add-outline" />}>
          Add list
        </FloatingActionButton>
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
