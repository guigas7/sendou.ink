import { gql, DocumentNode } from "apollo-boost"

export interface UsersData {
  users: {
    discord_id: string
    discriminator: string
    twitter_name?: string
    username: string
  }[]
}

export const USERS: DocumentNode = gql`
  {
    users {
      username
      discriminator
      discord_id
      twitter_name
    }
  }
`
