import React, {useCallback} from 'react';
import {
    Timeline, TimelineConnector, TimelineContent, TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    timelineOppositeContentClasses,
    TimelineSeparator
} from "@mui/lab";
import type {Experience} from "../../models/experience.ts";
import {Box, Button, Card, CardContent, CardOverflow, Chip, Divider, Link, Stack, Typography, useTheme} from "@mui/joy";
import {FaHouse} from "react-icons/fa6";
import {FaCode, FaGraduationCap, FaHeart} from "react-icons/fa";
import {keyframes} from "@emotion/react";

export type ExperienceTimelineProps = {
    experiences: Experience[];
}

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

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({experiences}) => {
    const theme = useTheme();
    
    // Sort experiences by date (newest first)
    const sortedExperiences = [...experiences].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    // Format date to get month name
    const getMonthName = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'short' });
    };
    
    const getIconFromType = useCallback((type: string) => {
        switch (type) {
            case "personal":
                return <FaHeart/>;
            case "career":
                return <FaCode/>
            case "education":
                return <FaGraduationCap/>
            default:
                return <FaHouse/>
        } 
    }, [])
    
    const getColourFromType = useCallback((type: string) => {
        switch (type) {
            case "personal":
                return "error";
            case "career":
                return "success"
            case "education":
                return "primary"
            default:
                return "inherit"
        }
    }, [])
    
    const getTypeLabel = useCallback((type: string) => {
        switch (type) {
            case "personal":
                return "Personal";
            case "career":
                return "Career";
            case "education":
                return "Education";
            default:
                return "Other";
        }
    }, [])
    
    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                    [theme.breakpoints.down('sm')]: {
                        flex: 0.3,
                    },
                },
                '& .MuiTimelineItem-root': {
                    minHeight: '120px',
                    [theme.breakpoints.down('sm')]: {
                        minHeight: '100px',
                    },
                },
                '& .MuiTimelineConnector-root': {
                    width: '3px',
                    backgroundImage: 'linear-gradient(to bottom, var(--joy-palette-primary-500), var(--joy-palette-primary-200))',
                },
            }}
        >
            {sortedExperiences.map(((experience, i) => (
                // Using name and date as part of the key for better uniqueness
                <TimelineItem key={`${experience.name}-${experience.date}-${i}`} sx={{
                    animation: `${fadeIn} 0.5s ease-out ${i * 0.15}s both`,
                    // Prefers-reduced-motion support for accessibility
                    '@media (prefers-reduced-motion: reduce)': {
                        animation: 'none',
                    },
                }}>
                    <TimelineOppositeContent color="textSecondary">
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Typography 
                                level="title-sm" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    color: `var(--joy-palette-${getColourFromType(experience.type)}-600)`,
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '0.75rem',
                                    },
                                }}
                            >
                                {getMonthName(experience.date)}
                            </Typography>
                            <Typography 
                                level="title-lg" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    lineHeight: 1,
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '1.25rem',
                                    },
                                }}
                            >
                                {new Date(experience.date).getFullYear()}
                            </Typography>
                        </Box>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot 
                            variant="outlined" 
                            color={getColourFromType(experience.type)}
                            sx={{ 
                                boxShadow: 'md',
                                p: 1.5,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: 'lg',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    p: 1,
                                },
                            }}
                        >
                            {getIconFromType(experience.type)}
                        </TimelineDot>
                        {i < sortedExperiences.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ 
                        py: '12px', 
                        px: 2,
                        [theme.breakpoints.down('sm')]: {
                            py: '8px',
                            px: 1,
                        },
                    }}>
                        <Card
                            sx={{
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    boxShadow: 'md',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    level="title-lg"
                                    textColor="text.primary"
                                    sx={{
                                        fontWeight: 'bold',
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '1rem',
                                        },
                                    }}
                                >
                                    {experience.name}
                                </Typography>
                                <Typography
                                    level="body-md"
                                    textColor="text.secondary"
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                >
                                    {experience.overview}
                                </Typography>
                            </CardContent>
                            <CardOverflow sx={{bgcolor: "background.level1"}}>
                                <Divider inset={"context"}/>
                                <CardContent  sx={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                    <Button variant={"outlined"} component={Link} href={`/experiences/${encodeURIComponent(experience.name)}`}>
                                        Learn more
                                    </Button>
                                </CardContent>
                            </CardOverflow>
                        </Card>
                    </TimelineContent>
                </TimelineItem>
            )))}
        </Timeline>
    )
}
export { ExperienceTimeline }