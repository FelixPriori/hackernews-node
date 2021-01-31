const {ApolloServer} = require('apollo-server')
const fs = require('fs')
const path = require('path')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: 'link-1',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, {id}) => links.find((link) => link.id === id),
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const index = links.findIndex((link) => link.id === args.id)
      links[index] = {...args}
      return links[index]
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex((link) => link.id === args.id)
      const deletedLink = links.find((link) => link.id === args.id)
      links.splice(index, 1)
      return deletedLink
    },
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
})

server.listen().then(({url}) => console.log(`Server is running on ${url}`))
