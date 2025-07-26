import {gql} from 'graphql-request';
import type {Profile} from '../models/profile.ts';
import type {Project} from "../models/project.ts";
import type {Experience} from "../models/experience.ts";
import type {Skill} from "../models/skill.ts";
import type {Interest} from "../models/interest.ts";

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

export const GET_SKILLS = gql`
  query GetSkills($first: Int, $skip: Int) {
    skills(first: $first, skip: $skip) {
      name
      type
      level
      color {
        hex
        rgba {
            r
            g
            b
            a
        }
      }
      logo {
        url
      }
      link
    }
  }
`;

export const GET_INTERESTS = gql`
  query GetInterests($first: Int, $skip: Int) {
    interests(first: $first, skip: $skip) {
      name
      link
      images {
        url
      }
    }
  }
`;


export interface GetProfileResponse {
    profiles: Profile[];
}

export interface GetProjectsResponse {
    projects: Project[];
}

export interface GetProjectByNameResponse {
    project: Project;
}

export interface GetExperiencesResponse {
    experiences: Experience[];
}

export interface GetSkillsResponse {
    skills: Skill[];
}

export interface GetInterestsResponse {
    interests: Interest[];
}