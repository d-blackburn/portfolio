import { GraphQLClient } from 'graphql-request';

// Initialize the GraphQL client with the Hygraph API endpoint
const hygraphClient = new GraphQLClient(
  import.meta.env.PUBLIC_HYGRAPH_ENDPOINT || '',
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.PUBLIC_HYGRAPH_TOKEN}`,
    },
  }
);

export default hygraphClient;