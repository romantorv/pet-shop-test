import React from 'react';

import Header from './Header';
import Footer from './Footer';

function withLayout(Component){
	const comp = class WithLayout extends React.Component{
		render(){
			return <React.Fragment>
				<Header />
				<Component {...this.props } />
				<Footer />
			</React.Fragment>;
		}
	}
	return comp;
}

export default withLayout;