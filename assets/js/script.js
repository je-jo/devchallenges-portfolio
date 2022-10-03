//pagination

const paginationContainer = document.getElementById("container--pagination");
const paginatedList = document.getElementById("paginated-list");
const paginatedListItems = paginatedList.querySelectorAll("li");

const paginationLimit = 3;
const pageCount = Math.ceil(paginatedListItems.length / paginationLimit)
let currentPage;

function appendPageNumber(index) {
    const pageNumber = document.createElement("button");
    pageNumber.classList.add("btn", "btn--pagination");
    pageNumber.textContent = index;
    pageNumber.setAttribute("page-index", index)
    pageNumber.setAttribute("aria-label", "Page " + index);
    paginationContainer.appendChild(pageNumber)
}

const getNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i)
    }
}

window.addEventListener("load", () => {
    getNumbers();
});


