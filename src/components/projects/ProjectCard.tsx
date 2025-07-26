import * as React from 'react';
import {Card, Typography, Box, Avatar, CardOverflow, AspectRatio, CardContent, Divider, Button, Link} from '@mui/joy';
import type {Project} from "../../models/project.ts";
import {keyframes} from "@emotion/react";

// Helper function to create a URL-friendly slug from the project name
const createSlug = (name: string): string => {
    return encodeURIComponent(name);
};

// Define fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export type ProjectCardProps = {
    project: Project;
    index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, index}) => {
    const projectUrl = `/projects/${createSlug(project.name)}`;
    
    return (
        <Card
            sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                animation: `${fadeIn} 0.5s ease-out ${(index ?? 0) * 0.15}s both`,
                // Prefers-reduced-motion support for accessibility
                '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none',
                },
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 'md',
                },
            }}
        >
            <CardOverflow>
                <AspectRatio ratio={2}>
                    <img
                        src={project.banner.url}
                        alt={`${project.name} banner`}
                        style={{width: '100%', height: 'auto', objectFit: "cover"}}
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
                    <Button
                        variant={"outlined"} 
                        component={Link} 
                        href={projectUrl}>
                        Learn more
                    </Button>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}
export { ProjectCard }
