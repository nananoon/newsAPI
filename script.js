//Api Used: http://newsapi.org/
let apiKey = "f38f616c4b98433d96a9f2a542f8538d";
const newsContainer = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "us"; // "id" for Indonesia
const options = [
    "politics", 
    "entertainment", 
    "sports",
    "health", 
    "science", 
    "technology",
];
// 100 reqs/day
let requestURL; 

const generateUI = (articles) => { // Create cards from data // creating function: generateUI
    newsContainer.innerHTML = ""; // Clear previous news before adding new ones
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div
        class="news-image-container">
        <img width="400px"src="${item.urlToImage || "./newspaper.jpg"}"
        alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        </div>`;
       // console.log(card);
        newsContainer.appendChild(card);
    }   
};

// Create category options
const createOptions = () => {
    options.forEach(category => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        button.addEventListener("click", () => {
            requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
            getNews();
        });
        optionsContainer.appendChild(button);
    });
};

const init = () => {
    optionsContainer.innerHTML = "";
    createOptions();
    getNews();
}; 

// NewsAPI Call 
const getNews = async () => {
    newsContainer.innerHTML = "<p>Loading...</p>";
    try {
        let response = await fetch(requestURL);
        if (!response.ok) {
            newsContainer.innerHTML = "<p>Data unavailable at the moment. Please try again later.</p>";
            return;
        }
        let data = await response.json();
        console.log(data);

        generateUI(data.articles);
    } catch (error) {
        console.log("Error fetching news:", error);
        newsContainer.innerHTML = "<p>An error occurred. Please try again later.</p>";
    }
};      

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
}; 