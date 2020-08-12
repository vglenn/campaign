const express = require("express");
const bodyParser = require("body-parser");

let mailshake = require("mailshake-node")(
  "beb79ed4-85ca-48b8-a1e5-b059c6f9ba2c"
);
let PushHandler = require("mailshake-node").PushHandler;

const errorController = require("./controllers/error");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const routes = require("./routes/routes");

app.use(routes);

// Set up how your site is being hosted
let handler = new PushHandler(mailshake, {
  baseUrl: "https://mailshake-test.ngrok.io",
  rootPath: "pushes",
  secret: "my-secret",
});

// Listen when pushes are received and take action
handler.on("push", (push) => {
  console.log(JSON.stringify(push, null, 2));
});

// Listen when there was some kind of error handling a push
handler.on("pushError", (err) => {
  console.error(`${err.code}: ${err.stack}`);
});

// Hook it up
handler.hookExpress(app);

app.use(errorController.get404);

app.listen(3000, () => {
  console.log("Listening ..");
});
