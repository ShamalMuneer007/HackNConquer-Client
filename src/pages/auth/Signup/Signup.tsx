import { TypeDispatch } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  userOauthLogin,
  userRegister,
} from "../../../redux/actions/userActions";
import Particle from "../../../components/particle/Particle";
import Logo from "../../../components/Logo/Logo";
import { Formik, Form, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import BasicFormikInput from "../../../components/input/BasicFormikInput";
import { GoogleLogin } from "@react-oauth/google";
import { Typewriter } from "react-simple-typewriter";
import IUserInformation from "../../../interfaces/IUserInformation";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import OtpModal from "../../../components/modals/OtpModal";
import { setMessage } from "../../../redux/reducers/userSlice";

function Signup() {
  const [otpModal, setOtpModal] = useState(false);
  const { error, message, user, loading } = useSelector(
    (state: any) => state.user
  );
  const [userData, setUserData] = useState({});
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
    if (message && message.status === 200 && user === null) {
      setOtpModal(true);
      toast.info(message.message);
      dispatch(setMessage(null));
    } else if (message && message.status === 200 && user !== null) {
      setOtpModal(false);
      dispatch(setMessage(null));
    }
    if (error && error.status >= 400 && error.status <= 500) {
      toast.error(error.message);
    } else if (error && error.status >= 500) {
      toast.error("Something went wrong..! Please try again after some time..");
    } else if (error) {
      toast.error(error);
    }
  }, [error, message]);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    email: Yup.string()
      .email("Email must be valid!")
      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character!"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Retype your password!"),
  });
  const dispatch: TypeDispatch = useDispatch();
  const handleRegisterSubmit = async (
    userCredentials: IUserInformation,
    formikHelpers: FormikHelpers<IUserInformation>,
    event?: FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    await dispatch(userRegister(userCredentials));
    setUserData(userCredentials);
  };
  return (
    <>
      <div className="h-[98.9vh]">
        <Particle />
        {otpModal && (
          <OtpModal
            registerSubmit={handleRegisterSubmit}
            userData={userData}
            setOtpModal={setOtpModal}
          />
        )}
        <Link
          to={"/"}
          className="w-full relative flex my-2 mb-2  justify-center"
        >
          <Logo className="md:w-[13%] w-[50%]" />
        </Link>
        <div className="flex h-full  md:px-24 lg:justify-start justify-center gap-32">
          <div className="backdrop-blur-sm md:ms-20 bg-opacity-15 xs:h-[90%] xs:pb-2 sm:h-[85%] bg-blue-gray-800 rounded-xl py-16 lg:w-[40%] w-[90%]">
            <div className="flex flex-col">
              <div className="lg:ps-20 mb-12 ">
                <h2 className="text-white font-bold text-4xl text-center lg:text-left">
                  Sign up
                </h2>
              </div>
              <div className="items-center h-full">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleRegisterSubmit}
                  validationSchema={validationSchema}
                >
                  <Form className="w-full flex flex-col items-center gap-5 justify-center">
                    <BasicFormikInput name="username" placeholder="Username" />
                    <BasicFormikInput name="email" placeholder="Email" />
                    <BasicFormikInput name="password" placeholder="Password" />
                    <BasicFormikInput
                      name="confirmPassword"
                      placeholder="Retype your password"
                    />
                    <div></div>
                    <div className="mt-4">
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
                          "Register"
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
                    text="continue_with"
                    shape="circle"
                  />
                </div>
                <div className="text-white text-md pt-5 lg:hidden relative flex  justify-center">
                  <div className="">
                    Already have an account?{" "}
                    <span className="text-primary font-semibold">
                      <Link to={"/login"}>Login</Link>
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
                Already have an account?{" "}
                <span className="text-primary font-semibold">
                  <Link to={"/login"}>Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
