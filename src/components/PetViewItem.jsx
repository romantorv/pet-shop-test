import React from 'react';
import PropTypes from 'prop-types';

class PetViewItem extends React.PureComponent {
	render() {
		const {
			__avatar,
			name,
		} = this.props.data;
		const {
			__avatar: ownerAvatar,
			name: ownerName,
			age,
		} = this.props.ownerData;
		return (
			<div className="box__item">
				<div className="box__body">
					<div className="box__avatar">
						<span 
							role="img" 
							className="pets__avatar" 
							aria-label={`${name}`}>{__avatar}</span>
					</div>
					<div className="box__information">
						<h5 className="mb-0">{name}</h5>
					</div>
				</div>
				<div className="box__footer bg-light">
					<div className="person__profile-mini">
						<div className="person__avatar-mini">
							<img 
								alt={`${ownerName} - ${age}`}
								src={ownerAvatar} />
						</div>
						<div className="person__info-mini">
							<h6 className="mb-0">{ownerName} - Age: {age}</h6>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

PetViewItem.propTypes = {
	ready: PropTypes.bool,
	data: PropTypes.shape({
		__avatar: PropTypes.string,
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	ownerData: PropTypes.shape({
		__avatar: PropTypes.string,
		name: PropTypes.string.isRequired,
		age: PropTypes.number,
		gender: PropTypes.string,		
	}).isRequired,
}

export default PetViewItem;
