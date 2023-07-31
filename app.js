// Require MongoDB language driver
const { MongoClient, ObjectId } = require ("mongodb");

// Import the value of uri to your Atlas connection string.
const uri = require("./atlas_uri");

console.log(uri);

// Create the MongoClient instance
const client = new MongoClient(uri)

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

//Conect to db
const connectToDatabase = async () => {
    try{
        await client.connect();
        console.log(`Connected to the ${dbname} database ✔`);
    } catch(err) {
        console.error(`Error connecting to tha database ${dbname} ❌`);
    }
};

/* Insertando documentos a la base de datos
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
*/

// Agregando un filtro de busqueda
// const  documentsToFind = { balance: { $gt: 4700 } }
// const  documentToFind = { _id: new ObjectId("64c71e126c46f5da589d0725") }

/* actualizando un documento
const documentToUpdate = { _id: new ObjectId("64c71e126c46f5da589d0725")}
// operacion to performe -> realizar la actualización del documento
const update = { $inc: { balance: 100 }}*/

/*actualizando varios documentos
const documentsToUpdate = { account_type: "checking" }
const update = { $push: {transfers_complete: "TR413308000" }}
*/

/* eliminando  un documento 
const documentToDelete = { _id: new ObjectId("64c71e126c46f5da589d0725")} */

/* Eliminando varios documentos */
const documentsToDelete = { balance: { $lt: 500 } }

// Establishes a connection to the database using the MongoClient instance
const main = async () => {
    try {
        await connectToDatabase();
        let result = await accountsCollection.deleteMany(documentsToDelete)
        result.deletedCount > 0
            ? console.log(`Delted ${result.deletedCount} documents`)
            : console.log("No documents deleted")
        // let result = await accountsCollection.deleteOne(documentToDelete)
        // result.deletedCount === 1
        // ? console.log("Delete one document")
        // : console.log("No documents deleted")
        // let result = await accountsCollection.updateMany(documentsToUpdate, update)
        // result.modifiedCount > 0
        //     ? console.log(`Update ${result.modifiedCount} documents`)
        //     : console.log("No documents updated")
        // let result = await accountsCollection.updateOne(documentToUpdate, update)
        // result.modifiedCount === 1
        //    ? console.log("Update one document")
        //    : console.log("No documents update")
        // let result = await accountsCollection.findOne(documentToFind)
        // console.log(`Found document`)
        // console.log(result)
        // let result = accountCollection.find(documentsToFind)
        // let docCount = accountCollection.countDocuments(documentsToFind)
        // await result.forEach((doc) => console.log(doc))
        // console.log(`Found ${await docCount} documents`)
        // let result = await accountCollection.insertMany(sampleAccount)
        // console.log(`Inserted ${result.insertedCount} documents`)
        // console.log(result)
    } catch(err){
        console.error(`Error deleting documents: ${err} ❌`);
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
