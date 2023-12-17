/** @format */

import React, { useEffect, useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { logIn, logOut } from 'redux/auth/operations';
import {
	Collapse,
	Container,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';

export const AppBar = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const { user, isAuthenticated, loginWithRedirect, logout, auth0Context } = useAuth0();

	const toggle = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (user) {
			const { client_id } = auth0Context?.config;
			user.clientId = client_id;
			dispatch(logIn({ user }));
		}
	}, [auth0Context.config, dispatch, user]);

	const logoutWithRedirect = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
		logOutHandel();
	};

	const logOutHandel = () => {
		try {
			dispatch(logOut());
		} catch (error) {
			console.error('Error fetching access token:', error);
		}
	};

	return (
		<header>
			<Navbar color='light' light expand='md' container={false}>
				<Container>
					<NavbarBrand className='logo' />
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className='mr-auto' navbar>
							<NavItem>
								<NavLink
									tag={RouterNavLink}
									to='/phonebook'
									className='router-link-exact-active'
									style={{ fontSize: '22px', fontWeight: '700' }}
								>
									Phonebook
								</NavLink>
							</NavItem>
						</Nav>
						<Nav className='d-none d-md-block' navbar>
							{!isAuthenticated && (
								<NavItem>
									<Button
										id='qsLoginBtn'
										color='primary'
										className='btn-margin'
										style={{ fontSize: '22px' }}
										onClick={() => loginWithRedirect()}
									>
										Log in
									</Button>
								</NavItem>
							)}
							{isAuthenticated && (
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret id='profileDropDown'>
										<img
											src={user.picture}
											alt='Profile'
											className='nav-user-profile rounded-circle'
											width='60'
										/>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem style={{ fontSize: '16px' }} header>
											{user.name}
										</DropdownItem>
										<DropdownItem
											tag={RouterNavLink}
											to='/settings'
											className='dropdown-profile'
											style={{ fontSize: '18px' }}
										>
											<FontAwesomeIcon icon={faUser} className='mr-3' />{' '}
											Profile
										</DropdownItem>
										<DropdownItem
											id='qsLogoutBtn'
											style={{ fontSize: '18px' }}
											onClick={() => logoutWithRedirect()}
										>
											<FontAwesomeIcon icon={faPowerOff} className='mr-3' />
											Log out
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							)}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</header>
	);
};
