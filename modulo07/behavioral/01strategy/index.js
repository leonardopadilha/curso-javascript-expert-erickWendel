import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postegresStrategy.js"

const postgresConnectionString = "postgres://leo:senha001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = "mongodb://leo:senha0002@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [{
    name: 'erickwendel',
    type: 'transaction'
}, {
    name: 'mariasilva',
    type: 'activitylog'
}]

/* await postgresContext.create(data[0].name)
console.log(await postgresContext.read()) */

/* await mongoDBContext.create({ name: data[1].name })
console.log(await mongoDBContext.read()) */

const contextTypes = {
    transaction: postgresContext,
    activitylog: mongoDBContext
}

for (const {type, name } of data) {
    const context = contextTypes[type]
    await context.create({ name: name + Date.now() })
    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}