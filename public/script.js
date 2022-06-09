const quotes = [
  {
    quote:
      "We build our computer (systems) the way we build our cities: over time, without a plan, on top of ruins.",
    person: "Ellen Ullman",
  },
  {
    quote:
      "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
    person: "Anonymous",
  },
  {
    quote: `If it's a good idea, go ahead and do it. It's much easier to apologize than it is to get permission.`,
    person: "Grace Hopper",
  },
  {
    quote:
      "The city’s central computer told you?  R2D2, you know better than to trust a strange computer!",
    person: "C-3PO",
  },
  {
    quote:
      "I have always wished for my computer to be as easy to use as my telephone; my wish has come true because I can no longer figure out how to use my telephone.",
    person: "Bjarne Stroustrup",
  },
  {
    quote:
      "Understand well as I may, my comprehension can only be an infinitesimal fraction of all I want to understand.",
    person: "Ada Lovelace",
  },
  {
    quote: "Java is to JavaScript as ham is to hamster.",
    person: "Jeremy Keith",
  },
  {
    quote: `The most dangerous phrase in the language is, "We've always done it this way."`,
    person: "Grace Hopper",
  },
  {
    quote:
      "As soon as we started programming, we found to our surprise that it wasn’t as easy to get programs right as we had thought.  Debugging had to be discovered.  I can remember the exact instant when I realized that a large part of my life from then on was going to be spent in finding mistakes in my own programs.",
    person: "Maurice Wilkes",
  },
  {
    quote:
      "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.",
    person: "Bill Gates",
  },
  {
    quote:
      "What one programmer can do in one month, two programmers can do in two months.",
    person: "Fred Brooks",
  },
  {
    quote: "The Internet? Is that thing still around?",
    person: "Homer Simpson",
  },
  {
    quote:
      "If you tell me precisely what it is a machine cannot do, then I can always make a machine which will do just that.",
    person: "Jon von Neumann",
  },
];

const fetchAllButton = document.getElementById("fetch-quotes");
const fetchRandomButton = document.getElementById("fetch-random");
const fetchByAuthorButton = document.getElementById("fetch-by-author");

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.querySelector(".quote");
const attributionText = document.querySelector(".attribution");

const resetQuotes = () => {
  quoteContainer.innerHTML = "";
};

const renderError = (response) => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
};

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach((quote) => {
      const newQuote = document.createElement("div");
      newQuote.className = "single-quote";
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = "<p>Your request returned no quotes.</p>";
  }
};

fetchAllButton.addEventListener("click", () => {
  fetch("/api/quotes")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      renderQuotes(response.quotes);
    });
});

fetchRandomButton.addEventListener("click", () => {
  fetch("/api/quotes/random")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      renderQuotes([response.quote]);
    });
});

fetchByAuthorButton.addEventListener("click", () => {
  const author = document.getElementById("author").value;

  const filterQuotes = quotes.filter((element) => {
    return element.person === author;
  });

  console.log(filterQuotes);

  fetch(`/api/quotes?person=${author}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      renderQuotes(response.quotes);
    });
});
