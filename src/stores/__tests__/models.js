import 'jest-extended';
import PetModel from '../models/PetModel';
import OwnerModel from '../models/OwnerModel';

const petDataBefore = [{
	type: 'Cat',
	name: 'Garfield'
},{
	type: 'fIsh',
	name: 'Ariel'
},{
	type: 'horse',
	name: 'Black & White'
}];

const petDataAfterCreate = [{
	type: 'Cat',
	name: 'Garfield'
},{
	type: 'Fish',
	name: 'Ariel'
},{
	type: 'Horse',
	name: 'Black & White'
}];

describe('Checking PetModel:', () => {
	it('successfully create an instance of model', () => {
		const model = PetModel.create(petDataBefore[0]);
		expect( model.toJSON() ).toEqual( petDataBefore[0] );
	});
	it('return the proper avatar for cat type', () => {
		const model = PetModel.create(petDataBefore[0]);
		expect( model.__avatar ).toBe('🐱');
	});
	it('return the proper avatar for any type in lowercase or uppercase', () => {
		const model = PetModel.create(petDataBefore[1]);
		expect( model.__avatar ).toBe('🐳');
	})
	it('return the proper avatar for unknow type', () => {
		const model = PetModel.create(petDataBefore[2]);
		expect( model.__avatar ).toBe('🦖Hmm...');
	})
});

describe('Checking OwnerModel:', () => {
	const ownerData = {
		name: 'Mark',
		age: 11,
		gender: 'Male',
		pets: petDataBefore
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
		expect( createdModel.__getPetsByType('cat') ).toEqual( [petDataAfterCreate[0]] );
		expect( createdModel.__getPetsByType('cat') ).toEqual(
			expect.not.arrayContaining( [petDataAfterCreate[1]] )
		);
		expect( createdModel.__getPetsByType('cat') ).toEqual(
			expect.not.arrayContaining( [petDataAfterCreate[2]] )
		);
	});
	it('return no pets with wrong type', () => {
		expect( createdModel.__getPetsByType('Dino') ).toBeEmpty();
	});
	it('return all pets if have no reference or null', () => {
		expect( createdModel.__getPetsByType() ).toEqual( petDataAfterCreate );
		expect( createdModel.__getPetsByType(null) ).toEqual( petDataAfterCreate );
	});
})
