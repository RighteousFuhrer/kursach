"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LocalTicket } from "@interfaces/Tickets";
import CommentBlock from "./Comment";
import { Prisma, Comment, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import dateComparer from "@utils/dateComparer";
import { LocalComment } from "@interfaces/Comments";

function page() {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, [session]);

  const fetchUser = async () => {
    await axios
      .get("/api/users" + "?email=" + session?.user?.email)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchComments = async () => {
    await axios
      .get("/api/comments/all")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (id: number) => {
    await axios
      .delete("/api/comments?id=" + id)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [user]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 f-full">
        {comments.length >0 &&
          comments.map((comment, index) => (
            <CommentBlock
              user={user}
              comment={comment}
              key={index}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default page;
