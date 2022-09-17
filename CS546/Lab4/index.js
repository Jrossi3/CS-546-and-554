const bands = require("./data/bands")
const connection = require("./config/mongoConnection")

async function main() {
    helper = ""
    helper1 = ""
    try {
        const pinkFloyd = await bands.create("Pink Floyd", 
        ["Progressive Rock", "Psychedelic rock", "Classic Rock"], 
        "http://www.pinkfloyd.com", "EMI", ["Roger Waters", 
        "David Gilmour", "Nick Mason", "Richard Wright", 
        "Sid Barrett" ], 1965);
        helper = pinkFloyd._id
        console.log(pinkFloyd);
    } catch(e) {
        console.log(e)
    }
    try {
        const beatles = await bands.create("The Beatles", 
        ["Rock", "Pop", "Psychedelia"], 
        "http://www.thebeatles.com", "Parlophone", 
        ["John Lennon", "Paul McCartney", "George Harrison", 
        "Ringo Starr"], 1960);
        helper1 = beatles._id
        console.log(beatles);
    } catch (e) {
        console.log(e)
    }
    try{
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch(e) {
        console.log(e)
    }
    try {
        const linkinpark = await bands.create("Linkin Park", 
        ["Alternative Rock", "Pop Rock", "Alternative Metal"], 
        "http://www.linkinpark.com", "Warner", 
        ["Chester Bennington", "Rob Bourdon", "Brad Delson", 
        "Mike Shinoda", "Dave Farrell", "Joe Hahn"], 1996);
        console.log(linkinpark);
    } catch (e) {
        console.log(e)
    }
    try {
        const renamedBeatles = await bands.rename(helper, "Pink Floyd"); 
        console.log(renamedBeatles);
    } catch(e) {
        console.log(e)
    }
    try {
        const removeBeatles = await bands.remove(helper1); 
        console.log(removeBeatles); 
    } catch(e) {
        console.log(e)
    }
    try{
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch(e) {
        console.log(e)
    }
    try {
        const extra = await bands.create("Extra", 
        ["Alternative Rock"], 
        "http://www.li.com", "W", 
        ["Joe Hahn"], 1996);
        console.log(extra);
    } catch (e) {
        console.log(e)
    }
    try {
        const removeExtra = await bands.remove("123456789"); 
        console.log(removeExtra); 
    } catch(e) {
        console.log(e)
    }
    try {
        const renameFailed = await bands.rename("123334525364213", "Lennon's Boys"); 
        console.log(renameFailed);
    } catch(e) {
        console.log(e)
    }
    try {
        const renameFailed = await bands.rename(helper, ""); 
        console.log(renameFailed);
    } catch(e) {
        console.log(e)
    }
    try {
        const getFail = await bands.get("123456543234565trqafg"); 
        console.log(getFail);
    } catch(e) {
        console.log(e)
    }
    const db = await connection.connectToDb();
    await connection.closeConnection();
    console.log('Done!')
}
main();
