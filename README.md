# Pactera's Pet shop mock test

This is the app architecture that present the preparation when we start a project. This information will help all developers understand the overall concept and start building a highly scalable product.

## Index

1.	Document structure
2.	Naming convention for stores / models
3.	Debugger mode for all environments
4.	Built configuration for different environments
5.	Unit test and E2E test


## Document Structure

We start build the big application from small modules and smaller components, by designing as below structure, we can make it scalable, easily for parallelly development and testing:

### app.config
The app.config.js contains site settings/configuration, constant name at the app level

### App /index.js
The index.js acts like the entry point for the app or module, it’s useful when we want to integrate and use the module without further settings.

### .JS vs .JSX
We need to define the content type from its name:
- by using JS, this file contains the business logics and integration
- by using JSX, we have templating inside and the return is mostly a React Component type.

## Naming convention for stores / models
When working with stores and models, we should have a standard communication for properties, methods and computed attributes. Following the guideline will help we talk less for the usage / purpose.

### Model:
This is the lowest unit of a store, a good model design should not contain other model. A Model can have the many computed attributes and actions that related to itself. A model code is likely:

```javascript
import { types } from 'mobx-state-tree';

const PetModel = types
	.model('PetModel', {
		type: types.string,
		name: types.string,
	})
	.views( self => ({
		get __avatar(){
			...
		},
	}))
	.actions( self => ({
		afterCreate(){
			//converting pet type
			...
		}
	}));

export default PetModel;
```

### Store:
Contains many model and complex logic, this will perform all actions that designed for the components / module or root store

```javascript
import { types, flow, getSnapshot } from 'mobx-state-tree';

import * as AppConfig from 'app.config';

import Actions from './Actions';
import OwnerModel from './models/OwnerModel';

const Store = types
	.model('Store', {
		owners: types.array(OwnerModel, []),
		state: types.enumeration('States', ['initial', 'loading', 'completed', 'fetching', 'error']),
		stateTarget: '',
		stateMessage: '',
	})
	.views(self => ({
		get __ready() {
			return self.state !== 'initial' && self.state !== 'loading';
		},
		__getPetsBy(query) {
			...
		},
		...
	}))
	.actions(self => ({
		...Actions,
		fetchOwners: flow(function* fetchOwners(params) {
			...
		})
	}));

export default Store;
```

### Common Actions:
A collection of same configuration actions to use with the store. The actions are wrapped with the axios headers configuration, so that we don’t need to declare at each store

Can read the action here: ./stores/actions.js

### Naming convention:
Store attributes:
- state: having some basic states: ‘initial’, ‘loading’, ’completed’, ‘fetching’, ‘error’
- stateTarget: will content the target of state inside the store, mostly used for conditional render inside the template
Computed attributes:
- __ready: a signal to let template component knows that the state already completed the initial stage
- __<name of the objet>: return the object snapshot based on current store attributes, not have any input.

### Computed methods:
- __get<name of the object>: using to retrieve the desired content from the current snapshot, the logic inside this method will not change anything to the store attributes.
-- E.g: __getLabelById(id)

## Debugger mode for all environments

For enable the debug mode in all environment, we need to write this value inside the localStorage:
debug=pactera:*
Built configuration for different environments
- <root>/.env => for development environment
- STAGE or PRODUCTION environment required to set on the VM instance.

## Test-Driven Development

(on going)
