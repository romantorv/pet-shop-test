import React from 'react';
import PropTypes from 'prop-types';

import PetViewItem from './PetViewItem';

const PetListView = (props) => {
	const { data, title } = props;
	return <React.Fragment>
		<h3 className="text-muted group__label">{ title }</h3>
		{ data.length > 0 && 
		<ul className="box__list">
			{ data.map( (pet, index) => <li key={index}>
				<PetViewItem data={pet} ownerData={pet.__owner} />
			</li>)}
		</ul>
		}
		{ (data === null || data.length === 0) &&
		<div className="alert">There is no pet.</div>
		}
		
	</React.Fragment>
}

PetListView.propTypes = {
	ready: PropTypes.bool,
	title: PropTypes.string,
	data: PropTypes.array,
}

export default PetListView;