const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
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

app.get("/", (req, res) => {
  res.send("Hello Im from Backend");
});
app.listen(port, () => {
  console.log(`Server runnig on ${port}`);
});
