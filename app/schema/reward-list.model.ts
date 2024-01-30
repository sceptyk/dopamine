import {Realm} from '@realm/react';
import {Reward} from './reward.model';

export class RewardList extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  noRewardOdds!: number;
  createdAt!: Date;
  rewards!: Realm.List<Reward>;

  constructor(realm: Realm, name: string, noRewardOdds = 0) {
    super(realm, {
      _id: new Realm.BSON.ObjectId(),
      name,
      noRewardOdds: noRewardOdds,
      rewards: [],
      createdAt: new Date(),
    });
  }

  static schema: Realm.ObjectSchema = {
    name: 'RewardList',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      noRewardOdds: 'double',
      createdAt: 'date',
      rewards: 'Reward[]',
    },
  };
}
