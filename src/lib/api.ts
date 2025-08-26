import hygraphClient from './hygraph';
import {
    GET_PROFILE,
    GET_PROJECTS,
    GET_PROJECT_BY_NAME,
    type GetProfileResponse,
    type GetProjectsResponse,
    type GetProjectByNameResponse, type GetExperiencesResponse, GET_EXPERIENCES, type GetSkillsResponse, GET_SKILLS,
    type GetInterestsResponse, GET_INTERESTS
} from './queries';
import type {Profile} from '../models/profile.ts';
import type {Project} from '../models/project.ts';
import type {Experience} from "../models/experience.ts";
import type {Skill} from "../models/skill.ts";
import type {Interest} from "../models/interest.ts";

const PAGE_SIZE = 10;

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

    let allProjects: Project[] = [];
    let skip = 0;
    let hasMore = true;
    
    try {
        while (hasMore) {
            const { projects } = await hygraphClient.request<GetProjectsResponse>(
                GET_PROJECTS,
                { first: PAGE_SIZE, skip }
            );

            allProjects = allProjects.concat(projects);
            hasMore = projects.length === PAGE_SIZE;
            skip += PAGE_SIZE;
        }

        return allProjects;
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return [];
    }
}

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

export async function getExperiences(): Promise<Experience[]> {
    try {
        const {experiences} = await hygraphClient.request<GetExperiencesResponse>(GET_EXPERIENCES);
        return experiences || [];
    } catch (error) {
        console.error('Error fetching experiences data:', error);
        return [];
    }
}

export async function getSkills(): Promise<Skill[]> {

    let allSkills: Skill[] = [];
    let skip = 0;
    let hasMore = true;
    
    try {

        while (hasMore) {
            const { skills } = await hygraphClient.request<GetSkillsResponse>(
                GET_SKILLS,
                { first: PAGE_SIZE, skip }
            );

            allSkills = allSkills.concat(skills);
            hasMore = skills.length === PAGE_SIZE;
            skip += PAGE_SIZE;
        }

        return allSkills || [];
    } catch (error) {
        console.error('Error fetching skills data:', error);
        return [];
    }
}

export async function getInterests(): Promise<Interest[]> {

    let allInterests: Interest[] = [];
    let skip = 0;
    let hasMore = true;

    try {

        while (hasMore) {
            const { interests } = await hygraphClient.request<GetInterestsResponse>(
                GET_INTERESTS,
                { first: PAGE_SIZE, skip }
            );

            allInterests = allInterests.concat(interests);
            hasMore = interests.length === PAGE_SIZE;
            skip += PAGE_SIZE;
        }

        return allInterests || [];
    } catch (error) {
        console.error('Error fetching interest data:', error);
        return [];
    }
}