import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { getUserCookies } from "utils/methods";
import { usePublicContext } from "providers/PublicContextProvider";
import CustomInput from "components/ui/custom-inputs/CustomInput";
import Label from "components/ui/custom-inputs/Label";
import { FiLogIn } from "react-icons/fi";
import ErrorFormik from "components/ui/ErrorFormik";
import { toast } from "react-toastify";
import FilledButton from "components/ui/buttons/FilledButton";
import { signUpUser } from "queries/postQueryFns";
import { signUpSchema } from "utils/forms-schemas";

const SignUp = () => {
  const [passwordMode, setPasswordMode] = useState(true);
  const { setIsLog } = usePublicContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      const { access_token, role, id } = data || {};
      Cookies.set("userData", JSON.stringify({ access_token, role, id }));
      setIsLog(true);
      navigate("/");
      toast.success("Sign Up Successful!", { position: "top-right" });
    },
    onError: (error) => {
      toast.error("Error signing up. Please try again.", {
        position: "top-right",
      });
      console.error(error);
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: signUpSchema,
      onSubmit: onSubmit,
    });

  useEffect(() => {
    const userData = getUserCookies();
    if (userData) {
      setIsLog(true);
      navigate("/");
    }
  }, [setIsLog, navigate]);

  const handlePasswordMode = () => {
    setPasswordMode((prevMode) => !prevMode);
  };

  function onSubmit() {
    mutation.mutate(values);
  }
  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <h1 className="w-full text-3xl font-bold text-primary">
                        Taskly
                      </h1>
                      <h4 className="mb-12 mt-10 pb-1 text-xl font-semibold">
                        We are The Taskly Team
                      </h4>
                    </div>
                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <Label
                          text="Username"
                          style="text-bold-color text-sm font-semibold"
                          forId="username"
                        />
                        <CustomInput
                          id="name"
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="border-primary3 focus:border-primary2 focus:ring-primary2 w-full rounded-md border-2 px-3 py-2 focus:ring-1"
                        />
                        <ErrorFormik
                          isError={errors?.name}
                          error={errors?.name}
                          isTouched={touched?.name}
                        />
                      </div>
                      <div className="mb-4">
                        <Label
                          text="Email"
                          style="text-bold-color text-sm font-semibold"
                          forId="email"
                        />
                        <CustomInput
                          id="email"
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="border-primary3 focus:border-primary2 focus:ring-primary2 w-full rounded-md border-2 px-3 py-2 focus:ring-1"
                        />
                        <ErrorFormik
                          isError={errors?.email}
                          error={errors?.email}
                          isTouched={touched?.email}
                        />
                      </div>

                      <div className="relative mb-6">
                        <Label
                          text="Password"
                          style="text-bold-color text-sm font-semibold"
                          forId="password"
                        />
                        <CustomInput
                          id="password"
                          value={values.password}
                          type={passwordMode ? "password" : "text"}
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="border-primary3 focus:border-primary2 focus:ring-primary2 w-full rounded-md border-2 px-3 py-2 focus:ring-1"
                        />
                        <ErrorFormik
                          isError={errors?.password}
                          error={errors?.password}
                          isTouched={touched?.password}
                        />
                        <span
                          className="absolute right-[13px] top-[33px] flex items-center"
                          onClick={handlePasswordMode}
                        >
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {passwordMode ? (
                              <>
                                <path
                                  d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                  stroke="#000000"
                                  strokeWidth="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </>
                            ) : (
                              <path
                                d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            )}
                          </svg>
                        </span>
                        <i
                          className={`fas fa-eye ${
                            passwordMode ? "block" : "hidden"
                          }`}
                        />
                        <i
                          className={`fas fa-eye-slash ${
                            passwordMode ? "hidden" : "block"
                          }`}
                        />
                      </div>

                      <div className="m-4">
                        <p className="mt-4 text-center">
                          Already have an account?{" "}
                          <Link to="/login" className="text-blue-500">
                            Sign in
                          </Link>
                        </p>
                      </div>
                      <div className="mb-5">
                        <FilledButton
                          text={
                            mutation?.isLoading ? "Signing Up..." : "Sign Up"
                          }
                          icon={
                            <div className="m-1">
                              <FiLogIn />
                            </div>
                          }
                          buttonType="submit"
                          isButton={true}
                          className="w-full cursor-pointer rounded-lg border border-black bg-primary p-4 text-white transition hover:bg-opacity-80"
                          isDisable={mutation?.isLoading}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center rounded-b-lg bg-primary lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
