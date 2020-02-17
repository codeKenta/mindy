import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk'
import { app } from './app'

const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas'
)

// const experiences = mongoClient.db('mindy-db').collection('experiences')
const experiences = mongoClient
  .db(process.env.GATSBY_DB_NAME)
  .collection(process.env.GATSBY_COLLECTION_NAME)

export { experiences }
