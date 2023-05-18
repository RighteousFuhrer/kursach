"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { User, Comment, BusTicket, Receipt, BusRoute } from "@prisma/client";
import Image from "next/image";
import CommentBlock from "./CommentBlock";
import TicketBlock from "./TicketBlock";
import { LocalTicket } from "@interfaces/Tickets";

function Profile() {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [tickets, setTickets] = useState<LocalTicket[] | null>(null);
  const [comment, setComment] = useState("");
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

  const fetchComments = async () => {
    axios
      .get("/api/comments" + "?userId=" + user?.id)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTickets = async () => {
    axios
      .get("/api/tickets" + "?userId=" + user?.id)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = async () => {
    await axios
      .post(
        "/api/comments",
        {
          comment,
          userId: user?.id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        setComment("");
        fetchComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    }
    console.log(session)
  }, [status]);

  useEffect(() => {
    if (user) {
      fetchComments();
      fetchTickets();
    }
  }, [user]);

  return (
    <div className="w-full py-12 px-14 pr-4 flex content-center bg-zinc-50 shadow-lg box-border">
      <div className="w-full">
        <div className="flex mb-6 px-6 w-full justify-between">
          {status !== "loading" && (
            <>
              <div className="flex">
                <div className="">
                  <Image
                    src="/assets/static/images/avatar.png"
                    alt="Profile image"
                    width={60}
                    height={60}
                    className="object-cover rounded-full aspect-square ml-4"
                  />
                </div>
                <div className="pl-6">
                  <div className="font-bold text-xl mb-2">{user?.username}</div>
                  <div className="text-md text-gray-400 mb-3">
                    {user?.email}
                  </div>
                </div>
              </div>

              <div className="flex content-center">
                <div className="">
                  <button className="black_btn inline">Edit</button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex w-full">
          <h1 className="text-center w-full  text-lg font-semibold">
            My Comments
          </h1>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 overflow-y-scroll"></hr>
        {user && (
          <div className="bg-stone-100 w-full h-80  overflow-y-scroll">
            {comments ? (
              comments?.map((comment, index) => (
                <CommentBlock comment={comment} key={index} />
              ))
            ) : (
              <></>
            )}
          </div>
        )}

        <div className="w-full flex bg-stone-50">
          <div className="w-full flex bg-stone-50 py-4 px-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="message"
              rows={2}
              className="border border-slate-200 rounded-xl py-4 px-6 bg-transparent block w-full text-sm outline-none resize-none focus:to-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            <div className="ml-3 ">
              <button
                className="hover:bg-blue-700 bg-blue-500 px-5 py-2 font-semibold text-white rounded-xl"
                onClick={handleClick}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center box-border">
        <div className="w-full flex flex-col h-auto ml-6 px-2 pb-4">
          <h1 className="font-semibold text-lg text-center">My Tickets</h1>
          <hr className="h-px my-4 bg-gray-200 border-0 "></hr>
          {user && (
            <div className="bg-stone-100 w-full h-3/5 flex flex-col overflow-y-scroll">
              {tickets ? (
                tickets?.map((ticket, index) => (
                  <TicketBlock ticket={ticket} user={user} key={index} />
                ))
              ) : (
                <div>Tickets not</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
