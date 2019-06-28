import React from 'react';

import * as AppConfig from 'app.config';

class Header extends React.PureComponent {
	render() {
		return (
		<nav className="navbar navbar-dark bg-dark">
			<h5 className="pt-2">
				<a 
					className="navbar-brand"
					href={AppConfig.ROUTE_HOMEPAGE}>Pet club</a>
			</h5>
		</nav>
		);
	}
}

export default Header;