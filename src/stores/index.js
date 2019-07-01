import { types, flow, getSnapshot } from 'mobx-state-tree';

import * as AppConfig from 'app.config';

import Actions from './Actions';
import OwnerModel from './models/OwnerModel';

const fakeData = [
	{
		"name": "Bob",
		"gender": "Male",
		"age": 23,
		"pets": [
			{
				"name": "Garfield",
				"type": "Cat"
			},
			{
				"name": "Fido",
				"type": "Dog"
			}
		]
	},
	{
		"name": "Jennifer",
		"gender": "Female",
		"age": 18,
		"pets": [
			{
				"name": "Garfield",
				"type": "Cat"
			}
		]
	},
	{
		"name": "Steve",
		"gender": "Male",
		"age": 45,
		"pets": null
	},
	{
		"name": "Fred",
		"gender": "Male",
		"age": 40,
		"pets": [
			{
				"name": "Tom",
				"type": "Cat"
			},
			{
				"name": "Max",
				"type": "Cat"
			},
			{
				"name": "Sam",
				"type": "Dog"
			},
			{
				"name": "Jim",
				"type": "Cat"
			}
		]
	},
	{
		"name": "Samantha",
		"gender": "Female",
		"age": 40,
		"pets": [
			{
				"name": "Tabby",
				"type": "Cat"
			}
		]
	},
	{
		"name": "Alice",
		"gender": "Female",
		"age": 64,
		"pets": [
			{
				"name": "Simba",
				"type": "Cat"
			},
			{
				"name": "Nemo",
				"type": "Fish"
			}
		]
	}
];

const Store = types
	.model('Store', {
		owners: types.array(OwnerModel, []),
		petTypes: types.optional(types.frozen(), {}),
		state: types.enumeration('States', ['initial', 'loading', 'completed', 'fetching', 'error']),
		stateTarget: '',
		stateMessage: '',
	})
	.views(self => ({
		get __ready() {
			return self.state !== 'initial' && self.state !== 'loading';
		},
		get __genderList() {
			return [
				{ label: 'Male', value: 'Male' },
				{ label: 'Female', value: 'Female' }
			];
		},
		get __petTypeList() {
			return Object.keys(self.petTypes).reduce((result, item) => {
				result.push({ label: item, value: item });
				return result;
			}, []);
		},
		__getPetsBy(query) {
			let ownerGender = null, type = null;
			if (typeof query !== 'undefined') {
				ownerGender = typeof query.ownerGender !== 'undefined' ? query.ownerGender : null;
				type = typeof query.type !== 'undefined' ? query.type : null;
			}

			let unsorted = self.owners.reduce((result, person) => {
				if ((ownerGender !== null && person.gender === ownerGender) || ownerGender === null) {
					let newResult = [];
					newResult = result.concat(person.__getPetsByType(type));
					return newResult;
				}
				return result;
			}, []);

			return unsorted.sort((a, b) => a.name > b.name);
		},
		__getOwnersBy(query) {
			if (typeof query === 'undefined' || typeof query.ownerGender === 'undefined') return self.owners;
			return self.owners.filter(person => person.gender === query.ownerGender);
		}

	}))
	.actions(self => ({
		...Actions,
		fetchOwners: flow(function* fetchOwners(params) {
			self.state = 'fetching';
			try {
				// const result = yield self.fetch({
				// 	url: AppConfig.REST_OWNERS,
				// 	cancelToken: params && typeof params.cancelToken !== 'undefined' ? params.cancelToken : null,
				// });
				const result = yield Promise.resolve(fakeData);
				// console.log( 'fetching', result );
				result.map(item => {
					const ownersInstance = OwnerModel.create(item);
					self.owners.push(ownersInstance);
					self.petTypes = ownersInstance.retrievePetTypeList(getSnapshot(self).petTypes);
					return null;
				});
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