import type { Company } from "./company";

export interface Project {
    name: string;
    description: string;
    roleOnProject: string;
    details: {
        markdown: string;
    };
    banner: {
        url: string;
    };
    logo: {
        url: string;
    }
    startDate: string;
    endDate: string;
    company: Company;
}