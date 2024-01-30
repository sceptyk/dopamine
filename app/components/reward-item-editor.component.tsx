import {
  Card,
  Input,
  Modal,
  ModalProps,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {SchemaContext} from '../schema/schema.context';
import {Reward} from '../schema/reward.model';
import {EditorFooter} from './editor-footer.component';
import {RewardList} from '../schema/reward-list.model';

const {useRealm} = SchemaContext;

export type RewardItemEditorProps = ModalProps & {
  list: RewardList;
  onClose: () => void;
};

export const RewardItemEditor = (props: RewardItemEditorProps) => {
  const {onClose, list, ...rest} = props;

  const styles = useStyleSheet(themedStyles);
  const [newRewardName, setNewRewardName] = useState('');
  const [newRewardWeight, setNewRewardWeight] = useState('');

  const realm = useRealm();

  const clearForm = () => {
    setNewRewardName('');
    setNewRewardWeight('');
  };

  const addReward = () => {
    realm.write(() => {
      if (!list) return;

      const newRewardWeightValue = newRewardWeight
        ? parseFloat(newRewardWeight)
        : undefined;
      const reward = new Reward(
        realm,
        newRewardName,
        list,
        newRewardWeightValue,
      );
      list.rewards.push(reward);
    });

    clearForm();
    onClose();
  };

  const closeModal = () => {
    clearForm();
    onClose();
  };

  return (
    <Modal style={styles.modal} backdropStyle={styles.backdrop} {...rest}>
      <Card
        style={styles.card}
        footer={<EditorFooter onCreate={addReward} onCancel={closeModal} />}>
        <Input
          style={styles.input}
          placeholder="Reward name"
          value={newRewardName}
          onChangeText={setNewRewardName}
        />
        <Input
          style={styles.input}
          placeholder="Reward weight"
          keyboardType="numeric"
          value={newRewardWeight}
          onChangeText={setNewRewardWeight}
        />
      </Card>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  modal: {
    flex: 1,
    width: '90%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    margin: 8,
  },
  input: {
    marginBottom: 8,
  },
});
