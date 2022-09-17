const people = require("./people")
const stocks = require("./stocks")

async function main(){
    try{
        const peopledata = await people.getPersonByID("");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("google.com.hk");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.manipulateIp();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(9, 25);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await stocks.listShareholders();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await stocks.totalShares(' ');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await stocks.listStocks(1,2);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await stocks.getStockByID();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

//call main
main();