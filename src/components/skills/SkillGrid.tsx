import React, {useMemo} from 'react';
import type {Skill} from "../../models/skill.ts";
import {
    Grid,
    Accordion,
    AccordionGroup,
    AccordionSummary,
    AccordionDetails,
    Typography,
    LinearProgress, Slider
} from "@mui/joy";
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
                                <Grid container alignItems={"center"}>
                                    <Grid xs={3} key={skill.name}>
                                        <SkillCard skill={skill}/>
                                    </Grid>
                                    <Grid container xs={9} justifyContent={"center"}>
                                        <Grid xs={12}>
                                            <Typography level={"title-lg"}>{skill.name}</Typography>
                                        </Grid>
                                        <Grid xs={10}>
                                            <Slider
                                                step={skill.level}
                                                min={1}
                                                max={5}
                                                value={skill.level}
                                                slotProps={{
                                                    thumb: {
                                                        sx: {display: "none"}
                                                    }
                                                }}
                                                marks={[
                                                    {
                                                        value: 1,
                                                        label: 'Familiar'
                                                    },
                                                    {
                                                        value: 2,
                                                        label: 'Novice'
                                                    },
                                                    {
                                                        value: 3,
                                                        label: 'Competent'
                                                    },
                                                    {
                                                        value: 4,
                                                        label: 'Proficient'
                                                    },
                                                    {
                                                        value: 5,
                                                        label: 'Expert'
                                                    }]}
                                            />
                                        </Grid>
                                    </Grid>
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