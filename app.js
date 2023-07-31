// Require MongoDB language driver
const { MongoClient } = require ("mongodb");

// Import the value of uri to your Atlas connection string.
const uri = require("./atlas_uri");

console.log(uri);

// Create the MongoClient instance
const client = new MongoClient(uri)

const dbname = "bank"
const collection_name = "accounts"

const accountCollection = client.db(dbname).collection(collection_name)

//Conect to db
const connectToDatabase = async () => {
    try{
        await client.connect();
        console.log(`Connected to the ${dbname} database ✔`);
    } catch(err) {
        console.error(`Error connecting to tha database ${dbname} ❌`);
    }
};

//
const sampleAccount = [
    {
        account_id: "MDB011235813",
        account_holder: "Ada Lovelace",
        account_type: "checking",
        balance: 60218,
    },
    {
        account_id: "MDB829000001",
        account_holder: "Muhammad ibn Musa al-Khwarizmi",
        account_type: "saving",
        balance: 267914296,
    }
]
// Establishes a connection to the database using the MongoClient instance
const main = async () => {
    try{
        await connectToDatabase();
        let result = await accountCollection.insertMany(sampleAccount)
        console.log(`Inserted ${result.insertedCount} documents`)
        console.log(result)
    } catch(err){
        console.error(`Error connecting to tha database ${dbname} ❌`);
    } finally {
        await client.close();
    }
};

main();

/*otra forma de hacerlo
// Require MongoDB language driver
const { MongoClient } = require("mongodb")

// Set the value of uri to your Atlas connection string.
const uri = 'mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.hyezcky.mongodb.net'

// Create the MongoClient instance
const client = new MongoClient(uri)

// Establishes a connection to the database using the MongoClient instance
const main = async () => {
   try {
      await client.connect()
      console.log("Connected to MongoDB Atlas!")
      // list out all the databases in the cluster
      const dbs = await client.db().admin().listDatabases()
      console.table(dbs.databases)
   } catch (error) {
      console.error(error)
   } finally {
      await client.close()
   }
}

// Run the  function, catch any errors and finally close the connection when the main function is done
main()
   .catch((err) => console.log(err))
   .finally(() => client.close())

*/
