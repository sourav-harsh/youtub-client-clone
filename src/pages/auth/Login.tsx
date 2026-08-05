import React, { useContext } from "react";
import { UserContext } from "../../kernel/context/user.tsx";

export default function Login() {

  // @ts-ignore
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data) {
       localStorage.setItem("youtube-user:accessToken", data.data.accessToken);
       localStorage.setItem("youtube-user:user", JSON.stringify(data.data.user));
       setUser(data.data.user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

    return (
      <div className="flex justify-center min-h-[630px] bg-white dark:bg-gray-500">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/050/702/730/small/a-man-stands-near-the-smartphone-on-the-screen-login-page-user-profile-access-to-account-concept-png.png"  alt="login" />
        <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col mt-2">
            <label htmlFor="tel" className="hidden">
              User Name
            </label>
            <input
              type="username"
              name="username"
              id="username"
              placeholder="UserName"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="hidden">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
            id="submit-login-form"
          >
            Submit
          </button>
        </form>
      </div>
    );
}
