"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma, User } from "@prisma/client";
import Image from "next/image";

function Profile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<{
    email: string;
    username: string;
    id: number;
  }>();

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
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status]);

  return (
    <div className="w-full py-12 px-16 flex content-center">
      <div className="">
        <div className="login-block">
          {status !== "loading" && (
            <>
              <div className="flex w-full mb-6 justify-between">
                <Image
                  src="/assets/static/images/avatar.png"
                  alt="Profile image"
                  width={120}
                  height={120}
                  className="object-cover rounded-full aspect-square ml-4"
                />
                <div>
                  <button className="black_btn inline">Edit</button>
                </div>
              </div>
              <div className="ml-4 font-bold text-2xl mb-2">
                {user?.username}
              </div>
              <div className="text-lg text-gray-400 mb-3">{user?.email}</div>
            </>
          )}
        </div>

        <div className="w-full login-block">
          
        </div>
      </div>
      <div className="w-96 login-block block h-auto ml-6">

      </div>
    </div>
  );
}

export default Profile;
