import string from "zod/src/v3/benchmarks/string.ts";

export interface Profile {
    avatar: {
        url: string;
    };
    firstName: string;
    surname: string;
    jobTitle: string;
    bio: string;
    linkedin: string;
    github: string;
    email: string;
}