"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Provider as authProvider } from "next-auth/providers";
import Router from "next/router";
import axios from "axios";


function Nav() {
  const isUserLoggedIn = true;

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setAllProviders();
  }, []);

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      Router.push("/");
    }
  };

  const registerUser = async () => {
    const res = await axios.post(
      "api/register",
      {
        username,
        email,
        password,
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
      redirectToHome();
    })
    .catch( (err) => {
      console.log(err);
    });
  };

  const loginUser = async () => {
    const res: any = signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });

    res.error && console.log(res.error);
  };

  const formSubmit = async () => {};

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/static/images/bus.png"
          alt="Busland log"
          width={40}
          height={40}
          className="object-cover rounded-full aspect-square"
        />
        <p className="logo_text">Busland</p>
      </Link>

      <div className="">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" onClick={() => {}} className="outline_btn">
              Sign out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/static/images/profile.png"
                alt="Profile image"
                width={35}
                height={35}
                className="object-cover rounded-full aspect-square"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
