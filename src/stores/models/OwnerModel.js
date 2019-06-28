import { types } from 'mobx-state-tree';

import * as AppConfig from 'app.config';

import PetModel from './PetModel';

const OwnerModel = types
	.model('OwnerModel', {
		name: types.string,
		gender: types.enumeration('Gender', ['Male', 'Female']),
		age: types.number,
		pets: types.maybeNull( types.array( PetModel, []) ),
	})
	.views( self => ({
		get __avatar(){
			let avatar = '';
			switch (true) {
				case self.age <= 12 && self.gender === 'Male':
					avatar = 'icon_avatar_boy.svg';
					break;
				case self.age <= 12 && self.gender === 'Female':
					avatar = 'icon_avatar_girl.svg';
					break;
				case self.age > 12 && self.age <= 40 && self.gender === 'Male':
					avatar = 'icon_avatar_man.svg';
					break;
				case self.age > 12 && self.age <= 40 && self.gender === 'Female':
					avatar = 'icon_avatar_women.svg';
					break;
				case self.age > 40 && self.gender === 'Male':
					avatar = 'icon_avatar_king.svg';
					break;
				case self.age > 40 && self.gender === 'Female':
					avatar = 'icon_avatar_queen.svg';
					break;
				default:
					avatar = 'icon_avatar_anonymous.svg';
					break;
			};
			return `${AppConfig.MEDIA_BASE}/${avatar}`;
		},
		__getPetsByType(type){
			if ( self.pets === null || self.pets.length === 0 ) return [];
			if ( type === undefined || type === null ) return self.pets;
			return self.pets.filter( pet => pet.type.toLowerCase() === type.toLowerCase() );
		}
	}));

export default OwnerModel;