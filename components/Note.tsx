"use client";

import { NoteProps } from "@/types/note";

export default function Note({
  name,
  text,
  color,
  className,
  date,
  onClick,
}: NoteProps) {
  return (
    <div
      onClick={onClick}
      className={`${color} ${className} p-6 font-kalam-rg flex flex-col justify-between break-inside-avoid mb-4 max-w-70 wrap-break-word
      `}
    >
      <div>{text}</div>
      <div className=" pt-7">
        <div>{name}</div>
        <div>{date}</div>
      </div>
    </div>
  );
}
