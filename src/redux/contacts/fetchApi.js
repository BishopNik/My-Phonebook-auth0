/** @format */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllContacts = createAsyncThunk('tasks/fetchAll', async (_, thunkAPI) => {
	try {
		const response = await axios.get(`/api/v2/contacts`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const fetchPostContact = createAsyncThunk('tasks/fetchPost', async (data, thunkAPI) => {
	try {
		const response = await axios.post('/api/v2/contacts', data);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const fetchPutContact = createAsyncThunk('tasks/fetchPut', async ({ contact }, thunkAPI) => {
	const { _id, name, gender, email, phone } = contact;
	try {
		const response = await axios.put(`/api/v2/contacts/${_id}`, {
			contact: { name, gender, email, phone },
		});
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const fetchDelContact = createAsyncThunk('tasks/fetchDel', async ({ id }, thunkAPI) => {
	try {
		const response = await axios.delete(`/api/v2/contacts/${id}`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});
