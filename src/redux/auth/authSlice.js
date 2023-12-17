/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, changeAvatar, changeName, changePassword, deleteUser } from './operations';

const initialState = {
	user: null,
	token: null,
	isLoggedIn: false,
	isLogging: false,
	isRefreshing: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetError: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(logIn.pending, state => {
				state.error = null;
				state.isLogging = true;
			})
			.addCase(logIn.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.token = payload.token;
				state.isLoggedIn = true;
				state.isLogging = false;
			})
			.addCase(logIn.rejected, (state, { payload }) => {
				if (payload) state.error = 'Login error, please repeat.';
				state.isLogging = false;
			})
			.addCase(logOut.pending, state => {
				state.error = null;
			})
			.addCase(logOut.fulfilled, state => {
				state.user = null;
				state.token = null;
				state.isLoggedIn = false;
			})
			.addCase(logOut.rejected, state => {
				state.error = 'Logout error...';
			})
			.addCase(changeAvatar.pending, state => {
				state.statusResend = true;
			})
			.addCase(changeAvatar.fulfilled, (state, { payload }) => {
				state.isResend = true;
				state.statusResend = false;
				state.user.avatarURL = payload.avatarURL;
			})
			.addCase(changeAvatar.rejected, (state, { payload }) => {
				state.statusResend = false;
				state.error = payload;
			})
			.addCase(changeName.pending, state => {
				state.error = null;
				state.isLogging = true;
			})
			.addCase(changeName.fulfilled, (state, { payload }) => {
				state.isLoggedIn = true;
				state.isLogging = false;
				state.user.name = payload.user.name;
			})
			.addCase(changeName.rejected, (state, { payload }) => {
				state.isLogging = false;
				state.error = payload;
			})
			.addCase(changePassword.pending, state => {
				state.error = null;
				state.isLogging = true;
			})
			.addCase(changePassword.fulfilled, (state, { payload }) => {
				state.isLoggedIn = true;
				state.isLogging = false;
				state.user = payload.user;
				state.token = payload.token;
			})
			.addCase(changePassword.rejected, (state, { payload }) => {
				state.isLogging = false;
				state.error = payload;
			})
			.addCase(deleteUser.pending, state => {
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state, { payload }) => {
				state.user = { name: null, email: null };
				state.token = null;
			})
			.addCase(deleteUser.rejected, (state, { payload }) => {
				state.error = 'Delete user error...';
			});
	},
});

export const authReducer = authSlice.reducer;

export const { resetError } = authSlice.actions;
