import { useState } from "react";
import type { ChangeEvent } from "react";



export default function SelectAllCheckBox({ onCheck }: { onCheck: (e: ChangeEvent<HTMLInputElement>) => void, }) {
    const [isChecked, setChecked] = useState<boolean>(false);
    function handleCheck(e: ChangeEvent<HTMLInputElement>): void {
        onCheck(e);
        setChecked(!isChecked);
    }
    return <input type="checkbox" checked={isChecked} onChange={handleCheck} />;
}