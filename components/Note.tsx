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
      className={`font-kalam-rg mb-4 flex w-full break-inside-avoid flex-col justify-between p-6 wrap-break-word ${color} ${className}`}
    >
      <div className="break-words">{text}</div>
      <div className="pt-7">
        <div>{name}</div>
        <div>{date}</div>
      </div>
    </div>
  );
}
