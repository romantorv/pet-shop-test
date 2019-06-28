import { types, flow } from 'mobx-state-tree';

import * as AppConfig from 'app.config';

import Actions from './Actions';
import OwnerModel from './models/OwnerModel';

const Store = types
	.model('Store', {
		owners: types.array( OwnerModel, []),
		state: types.enumeration('States', ['initial', 'loading', 'completed', 'fetching', 'error']),
		stateTarget: '',
		stateMessage: '',
	})
	.views( self => ({
		get __ready(){
			return self.state !== 'initial' && self.state !== 'loading';
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
				// const { response } = error;
				console.log( error );
				self.state = 'error';
				self.stateTarget = 'page';
				// self.stateMessage = response.message;
				throw error;
			}
		})
	}));

export default Store;