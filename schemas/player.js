const { UserInputError, AuthenticationError, gql } = require('apollo-server-express')
const Player = require('../models/player')
const User = require('../models/user')

const typeDef = gql`
  extend type Query {
    playerCount: Int!
    topTotalPlayers (amount: Int): [Player!]!
    topShooterPlayers (amount: Int): [Player!]!
    topBlasterPlayers (amount: Int): [Player!]!
    topRollerPlayers (amount: Int): [Player!]!
    topChargerPlayers (amount: Int): [Player!]!
    topSlosherPlayers (amount: Int): [Player!]!
    topSplatlingPlayers (amount: Int): [Player!]!
    topDualiesPlayers (amount: Int): [Player!]!
    topBrellaPlayers (amount: Int): [Player!]!
  }
  extend type Mutation {
    updateTwitter(
      unique_id: String!
      twitter: String!
    ): Boolean
  }
  type Player {
    id: ID!
    name: String!
    unique_id: String!
    alias: String
    twitter: String
    discord_id: String
    weapons: [String!]!
    topTotal: [Placement!]!
    topTotalScore: Float
    topShooter: [Placement]
    topShooterScore: Float
    topBlaster: [Placement]
    topBlasterScore: Float
    topRoller: [Placement]
    topRollerScore: Float
    topCharger: [Placement]
    topChargerScore: Float
    topSlosher: [Placement]
    topSlosherScore: Float
    topSplatling: [Placement]
    topSplatlingScore: Float
    topDualies: [Placement]
    topDualiesScore: Float
    topBrella: [Placement]
    topBrellaScore: Float
  }
`
const resolvers = {
  Query: {
    playerCount: () => Player.collection.countDocuments(),
    topTotalPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }
      
      return Player
        .find({ topTotalScore: { $ne: null} })
        .sort({ "topTotalScore": "desc" })
        .limit(args.amount)
        .populate("topTotal", {"unique_id": 0})
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    },
    topShooterPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topShooterScore: { $ne: null} })
        .sort({ "topShooterScore": "desc" })
        .limit(args.amount)
        .populate("topShooter", {"unique_id": 0})
    },
    topBlasterPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topBlasterScore: { $ne: null} })
        .sort({ "topBlasterScore": "desc" })
        .limit(args.amount)
        .populate("topBlaster", {"unique_id": 0})
    },
    topRollerPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topRollerScore: { $ne: null} })
        .sort({ "topRollerScore": "desc" })
        .limit(args.amount)
        .populate("topRoller", {"unique_id": 0})
    },
    topChargerPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topChargerScore: { $ne: null} })
        .sort({ "topChargerScore": "desc" })
        .limit(args.amount)
        .populate("topCharger", {"unique_id": 0})
    },
    topSlosherPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topSlosherScore: { $ne: null} })
        .sort({ "topSlosherScore": "desc" })
        .limit(args.amount)
        .populate("topSlosher", {"unique_id": 0})
    },
    topSplatlingPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topSplatlingScore: { $ne: null} })
        .sort({ "topSplatlingScore": "desc" })
        .limit(args.amount)
        .populate("topSplatling", {"unique_id": 0})
    },
    topDualiesPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topDualiesScore: { $ne: null} })
        .sort({ "topDualiesScore": "desc" })
        .limit(args.amount)
        .populate("topDualies", {"unique_id": 0})
    },
    topBrellaPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topBrellaScore: { $ne: null} })
        .sort({ "topBrellaScore": "desc" })
        .limit(args.amount)
        .populate("topBrella", {"unique_id": 0})
    },
  },
  Mutation: {
    updateTwitter: async (root, args, ctx) => {
      if (ctx.user.discord_id !== process.env.ADMIN_ID) throw new AuthenticationError('not admin')

      const player = await Player.findOne({ unique_id: args.unique_id.trim() }).catch(e => {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      })

      if (!player) throw new UserInputError

      player.twitter = args.twitter.trim().toLowerCase()

      try {
        await player.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
      return true
    }
  },
  Player: {
    discord_id: async (root) => {
      if (!root.twitter) return null
      const user = await User
        .findOne({ twitter_name: root.twitter })
        .catch(e => {
          throw new UserInputError, {
            invalidArgs: args,
          }
        })

      if (!user) return null
      
      return user.discord_id
    }
  }
}

module.exports = {
  Player: typeDef,
  playerResolvers: resolvers
}