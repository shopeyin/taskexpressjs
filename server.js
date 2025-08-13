const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("✅ DB CONNECTION SUCCESSFUL");
  })
  .catch((err) => {
    console.error("❌ DB CONNECTION FAILED", err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
