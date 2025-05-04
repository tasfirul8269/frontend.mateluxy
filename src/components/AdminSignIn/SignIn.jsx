import React from 'react';
import Logo from './auth/Logo'; 
import SignInForm from './auth/SignInForm';
const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-start pt-[30px] p-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100
                      transform transition-all duration-500 hover:shadow-lg">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;