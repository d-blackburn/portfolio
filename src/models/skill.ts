import type {SkillType} from "./skillType.ts";

export type Skill = {
    name: string;
    type: SkillType;
    level: number;
    color: {
        hex: string;
        rgba: {
            r: number;
            g: number;
            b: number;
            a: number;
        }
    };
    logo: {
        url: string;
        alt: string;
    };
    link: string;
}