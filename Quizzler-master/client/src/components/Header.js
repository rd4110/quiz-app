import React from 'react';
import AuthButtons from './AuthButtons';
import { Navbar, NavbarBrand, Container } from 'reactstrap';

const Header = () => {
	return (
		<Navbar color='dark' dark expand='sm' id='header'>
			<Container>
				<NavbarBrand href='/'>Quizzler</NavbarBrand>
				<AuthButtons />
			</Container>
		</Navbar>
	);
};

export default Header;
