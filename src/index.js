/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'components/Helpers/GlobalStyle';
import { store, persistor } from './redux/store';
import 'modern-normalize';
import { Toaster } from 'react-hot-toast';
import { Auth0Provider } from '@auth0/auth0-react';

const theme = {
	spacing: x => `${x * 4}px`,
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter basename='/My-Phonebook-auth0'>
					<Auth0Provider
						domain='bishop.eu.auth0.com'
						clientId='hN3retPwq13N4Bqzwh2V75dQwHUTskYR'
						authorizationParams={{
							redirect_uri: `${window.location.origin}/My-Phonebook-auth0`,
						}}
						usePopup={true}
					>
						<ThemeProvider theme={theme}>
							<App />
							<Toaster
								position='top-right'
								reverseOrder={false}
								gutter={8}
								toastOptions={{
									duration: 5000,
									style: {
										background: '#fdfbea',
										color: '#000000',
									},
								}}
							/>
							<GlobalStyle />
						</ThemeProvider>
					</Auth0Provider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
