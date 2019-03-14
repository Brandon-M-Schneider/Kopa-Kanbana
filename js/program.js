const editButton = document.querySelectorAll(".edit-button");
const removeButton = document.querySelectorAll(".remove-button");
const icebox = document.getElementById("icebox");
const inprogress = document.getElementById("in-progress")
const ul = document.querySelector("#icebox ul");
const inProgressUl = document.getElementById("working-tasks")
const addItemArea = document.getElementById("add-item");
const completedTasksUl = document.getElementById("completed-tasks");
const completedArea = document.getElementById("completed")
let userItems = [];
let inProgressItems = [];
let compItems = [];

icebox.addEventListener("click", (event) => {
    const li = event.target.parentNode;
    if (event.target.textContent == "Remove") {
        ul.removeChild(li)
    } else if (event.target.textContent == "Edit") {
        const span = li.firstElementChild;
        const input = document.createElement("input");
        input.type = "text";
        input.size = 28;
        input.value = span.textContent
        li.insertBefore(input, span);
        li.removeChild(span);
        event.target.textContent = "Save"
    } else if (event.target.textContent == "Save") {
        const input = li.firstElementChild;
        const span = document.createElement("span");
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        event.target.textContent = "Edit";
    } else if (event.target.textContent == "In-Progress") {
        event.target.textContent = "Mark Complete"
        inProgressUl.appendChild(li);
    }
})

addItemArea.addEventListener("click", () => {
    const content = document.getElementById("new-item");
    if (event.target.textContent == "Add" && content.value != "") {
        const li = document.createElement("li");
        li.innerHTML = `<span>${content.value}</span>
                        <br />
                        <button type="button">Edit</button>
                        <button type="buttom">Remove</button>
                        <button type="button">In-Progress</button>`
        ul.appendChild(li);
        li.style.transition = "all 0.5s ease-out";
        li.style.opacity = 0;
        li.style.overflow = "hidden";
        setTimeout(function () {
            li.style.opacity = 1
        }, 1)
        content.value = "";
    } else if (event.target.textContent == "Clear Input") {
        const remove = document.getElementById("new-item");
        remove.value = "";
    }
})

addItemArea.addEventListener("click", () => {
    if (event.target.textContent == "Save All") {
        userItems = [];
        inProgressItems = [];
        compItems = [];
        const spans = document.querySelectorAll("#icebox ul li span");
        const ipspans = document.querySelectorAll("#in-progress ul li span");
        const cspans = document.querySelectorAll("#completed-tasks li span");
        for (let i = 0; i < spans.length; i++) {
            userItems.push(spans[i].textContent);
        }
        for (let i = 0; i < ipspans.length; i++) {
            inProgressItems.push(ipspans[i].textContent);
        }
        for (let j = 0; j < cspans.length; j++) {
            compItems.push(cspans[j].textContent);
        }
        localStorage.setItem("list", JSON.stringify(userItems));
        localStorage.setItem("list2", JSON.stringify(inProgressItems));
        localStorage.setItem("list3", JSON.stringify(compItems));
        const iceboxHeader = document.getElementById("icebox-header")
        let savedHeading = document.createElement("h5");
        savedHeading.id = "sub-heading";
        savedHeading.textContent = "All Changes Saved";
        iceboxHeader.appendChild(savedHeading);
        setTimeout(function () {
            savedHeading = document.getElementById("sub-heading");
            savedHeading.style.transition = "all 0.5s ease-out"
            savedHeading.style.opacity = 0
        }, 2500)
        setTimeout(function () {
            savedHeading = document.getElementById("sub-heading");
            iceboxHeader.removeChild(savedHeading);
        }, 3000)
    }
})

if (localStorage.list.length > 2) {
    let yes = (localStorage.getItem("list").split(","))
    for (let i = 0; i < yes.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
<span>${yes[i].replace(/[^a-zA-Z0-9' ]/g, "")}</span>
<br />
<button type="button">Edit</button>
<button type=text>Remove</button>
<button type="button">In-Progress</button>`;
        ul.appendChild(li);
    }
}

if (localStorage.list2.length > 2) {
    let kk = (localStorage.getItem("list2").split(","))
    for (let i = 0; i < kk.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
    <span>${kk[i].replace(/[^a-zA-Z0-9' ]/g, "")}</span>
    <br />
    <button type="button">Edit</button>
    <button type=text>Remove</button>
    <button type="button">Mark Complete</button>`;
        inProgressUl.appendChild(li);
    }
}

if (localStorage.list3) {
if (localStorage.list3.length > 2) {
    let ok = (localStorage.getItem("list3").split(","))
    for (let i = 0; i < ok.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
    <span>${ok[i].replace(/[^a-zA-Z0-9' ]/g, "")}</span>
    <br />
    <button type="button">Delete Task</button>`;
        completedTasksUl.appendChild(li);
    }
}
}
inprogress.addEventListener("click", (event) => {
    const li = event.target.parentNode;
    if (event.target.textContent == "Remove") {
        inProgressUl.removeChild(li)
    } else if (event.target.textContent == "Edit") {
        const span = li.firstElementChild;
        const input = document.createElement("input");
        input.type = "text";
        input.size = 28;
        input.value = span.textContent
        li.insertBefore(input, span);
        li.removeChild(span);
        event.target.textContent = "Save"
    } else if (event.target.textContent == "Save") {
        const input = li.firstElementChild;
        const span = document.createElement("span");
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        event.target.textContent = "Edit";
    } else if (event.target.textContent == "Mark Complete") {
        const buttons = event.target.parentNode.querySelectorAll("button");
        buttons[0].textContent = "Delete Task";
        for (let j = 1; j < buttons.length; j++) {
            event.target.parentNode.removeChild(buttons[j]);
            completedTasksUl.appendChild(li)
        }
    }
})

completedArea.addEventListener("click", (event) => {
    const li = event.target.parentNode;
    if (event.target.textContent == "Delete Task") {
        completedTasksUl.removeChild(li)
    }
})







