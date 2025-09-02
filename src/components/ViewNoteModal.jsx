import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { createdAt } from "../services/constants";
import { CalendarClockIcon, EditIcon } from "lucide-react";

export default function ViewNoteModal({
  isOpenViewNote,
  onCloseViewNote,
  onOpenChangeViewNote,
  selectedNote,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(selectedNote?.title);
    setContent(selectedNote?.content);
  }, [selectedNote]);

  return (
    <>
      {/* Modal Overlay */}
      <Modal
        backdrop={"blur"}
        placement="center"
        size="lg"
        isOpen={isOpenViewNote}
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
        onOpenChange={onOpenChangeViewNote}
        onClose={() => {
          onCloseViewNote();
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              View Note
            </ModalHeader>
            <ModalBody className="gap-0">
              <h3 className="w-full px-2 py-1 mb-0 text-2xl font-bold font-jost">
                {title}
              </h3>

              {/* Content Input */}
              <p className="w-full px-2 py-1 mb-2 text-medium text-gray-700 dark:text-gray-400">
                {content}
              </p>
            </ModalBody>
            <ModalFooter className="pt-0 w-full justify-between">
              {/* Footer */}
              <div className="flex justify-between w-full items-center text-sm text-zinc-500 dark:text-zinc-400 mt-4 border-t pt-3 border-zinc-200 dark:border-zinc-700 group-hover:border-white dark:group-hover:border-white">
                <span className="flex items-center gap-1 group-hover:text-white dark:group-hover:text-white">
                  <EditIcon className="h-4 w-4 text-green-500 group-hover:text-white dark:group-hover:text-white" />
                  {createdAt(selectedNote?.updatedAt)}
                </span>
                <span className="flex items-center gap-1 group-hover:text-white dark:group-hover:text-white">
                  <CalendarClockIcon className="h-4 w-4 text-green-500 group-hover:text-white dark:group-hover:text-white" />
                  {createdAt(selectedNote?.createdAt)}
                </span>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
