"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { User, Comment } from "@prisma/client";
import dateFormater from "@utils/dateFormater";

interface CommentProps {
  comment: Comment;
}

function CommentBlock({ comment }: CommentProps) {
  return (
    <div className="w-full px-4 py-1 flex box-border">
      <div className="w-full flex py-6 px-6 flex-col rounded-3xl bg-white box-border">
        <div className="mb-2">{comment.comment}</div>
        <div className="text-end text-sm text-gray-600">
          {dateFormater(new Date(comment.created))}
        </div>
      </div>
    </div>
  );
}

export default CommentBlock;
