import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  StyleService,
  Layout,
  useStyleSheet,
  Icon,
  List,
  Card,
  ListItem,
  CheckBox,
  Divider,
  TopNavigationAction,
  TopNavigation,
  Spinner,
} from '@ui-kitten/components';
import {SchemaContext} from '../schema/schema.context';
import {Reward} from '../schema/reward.model';
import {RewardList} from '../schema/reward-list.model';
import {FloatingActionButton} from '../components/floating-action-button.component';
import {RandomReward} from '../components/random-reward.component';
import {RewardItemEditor} from '../components/reward-item-editor.component';
import {RewardListEditor} from '../components/reward-list-editor.component';
import {EmptyContent} from '../components/empty-content.component';
import {Realm} from '@realm/react';
import {ScreenProps} from '../navigation/types';

const {useQuery, useObject, useRealm} = SchemaContext;

export const RewardsScreen = ({navigation, route}: ScreenProps<'Rewards'>) => {
  const {listId} = route.params;
  const listObjectId = Realm.BSON.ObjectId.createFromHexString(listId);

  const styles = useStyleSheet(themedStyles);
  const realm = useRealm();
  const list = useObject(RewardList, listObjectId);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [isListEditorOpen, setListEditorOpen] = useState(false);

  const rewards = useQuery(Reward).filtered('list._id == $0', listObjectId);

  const removeReward = (item: Reward) => {
    realm.write(() => {
      if (!list) return;

      realm.delete(item);
    });
  };

  const updateRewardEnabled = (value: boolean, item: Reward) => {
    realm.write(() => {
      item.enabled = value;
    });
  };

  const renderCheckbox = (item: Reward) => (
    <CheckBox
      style={styles.checkbox}
      checked={item.enabled}
      onChange={value => updateRewardEnabled(value, item)}
    />
  );
  const renderRemoveButton = (item: Reward) => (
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
      description={`Weight: ${item.weight}`}
      accessoryLeft={() => renderCheckbox(item)}
      accessoryRight={() => renderRemoveButton(item)}
    />
  );

  const backAction = () => (
    <TopNavigationAction
      icon={<Icon name="arrow-back" />}
      onPress={navigateBack}
    />
  );

  const editAction = () => (
    <TopNavigationAction
      icon={<Icon name="settings-2-outline" />}
      onPress={() => setListEditorOpen(true)}
    />
  );

  const navigateBack = () => {
    navigation.navigate('RewardList');
  };

  if (!list) return <Spinner />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={list?.name || ''}
        accessoryLeft={backAction}
        accessoryRight={editAction}
      />
      <Divider />
      <Layout style={styles.container}>
        <RewardItemEditor
          visible={isEditorOpen}
          list={list}
          onClose={() => setEditorOpen(false)}
        />
        <RewardListEditor
          visible={isListEditorOpen}
          list={list}
          onClose={() => setListEditorOpen(false)}
        />
        <Card style={styles.card}>
          {!rewards.length ? (
            <EmptyContent>No rewards yet</EmptyContent>
          ) : (
            <List data={rewards} renderItem={renderItem} />
          )}
        </Card>
        <RandomReward list={list} rewards={[...rewards]} />
        <FloatingActionButton
          onPress={() => setEditorOpen(true)}
          accessoryLeft={<Icon name="file-add-outline" />}>
          Add reward
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
