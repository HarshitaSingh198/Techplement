// Selecting elements from the DOM
const newQuoteButton = document.getElementById('newQuoteButton');
const quoteDisplay = document.getElementById('quoteDisplay');
const authorDisplay = document.getElementById('authorDisplay');
const searchButton = document.getElementById('searchButton');
const authorSearch = document.getElementById('authorSearch');
const searchResults = document.getElementById('searchResults');

// Function to get a random quote
function getRandomQuote() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      quoteDisplay.textContent = `"${data.content}"`;
      authorDisplay.textContent = `— ${data.author}`;
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
      quoteDisplay.textContent = 'Failed to load quote';
    });
}

// Function to search quotes by author
function searchQuotesByAuthor() {
  const author = authorSearch.value.trim();
  if (!author) {
    searchResults.innerHTML = '<p>Please enter an author name</p>';
    return;
  }

  const encodedAuthor = encodeURIComponent(author);
  fetch(`https://api.quotable.io/quotes?author=${encodedAuthor}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        searchResults.innerHTML = data.results.map(quote => 
          `<p>"${quote.content}" — ${quote.author}</p>`
        ).join('');
      } else {
        searchResults.innerHTML = `<p>No quotes found for ${author}</p>`;
      }
    })
    .catch(error => {
      console.error('Error searching quotes:', error);
      searchResults.innerHTML = '<p>Failed to search quotes</p>';
    });
}

// Event listeners
newQuoteButton.addEventListener('click', getRandomQuote);
searchButton.addEventListener('click', searchQuotesByAuthor);

// Fetch initial quote on page load
getRandomQuote();
