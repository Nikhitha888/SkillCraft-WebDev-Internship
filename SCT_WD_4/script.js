const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask(){

    if(taskInput.value === ""){
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${taskInput.value}</strong><br>
        ${taskDate.value} ${taskTime.value}
        <br><br>

        <button onclick="completeTask(this)">Complete</button>

        <button onclick="editTask(this)">Edit</button>

        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);

    saveTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

function deleteTask(button){
    button.parentElement.remove();
    saveTasks();
}

function completeTask(button){
    button.parentElement.classList.toggle("completed");
    saveTasks();
}

function editTask(button){

    const li = button.parentElement;

    const newTask = prompt("Edit task");

    if(newTask !== null){
        li.querySelector("strong").innerText = newTask;
    }

    saveTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks(){
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}

loadTasks();