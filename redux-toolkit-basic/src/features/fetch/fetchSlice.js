import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com"

export const fetchAsyncGet = createAsyncThunk("fetch/get", async () => {
    const res = await axios.get(`${apiUrl}/users`);
    return res.data;
})

const fetchSlice = createSlice({
    name: "fetch",
    initialState: {users: []},
    reducers: {},
    // createAsyncThunkを使った場合、後処理としてextraReducerを記載する
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
            return {
                ...state, users: action.payload
            }
        });
    }
});


export const selectUsers = (state) => state.fetch.users;
export default fetchSlice.reducer;