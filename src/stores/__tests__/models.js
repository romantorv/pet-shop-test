import 'jest-extended';
import PetModel from '../models/PetModel';
import OwnerModel from '../models/OwnerModel';

const petData = [{
	type: 'Cat',
	name: 'Garfield'
},{
	type: 'fIsh',
	name: 'Ariel'
},{
	type: 'horse',
	name: 'Black & White'
}];

describe('Checking PetModel:', () => {
	it('successfully create an instance of model', () => {
		const model = PetModel.create(petData[0]);
		expect( model.toJSON() ).toEqual( petData[0] );
	});
	it('return the proper avatar for cat type', () => {
		const model = PetModel.create(petData[0]);
		expect( model.__avatar ).toBe('🐱');
	});
	it('return the proper avatar for any type in lowercase or uppercase', () => {
		const model = PetModel.create(petData[1]);
		expect( model.__avatar ).toBe('🐳');
	})
	it('return the proper avatar for unknow type', () => {
		const model = PetModel.create(petData[2]);
		expect( model.__avatar ).toBe('🦖Hmm...');
	})
});

describe('Checking OwnerModel:', () => {
	const ownerData = {
		name: 'Mark',
		age: 11,
		gender: 'Male',
		pets: petData
	};

	let createdModel = {};
	beforeEach( () => {
		createdModel = OwnerModel.create(ownerData);
	});

	it('successfully create an instance of model', () => {
		expect( createdModel.toJSON() ).toEqual( ownerData );
	});
	it('return the right avatar for owner', () => {
		expect( createdModel.__avatar ).toMatch(/icon_avatar_boy.svg/);
	});
	it('return the cats only', () => {
		expect( createdModel.__getPetsByType('cat') ).toEqual( [petData[0]] );
		expect( createdModel.__getPetsByType('cat') ).toEqual(
			expect.not.arrayContaining( [petData[1]] )
		);
		expect( createdModel.__getPetsByType('cat') ).toEqual(
			expect.not.arrayContaining( [petData[2]] )
		);
	});
	it('return no pets with wrong type', () => {
		expect( createdModel.__getPetsByType('Dino') ).toBeEmpty();
	});
	it('return all pets if have no reference or null', () => {
		expect( createdModel.__getPetsByType() ).toEqual( petData );
		expect( createdModel.__getPetsByType(null) ).toEqual( petData );
	});
})
