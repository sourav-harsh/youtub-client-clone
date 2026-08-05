import { useContext } from "react";
import { UserContext } from "../../kernel/context/user.tsx";
import {useNavigate} from "react-router-dom";

export default function DashboardPage() {
  // @ts-ignore
  const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

  const logout = () => {
    const accessToken = localStorage.getItem("youtube-user:accessToken");
    if (!accessToken) return;
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Connection":"keep-alive"
      },
    })
      .then(() => {
        localStorage.removeItem("youtube-user:user");
        localStorage.removeItem("youtube-user:accessToken");
        setUser(null);
        navigate("/login", { replace: true });
        // window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="flex justify-center space-x-5 items-center py-54 dark:bg-black dark:text-white">
      <div>
        <img src={user.avatar} className="w-80 h-80 rounded-2xl" alt="avatar" />
      </div>
      <div className="text-2xl font-bold">
        <h1>Name: {user.fullName}</h1>
        <p>Email: {user.email}</p>
        <p>UserName: {user.username}</p>
        <button
          className="mt-2 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          onClick={logout}>Logout
        </button>
      </div>
    </div>
  );
};
