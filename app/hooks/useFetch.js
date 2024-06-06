export const fetchNewsData = async() => {
    const response = await fetch("https://newsapi.org/v2/everything?" +
        "q=Apple&" +
        "from=2024-05-06&" +
        "sortBy=popularity&" +
        "apiKey=a15ac9743c724ad79b87c31996c91095");
    const data = await response.json();
    return data.articles;
}