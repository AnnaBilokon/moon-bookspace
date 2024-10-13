// Function to fetch book data from Google Books API
export default async function fetchFromGoogleBooks(query) {
	const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
	const data = await response.json();
	if (data.items && data.items.length > 0) {
	  const book = data.items[0].volumeInfo;
	  return {
		title: book.title,
		authors: book.authors,
		coverImage: book.imageLinks?.thumbnail,
		description: book.description,
		publishedDate: book.publishedDate,
	  };
	}
	return {};
  }
  
  // Function to fetch book data from Open Library API
  export async function fetchFromOpenLibrary(query) {
	const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
	const data = await response.json();
	if (data.docs && data.docs.length > 0) {
	  const book = data.docs[0];
	  return {
		title: book.title,
		authors: book.author_name,
		coverImage: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
		firstPublishYear: book.first_publish_year,
	  };
	}
	return {};
  }
  
  // Function to combine the data from both APIs
  export async function fetchBookData(query) {
	try {
	  // Send requests to both APIs concurrently
	  const [googleBooksData, openLibraryData] = await Promise.all([
		fetchFromGoogleBooks(query),
		fetchFromOpenLibrary(query),
	  ]);
  
	  // Merge the data (give Google Books priority for title, authors, and description)
	  const combinedData = {
		title: googleBooksData.title || openLibraryData.title,
		authors: googleBooksData.authors || openLibraryData.authors,
		coverImage: googleBooksData.coverImage || openLibraryData.coverImage,
		description: googleBooksData.description || 'Description not available.',
		publishedDate: googleBooksData.publishedDate || openLibraryData.firstPublishYear,
	  };
  
	  // Return the combined data
	  return combinedData;
	} catch (error) {
	  console.error("Error fetching book data:", error);
	  return { error: "Failed to fetch book data." };
	}
  }
  
  // Example usage
  fetchBookData('The Great Gatsby').then(book => {
	console.log(book);
	// Display book data in your app (e.g., in a modal window or a book detail page)
  });
  