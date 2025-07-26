import hygraphClient from './hygraph';
import {
    GET_PROFILE,
    GET_PROJECTS,
    GET_PROJECT_BY_NAME,
    type GetProfileResponse,
    type GetProjectsResponse,
    type GetProjectByNameResponse, type GetExperiencesResponse, GET_EXPERIENCES
} from './queries';
import type {Profile} from '../models/profile.ts';
import type {Project} from '../models/project.ts';
import type {Experience} from "../models/experience.ts";

// Fetch user data from Hygraph
export async function getProfile(): Promise<Profile> {
    try {
        const {profiles} = await hygraphClient.request<GetProfileResponse>(GET_PROFILE);
        if (!profiles[0]) {
            throw new Error('No user data found in Hygraph');
        }
        return profiles[0];
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data from Hygraph');
    }
}

// Fetch projects data from Hygraph
export async function getProjects(): Promise<Project[]> {
    try {
        const {projects} = await hygraphClient.request<GetProjectsResponse>(GET_PROJECTS);
        return projects || [];
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return [];
    }
}

// Fetch a single project by name from Hygraph
export async function getProjectByName(name: string): Promise<Project | null> {
    try {
        const {project} = await hygraphClient.request<GetProjectByNameResponse>(
            GET_PROJECT_BY_NAME,
            {name}
        );
        return project || null;
    } catch (error) {
        console.error(`Error fetching project with name "${name}":`, error);
        return null;
    }
}

// Fetch experiences data from Hygraph
export async function getExperiences(): Promise<Experience[]> {
    try {
        const {experiences} = await hygraphClient.request<GetExperiencesResponse>(GET_EXPERIENCES);
        return experiences || [];
    } catch (error) {
        console.error('Error fetching experiences data:', error);
        return [];
    }
}