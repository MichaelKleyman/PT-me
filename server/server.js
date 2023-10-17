const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // res.setHeader(
  //   'Set-Cookie',
  //   cookie.serialize('cookieName', 'cookieValue', cookieOptions)
  // );

  res.send("Server is running!");
});

app.use("/auth", require("./auth"));
app.use("/api", require("./routes"));

// this matches all routes and all methods i.e a centralized error handler
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
