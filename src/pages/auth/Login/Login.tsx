import Particle from "../../../components/particle/Particle";
import { Formik, Form, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import { userLogin, userOauthLogin } from "../../../redux/actions/userActions";
import IUserInformation from "../../../interfaces/IUserInformation";
import { TypeDispatch } from "../../../redux/store/store";
import BasicFormikInput from "../../../components/input/BasicFormikInput";
import { GoogleLogin } from "@react-oauth/google";
import * as Yup from "yup";

import Logo from "../../../components/Logo/Logo";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setError } from "../../../redux/reducers/userSlice";

function Login() {
  const { error, loading, user } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (error && error === 401) {
      toast.error("Invalid username or password!", { position: "top-center" });
    } else if (error && error >= 400 && error < 500) {
      toast.error("Invalid request!");
    } else if (error && error >= 500) {
      toast.error("Something went wrong..! Please try again after some time..");
    } else if (error) {
      toast.error(error);
    }
    dispatch(setError(null));
  }, [error, user]);
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });
  function handleLoginSubmit(
    userCredentials: IUserInformation,
    { resetForm }: FormikHelpers<IUserInformation>
  ) {
    dispatch(userLogin(userCredentials));
    resetForm();
  }
  const dispatch: TypeDispatch = useDispatch();
  return (
    <>
      <div className="h-[98.9vh] overflow-hidden">
        <Particle />
        <Link
          to={"/"}
          className="w-full relative flex my-2 mb-2  justify-center"
        >
          <Logo className="md:w-[13%] w-[50%]" />
        </Link>
        <div className="flex h-full  md:px-24 lg:justify-start justify-center gap-32">
          <div className="backdrop-blur-sm md:ms-20 bg-opacity-15 bg-blue-gray-800 mb-[20vh] rounded-xl py-16 lg:w-[40%] w-[90%]">
            <div className="flex flex-col justify-center">
              <div className="lg:ps-20 mb-12 ">
                <h2 className="text-white font-bold md:text-4xl text-3xl text-center lg:text-left">
                  Sign in
                </h2>
              </div>
              <div className="flex flex-col justify-center h-full md:mt-10">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleLoginSubmit}
                  validationSchema={validationSchema}
                >
                  <Form className="w-full flex flex-col items-center gap-5 justify-center">
                    <BasicFormikInput name="username" placeholder="Username" />
                    <BasicFormikInput name="password" placeholder="Password" />
                    <div></div>
                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`bg-transparent text-primary border-primary border  hover:text-black transition-colors w-28 h-9 text-lg font-bold rounded-lg tracking-wide flex items-center justify-center ${
                          loading
                            ? "opacity-50 cursor-not-allowed bg-transparent"
                            : "hover:bg-primary"
                        }`}
                      >
                        {loading ? (
                          <span className="animate-spin w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></span>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>
                  </Form>
                </Formik>
                <p className="text-white w-full text-center pt-2 lg:pt-4">OR</p>
                <div className="flex justify-center w-full mt-5">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      dispatch(userOauthLogin(credentialResponse.credential));
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                    shape="pill"
                  />
                </div>
                <div className="text-white text-md pt-5 lg:hidden relative flex  justify-center">
                  <div className="">
                    Don't have an account?{" "}
                    <span className="text-primary font-semibold">
                      <Link to={"/signup"}>Register</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex hidden flex-col md:h-[74%] md:w-[40%] w-52">
            <div className="relative lg:flex md:h-[74%] md:w-full flex justify-center items-center">
              <div className="text-white font-bold text-4xl ">
                <Typewriter
                  words={["Eat", "Sleep", "Code", "Repeat!"]}
                  loop={100}
                  cursor
                  cursorStyle="|"
                  cursorColor="#5BBA0C"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                ></Typewriter>
              </div>
            </div>
            <div className="text-white text-xl relative flex  justify-center">
              <div className="">
                Don't have an account?{" "}
                <span className="text-primary font-semibold">
                  <Link to={"/signup"}>Register</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
