const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const sweet = data.sweets
const users = data.users
const mongoCollections = require('../config/mongoCollections');
// const users = mongoCollections.users;
async function main(){
    const db = await dbConnection()
    await db.dropDatabase()
    for(let i = 0; i < 10; i++){
        let userTwo = await users.createSweetsUser("stevens", "jaso", "jason")
        try {
            let userOne = await sweet.createSweet("hi", "happy", userTwo)
        } catch (error) {
            return
        }
    }
    console.log("Done seeding the database")
    await db.s.client.close()
}
main()