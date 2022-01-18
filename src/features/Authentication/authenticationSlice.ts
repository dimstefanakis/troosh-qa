import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { PostLogin, PostRegister } from "./interface";
import { AxiosResponse } from "axios";
import axios from "axios";

async function getTokens(data: PostLogin) {
  let response: AxiosResponse;
  const { email, password } = data;
  try {
    let formdata = new FormData();
    formdata.append("username", email);
    formdata.append("password", password);
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/token/`,
      formdata
    );
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        if (config.headers && response.data.access) {
          config.headers.authorization = `Bearer ${response.data.access}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  } catch (e) {
    console.error(e);
    return null;
  }

  if (response.data.access) {
    localStorage.setItem("token", response.data.access);
  }
  return response.data.access;
}

export const login = createAsyncThunk(
  "authentication/login",
  async (data: PostLogin, thunkApi) => {
    let tokens = await getTokens(data);
    return tokens;
  }
);

export const register = createAsyncThunk(
  "authentication/register",
  async (data: PostRegister, thunkApi) => {
    let response: AxiosResponse;
    const { email, password1, password2 } = data;
    try {
      let formdata = new FormData();
      formdata.append("username", email);
      formdata.append("email", email);
      formdata.append("password1", password1);
      formdata.append("password2", password2);
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/rest-auth/registration/`,
        formdata
      );

      let token = null;
      if (response.status == 200 || response.status == 201) {
        token = await getTokens({
          email: data.email,
          password: data.password1,
        });
      }
      return token;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    token: null,
    loading: false,
  },
  reducers: {
    setupTokenInterceptor() {
      const token = localStorage.getItem("token");
      axios.interceptors.request.use(
        function (config) {
          // Do something before request is sent
          if (config.headers && token) {
            config.headers.authorization = `Bearer ${token}`;
          }
          return config;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload;
      state.loading = false;
    });
    builder.addCase(login.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.token = payload;
      state.loading = false;
    });
    builder.addCase(register.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export const { setupTokenInterceptor } = authenticationSlice.actions;
