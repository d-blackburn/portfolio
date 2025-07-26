import * as React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    Stack,
    CardOverflow,
    AspectRatio,
    CardCover,
    Container, Breadcrumbs, Link, IconButton, Button, MenuList, MenuItem
} from '@mui/joy';
import type {Project} from "../../models/project.ts";
import {FaAngleRight} from "react-icons/fa";
import { differenceInMonths} from "date-fns";
import {LabelTag} from "../LabelTag.tsx";
import {FaHouse} from "react-icons/fa6";

interface ProjectArticleProps {
    project: Project;
    children?: React.ReactNode;
}

const ProjectArticle: React.FC<ProjectArticleProps> = ({project, children}) => {
    
    if (!project) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography level="h3">Project not found</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth={"md"}>
            <Breadcrumbs separator={<FaAngleRight/>}>
                <IconButton color={"neutral"} component={Link} href={"/"}>
                    <FaHouse/>
                </IconButton>
                <Button variant={"plain"} color={"neutral"} component={Link} href={"/projects"}>
                    Projects
                </Button>
                <Button variant={"plain"} color={"neutral"} disabled>
                    {project.name}
                </Button>
            </Breadcrumbs>
            <Stack spacing={1} sx={{ mb: 4}}>
                <Card>
                    <CardOverflow>
                        <AspectRatio ratio={2}>
                            <img
                                src={project.banner.url}
                                alt={`${project.name} banner`}
                            />
                        </AspectRatio>
                        <CardCover
                            sx={{
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                            }}
                        />
                        <CardContent sx={{
                            position: "absolute",
                            bottom: '0',
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Box
                                component="img"
                                src={project.logo.url}
                                alt={`${project.name} logo`}
                                sx={{width: 120, height: 120, objectFit: "contain"}}
                                display={"flex"}
                            />
                            <Box>
                                <Typography level="h2" sx={{color: 'white'}}>
                                    {project.name}
                                </Typography>
                                <Typography level="body-lg" sx={{color: 'rgba(255,255,255,0.75)'}}>
                                    {project.description}
                                </Typography>
                            </Box>
                        </CardContent>
                        <Box sx={{position: 'absolute', top: 0, right: 0, mr: 1, mt: 1}}>
                            <LabelTag 
                                label={project.endDate === null ? "In Development" : "Completed"}
                                color={project.endDate === null ? "warning" : "success"}
                            />
                        </Box>
                        
                    </CardOverflow>
                </Card>
                <Stack direction="row" spacing={1}>
                    <LabelTag
                        type={"Company"}
                        label={project.company.name}
                    />
                    <LabelTag
                        type={"Role on Project"}
                        label={project.roleOnProject}
                        color={"success"}
                    />
                    <LabelTag
                        type={"Development time"}
                        label={`${differenceInMonths(project.endDate ?? new Date(), project.startDate)} months`}
                        color={"neutral"}
                    />
                </Stack>
                <Divider/>
                {children}
            </Stack>
        </Container>
    );
}
export { ProjectArticle }