import {Realm} from '@realm/react';
import {Reward} from './reward.model';

export class RewardDraw extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  reward?: Reward;
  createdAt!: Date;

  constructor(realm: Realm, reward: Reward | null) {
    super(realm, {
      _id: new Realm.BSON.ObjectId(),
      reward,
      createdAt: new Date(),
    });
  }

  static schema = {
    name: 'RewardDraw',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      reward: 'Reward?',
      createdAt: 'date',
    },
  };
}
