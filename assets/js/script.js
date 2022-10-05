const listContainer = document.getElementById("paginated-list");
const listItems = [...listContainer.querySelectorAll("li")];
let filteredItems = listItems;

//filtering 

const filterButtonsContainer = document.getElementById("filters-container");
const filterButtons = [...filterButtonsContainer.children];

filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        filteredItems = [];
        listItems.forEach((item) => {
            item.classList.add("hidden");
            if (item.classList.contains(e.target.id)) {
                item.classList.remove("hidden");
            }
        }); 
    });
});




//pagination

const paginationButtonsContainer = document.getElementById("pagination-container");
const pgnButtons = [];
const maxItemsPerPage = 3;
const pageCount = Math.ceil(listItems.length / maxItemsPerPage);
let currentPage = 1;

function createButton(index) {
    const paginationBtn = document.createElement("button");
    paginationBtn.classList.add("btn", "btn--pagination");
    paginationBtn.textContent = index;
    paginationBtn.setAttribute("aria-label", "Page " + index);
    paginationButtonsContainer.appendChild(paginationBtn);
    pgnButtons.push(paginationBtn);
}

const createPaginationButtons = () => {
    for (let i = 1; i <= pageCount; i++) {
        createButton(i);
    }
}

function setActivePage(num) {
    currentPage = num;
    const lastOnPreviousPage = (num - 1) * maxItemsPerPage;
    const lastOnActivePage = num * maxItemsPerPage;
    listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= lastOnPreviousPage && index < lastOnActivePage) { //remember that index of item1 is 0;
            item.classList.remove("hidden");
        }
    });
    pgnButtons.forEach(btn => {
        btn.classList.remove("active");
        if ((pgnButtons.indexOf(btn) + 1) === currentPage) {
            btn.classList.add("active");
        }
    })
};





window.addEventListener("load", () => {
    listItems.forEach((item) => {
        item.classList.add("hidden");
    });
    createPaginationButtons();
    setActivePage(1);
    pgnButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            setActivePage(pgnButtons.indexOf(btn) + 1);
        })
    })
});