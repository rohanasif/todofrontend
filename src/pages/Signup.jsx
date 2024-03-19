import { useState, useEffect } from "react";
import { useSignUpMutation } from "../slice/apiSlice";
import { signUp } from "../slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [signup, signupResponse] = useSignUpMutation();
  const { isLoading, isSuccess, isError, error, data } = signupResponse;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    signup(user);
    dispatch(signUp(user));
  };

  useEffect(() => {
    if (isSuccess) {
      const token = data?.token;
      Cookies.set("token", token, { expires: 1, secure: true });
      navigate("/");
    }
  }, [data?.token, navigate, isSuccess]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-slate-400 rounded-2xl p-4"
    >
      <div className="flex flex-col">
        <label>Name</label>
        <input
          type="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </div>
      {isError && <p className="text-red-700">{error?.data?.message}</p>}
      <p>
        Already have an account?{" "}
        <Link
          className="bg-slate-700 py-1 px-2 text-white rounded-xl"
          to="/signin"
        >
          Sign In!
        </Link>
      </p>
    </form>
  );
};
export default Signup;
