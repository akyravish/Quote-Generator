const quoteContainer = document.getElementById("quotes-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quotes from the API

async function getQuote() {
  loading();
  const proxyUrl = "https://cryptic-springs-95911.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // Show unknown if there is no author
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce the size if quote is too long
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    complete();
  } catch (error) {
    getQuote();
  }
}

// Twitter function
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event listner
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load

getQuote();
