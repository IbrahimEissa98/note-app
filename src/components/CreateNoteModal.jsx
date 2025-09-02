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
import { useState } from "react";
import { apiServices } from "../services/ApisClass";
import { queryClient } from "../services/constants";

export default function CreateNoteModal({
  isOpenCreateNote,
  onCloseCreateNote,
  onOpenChangeCreateNote,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [isCreating, setIsCreating] = useState(false);

  const { mutate: handleAddNewNote, isPending: isPendingCreate } = useMutation({
    mutationFn: () => {
      if (title.trim() == "" || content.trim() == "") {
        return;
      }
      return apiServices.addNewNote({ title, content });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"]);
      setTitle("");
      setContent("");
      onCloseCreateNote();
      addToast({
        title: `Note Added Successfully`,
        color: "success",
        timeout: 2000,
      });
    },
    onError: (err) => {
      addToast({
        title: `Error at adding note`,
        description: err.response.data.msg,
        color: "danger",
        timeout: 2000,
      });
    },
  });

  function resetInputs() {
    setTitle("");
    setContent("");
  }

  return (
    <>
      {/* Modal Overlay */}
      <Modal
        backdrop={"blur"}
        placement="center"
        size="lg"
        isOpen={isOpenCreateNote}
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
        onOpenChange={onOpenChangeCreateNote}
        onClose={() => {
          onCloseCreateNote();
          resetInputs();
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Add New Note
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
                isDisabled={isPendingCreate}
                className="border border-gray-800 bg-transparent text-gray-800 dark:border-gray-200 dark:text-white font-bold"
                onPress={() => {
                  onCloseCreateNote();
                  resetInputs();
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={isPendingCreate}
                isDisabled={
                  isPendingCreate || title.trim() == "" || content.trim() == ""
                }
                color="danger"
                className={`bg-black text-white text-medium dark:bg-white dark:text-black font-bold`}
                onPress={() => {
                  handleAddNewNote();
                }}
              >
                {isPendingCreate ? "Adding..." : "Add"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
