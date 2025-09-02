import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";

export default function CardDropdownMenu({
  onOpenUpdateNote,
  onOpenDeleteNote,
  onOpenViewNote,
  note,
  setSelectedNote,
}) {
  const items = [
    {
      key: "view",
      label: "View",
      icon: Eye,
    },
    {
      key: "edit",
      label: "Edit",
      icon: Edit,
    },
    {
      key: "delete",
      label: "Delete",
      icon: Trash2,
    },
  ];

  return (
    <Dropdown
      classNames={{
        content: "min-w-[120px]",
      }}
      size="sm"
      placement="bottom-end"
    >
      <DropdownTrigger>
        <button
          className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={() => setSelectedNote(note)}
        >
          <MoreVertical className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            className={item.key === "delete" ? "text-danger " : ""}
            color={item.key === "delete" ? "danger" : "default"}
            textValue={item.key}
            onPress={
              item.key === "delete"
                ? onOpenDeleteNote
                : item.key === "edit"
                ? onOpenUpdateNote
                : onOpenViewNote
            }
          >
            <item.icon className="w-4 h-4 inline-block me-2" />
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
