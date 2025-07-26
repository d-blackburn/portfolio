import * as React from 'react';
import {Card, Typography, Box, Avatar, CardOverflow, AspectRatio, CardContent, Divider, Button} from '@mui/joy';
import type {Project} from "../models/project.ts";

// Helper function to create a URL-friendly slug from the project name
const createSlug = (name: string): string => {
    return encodeURIComponent(name);
};

export default function ProjectCard({project}: { project: Project }) {
    const projectUrl = `/projects/${createSlug(project.name)}`;
    
    return (
        <Card variant="outlined">
            <CardOverflow>
                <AspectRatio ratio={2}>
                    <img
                        src={project.banner.url}
                        alt={`${project.name} banner`}
                        loading={"lazy"}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography level={"title-md"}>{project.name}</Typography>
                <Typography level={"body-sm"}>{project.description}</Typography>
            </CardContent>
            <CardOverflow sx={{bgcolor: 'background.level1'}}>
                <Divider inset={"context"}/>
                <CardContent sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography level="body-xs" color="neutral">
                        {project.startDate} - {project.endDate || 'Present'}
                    </Typography>
                    <Button size={"sm"} component="a" href={projectUrl}>Learn more</Button>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}

