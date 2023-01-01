const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const { query } = require("express");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://QbucketTodo:oBZvIUaGqRVG1sYg@cluster0.chgrg5k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function dbConnect() {
  try {
    client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
}

dbConnect().catch((err) => console.log(err.message));

const taskCollection = client.db("QbucketTodoDb").collection("tasks");

app.post("/addtask", async (req, res) => {
  try {
    const task = req.body;
    const result = await taskCollection.insertOne(task);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});
app.delete("/addtask/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await taskCollection.deleteOne(query);
  res.send(result);
});
app.put("/addtask/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: {
      todaytask: "complete",
    },
  };
  const result = await taskCollection.updateOne(query, updatedDoc, options);
  res.send(result);
});

app.get("/addtask", async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  const result = await taskCollection.find(query).toArray();
  res.send(result);
});
app.get("/", (req, res) => {
  res.send("Hello Im from Backend");
});
app.listen(port, () => {
  console.log(`Server runnig on ${port}`);
});
