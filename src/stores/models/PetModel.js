import { types, getParent } from 'mobx-state-tree';

const PetModel = types
	.model('PetModel', {
		type: types.string,
		name: types.string,
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
		},
		get __owner(){
			const {
				__avatar,
				name,
				age,
				gender
			} = getParent(self, 2);
			return {
				__avatar,
				name,
				age,
				gender
			};
		}
	}))
	.actions( self => ({
		afterCreate(){
			//converting pet type
			let lowercasename = self.type.toLowerCase();
			self.type = lowercasename.charAt(0).toUpperCase() + lowercasename.slice(1);
		}
	}));

export default PetModel;