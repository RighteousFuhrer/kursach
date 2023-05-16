"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Provider as authProvider } from "next-auth/providers";
import Router from "next/router";
import axios from "axios";

function Nav() {
  const { data: session, status } = useSession();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();
      
      setProviders(response);
    };
    console.log(session, status);
  }, []);

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
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
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
            <button
              type="button"
              onClick={() => signIn()}
              className="black_btn"
            >
              SignIn
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
