"use client";

import { LocalTicket } from "@interfaces/Tickets";
import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from 'next/navigation';

function page() {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [password, setPassword] = useState("************");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    axios
      .get("/api/users" + "?email=" + session?.user?.email)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [status]);

  useEffect(() => {
    setPassword(user?.password || "");
    setEmail(user?.email || "");
    setUsername(user?.username || "");
  }, [user]);

  const deleteUser = async () => {
    axios
      .delete("/api/users" + "?id=" + user?.id)
      .then((response) => {
        
        signOut();
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    push("/profile");
  };

  const handleSave = () => {
    axios
      .put(
        "/api/users",
        { id: user?.id, email, password, username },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        push("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-end">
        <button
          className="bg-red-500 px-3 py-1 rounded-md font-medium text-white hover:bg-red-700"
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
      <div className="flex justify-center">
        <Image
          src="/assets/static/images/avatar.png"
          alt="Profile image"
          width={80}
          height={80}
          className="object-cover rounded-full aspect-square ml-4"
        />
      </div>

      <form className="">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline w-28"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className=" border border-red-500 text-red-500 py-2 px-6 rounded focus:outline-none w-28
            flex-grow-0 focus:shadow-outline 
            hover:border-red-600 hover:bg-red-500 hover:text-white "
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
