import { memo } from "react";
import type { Staff, StaffUpdate } from "../../store/types";
import type { ChangeEvent } from "react";

interface Props {
    onCheck: (id: number) => void,
    onUpdate: (staff: StaffUpdate) => void,
    staff: Staff,
    isChecked: boolean,
}



function CompanyItem(props: Props) {
    const { id, name, surename, position, companyId } = props.staff;
    const { onCheck, onUpdate, isChecked } = props;

    function handleUpdate(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        onUpdate({ id, companyId, [name]: value });
    }

    return <tr className={isChecked ? "selected" : ""}>
        <td><input type="checkbox" checked={isChecked} onChange={() => onCheck(id)} /></td>
        <td><input name="name" value={name} onChange={handleUpdate} /></td>
        <td><input name="surname" value={surename} onChange={handleUpdate} /></td>
        <td><input name="position" value={position} onChange={handleUpdate} /></td>
    </tr>;
}

export default memo(CompanyItem);