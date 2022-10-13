import { useState } from "react";
import type { Company } from "../../store/types";
import type { ChangeEvent } from "react";

interface Props {
    onCreate: (company: Company) => void,
}

const initalState: Company = {
    id: Math.random(),
    name: "",
    address: "",
    staffCount: 0
};



export default function CompanyForm({ onCreate }: Props) {
    const [data, setData] = useState<Company>(initalState);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleCreate(): void {
        if (!data.name || !data.address) return;
        onCreate(data);
        setData(initalState);
    }

    return <div className="form-wrapper">
        <input name="name" value={data.name} onChange={handleChange} />
        <input name="address" value={data.address} onChange={handleChange} />
        <button onClick={() => handleCreate()}>Создать запись</button>
    </div>;
}