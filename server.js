const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

quoteRouter = express.Router();
app.use("/api/quotes", quoteRouter);

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("app is listening on port " + PORT);
});

// app.get("/api/quotes/random", (req, res, next) => {
quoteRouter.get("/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.send({ quote: quote });
});

quoteRouter.get("/", (req, res, next) => {
  if (!req.query.hasOwnProperty("person")) {
    res.send({ quotes: quotes });
  } else {
    const filterQuote = quotes.filter(
      (element) => element.person === req.query.person
    );
    res.send({ quotes: filterQuote });
  }
});

quoteRouter.post("/", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    const newQuote = { quote: req.query.quote, person: req.query.person };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});
