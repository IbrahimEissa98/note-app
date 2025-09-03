import { useContext, useState } from "react";
import { addToast, useDisclosure } from "@heroui/react";
import CreateNoteModal from "../../../components/CreateNoteModal";
import NoteCard from "../../../components/NoteCard";
import { Loader2, PenIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiServices } from "../../../services/ApisClass";
import NoteSkeleton from "../../../components/NoteSkeleton";
import UpdateNoteModal from "../../../components/UpdateNoteModal";
import DeleteNoteModal from "../../../components/DeleteNoteModal";
import { isLoginContext } from "../../../contexts/LoginContext";
import ViewNoteModal from "../../../components/ViewNoteModal";

export default function Home() {
  const [selectedNote, setSelectedNote] = useState(null);
  const { setIsLogin } = useContext(isLoginContext);
  const {
    isOpen: isOpenCreateNote,
    onOpen: onOpenCreateNote,
    onOpenChange: onOpenChangeCreateNote,
    onClose: onCloseCreateNote,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdateNote,
    onOpen: onOpenUpdateNote,
    onOpenChange: onOpenChangeUpdateNote,
    onClose: onCloseUpdateNote,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteNote,
    onOpen: onOpenDeleteNote,
    onOpenChange: onOpenChangeDeleteNote,
    onClose: onCloseDeleteNote,
  } = useDisclosure();
  const {
    isOpen: isOpenViewNote,
    onOpen: onOpenViewNote,
    onOpenChange: onOpenChangeViewNote,
    onClose: onCloseViewNote,
  } = useDisclosure();

  const {
    data: notes,
    isLoading,
    isFetching,
    isError,
    error,
    isPaused,
    isPending,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: apiServices.getUserNotes,
    select: (data) => data.data.notes,
  });

  if (isError && !isPending) {
    if (error.message == "Network Error") {
      addToast({
        title: `Network Error`,
        color: "danger",
        timeout: 2000,
      });
    } else {
      localStorage.removeItem("token");
      setIsLogin(false);
      addToast({
        title: `Invalid Token, Try to login again`,
        color: "danger",
        timeout: 2000,
      });
    }
  }

  return (
    <>
      <div className="grid gap-8 px-6 pb-8">
        {/* New Note Trigger Button */}
        <button
          onClick={onOpenCreateNote}
          className="px-6 py-4 max-w-[500px] text-start w-full mx-auto block text-sm md:text-lg bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-white rounded-lg shadow hover:bg-gray-300 transition"
        >
          <PenIcon className="h-4 w-4 inline-block me-2" />
          Write your note
        </button>

        {isPaused ||
          (notes == null && !isFetching && (
            <div className="mx-auto text-center flex flex-col gap-4">
              <h3 className="font-bold text-danger text-3xl">Error</h3>
              <h3 className="font-medium text-danger/50 text-lg">
                Please try again to load data
              </h3>
              <button
                onClick={() => {
                  location.reload();
                }}
                className="border-2 border-danger text-danger rounded-2xl px-4 py-2"
              >
                Try Again
              </button>
            </div>
          ))}

        {/* Display Notes */}
        {isLoading && !isPaused ? (
          <NoteSkeleton />
        ) : (
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {isFetching && (
              <div className="absolute z-20 rounded-2xl py-2 px-4 bg-gray-400 top-0 left-1/2 -translate-x-1/2">
                <Loader2 className="animate-spin w-8 h-8 inline-block me-2" />
                Updating...
              </div>
            )}
            {notes?.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onOpenUpdateNote={onOpenUpdateNote}
                onOpenDeleteNote={onOpenDeleteNote}
                onOpenViewNote={onOpenViewNote}
                setSelectedNote={setSelectedNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals section */}
      <CreateNoteModal
        isOpenCreateNote={isOpenCreateNote}
        onOpenChangeCreateNote={onOpenChangeCreateNote}
        onCloseCreateNote={onCloseCreateNote}
      />
      <UpdateNoteModal
        isOpenUpdateNote={isOpenUpdateNote}
        onOpenChangeUpdateNote={onOpenChangeUpdateNote}
        onCloseUpdateNote={onCloseUpdateNote}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <DeleteNoteModal
        isOpenDeleteNote={isOpenDeleteNote}
        onOpenChangeDeleteNote={onOpenChangeDeleteNote}
        onCloseDeleteNote={onCloseDeleteNote}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <ViewNoteModal
        isOpenViewNote={isOpenViewNote}
        onOpenChangeViewNote={onOpenChangeViewNote}
        onCloseViewNote={onCloseViewNote}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </>
  );
}
