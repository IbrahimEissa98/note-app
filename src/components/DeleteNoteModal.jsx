import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
} from "@heroui/react";
import { queryClient } from "../services/constants";
import { apiServices } from "../services/ApisClass";
import { useMutation } from "@tanstack/react-query";

export default function DeleteNoteModal({
  isOpenDeleteNote,
  onOpenChangeDeleteNote,
  onCloseDeleteNote,
  selectedNote,
  setSelectedNote,
}) {
  const { mutate: handleDeleteNote, isPending: isPendingDelete } = useMutation({
    mutationFn: () => {
      return apiServices.deleteNote(selectedNote?._id);
    },
    onSuccess: async () => {
      // console.log(res);

      await queryClient.invalidateQueries(["notes"]);
      onCloseDeleteNote();
      addToast({
        title: `Note Deleted Successfully`,
        color: "success",
        timeout: 2000,
      });
    },
    onError: (err) => {
      // console.log(err);
      // console.log(selectedNote);

      addToast({
        title: `Error at Deleting note`,
        description: err.response.data.msg,
        color: "danger",
        timeout: 2000,
      });
    },
  });

  return (
    <>
      <Modal
        backdrop={"blur"}
        placement="center"
        size="lg"
        isOpen={isOpenDeleteNote}
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
        onOpenChange={onOpenChangeDeleteNote}
        onClose={() => {
          onCloseDeleteNote();
          setSelectedNote(null);
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Deleting Your Note
            </ModalHeader>
            <ModalBody>
              <div className="text-yellow-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-24 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl text-center text-red-600">
                Are You Sure?
              </h3>
              <div className="text-center text-xl">
                You won't be able to revert this!
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={isPendingDelete}
                color="default"
                variant="shadow"
                onPress={() => {
                  onCloseDeleteNote();
                  setSelectedNote(null);
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={isPendingDelete}
                isDisabled={isPendingDelete}
                color="danger"
                onPress={() => {
                  handleDeleteNote();
                }}
              >
                {isPendingDelete ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
