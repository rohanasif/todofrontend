import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setUser, signOut } from "../slice/authSlice";
import { useGetCurrentUserQuery } from "../slice/apiSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const { data: user, error } = useGetCurrentUserQuery();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
    if (error) {
      console.log(error);
    }
  }, [dispatch, user, error]);

  const handleSignOut = () => {
    dispatch(signOut());
    Cookies.remove("token");
    navigate("/signin");
  };

  return (
    <nav className="flex flex-col items-center w-full mt-4">
      <h1 className="text-4xl font-bold">TODOS APP</h1>
      <ul className="flex w-full items-center justify-around">
        <li className="text-xl font-semibold text-slate-700">
          {currentUser && `Hi, ${currentUser.name.split(" ")[0]}!`}
        </li>
        {token && (
          <li className="flex justify-center items-center">
            <button
              className="bg-red-700 py-2 px-4 text-white rounded-xl"
              onClick={handleSignOut}
            >
              Signout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
