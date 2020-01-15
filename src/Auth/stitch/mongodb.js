import { RemoteMongoClient } from "mongodb-stitch-browser-sdk"
import { app } from "./app"

const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
)

const items = mongoClient.db("mindy-db").collection("experiences")

export { items }
