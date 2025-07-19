const draggabble_list = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];

let dragStartIndex;

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class='number'>${index + 1}</span>
        <div class='draggable' draggable='true'>
            <p class='person-name'>${person}</p>
            <i class='fas fa-grip-lines'></i>
        </div>
        `;

      listItems.push(listItem);

      draggabble_list.appendChild(listItem);
    });

  addEventListeners();
}

createList();

function dragStart() {
  // console.log('Event: ' , 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  //   console.log('Event: ' , 'dragover');
  e.preventDefault();
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragDrop() {
  //   console.log("Event: ", "drop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function dragEnter() {
  //   console.log("Event: ", "dropenter");
  this.classList.add("over");
}

function dragLeave() {
  //   console.log("Event: ", "dropleave");
  this.classList.remove("over");
}

function checkItems() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkBtn.addEventListener("click", checkItems);
