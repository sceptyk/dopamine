import {Realm} from '@realm/react';
import {RewardList} from './reward-list.model';

export class Reward extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  weight!: number;
  enabled!: boolean;
  lastDrawn!: Date;
  list!: RewardList;
  createdAt!: Date;

  constructor(
    realm: Realm,
    name: string,
    list: RewardList,
    weight: number = 1,
  ) {
    super(realm, {
      _id: new Realm.BSON.ObjectId(),
      name: name,
      weight: weight,
      enabled: true,
      lastDrawn: new Date(),
      list: list,
      createdAt: new Date(),
    });
  }

  static schema = {
    name: 'Reward',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      weight: 'double',
      enabled: 'bool',
      lastDrawn: 'date?',
      createdAt: 'date',
      list: {
        type: 'linkingObjects',
        objectType: 'RewardList',
        property: 'rewards',
      },
    },
  };
}
