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
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="font-kalam-rg text-center text-4xl md:text-4xl xl:text-5xl">
          Notes Corner
        </h1>
        <h3 className="font-kalam-rg text-center text-xl md:text-xl xl:text-2xl">
          Write Anything
        </h3>
      </div>
    );
  }
  if (usersQuery.isError) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <h3 className="font-poppins-rg text-xl text-red-500">
          Failed to pull the data.
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="font-poppins-l mt-4 w-30 cursor-pointer rounded-xl bg-red-500 py-3.5 text-center text-sm font-semibold text-white hover:bg-red-400"
        >
          Reload
        </button>
      </div>
    );
  }

  if (usersQuery.data?.length === 0) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center">
        <div className="flex w-full flex-col items-center justify-center gap-3.5 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-kalam-rg text-center text-3xl md:text-4xl xl:text-5xl">
              Notes Corner
            </h1>
            <h3 className="font-kalam-rg text-center text-lg md:text-xl xl:text-2xl">
              Write Anything
            </h3>
          </div>
          <button
            onClick={handleAdd}
            className="font-poppins-l mt-9 w-64 cursor-pointer rounded-xl bg-[#2563EB] py-3.5 text-center text-sm font-semibold text-white hover:bg-[#4e82f2]"
          >
            + Add Note
          </button>
          <button
            onClick={handleAdd}
            className="font-poppins-l mb-3.5 w-64 cursor-pointer rounded-xl border-2 border-gray-400 py-3.5 text-center text-sm font-semibold text-gray-400"
          >
            Click the note for edit mode
          </button>

          <div className="font-kalam-rg text-xl">
            <div>The board still empty!</div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="flex w-full flex-col items-center justify-center gap-3.5 py-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-kalam-rg text-center text-3xl md:text-4xl xl:text-5xl">
            Notes Corner
          </h1>
          <h3 className="font-kalam-rg text-center text-lg md:text-xl xl:text-2xl">
            Write Anything
          </h3>
        </div>
        <button
          onClick={handleAdd}
          className="font-poppins-l mt-9 w-64 cursor-pointer rounded-xl bg-[#2563EB] py-3.5 text-center text-sm font-semibold text-white hover:bg-[#4e82f2]"
        >
          + Add Note
        </button>
        <button
          onClick={handleAdd}
          className="font-poppins-l mb-3.5 w-64 cursor-pointer rounded-xl border-2 border-gray-400 py-3.5 text-center text-sm font-semibold text-gray-400"
        >
          Click the note for edit mode
        </button>

        <div className="columns-2 gap-3 px-1 md:columns-4 md:px-3 lg:px-4 xl:columns-6">
          {usersQuery.data?.toReversed().map((data) => (
            <Note
              onClick={() => handleEdit(data.id)}
              key={data.id}
              name={data.name}
              text={data.text}
              color={data.color}
              date={data.date!}
              className="cursor-pointer shadow-lg"
            ></Note>
          ))}
        </div>
      </div>
    </main>
  );
}
