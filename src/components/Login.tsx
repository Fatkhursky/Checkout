import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const dataBase = [
    {
      user: 'user123',
      password: 'admin123',
    },
  ];
  function handleSubmit(e: any) {
    e.preventDefault();
    const isUser = dataBase.find((o) => o.user === user);
    const isPassword = dataBase.find((o) => o.password === password);
    if (isUser && isPassword) {
      localStorage.setItem('user', user);
      navigate('/dashboard');
    }
  }
  return (
    <div className="relative flex flex-col bg-red-100 justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <button
          className="bg-slate-500 px-3 text-white rounded-md active:relative active:top-1 shadow-[0_5px_#94a3b8] active:shadow-none"
          onClick={() => {
            setUser(dataBase[0].user);
            setPassword(dataBase[0].password);
          }}
        >
          Click me!
        </button>
        <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">
          Log in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              User
            </label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-800 focus:outline-none focus:bg-green-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Dont have an account?
          <p
            onClick={() => window.alert('Fitur belum ada')}
            className="font-medium text-green-600 hover:underline cursor-pointer"
          >
            Sign up
          </p>
        </p>
      </div>
    </div>
  );
};

export default Login;
