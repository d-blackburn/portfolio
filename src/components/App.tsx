import * as React from 'react';
import {BrowserRouter, Routes, Route, Navigate, useParams} from 'react-router-dom';
import Home from './Home';
import type {Profile} from "../models/profile";
import type {Project} from "../models/project";
import type {Experience} from "../models/experience.ts";
import type {Skill} from "../models/skill.ts";
import type {Interest} from "../models/interest.ts";

interface AppProps {
    profile: Profile;
    projects: Project[];
    experiences: Experience[];
    skills: Skill[];
    interests: Interest[];
}

// TabContent component that uses useParams to determine which tab to display
function TabContent({profile, projects = [], experiences = [], skills = [], interests = []}: AppProps) {
    const {tab} = useParams<{ tab?: string }>();
    const tabPaths = ['experiences', 'skills', 'projects', 'interests'];

    // Determine the tab index based on the URL parameter
    const tabIndex = tab ? tabPaths.indexOf(tab) : 0;

    // If the tab parameter is invalid, redirect to the first tab
    if (tab && tabIndex === -1) {
        return <Navigate to="/experiences" replace/>;
    }

    return <Home profile={profile} projects={projects} experiences={experiences} skills={skills} interests={interests} tabParam={tabIndex}/>;
}

export default function App({profile, projects = [], experiences = [], skills = [], interests = []}: AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to /projects */}
                <Route path="/" element={<Navigate to="/experiences" replace/>}/>
                {/* Route for each tab */}
                <Route path="/:tab" element={
                    <TabContent
                        profile={profile}
                        projects={projects}
                        experiences={experiences}
                        skills={skills}
                        interests={interests}
                    />
                }/>
            </Routes>
        </BrowserRouter>
    );
}