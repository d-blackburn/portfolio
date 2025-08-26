import React, {useMemo} from 'react';
import type {Skill} from "../../models/skill.ts";
import {Grid, Accordion, AccordionGroup, AccordionSummary, AccordionDetails} from "@mui/joy";
import {SkillCard} from "./SkillCard.tsx";

export type SkillMarqueeProps = {
    skills: Skill[];
}

const SkillGrid: React.FC<SkillMarqueeProps> = ({skills}) => {

    const skillsByType = useMemo(() => {
        return skills.reduce((acc, skill) => {
            if (!acc[skill.type]) acc[skill.type] = [];
            acc[skill.type].push(skill);
            return acc;
        }, {} as Record<string, Skill[]>);
    }, [skills]);

    return (
        <AccordionGroup disableDivider size={"lg"}>
            {Object.entries(skillsByType).map(([type, skills]) => (
                <Accordion defaultExpanded>
                    <AccordionSummary>{type.toUpperCase()}S</AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            {skills.map((skill) => (
                                <Grid xs={4} key={skill.name}>
                                    <SkillCard skill={skill}/>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </AccordionGroup>

    )
}
export {SkillGrid}