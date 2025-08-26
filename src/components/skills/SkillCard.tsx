import React from 'react';
import type {Skill} from "../../models/skill.ts";
import {Box, Card, Grid, Link, Stack, Typography} from "@mui/joy";
import {alpha, darken, lighten} from "@mui/system";

const CARD_HEIGHT = 100;

export type SkillCardProps = {
    skill: Skill
}

const SkillCard: React.FC<SkillCardProps> = ({skill}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                width: "100%",
                height: CARD_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(skill.color.hex, 0.08),
                backgroundImage: `linear-gradient(135deg, ${alpha(lighten(skill.color.hex, 0.25), 0.2)}, ${alpha(darken(skill.color.hex, 0.2), 0.4)})`,
                border: "none",
                padding: 0,
                overflow: 'hidden',
                position: "relative"
            }}
            component={Link}
            href={skill.link}
        >
            <Box p={2}>
                <img src={skill.logo.url} alt={skill.name} width={"100%"}/>
            </Box>
            <Box
                width={"120%"}
                minHeight={"140%"}
                sx={{
                    position: 'absolute',
                    backgroundImage: `url(${skill.logo.url})`,
                    backgroundSize: '60%',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    opacity: 0.05,
                    transform: 'rotate(-20deg)',
                    zIndex: 0,
                }}
            />
        </Card>
    );
}
export {SkillCard}