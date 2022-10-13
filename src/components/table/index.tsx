import { useState } from "react";
import { useActions, useAppSelector } from "../../store";
import { getCompanies } from "../../store/selectors/companies";
import { getStaffByCompaniesId } from "../../store/selectors/staff";
import CompanyItem from "./companyItem";
import TableHeader from "./header";
import StaffItem from "./staffItem";
import CompanyForm from "./companyForm";
import StaffForm from "./staffFrom";
import { useDynamicPagination } from "../../hooks";
import TableComponent from "./table";
import type { Company, CompanyUpdate, Staff } from "../../store/types";
import type { ChangeEvent } from "react";
import SelectAllCheckBox from "./selectAll";

interface SelectedItems {
    companies: Array<number>,
    staff: Array<number>,
}

interface ViewElements {
    companies: number,
    staff: number,
}



export default function TableContainer() {
    const companies = useAppSelector(getCompanies);
    const [selectedItems, setSelectedItem] = useState<SelectedItems>({ companies: [], staff: [] });
    const staff = useAppSelector((state) => getStaffByCompaniesId(state, selectedItems.companies));
    const [viewElements, setViewElements] = useState<ViewElements>({ companies: 10, staff: 30 });

    const {
        createCompany,
        updateCompany,
        deleteCompany,
        updateStaff,
        deleteStaff,
        createStaff
    } = useActions();

    const companyColumns = [<SelectAllCheckBox onCheck={(e: ChangeEvent<HTMLInputElement>) =>
        selectAll(e, companies.map(({ id }) => id), "companies")} />, "Название", "Кол-во сотрудников", "Адрес"];

    const staffColumns = [<SelectAllCheckBox onCheck={(e: ChangeEvent<HTMLInputElement>) =>
        selectAll(e, staff.map(({ id }) => id), "staff")} />, "Фамилия", "Имя", "Должность"];

    function foundItemById(items: Array<number>, itemId: number): boolean {
        return Boolean(items.find((id) => id === itemId));
    }

    function handleCheck(itemId: number, itemName: keyof SelectedItems): void {
        const currItemType = selectedItems[itemName];
        const currId: boolean = foundItemById(currItemType, itemId);
        setSelectedItem({
            ...selectedItems,
            [itemName]: currId ? currItemType.filter((id) => id !== itemId) : [...currItemType, itemId]
        });
    }

    function handleCompanyDelete(ids: Array<number>) {
        deleteCompany(ids);
        setSelectedItem({ companies: [], staff: selectedItems.staff });
    }

    function handleStaffDelete(ids: Array<number>) {
        deleteStaff(ids);
        setSelectedItem({ staff: [], companies: selectedItems.companies });
    }

    function selectAll(e: ChangeEvent<HTMLInputElement>, ids: Array<number>, itemType: keyof SelectedItems) {
        const { checked } = e.target;
        setSelectedItem({ ...selectedItems, [itemType]: checked ? ids : [] });
    }

    const { refPagination: companyPaginationRef } = useDynamicPagination(() =>
        setViewElements((state) => ({ ...state, companies: state.companies })));

    const { refPagination: staffPaginationRef } = useDynamicPagination(() =>
        setViewElements((state) => ({ ...state, staff: state.staff })));

    return <div className="wrapper">
        <TableComponent
            columns={companyColumns}
            paginationRef={companyPaginationRef}
        >
            <TableHeader
                onDelete={() => handleCompanyDelete(selectedItems.companies)}
                deleteCount={selectedItems.companies.length}
            >
                <CompanyForm onCreate={(company: Company) => createCompany(company)} />
            </TableHeader>
            <>
                {companies.slice(0, viewElements.companies).map((company) =>
                    <CompanyItem
                        key={company.id}
                        onCheck={(id: number) => handleCheck(id, "companies")}
                        onUpdate={(company: CompanyUpdate) => updateCompany(company)}
                        isChecked={foundItemById(selectedItems.companies, company.id)}
                        company={company}
                    />)}
            </>
        </TableComponent>
        {Boolean(selectedItems.companies.length) &&
            <TableComponent
                columns={staffColumns}
                paginationRef={staffPaginationRef}
            >
                <TableHeader
                    onDelete={() => handleStaffDelete(selectedItems.staff)}
                    deleteCount={selectedItems.staff.length}
                >
                    <StaffForm companies={companies} onCreate={(staff: Staff) => createStaff(staff)} />
                </TableHeader>
                <>
                    {staff.slice(0, viewElements.staff).map((staff) =>
                        <StaffItem
                            key={staff.id}
                            staff={staff}
                            onCheck={(id: number) => handleCheck(id, "staff")}
                            onUpdate={updateStaff}
                            isChecked={foundItemById(selectedItems.staff, staff.id)}
                        />)}
                </>
            </TableComponent>
        }
    </div >;
}