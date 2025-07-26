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
    Container, Breadcrumbs, Link, IconButton, Button, MenuList, MenuItem, Chip
} from '@mui/joy';
import type {Project} from "../../models/project.ts";
import {FaAngleRight} from "react-icons/fa";
import {differenceInMonths} from "date-fns";
import {LabelTag} from "../LabelTag.tsx";
import {FaHouse} from "react-icons/fa6";
import type {Experience} from "../../models/experience.ts";

interface ExperienceArticleProps {
    experience: Experience;
    children?: React.ReactNode;
}

const ExperienceArticle: React.FC<ExperienceArticleProps> = ({experience, children}) => {

    return (
        <Container maxWidth={"md"} sx={{minHeight: "100vh", alignContent: "center"}}>
            <Breadcrumbs separator={<FaAngleRight/>}>
                <IconButton color={"neutral"} component={Link} href={"/"}>
                    <FaHouse/>
                </IconButton>
                <Button variant={"plain"} color={"neutral"} component={Link} href={"/experiences"}>
                    Experiences
                </Button>
                <Button variant={"plain"} color={"neutral"} disabled>
                    {experience.name}
                </Button>
            </Breadcrumbs>
            <Card>
                <CardOverflow sx={{pt: 2}}>
                    <Stack direction={"row"} spacing={2} sx={{alignItems: "center"}}>
                        <Typography level={"h1"} gutterBottom>
                            {experience.name}
                        </Typography>
                        <Chip color={"primary"}>{experience.type}</Chip>
                    </Stack>
                    <Typography level={"body-lg"} textColor={"text.tertiary"} gutterBottom>
                        {experience.subheading}
                    </Typography>
                </CardOverflow>
                <Divider/>
                {children}
            </Card>
        </Container>
    );
}
export {ExperienceArticle}