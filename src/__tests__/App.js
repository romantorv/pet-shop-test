import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('Checking app render without error', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	// changing status from loading into ready after fetching
});

describe('Checking app render correct kind of content', () => {
	// show error if have service denial
	// show list of owner in alphabet order
	// show list of pets in alphatbet order
	// show pets in groups of gender
});
