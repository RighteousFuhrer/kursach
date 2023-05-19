"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

function Home() {
  return (
    <section className="w-full flex-center flex-col py-8 px-12 bg-white shadow-xl h-96">
      <h1 className="w-full text-center font-bold text-2xl mb-6">
        CONGRATS YOU ARE ON A MAIN PAGE
      </h1>
      <p className="w-full text-center  ">
        From here you can{" "}
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="/auth"
        >
          Login
        </Link>
        , open list of available{" "}
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="/tickets"
        >
          Tickets
        </Link>{" "}
        or check out
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="/media"
        >
          {" "}
          Comments
        </Link>{" "}
        of other people
      </p>
    </section>
  );
}

export default Home;
