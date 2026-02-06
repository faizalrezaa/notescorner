"use client";

import { useNoteDetails, useUsers } from "@/hooks/useUsers";
import Note from "@/components/Note";

import { useUserStore } from "@/store/useUser";
import { User } from "@/types/user";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { colorAvailible } from "@/public/colorAvailible";
import { UpdateUserSchema } from "@/schemas/UserSchema";

export default function Create() {
  const { updateMutation, deleteMutation } = useUsers();
  const { id, name, text, color, setName, setText, setColor, setDate } =
    useUserStore();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const date = new Date().toLocaleDateString("en-GB");
  const router = useRouter();
  const params = useParams();
  const paramsId = params.id as string;

  const { data } = useNoteDetails(paramsId);

  useEffect(() => {
    setName(data?.name as string);
    setText(data?.text as string);
    setColor(data?.color as string);
    setDate(data?.date as string);
  }, [data, setName, setText, setColor, setDate]);

  const handleDelete = () => {
    deleteMutation.mutate({ id: paramsId } as User, {
      onSuccess: () => {
        router.push("/");
        alert("Note successfully deleted!");
      },
      onError: (error: any) => {
        if (error.response?.status) {
          alert("Invalid input. Please check your data again.");
        } else if (error.code === "ECONNABORTED") {
          alert("Response time out. Server taking too long to respond");
        } else {
          alert("Unexpected error. Please try again later.");
        }
      },
    });
  };

  const handleUpdate = () => {
    const input = {
      id: paramsId,
      name: name,
      text: text,
      color: color,
      date: date,
    };
    const result = UpdateUserSchema.safeParse(input);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    updateMutation.mutate({ ...result.data } as User, {
      onSuccess: () => {
        router.push("/");
        alert("Note successfully updated!");
      },
      onError: (error: any) => {
        if (error.response?.status) {
          alert("Invalid input. Please check your data again.");
        } else if (error.code === "ECONNABORTED") {
          alert("Response time out. Server taking too long to respond");
        } else {
          alert("Unexpected error. Please try again later.");
        }
      },
    });
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full flex justify-center items-center h-90 lg:h-140 bg-grey-bg">
          <Note
            name={name}
            text={text}
            color={color}
            date={date}
            className="shadow-lg"
          ></Note>
        </div>
        <div className="w-full flex  flex-col p-8 ">
          <h2 className="font-poppins-md text-3xl pt-10 pb-6 text-center">
            Update/Delete Note
          </h2>
          <div className="pb-3.5">
            <label htmlFor="text" className="font-poppins-rg cursor-pointer">
              Your Message
            </label>
            <textarea
              id="text"
              value={text || ""}
              onChange={(e) => setText(e.target.value)}
              className="w-full border-2 border-gray-300 h-20 mt-2.5 rounded p-2.5 "
            ></textarea>
            <div className="min-h-7">
              {errors.text && (
                <div className="font-poppins-l text-sm text-red-500">
                  {errors.text[0]}
                </div>
              )}
            </div>
          </div>
          <div className="pb-3.5">
            <label htmlFor="name" className="font-poppins-rg cursor-pointer">
              Your Name
            </label>
            <input
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full border-2 border-gray-300 px-3.5 py-2.5 mt-2.5 rounded mb-1.5"
            />
            <div className="min-h-7">
              {errors.name && (
                <div className="font-poppins-l text-sm text-red-500">
                  {errors.name[0]}
                </div>
              )}
            </div>
          </div>
          <div className="font-poppins-rg">Color</div>
          <div className="flex gap-3.5 pt-2">
            {colorAvailible.map((c, index) => (
              <div
                key={index}
                onClick={() => setColor(c)}
                className={`${c} w-10 h-10 rounded border-2  cursor-pointer ${c == color ? "border-gray-500" : "border-gray-300"}`}
              ></div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={() => handleUpdate()}
              className="w-full text-center font-poppins-md text-white bg-[#2563EB] hover:bg-[#4e82f2] py-3.5 mt-6 rounded cursor-pointer"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete()}
              className="w-full text-center font-poppins-md text-white bg-[#e74141] hover:bg-[#dc7a7a] py-3.5 mt-3 rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
