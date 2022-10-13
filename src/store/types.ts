export interface Company {
    id: number,
    name: string,
    staffCount: number,
    address: string,
}

export interface CompanyUpdate {
    id: number,
    name?: string,
    staffCount?: number,
    address?: string,
}

export interface Staff {
    id: number,
    companyId: number,
    surename: string,
    name: string,
    position: string,
}

export interface StaffUpdate {
    id: number,
    companyId: number,
    surename?: string,
    name?: string,
    position?: string,
}