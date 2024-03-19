import { useState, useEffect } from "react";
import { useSignInMutation } from "../slice/apiSlice";
import { signIn } from "../slice/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [signin, signinResponse] = useSignInMutation();
  const { isLoading, isSuccess, isError, error, data } = signinResponse;

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      const token = data?.token;
      Cookies.set("token", token, { expires: 1, secure: true });
      dispatch(signIn({ name: data?.name, email, password }));
      navigate("/");
    }
  }, [data?.name, dispatch, email, data?.token, isSuccess, navigate, password]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-slate-400 rounded-2xl p-4"
    >
      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button className="py-2 px-4 text-white rounded-md bg-green-700">
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </div>
      {isError && <p className="text-red-700">{error?.data?.message}</p>}
      <p>
        Don&apos;t have an account?{" "}
        <Link
          className="bg-slate-700 py-1 px-2 text-white rounded-xl"
          to="/signup"
        >
          Sign Up!
        </Link>
      </p>
    </form>
  );
};
export default Signin;
