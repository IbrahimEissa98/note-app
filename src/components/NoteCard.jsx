// import { useState } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  Trash,
  MessageSquareTextIcon,
  EditIcon,
  CalendarClockIcon,
} from "lucide-react";
import CardDropdownMenu from "./CardDropdownMenu";
import { createdAt } from "../services/constants";

export default function NoteCard({
  note,
  onOpenUpdateNote,
  onOpenDeleteNote,
  onOpenViewNote,
  setSelectedNote,
}) {
  return (
    <div className="flex flex-col justify-between group h-full bg-white dark:bg-neutral-950 hover:scale-105 transition-all duration-400 hover:bg-violet-600 dark:hover:bg-violet-600 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg shadow-black/40 dark:shadow-white/30 p-4 relative w-full">
      <div className="">
        {/* Icon */}
        <div className="flex items-start justify-between relative">
          <div className="p-1.5 border border-dashed border-green-500 rounded-lg text-green-600 dark:text-green-400 group-hover:text-white dark:group-hover:text-white group-hover:border-white dark:group-hover:border-white">
            <MessageSquareTextIcon className="h-6 w-6" />
          </div>

          {/* Dropdown Menu */}
          <CardDropdownMenu
            onOpenUpdateNote={onOpenUpdateNote}
            onOpenDeleteNote={onOpenDeleteNote}
            onOpenViewNote={onOpenViewNote}
            note={note}
            setSelectedNote={setSelectedNote}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-white dark:group-hover:text-white mt-3 line-clamp-1">
          {note.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-white dark:group-hover:text-white mt-1 line-clamp-3">
          {note.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400 mt-4 border-t pt-3 border-zinc-200 dark:border-zinc-700 group-hover:border-white dark:group-hover:border-white">
        <span className="flex items-center gap-1 group-hover:text-white dark:group-hover:text-white">
          <EditIcon className="h-4 w-4 text-green-500 group-hover:text-white dark:group-hover:text-white" />
          {createdAt(note.updatedAt)}
        </span>
        <span className="flex items-center gap-1 group-hover:text-white dark:group-hover:text-white">
          <CalendarClockIcon className="h-4 w-4 text-green-500 group-hover:text-white dark:group-hover:text-white" />
          {createdAt(note.createdAt)}
        </span>
      </div>
    </div>
  );
}

{
  /* <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <MoreVertical className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-10">
              <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700">
                <Eye className="h-4 w-4 mr-2" /> View
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700">
                <Edit className="h-4 w-4 mr-2" /> Edit
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40">
                <Trash className="h-4 w-4 mr-2" /> Delete
              </button>
            </div>
          )}
        </div> */
}
