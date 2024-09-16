const accessKey = "NfWOJbdHMmb1P-MhYvDxC5IeXneHXP5U5mH2Pg3Lsg4";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_pages=12`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank"; 

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });


        if (data.total_pages > page) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
        
    } catch (error) {
        console.error("Error fetching data from Unsplash API:", error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
