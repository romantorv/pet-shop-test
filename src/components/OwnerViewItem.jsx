import React from 'react';
import PropTypes from 'prop-types';

class OwnerViewItem extends React.PureComponent {
	render() {
		const {
			__avatar,
			name,
			age,
			gender,
			pets,
		} = this.props.data;

		return (
			<div className="box__item">
				<div className="box__body">
					<div className="box__avatar">
						<img 
							src={__avatar}
							alt={`${name} - ${gender}`} />
					</div>
					<div className="box__information">
						<h5 className="mb-0">{name}</h5>
						<p className="text-muted mb-0">{age}</p>
					</div>
				</div>
				<div className="box__footer">
					{ pets && pets.length > 0 && 
					<ul className="pets__list-mini">
						{ pets.map( pet => 
							<li className="pets__item-mini">
								<span 
									role="img" 
									className="pets__avatar-mini" 
									aria-label={`${pet.name} - ${pet.type}`}>{pet.__avatar}</span>
								<strong>{pet.name}</strong>
							</li>)
						}
					</ul>
					}
				</div>
			</div>
		)
	}
}

OwnerViewItem.propTypes = {
	ready: PropTypes.bool,
	data: PropTypes.objectOf({
		__avatar: PropTypes.string,
		name: PropTypes.string.isRequired,
		gender: PropTypes.string.isRequired,
		age: PropTypes.number,
		pets: PropTypes.object
	}).isRequired,
}

export default OwnerViewItem;
