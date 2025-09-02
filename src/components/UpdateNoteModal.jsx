import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiServices } from "../services/ApisClass";
import { queryClient } from "../services/constants";

export default function UpdateNoteModal({
  isOpenUpdateNote,
  onCloseUpdateNote,
  onOpenChangeUpdateNote,
  selectedNote,
  setSelectedNote,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(selectedNote?.title);
    setContent(selectedNote?.content);
  }, [selectedNote]);

  function resetInputs() {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const { mutate: handleUpdateNote, isPending: isPendingUpdate } = useMutation({
    mutationFn: () => {
      if (title?.trim() == "" || content?.trim() == "") {
        return;
      }
      return apiServices.updateNote(selectedNote._id, { title, content });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"]);
      resetInputs();
      onCloseUpdateNote();
      addToast({
        title: `Note Updated Successfully`,
        color: "success",
        timeout: 2000,
      });
    },
    onError: (err) => {
      addToast({
        title: `Error at Updating note`,
        description: err.response.data.msg,
        color: "danger",
        timeout: 2000,
      });
    },
  });

  return (
    <>
      {/* Modal Overlay */}
      <Modal
        backdrop={"blur"}
        placement="center"
        size="lg"
        isOpen={isOpenUpdateNote}
        className="dark:bg-neutral-950"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChangeUpdateNote}
        onClose={() => {
          onCloseUpdateNote();
          resetInputs();
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Update Note
            </ModalHeader>
            <ModalBody>
              <input
                autoFocus={true}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-400 bg-gray-50 dark:bg-neutral-800 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
              />

              {/* Content Input */}
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="w-full border min-h-32 border-gray-400 bg-gray-50 dark:bg-neutral-800 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
              ></textarea>
            </ModalBody>

            {/* Buttons */}
            <ModalFooter>
              <Button
                isDisabled={isPendingUpdate}
                className="border border-gray-800 bg-transparent text-gray-800 dark:border-gray-200 dark:text-white font-bold"
                onPress={() => {
                  onCloseUpdateNote();
                  resetInputs();
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={isPendingUpdate}
                isDisabled={
                  isPendingUpdate ||
                  title?.trim() == "" ||
                  content?.trim() == ""
                }
                color="danger"
                className={`bg-black text-white text-medium dark:bg-white dark:text-black font-bold`}
                onPress={() => {
                  handleUpdateNote();
                }}
              >
                {isPendingUpdate ? "Updating..." : "Update"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
