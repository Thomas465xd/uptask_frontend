import { statusTranslations } from "@/locales/en";
import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
    status: string
}

export default function DropTask({status} : DropTaskProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: status
    })

    const style = {
        opacity: isOver ? 0.5 : undefined,
        transition: "opacity 0.2s", 
        backgroundColor: isOver ? "rgba(0, 0, 0, 0.1)" : undefined, 
        // card in front of the droppable area
        zIndex: isOver ? 1 : undefined
    }

    return (
        <div
            className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"
            ref={setNodeRef} // setNodeRef is a function that sets the ref in the HTML document to the droppable element
            style={style}
        >
            Drop Task Here - { statusTranslations[status] }
        </div>
    )
}
