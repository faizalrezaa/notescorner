"use client";

import Note from "@/components/Note";

import { useUserStore } from "@/store/useUserStore";
import { useUsers } from "../../hooks/useUsers";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateUserSchema } from "@/schemas/UserSchema";
import { colorAvailible } from "@/public/colorAvailible";

export default function Create() {
  const { name, text, color, setName, setText, setColor } = useUserStore();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const { createMutation } = useUsers();
  const date = new Date().toLocaleDateString("en-GB");
  const router = useRouter();

  useEffect(() => {
    setName("");
    setText("");
    setColor("bg-pink");
  }, [setName, setText, setColor]);

  const handleSubmit = () => {
    const input = { name: name, text: text, color: color, date: date };
    const result = CreateUserSchema.safeParse(input);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    createMutation.mutate({ ...result.data } as User, {
      onSuccess: () => {
        alert("Note succesfully added!");
        (setName(""), setText(""), setColor("bg-pink"), router.push("/"));
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
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center md:max-w-2xl lg:max-w-3xl lg:flex-row xl:max-w-4xl">
        <div className="bg-grey-bg flex h-120 w-full items-center justify-center overflow-y-scroll">
          <Note
            name={name}
            text={text}
            color={color}
            date={date}
            className="max-w-60 shadow-lg"
          ></Note>
        </div>
        <div className="flex w-full flex-col p-8">
          <div className="pt-10 pb-6 text-center text-3xl">Create Note</div>
          <div className="pb-3.5">
            <label>Your Message</label>
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="mt-2.5 h-20 w-full rounded border-2 border-gray-300 p-2.5"
            ></textarea>
            <div className="min-h-7">
              {errors.text && (
                <div className="pb-1.5 text-sm text-red-500">
                  {errors.text[0]}
                </div>
              )}
            </div>
          </div>

          <div className="pb-3.5">
            <label>Your Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="mt-2.5 mb-1.5 w-full rounded border-2 border-gray-300 px-3.5 py-2.5"
            />
            <div className="min-h-7">
              {errors.name && (
                <div className="pb-1.5 text-sm text-red-500">
                  {errors.name[0]}
                </div>
              )}
            </div>
          </div>
          <div>Color</div>
          <div className="flex gap-3.5 pt-2">
            {colorAvailible.map((c, index) => (
              <div
                key={index}
                onClick={() => setColor(c)}
                className={`${c} h-10 w-10 cursor-pointer rounded border-2 ${c == color ? "border-gray-500" : "border-gray-300"}`}
              ></div>
            ))}
          </div>
          <div
            onClick={handleSubmit}
            className="font-poppins mt-12 w-full cursor-pointer rounded bg-[#2563EB] py-3.5 text-center text-white hover:bg-[#4e82f2]"
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}
