"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { signIn, getProviders } from "next-auth/react";
import Link from "next/link";

import axios from "axios";
import Router from "next/router";

import {
  useFormik,
  FormikValues,
  Formik,
  Form,
  Field,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { Action } from "history";

const Auth = () => {
  const [title, setTitle] = useState("Login");

  const [authValues, setAuthValues] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const registerUser = async () => {
    console.log("registering")
    const res = await axios
      .post(
        "/api/users",
        {
          username: authValues.username,
          email: authValues.email,
          password: authValues.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: true,
      email: authValues.email,
      password: authValues.password,
      callbackUrl: `${window.location.origin}`,
    });

    if (res.error) {
      console.log(res.error);
    }
  };

  const onSubmit = (v: FormikValues, a: FormikHelpers<FormikValues>) => {
    a.setSubmitting(false);

    title === "Login" ? loginUser() : registerUser();
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
    password2: Yup.string().required("Confirm password"),
  });

  return (
    <div>
      <div className="w-full max-w-xs mt-12">
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {(props) => (
            <Form className="bg-slate-100  rounded-lg px-8 pt-6 pb-8 mb-4 w-96 b border-solid border-gray-300 border ">
              <h1 className="text-center font-bold text-2xl mb-4 ">{title}</h1>
              <div className="mb-4">
                {title === "Sign Up" && (
                  <div className="mb-4">
                    <Field name="password" placeholder="Password">
                      {() => (
                        <>
                          <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Username
                          </label>
                          <input
                            type="username"
                            name="username"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Username"
                            required
                            onChange={(e) => {
                              setAuthValues({
                                ...authValues,
                                username: e.target.value,
                              });
                            }}
                          />
                        </>
                      )}
                    </Field>
                    <div></div>
                  </div>
                )}

                <Field name="email" placeholder="Email">
                  {() => (
                    <>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email Address"
                        required
                        onChange={(e) => {
                          setAuthValues({
                            ...authValues,
                            email: e.target.value,
                          });
                        }}
                      />
                    </>
                  )}
                </Field>
                <div></div>
              </div>
              <div className="mb-4">
                <Field name="password" placeholder="Password">
                  {() => (
                    <>
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        required
                        onChange={(e) => {
                          setAuthValues({
                            ...authValues,
                            password: e.target.value,
                          });
                        }}
                      />
                    </>
                  )}
                </Field>
                <div></div>
              </div>
              <div className="mb-4">
                <Field name="password" placeholder="Password">
                  {() => (
                    <>
                      <label
                        htmlFor="password2"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="password2"
                        id="password2"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        required
                        onChange={(e) => {
                          setAuthValues({
                            ...authValues,
                            password2: e.target.value,
                          });
                        }}
                      />
                    </>
                  )}
                </Field>
                <div></div>
              </div>
              <div className="mb-4 mt-5">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 
                w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {props.isSubmitting ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    title
                  )}
                </button>
              </div>
              <div className="flex w-full items-center">
                <button
                  onClick={() => {
                    if (title === "Sign Up") {
                      setTitle("Login");
                    } else {
                      setTitle("Sign Up");
                    }
                  }}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline w-full text-center"
                >
                  {title === "Login"
                    ? "Create Account"
                    : "Login to an existing account"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Auth;
