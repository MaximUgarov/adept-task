import type { Company, Staff } from "../store/types";



function stringGenerator(length: number): string {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function generateMokData(arrLength: number): [Array<Company>, Array<Staff>] {
    const companies: Array<Company> = [];
    for (let i = 0; i < arrLength; i++)
        companies.push({
            id: Math.random(),
            name: stringGenerator(10),
            staffCount: 0,
            address: stringGenerator(15)
        });
    const staff: Array<Staff> = [];
    for (let i = 0; i < arrLength * 3; i++)
        staff.push({
            id: Math.random(),
            companyId: companies[Math.floor(Math.random() * companies.length)].id,
            name: stringGenerator(10),
            surename: stringGenerator(7),
            position: stringGenerator(4)
        });
    return [companies, staff];
}

export const mokData = generateMokData(1551);