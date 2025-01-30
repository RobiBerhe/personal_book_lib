import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  User,
} from "./authSlice";

const API_BASE_URL = "http://localhost:8081/api/users";


// interface User {
//     username: string;
//     password: string;
//     email: string;
//     fullName: string;
//     id:string;
//     token:string;
// }


function* handleSignIn(action: ReturnType<typeof signInRequest>) {
  try {
    // const data:{data:{user:{email:string,username:string,fullName:string,id:string,token:string}}} = yield call(axios.post, `${API_BASE_URL}/login`, action.payload);
    const data:{data:{user:User}} = yield call(axios.post, `${API_BASE_URL}/login`, action.payload);

    console.log("Data :> ",data.data);
    
    yield put(signInSuccess(data.data));
  } catch (error: any) {
    yield put(signInFailure(error.response?.data?.message || "Sign in failed"));
  }
}

function* handleSignUp(action: ReturnType<typeof signUpRequest>) {
  try {
    // const { data } = yield call(axios.post, `${API_BASE_URL}/signup`, action.payload);
    const data:{data:{user:User}}  = yield call(axios.post, `${API_BASE_URL}/signup`, action.payload);
    yield put(signUpSuccess(data.data));
  } catch (error: any) {
    yield put(signUpFailure(error.response?.data?.message || "Sign up failed"));
  }
}

export default function* authSaga() {
  yield takeLatest(signInRequest.type, handleSignIn);
  yield takeLatest(signUpRequest.type, handleSignUp);
}
