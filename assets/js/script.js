const listContainer = document.getElementById("paginated-list");
const allItems = [...listContainer.children];
const listItems = [];


//filtering 

const filterButtonsContainer = document.getElementById("filters-container");
const filterButtons = [...filterButtonsContainer.children];

filterButtons.forEach(btn => {
    btn.classList.remove("active");
    btn.addEventListener("click", (e) => {
        listItems.forEach(item => {
            item.classList.add("hidden");
        });
        listItems.length = 0;
        allItems.forEach(item => {
            if (item.classList.contains(e.target.id)) {
                listItems.push(item)
            }
        });
        if (e.target.id === "all") {
            listItems.push(...allItems);
        }
        //e.target.classList.add("active");
        handlePaginationButtons();
        setActivePage(1);
    });
});

//pagination

const paginationButtonsContainer = document.getElementById("pagination-container");
const pgnButtons = [];
const maxItemsPerPage = 3;
const pageCount = () => Math.ceil(listItems.length / maxItemsPerPage);
let currentPage = 1;

function createButton(num) {
    const paginationBtn = document.createElement("button");
    paginationBtn.classList.add("btn", "btn--pagination");
    paginationBtn.textContent = num;
    paginationBtn.setAttribute("aria-label", "Page " + num);
    paginationButtonsContainer.appendChild(paginationBtn);
    pgnButtons.push(paginationBtn);
}

function handlePaginationButtons() {
    pgnButtons.length = 0;
    while (paginationButtonsContainer.firstChild) {
        paginationButtonsContainer.firstChild.remove();
    };
    for (let i = 1; i <= pageCount(); i++) {
        createButton(i);
    }
    pgnButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            setActivePage(pgnButtons.indexOf(btn) + 1);
        });
    });
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
    listItems.push(...allItems);
    listItems.forEach((item) => {
        item.classList.add("hidden");
    });
    handlePaginationButtons();
    setActivePage(1);
});