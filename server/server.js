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

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
