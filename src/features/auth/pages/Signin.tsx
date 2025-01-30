import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { signInRequest } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required(),
});

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const { loading, error } = useSelector((state: RootState) => state.auth);
  const { loading, error,token } = useSelector((state: RootState) => state.auth);


  useEffect(()=>{
    if (token) {
      navigate("/");  // Redirect after successful login
    }
  },[token])

  const onSubmit = (data: any) => {
    dispatch(signInRequest(data));
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg space-y-4">
    //   <input {...register("username")} placeholder="Username" className="border p-2 w-full rounded" />
    //   <p className="text-red-500">{errors.username?.message}</p>

    //   <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full rounded" />
    //   <p className="text-red-500">{errors.password?.message}</p>

    //   {error && <p className="text-red-500">{error}</p>}
    //   <button type="submit" className="bg-green-500 text-white p-2 w-full rounded" disabled={loading}>
    //     {loading ? "Signing In..." : "Sign In"}
    //   </button>
    // </form>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
      
      <div>
        <label htmlFor="username" className="block text-gray-700 font-medium">username</label>
        <input
          id="username"
          type="text"
          placeholder="Your username"
          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("username", { required: "username is required" })}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
       {/* Error State */}
       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
      {/* <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Sign In
      </button> */}
        <button
        type="submit"
        className={`w-full py-3 ${loading ? "bg-gray-400" : "bg-blue-600"} text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
      
      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
      </p>
    </form>
  );
};

export default SignIn;
