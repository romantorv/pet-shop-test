import React from 'react';

class Footer extends React.PureComponent {
	render() {
		return (
		<footer className="footer__container container">
			<section className="pt-3 my-md-3 pt-md-3 border-top">
				<span className="h3" role="img" aria-label="Petclub icon">&#9971;</span> Pet Club &copy;2019
			</section>
		</footer>
		);
	}
}

export default Footer;