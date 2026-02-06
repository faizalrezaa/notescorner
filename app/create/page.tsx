"use client";

import Note from "@/components/Note";

import { useUserStore } from "@/store/useUser";
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
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full flex justify-center items-center h-120 bg-grey-bg">
          <Note
            name={name}
            text={text}
            color={color}
            date={date}
            className="shadow-lg"
          ></Note>
        </div>
        <div className="w-full flex  flex-col p-8">
          <div className="font-poppins-md text-3xl pt-10 pb-6 text-center">
            Create Note
          </div>
          <div className="pb-3.5">
            <label className="font-poppins-rg">Your Message</label>
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="w-full border-2 border-gray-300 h-20 mt-2.5 rounded p-2.5"
            ></textarea>
            <div className="min-h-7">
              {errors.text && (
                <div className="text-red-500 pb-1.5 font-poppins-rg text-sm">
                  {errors.text[0]}
                </div>
              )}
            </div>
          </div>

          <div className="pb-3.5">
            <label className="font-poppins-rg ">Your Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full border-2 border-gray-300 px-3.5 py-2.5 mt-2.5 mb-1.5 rounded"
            />
            <div className="min-h-7">
              {errors.name && (
                <div className="text-red-500 pb-1.5 font-poppins-rg text-sm">
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
          <div
            onClick={handleSubmit}
            className="w-full text-center font-poppins-md text-white bg-[#2563EB] hover:bg-[#4e82f2] py-3.5 mt-12 rounded cursor-pointer"
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}
