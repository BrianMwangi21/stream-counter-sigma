const express = require("express");
const streamRoutes = require("./routes/streamRoutes");
const sequelize = require("./model/dbconfig");
const Stream = require("./model/stream");

// Default data
sequelize.sync({ force: true }).then(async () => {
  console.log("Database is ready...inserting default data...");
  const default_user_stream = {
    username: "stream-counter-sigma",
    streams: 1,
  };
  await Stream.create(default_user_stream);
  console.log("Default data inserted...");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    data: {
      status: 0,
      message: "Welcome to stream-counter-sigma",
      data: {},
    },
  });
});
app.use("/api/v1", streamRoutes.routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`stream-counter-sigma running at http://localhost:${PORT}`);
});
