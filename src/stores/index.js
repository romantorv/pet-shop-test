import { types, flow } from 'mobx-state-tree';

import * as AppConfig from 'app.config';

import Actions from './Actions';
import OwnerModel from './models/OwnerModel';
import PetModel from './models/PetModel';

const Store = types
	.model('Store', {
		owners: types.array( OwnerModel, []),
		pets: types.array(PetModel, []),
		state: types.enumeration('States', ['initial', 'loading', 'completed', 'fetching', 'error']),
		stateTarget: '',
		stateMessage: '',
	})
	.views( self => ({
		get __ready(){
			return self.state !== 'initial' && self.state !== 'loading';
		},
		__getPetsBy(){

		},
		__getOwnersBy(){
			
		}
		
	}))
	.actions( self => ({
		...Actions,
		fetchOwners: flow( function* fetchOwners(params){
			self.state = 'fetching';
			try {
				const result = yield self.fetch({
					url: AppConfig.REST_OWNERS,
					cancelToken: params && typeof params.cancelToken !== 'undefined' ? params.cancelToken : null,
				});
				
				result.map( item => self.owners.push( OwnerModel.create(item) ) );
				self.state = 'completed';
				return null;
			} catch (error) {
				self.state = 'error';
				self.stateTarget = 'page';
				self.stateMessage = error.message || 'Error while fetching records';
				throw error;
			}
		})
	}));

export default Store;