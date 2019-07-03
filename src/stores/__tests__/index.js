import 'jest-extended';
import mockAxios from 'axios';
import Store from '../index';

import 'debug';

import * as AppConfig from 'app.config';

const petData = [{
	type: 'Cat',
	name: 'Garfield'
},{
	type: 'Fish',
	name: 'Ariel'
},{
	type: 'Horse',
	name: 'Black & White'
}];

const data = [
	{
		name: 'Mark',
		age: 11,
		gender: 'Male',
		pets: null,
	},
	{
		name: 'Rina',
		age: 33,
		gender: 'Female',
		pets: petData
	}
]

describe('Checking root store: successfully creating store', () => {
	it('successfully create store without any params', () => {
		const store = Store.create({state: 'initial'});
		expect(store.toJSON()).toEqual({
			owners: [],
			petTypes: {},
			state:'initial',
			stateTarget: '',
			stateMessage: '',
		});
		expect(store.__ready).toBe(false);
		expect(store.__genderList).toEqual([
			{ label: 'Male', value: 'Male' },
			{ label: 'Female', value:'Female' }
		]);
		expect(store.__petTypeList).toBeEmpty();
		expect(store.owners).toBeEmpty();
	});

	it('successfully create store with some params', async () => {
		mockAxios.request.mockImplementationOnce(() =>
			Promise.resolve({data})
		);
		const store = Store.create({state: 'initial'});
		await store.fetchOwners();

		expect(store.__ready).toBe(true);
		expect(store.__petTypeList).toEqual(
			expect.arrayContaining([
				{"label": "Cat", "value": "Cat"},
				{"label": "Fish", "value": "Fish"},
				{"label": "Horse", "value": "Horse"}
			])
		);
		expect(mockAxios.request).toHaveBeenCalledTimes(1);
		expect(mockAxios.request).toHaveBeenCalledWith({
			'auth': null, 
			'cancelToken': null, 
			'method': 'GET', 
			'url': AppConfig.REST_OWNERS
		});
	})
});

describe('Checking root store: returning correct data', () => {
	mockAxios.request.mockImplementationOnce(() =>
		Promise.resolve({data})
	);
	let store;
	beforeAll( async() => {
		store = Store.create({state: 'initial'});
		await store.fetchOwners();
	});

	it('successfully return list of pet owners', () => {
		expect( store.__ready ).toBe(true);
		expect(store.owners.length).toBe(2);
		expect(store.owners).toEqual(
			expect.arrayContaining(data)
		);
	});

	it('successfully return list of pets (no option)', () => {
		expect( store.__ready ).toBe(true);
		expect( store.__getPetsBy().length ).toBe( petData.length );
		expect( store.__getPetsBy() ).toEqual(
			expect.arrayContaining(petData)
		);
		expect( store.__getPetsBy()[0] ).toEqual(petData[1]);
		expect( store.__getPetsBy()[1] ).toEqual(petData[2]);
		expect( store.__getPetsBy()[2] ).toEqual(petData[0]);

	});

	it('successfully return list of "CATs"', () => {
		expect( store.__ready ).toBe(true);
		expect( store.__getPetsBy({type: 'Cat'}) ).toEqual(
			expect.arrayContaining([petData[0]])
		);
		expect( store.__getPetsBy({type: 'Cat'}) ).toEqual(
			expect.not.arrayContaining([petData[1]])
		);
		expect( store.__getPetsBy({type: 'Cat'}) ).toEqual(
			expect.not.arrayContaining([petData[2]])
		);
	});
	it('successfully return list of owner by genders', () => {
		expect( store.__ready ).toBe(true);
		expect(store.__getOwnersBy({ownerGender: 'Female'})).toEqual(
			expect.arrayContaining([data[1]])
		);
		expect( store.__getPetsBy({ownerGender: 'Female'}) ).toEqual(
			expect.not.arrayContaining([data[0]])
		);
		expect(store.__getOwnersBy({ownerGender: 'Male'})).toEqual(
			expect.arrayContaining([data[0]])
		);
		expect( store.__getPetsBy({ownerGender: 'Male'}) ).toEqual(
			expect.not.arrayContaining([data[1]])
		);
	});
	it('successfully return list of pets by owner genders', () => {
		expect( store.__ready ).toBe(true);
		expect( store.__getPetsBy({type: 'Cat', ownerGender: 'Male'}) ).toBeEmpty();
		expect( store.__getPetsBy({type: 'Cat', ownerGender: 'Female'}) ).toEqual(
			expect.arrayContaining([petData[0]])
		);
		expect( store.__getPetsBy({type: 'Cat', ownerGender: 'Female'}) ).toEqual(
			expect.not.arrayContaining([petData[1]])
		);
		expect( store.__getPetsBy({type: 'Cat', ownerGender: 'Female'}) ).toEqual(
			expect.not.arrayContaining([petData[2]])
		);
		expect( store.__getPetsBy({type: 'Fish', ownerGender: 'Female'}) ).toEqual(
			expect.arrayContaining([petData[1]])
		);
		expect( store.__getPetsBy({type: 'Fish', ownerGender: 'Female'}) ).toEqual(
			expect.not.arrayContaining([petData[0]])
		);
		expect( store.__getPetsBy({type: 'Fish', ownerGender: 'Female'}) ).toEqual(
			expect.not.arrayContaining([petData[2]])
		);
		expect( store.__getPetsBy({type: 'Dog', ownerGender: 'Female'}) ).toBeEmpty();
	});
});