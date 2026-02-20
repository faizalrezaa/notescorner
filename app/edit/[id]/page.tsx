"use client";

import { useNoteDetails, useUsers } from "@/hooks/useUsers";
import Note from "@/components/Note";

import { useUserStore } from "@/store/useUserStore";
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
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center md:max-w-2xl lg:max-w-3xl lg:flex-row xl:max-w-4xl">
        <div className="bg-grey-bg flex h-90 w-full items-center justify-center overflow-y-scroll lg:h-140">
          <Note
            name={name}
            text={text}
            color={color}
            date={date}
            className="max-w-60 shadow-lg"
          ></Note>
        </div>
        <div className="flex w-full flex-col p-8">
          <h2 className="pt-10 pb-6 text-center text-3xl">
            Update/Delete Note
          </h2>
          <div className="pb-3.5">
            <label htmlFor="text" className="cursor-pointer">
              Your Message
            </label>
            <textarea
              id="text"
              value={text || ""}
              onChange={(e) => setText(e.target.value)}
              className="mt-2.5 h-20 w-full rounded border-2 border-gray-300 p-2.5"
            ></textarea>
            <div className="min-h-7">
              {errors.text && (
                <div className="text-sm text-red-500">{errors.text[0]}</div>
              )}
            </div>
          </div>
          <div className="pb-3.5">
            <label htmlFor="name" className="cursor-pointer">
              Your Name
            </label>
            <input
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="mt-2.5 mb-1.5 w-full rounded border-2 border-gray-300 px-3.5 py-2.5"
            />
            <div className="min-h-7">
              {errors.name && (
                <div className="text-sm text-red-500">{errors.name[0]}</div>
              )}
            </div>
          </div>
          <div className="">Color</div>
          <div className="flex gap-3.5 pt-2">
            {colorAvailible.map((c, index) => (
              <div
                key={index}
                onClick={() => setColor(c)}
                className={`${c} h-10 w-10 cursor-pointer rounded border-2 ${c == color ? "border-gray-500" : "border-gray-300"}`}
              ></div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => handleUpdate()}
              className="mt-6 w-full cursor-pointer rounded bg-[#2563EB] py-3.5 text-center text-white hover:bg-[#4e82f2]"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete()}
              className="mt-3 w-full cursor-pointer rounded bg-[#e74141] py-3.5 text-center text-white hover:bg-[#dc7a7a]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
