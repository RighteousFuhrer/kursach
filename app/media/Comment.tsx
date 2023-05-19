import { LocalComment } from "@interfaces/Comments";
import { Comment, User } from "@prisma/client";
import dateFormater from "@utils/dateFormater";
import Image from "next/image";

interface CommentProps {
  user: User | null;
  comment: LocalComment;
  handleDelete(id: number): void;
}

function CommentBlock({ user, comment, handleDelete }: CommentProps) {
  return (
    <div className="w-full justify-center bg-stone-50  border my-1 rounded-xl px-6 py-4">
      <div className="flex flex-col h-full">
        <div>
          <div className="flex justify-between mb-4">
            <div className="flex">
              <div className="flex ">
                <Image
                  src="/assets/static/images/avatar.png"
                  alt="Profile image"
                  width={35}
                  height={35}
                  className="object-contain rounded-full aspect-square ml-4"
                />
              </div>
              <div className="pl-2">
                <div className="font-semibold text-md mb-2">
                  {comment.user.username}
                </div>
              </div>
            </div>

            <div>
              {user?.id == comment.userId ? (
                <button
                  className="bg-red-500 px-3 py-1 rounded-xl font-medium text-white shadow-lg hover:bg-red-700"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col rounded-3xl justify-between box-border h-full">
          <div>
            <div className="f-full flex justify-end"></div>
            <div className="mb-2 max-h-20 overflow-hidden">
              {comment.comment}
            </div>
          </div>

          <div className="text-end text-sm text-gray-600">
            {dateFormater(new Date(comment.created))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBlock;
