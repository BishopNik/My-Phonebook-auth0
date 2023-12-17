/** @format */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { encode } from 'base-64';

// axios.defaults.baseURL = 'https://nodejs-rest-api-8x2z.onrender.com/';
axios.defaults.baseURL = 'http://localhost:4000';

const { REACT_APP_SECRET_KEY } = process.env || 'default_secret_key';

// Utility to add JWT
const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = '';
};

// Функция для кодирования идентификатора пользователя
const encodeUserId = (userId, secretKey) => {
	try {
		const expiresIn = 12 * 60 * 60;
		const currentTime = Math.floor(Date.now() / 1000);
		const expirationTime = currentTime + expiresIn;
		const tokenData = {
			userId,
			exp: expirationTime,
		};
		const tokenPayload = encode(JSON.stringify(tokenData));

		// Подпишите токен с использованием секретного ключа
		const signature = encode(
			new TextEncoder().encode(tokenPayload + secretKey).toString('base64')
		);

		return `${tokenPayload}.${signature}`;
	} catch (error) {
		console.error('Ошибка кодирования токена:', error);
		return null;
	}
};

export const logIn = createAsyncThunk('auth/login', async ({ user }, thunkAPI) => {
	try {
		const token = encodeUserId(user.sub, REACT_APP_SECRET_KEY);
		setAuthHeader(token);
		return { user, token };
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		clearAuthHeader();
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const refreshUser = createAsyncThunk('auth/refresh', async ({ user }, thunkAPI) => {
	const token = encodeUserId(user.sub, REACT_APP_SECRET_KEY);
	setAuthHeader(token);
	return { user, token };
	// Reading the token from the state via getState()
	// const state = thunkAPI.getState();
	// const persistedToken = state.auth.token;
	// if (persistedToken === null) {
	// 	// If there is no token, exit without performing any request
	// 	return thunkAPI.rejectWithValue('Unable to fetch user');
	// }
	// try {
	// 	// If there is a token, add it to the HTTP header and perform the request
	// 	setAuthHeader(persistedToken);
	// 	const res = await axios.get('/api/auth/current');
	// 	return res.data;
	// } catch ({ response }) {
	// 	return thunkAPI.rejectWithValue(response?.data?.message);
	// }
});

export const changeAvatar = createAsyncThunk('auth/avatar', async (credentials, thunkAPI) => {
	try {
		const res = await axios.patch('/api/auth/avatar', credentials);
		return res.data;
	} catch ({ response }) {
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});

export const deleteUser = createAsyncThunk('auth/delete', async (credentials, thunkAPI) => {
	try {
		await axios.post('/api/auth/delete', credentials);
		// clearAuthHeader();
	} catch ({ response }) {
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});

export const changeName = createAsyncThunk('auth/name', async (credentials, thunkAPI) => {
	try {
		const res = await axios.patch('/api/auth/name', credentials);
		return res.data;
	} catch ({ response }) {
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});

export const changePassword = createAsyncThunk('auth/pass', async (credentials, thunkAPI) => {
	try {
		const res = await axios.patch('/api/auth/pass', credentials);
		// setAuthHeader(res.data.token);
		return res.data;
	} catch ({ response }) {
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});
