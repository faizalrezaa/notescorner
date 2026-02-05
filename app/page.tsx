"use client";

import Note from "@/components/Note";
import { useUsers } from "../hooks/useUsers";
import { useRouter } from "next/navigation";

export default function Home() {
  const { usersQuery } = useUsers();
  const router = useRouter();
  const handleAdd = () => {
    router.push("/create");
  };

  const handleEdit = (id: string) => {
    router.push(`edit/${id}`);
  };

  if (usersQuery.isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className="font-kalam-rg text-4xl md:text-4xl xl:text-5xl text-center">
          Notes Corner
        </h1>
        <h3 className="font-kalam-rg text-xl md:text-xl xl:text-2xl text-center">
          Write Anything
        </h3>
      </div>
    );
  }
  if (usersQuery.isError) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <h3 className="text-red-500 font-kalam-rg text-xl">
          Yah, gagal ambil data!
        </h3>
      </div>
    );
  }
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col justify-center items-center gap-3.5 py-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-kalam-rg text-3xl md:text-4xl xl:text-5xl text-center">
            Notes Corner
          </h1>
          <h3 className="font-kalam-rg text-lg md:text-xl xl:text-2xl text-center">
            Write Anything
          </h3>
        </div>
        <button
          onClick={handleAdd}
          className="w-64 text-center text-white font-semibold bg-[#2563EB] hover:bg-[#4e82f2] py-3.5  mt-9 mb-3.5 rounded-2xl cursor-pointer"
        >
          + Add Note
        </button>

        <div className="px-1 md:px-3 lg:px-4 columns-2 md:columns-4 xl:columns-6 gap-3">
          {usersQuery.data?.toReversed().map((data) => (
            <Note
              onClick={() => handleEdit(data.id)}
              key={data.id}
              name={data.name}
              text={data.text}
              color={data.color}
              date={data.date!}
              className="shadow-lg cursor-pointer"
            ></Note>
          ))}
        </div>
      </div>
    </main>
  );
}
