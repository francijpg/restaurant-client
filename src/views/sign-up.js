import { useEffect } from "react";
import Title from "../components/common/Title";
import SignUpForm from "../components/auth/molecules/SignUpForm";

const Login = () => {
  useEffect(() => {
    document.title = "Sign Up - RestaurantApp";
  }, []);

  return (
    <>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <Title align="center">create account</Title>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
