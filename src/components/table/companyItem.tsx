import { memo } from "react";
import type { Company, CompanyUpdate } from "../../store/types";
import type { ChangeEvent } from "react";

interface Props {
    onCheck: (id: number) => void,
    onUpdate: (company: CompanyUpdate) => void,
    company: Company,
    isChecked: boolean,
}



function CompanyItem(props: Props) {
    const { id, name, staffCount, address } = props.company;
    const { onCheck, onUpdate, isChecked } = props;

    function handleUpdate(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        onUpdate({ id, [name]: value });
    }

    return <tr className={isChecked ? "selected" : ""}>
        <td><input type="checkbox" checked={isChecked} onChange={() => onCheck(id)} /></td>
        <td><input name="name" value={name} onChange={handleUpdate} /></td>
        <td>{staffCount}</td>
        <td><input name="address" value={address} onChange={handleUpdate} /></td>
    </tr>;
}

export default memo(CompanyItem);