
module.exports = {
    client: {
      includes: ['./components/**/*.js'],
      service: {
        name: 'me',
        localSchemaFile: '../backend/src/schema.graphql',
      },
    },
  }