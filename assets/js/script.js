//pagination

const paginationButtonsContainer = document.getElementById("pagination-container");
const buttons = [...paginationButtonsContainer.children];
const paginatedListContainer = document.getElementById("paginated-list");
const paginatedListContainerItems = paginatedListContainer.querySelectorAll("li");

const maxItemsPerPage = 3;
const pageCount = Math.ceil(paginatedListContainerItems.length / maxItemsPerPage);
let currentPage;

function createPaginationBtns(index) {
    const paginationBtn = document.createElement("button");
    paginationBtn.classList.add("btn", "btn--pagination");
    paginationBtn.textContent = index;
    paginationBtn.setAttribute("page-index", index)
    paginationBtn.setAttribute("aria-label", "Page " + index);
    paginationButtonsContainer.appendChild(paginationBtn)
}

const getNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
        createPaginationBtns(i);
    }
}

function setActivePage(pageNum) {
    currentPage = pageNum;
    const lastOnPreviousPage = (pageNum - 1) * maxItemsPerPage;
    const lastOnActivePage = pageNum * maxItemsPerPage;
    paginatedListContainerItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= lastOnPreviousPage && index < lastOnActivePage) {
            item.classList.remove("hidden");
        }
    })
}

window.addEventListener("load", () => {
    console.log("hello")
    getNumbers();
    setActivePage(1);
    const buttons = [...paginationButtonsContainer.children];
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            setActivePage(buttons.indexOf(btn) + 1)
        })
    })
});




