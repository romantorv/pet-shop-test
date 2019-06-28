import 'jest-extended';
import mockAxios from 'axios';
import Store from '../index';

import * as AppConfig from 'app.config';

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

describe('Checking root store', ()=>{
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
	describe('successfully creating store', () => {
		it('successfully create store without any params', () => {
			const store = Store.create({state: 'initial'});
			expect(store.toJSON()).toEqual({
				owners: [],
				state:'initial',
				stateTarget: '',
				stateMessage: '',
			});
			expect(store.__ready).toBe(false);
			expect(store.owners).toBeEmpty();
		});

		it('successfully create store with some params', async () => {
			mockAxios.request.mockImplementationOnce(() =>
				Promise.resolve({data})
			);
			const store = Store.create({state: 'initial'});
			await store.fetchOwners();

			expect(store.__ready).toBe(true);
			expect(mockAxios.request).toHaveBeenCalledTimes(1);
			expect(mockAxios.request).toHaveBeenCalledWith({
				'auth': null, 
				'cancelToken': null, 
				'method': 'GET', 
				'url': AppConfig.REST_OWNERS
			});
		})
	});
	describe('return correct data', () => {
		mockAxios.request.mockImplementationOnce(() =>
			Promise.resolve({data})
		);
		let store = null;
		beforeEach( async() => {
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
			expect(store.__getPetsBy().length ).toBe(3);
			expect(store.__getPetsBy()).toEqual(
				expect.arrayContaining(petData)
			);
		});

		it('successfully return list of "CATs"', () => {
			expect( store.__ready ).toBe(true);
			expect(store.__getPetsBy({type: 'Cat'}).length ).toBe(1);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.arrayContaining(petData[0])
			);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.not.arrayContaining(petData[1])
			);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.not.arrayContaining(petData[2])
			);
		});
		it('successfully return list of pet owner genders', () => {
			expect( store.__ready ).toBe(true);
			expect(store.__getPetsBy({type: 'Cat'}).length ).toBe(1);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.arrayContaining(petData[0])
			);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.not.arrayContaining(petData[1])
			);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.not.arrayContaining(petData[2])
			);
		});
		it('successfully return list of pets by owner genders', () => {
			expect( store.__ready ).toBe(true);
			expect(store.__getPetsBy({type: 'Cat'}).length ).toBe(1);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.arrayContaining(petData[0])
			);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.not.arrayContaining(petData[1])
			);
			expect(store.__getPetsBy({type: 'Cat'})).toEqual(
				expect.not.arrayContaining(petData[2])
			);
		});
	})

});

// describe('Checking root store actions & views', () => {
	// successfully fetching data into store, must return list and __ready true
	// fail fetching data because of service denial, must return empty list and __ready true and error message
	// successfully return list of pet owners
	// successfully return list of pets
	// successfully return list of pet owner genders
	// successfully return list of pets by owner genders
// });