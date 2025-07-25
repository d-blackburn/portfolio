﻿import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from './Home';
import type { Profile } from "../models/profile";
import type { Project } from "../models/project";

interface AppProps {
    profile: Profile;
    projects?: Project[];
}

// TabContent component that uses useParams to determine which tab to display
function TabContent({ profile, projects = [] }: AppProps) {
    const { tab } = useParams<{ tab?: string }>();
    const tabPaths = ['projects', 'experience', 'skills', 'interests'];
    
    // Determine the tab index based on the URL parameter
    const tabIndex = tab ? tabPaths.indexOf(tab) : 0;
    
    // If the tab parameter is invalid, redirect to the first tab
    if (tab && tabIndex === -1) {
        return <Navigate to="/projects" replace />;
    }
    
    return <Home profile={profile} projects={projects} tabParam={tabIndex} />;
}

export default function App({ profile, projects = [] }: AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to /projects */}
                <Route path="/" element={<Navigate to="/projects" replace />} />
                {/* Route for each tab */}
                <Route path="/:tab" element={<TabContent profile={profile} projects={projects} />} />
            </Routes>
        </BrowserRouter>
    );
}