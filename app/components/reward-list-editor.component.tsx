import React, {useState} from 'react';
import {
  Card,
  Input,
  Modal,
  ModalProps,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {RewardList} from '../schema/reward-list.model';
import {SchemaContext} from '../schema/schema.context';
import {EditorFooter} from './editor-footer.component';

const {useRealm} = SchemaContext;

export type RewardListEditorProps = ModalProps & {
  list?: RewardList;
  onClose: () => void;
};

export const RewardListEditor = (props: RewardListEditorProps) => {
  const styles = useStyleSheet(themedStyles);
  const realm = useRealm();
  const {onClose, list, ...rest} = props;
  const [newRewardListName, setNewRewardListName] = useState(list?.name ?? '');
  const [noRewardOdds, setNoRewardOdds] = useState(
    String(list?.noRewardOdds ?? ''),
  );

  const clearForm = () => {
    if (!list) {
      setNewRewardListName('');
      setNoRewardOdds('');
    }
  };

  const updateRewardList = () => {
    realm.write(() => {
      const noRewardsOddsValue = noRewardOdds
        ? parseFloat(noRewardOdds)
        : undefined;

      if (list) {
        list.name = newRewardListName;
        list.noRewardOdds = noRewardsOddsValue!;
      } else {
        return new RewardList(realm, newRewardListName, noRewardsOddsValue);
      }
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
        footer={
          <EditorFooter onCreate={updateRewardList} onCancel={closeModal} />
        }>
        <Input
          style={styles.input}
          placeholder="List name"
          value={newRewardListName}
          onChangeText={setNewRewardListName}
        />
        <Input
          style={styles.input}
          placeholder="No reward odds"
          keyboardType="numeric"
          value={noRewardOdds}
          onChangeText={setNoRewardOdds}
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
  checkbox: {
    marginRight: 16,
  },
  createButton: {
    width: 100,
  },
});
