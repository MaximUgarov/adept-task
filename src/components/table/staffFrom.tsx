import { useState } from "react";
import type { Company, Staff } from "../../store/types";
import type { ChangeEvent } from "react";

interface Props {
    onCreate: (staff: Staff) => void,
    companies: Array<Company>,
}

const initalState: Staff = {
    id: Math.random(),
    name: "",
    surename: "",
    companyId: 0,
    position: ""
};



export default function StaffForm({ onCreate, companies }: Props) {
    const [data, setData] = useState<Staff>({ ...initalState, companyId: companies[0].id });

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleCreate(): void {
        if (!data.name || !data.surename || !data.companyId) return;
        onCreate(data);
        setData(initalState);
    }

    return <div className="form-wrapper">
        <input name="name" value={data.name} onChange={handleChange} />
        <input name="surename" value={data.surename} onChange={handleChange} />
        <select name="companyId" value={data.companyId} onChange={handleChange} >
            <option disabled>Выберите компанию</option>
            {companies.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
        <input name="position" value={data.position} onChange={handleChange} />
        <button onClick={() => handleCreate()}>Создать запись</button>
    </div>;
}