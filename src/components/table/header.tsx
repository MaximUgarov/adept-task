import { useState } from "react";

interface Props {
    onDelete: () => void,
    deleteCount: number,
    children: JSX.Element,
}

export default function TableHeader({ onDelete, deleteCount, children }: Props) {
    const [isOpen, setOpen] = useState<boolean>(false);

    return <div className="table-header">
        {!isOpen && <button onClick={() => setOpen(true)}>Создать запись</button>}
        <button onClick={() => onDelete()}>Удалить {deleteCount} записей</button>
        {isOpen && children}
    </div>;
}