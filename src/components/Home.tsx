import * as React from 'react';
import {Box, Grid, Card, ButtonGroup, Button, Stack, Typography} from '@mui/joy';
import {useNavigate} from 'react-router-dom';
import ProfileCard from './ProfileCard.tsx';
import type {Profile} from "../models/profile.ts";
import type {Project} from "../models/project.ts";
import {ExperienceTimeline} from "./experiences/ExperienceTimeline.tsx";
import type {Experience} from '../models/experience.ts';
import {ProjectCard} from "./projects/ProjectCard.tsx";
import type {Skill} from "../models/skill.ts";
import {SkillGrid} from "./skills/SkillGrid.tsx";
import {useCallback} from "react";
import type {Interest} from "../models/interest.ts";
import {InterestCard} from "./interests/InterestCard.tsx";

interface HomeProps {
    profile: Profile;
    projects?: Project[];
    experiences?: Experience[];
    skills?: Skill[];
    interests?: Interest[];
    tabParam?: number;
}

export default function Home({profile, projects = [], experiences = [], skills = [], interests = [], tabParam = 0}: HomeProps) {
    const navigate = useNavigate();
    const tabLabels = ['Experiences', 'Skills', 'Projects', 'Interests'];
    const tabPaths = ['experiences', 'skills', 'projects', 'interests'];

    // Use the tabParam from React Router
    const [tab, setTab] = React.useState(tabParam);

    // Update tab when tabParam changes
    React.useEffect(() => {
        setTab(tabParam);
    }, [tabParam]);

    // Navigate to the new tab using React Router
    const handleTabChange = useCallback((idx: number) => {
        setTab(idx);
        navigate(`/${tabPaths[idx]}`);
    }, [navigate, tabPaths]);

    const error = projects.length === 0 ? 'No projects found' : null;

    return (
        <Box sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Grid container spacing={4} sx={{maxWidth: 1000, alignItems: 'center', height: '100vh'}}>
                <Grid xs={12} md={5}>
                    <ProfileCard profile={profile}/>
                </Grid>
                <Grid xs={12} md={7} height={'70vh'}>
                    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                        <ButtonGroup variant="outlined" sx={{mb: 3}}>
                            {tabLabels.map((label, idx) => (
                                <Button
                                    key={label}
                                    variant={tab === idx ? 'solid' : 'outlined'}
                                    onClick={() => handleTabChange(idx)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                    <Box height={"100%"} overflow={"auto"}>
                        {tab === 0 && <ExperienceTimeline experiences={experiences}/>}
                        {tab === 1 && <SkillGrid skills={skills}/>}
                        {tab === 2 && (projects.length > 0 ? (
                                <Stack spacing={2}>
                                    {projects.map((project, idx) => (
                                        <ProjectCard key={idx} project={project} index={idx}/>
                                    ))}
                                </Stack>
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%'
                                }}>
                                    <Typography level="body-md" color="neutral">
                                        {error || 'No projects found'}
                                    </Typography>
                                </Box>
                            )
                        )}
                        {tab === 3 && (interests.length > 0 ? (
                                <Stack spacing={2}>
                                    {interests.map((project, idx) => (
                                        <InterestCard key={idx} interest={project}/>
                                    ))}
                                </Stack>
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%'  
                                }}>
                                    <Typography level="body-md" color="neutral">
                                        {error || 'No interests found'}
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
