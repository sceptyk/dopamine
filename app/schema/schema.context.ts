import {createRealmContext} from '@realm/react';
import {Reward} from './reward.model';
import {RewardList} from './reward-list.model';
import {RewardDraw} from './reward-draw.model';

export const SchemaContext = createRealmContext({
  schema: [Reward, RewardList, RewardDraw],
  deleteRealmIfMigrationNeeded: true,
});
