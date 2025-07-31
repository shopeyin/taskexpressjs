const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// console.log(app.get("env"));
// console.log(process.env);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
