import * as React from 'react';
import {Card, Typography, Link, CardContent, CardOverflow, ToggleButtonGroup, Button, Avatar} from '@mui/joy';
import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa";
import type {Profile} from "../models/profile.ts";


export interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({profile}: ProfileCardProps) {
    
    return (
        <Card variant="outlined" sx={{alignItems: 'center'}}>
            <CardContent sx={{justifyContent: 'center', textAlign: "center"}}>
                <Avatar src={profile.avatar.url} alt={"User Avatar"} sx={{m: "0 auto"}} size={"lg"}/>
                <Typography level="title-lg">{profile.firstName} {profile.surname}</Typography>
                <Typography level="body-sm">{profile.jobTitle}</Typography>
                <Typography level="body-md" sx={{mt: 2}}>
                    {profile.bio}
                </Typography>
            </CardContent>
            <CardOverflow variant="soft"
                          sx={{bgcolor: 'background.level1', borderTop: '1px solid', borderColor: 'divider'}}>
                <CardContent>
                    <ToggleButtonGroup spacing={1} variant={"outlined"} color={"neutral"}
                                       sx={{justifyContent: "center"}}>
                        <Button startDecorator={<FaGithub/>} component={Link} href={profile.github} target="_blank"
                                rel="noopener">GitHub</Button>
                        <Button startDecorator={<FaLinkedin/>} component={Link} href={profile.linkedin} target="_blank"
                                rel="noopener">LinkedIn</Button>
                        <Button startDecorator={<FaEnvelope/>} component={Link} href={`mailto:${profile.email}`}
                                target="_blank"
                                rel="noopener">Email</Button>
                    </ToggleButtonGroup>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}
