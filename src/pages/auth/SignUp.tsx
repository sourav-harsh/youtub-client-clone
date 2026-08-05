import {useNavigate} from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                // alert("User Registered Successfully");
                navigate("/login",{replace:true});
                // window.location.href = "/login";
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

    return (
        <div className="flex justify-center items-center min-h-[630px] bg-white dark:bg-gray-500">
          <img src="https://img.freepik.com/premium-vector/sign-up-concept-illustration_114360-7965.jpg?semt=ais_hybrid&w=740&q=80" className="w-96 h-96 rounded-2xl"  alt="login" />
          <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
              <div className="flex flex-col mt-2">
                  <label htmlFor="fullName" className="hidden">
                      Full Name
                  </label>
                  <input
                      type="fullname"
                      name="fullName"
                      id="fullname"
                      placeholder="FullName"
                      className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                  />
              </div>
              <div className="flex flex-col mt-2">
                  <label htmlFor="username" className="hidden">
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
                  <label htmlFor="avatar" className="hidden">
                      Avatar
                  </label>
                  <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      placeholder="Avatar"
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
                  <label htmlFor="password" className="hidden">
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
