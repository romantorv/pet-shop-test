import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import PetListView from 'components/PetListView';

class Homepage extends React.Component {
	componentDidMount() {
		this.props.componentStore.fetchOwners();
	}

	render() {
		const { 
			state, 
			__genderList,
			__ready 
		} = this.props.componentStore;
		
		return <React.Fragment>
			{ (state === 'fetching' || state === 'loading') && 
			<div className="spinner-border text-secondary" role="status">
				<span className="sr-only">Loading...</span>
			</div>
			}
			{ __ready && state !== 'fetching' && __genderList.map( (item, index) => 
				<PetListView 
					key={index} 
					title={`Owner Gender: ${item.label}`} 
					data={ this.props.componentStore.__getPetsBy({
						ownerGender: item.value,
						type: 'Cat'
					})} 
				/>)
			}
			
		</React.Fragment>;
	}
}

Homepage.propTypes = {
	componentStore: PropTypes.object
}

export default observer(Homepage);