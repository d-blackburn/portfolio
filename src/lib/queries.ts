import {gql} from 'graphql-request';
import type {Profile} from '../models/profile.ts';
import type {Project} from "../models/project.ts";
import type {Experience} from "../models/experience.ts";

// Query to fetch user data
export const GET_PROFILE = gql`
  query GetProfile {
    profiles(first: 1) {
      avatar {
        url
      }
      firstName
      surname
      jobTitle
      bio
      linkedin
      github
      email
    }
  }
`;

// Query to fetch projects data
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      name
      description
      roleOnProject
      details
      banner {
        url
      }
      logo {
        url
      }
      startDate
      endDate
      company {
        name
        jobTitle
        jobType
      }
    }
  }
`;

// Query to fetch a single project by name
export const GET_PROJECT_BY_NAME = gql`
  query GetProjectByName($name: String!) {
    project(where: {name: $name}) {
      name
      description
      details {
        markdown
      }
      banner {
        url
      }
      logo {
        url
      }
      startDate
      endDate
      company {
        name
        logo {
          url
        }
      }
    }
  }
`;

// Query to fetch experiences data
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      name
      overview
      subheading
      details
      date
      type
    }
  }
`;

// Type for the response from the GetUser query
export interface GetProfileResponse {
    profiles: Profile[];
}

// Type for the response from the GetProjects query
export interface GetProjectsResponse {
    projects: Project[];
}

// Type for the response from the GetProjectByName query
export interface GetProjectByNameResponse {
    project: Project;
}

// Type for the response from the GetProjects query
export interface GetExperiencesResponse {
    experiences: Experience[];
}