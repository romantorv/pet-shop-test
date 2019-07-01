import { types } from 'mobx-state-tree';

const PetModel = types
	.model('PetModel', {
		type: types.string,
		name: types.string,
		ownerGender: types.enumeration('Gender', ['Male', 'Female']),
	})
	.views( self => ({
		get __avatar(){
			switch (self.type.toLowerCase()) {
				case 'cat':
					return '🐱';
				case 'dog':
					return '🐶';
				case 'fish':
					return '🐳';
				default:
					return '🦖Hmm...';
			}
		}
	}));

export default PetModel;