import { useEffect } from "react";
import Title from "../components/common/Title";
import SignUpForm from "../components/auth/molecules/SignUpForm";

const Login = () => {
  useEffect(() => {
    document.title = "Sign Up - RestaurantApp";
  }, []);

  return (
    <>
      <div className="bg-gray-800 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-300 max-w-md w-full space-y-8 p-8 rounded shadow-lg">
          <Title align="center">create account</Title>
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default Login;
