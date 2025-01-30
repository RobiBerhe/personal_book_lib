import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { signUpRequest } from "../authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  fullName: yup.string().matches(/^[A-Za-z]+ [A-Za-z]+$/,"has to be a full name").required("Full name is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required(),
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error,token } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: any) => {
    dispatch(signUpRequest(data));
  };


    useEffect(()=>{
      if (token) {
        navigate("/");  // Redirect after successful login
      }
    },[token])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg space-y-4">
        <input {...register("fullName")} placeholder="Full name" className="border p-2 w-full rounded" />
        <p className="text-red-500">{errors.fullName?.message}</p>
        <input {...register("email")} placeholder="Email" className="border p-2 w-full rounded" />
        <p className="text-red-500">{errors.email?.message}</p>
      <input {...register("username")} placeholder="Username" className="border p-2 w-full rounded" />
      <p className="text-red-500">{errors.username?.message}</p>

      <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full rounded" />
      <p className="text-red-500">{errors.password?.message}</p>

      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;
