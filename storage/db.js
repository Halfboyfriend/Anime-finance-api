const { MongoClient } = require('mongodb')

const URI = "mongodb+srv://Devoid:devoid123@devoiddb.em84a8m.mongodb.net/?retryWrites=true&w=majority";

class DBClient{
    constructor(){
        this.client = new MongoClient(URI)

        try{
            this.client.connect()
            console.log('DATABASE CONNECTED SUCCESSFULLY')
        }catch(err){
            console.log(`Error: ${err}`)
        } finally{
            this.client.close();
        }

        this.db = this.client.db('AnimeFinance');
    }
}

const dbClient = new DBClient();
module.exports = dbClient;

