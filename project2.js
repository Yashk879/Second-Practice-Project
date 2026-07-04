let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

let add=document.querySelector(".add");
let input=document.querySelector(".input");

let count=document.querySelector(".count")
    function updateCount() {
    count.textContent = `Tasks: ${tasks.length}`;
}

input.addEventListener("keydown",function (e) {
    if (e.key==="Enter") {
        add.click();
    }
});

tasks.forEach(function(task){
    createTask(task);
});
updateCount();

function createTask(taskDetails) {

    let events=document.createElement("div");
    events.classList.add("events");

    let things=document.createElement("div");
    things.classList.add("things");

    let task=document.createElement("div");
    task.classList.add("task");

    let para=document.createElement("p");
    para.classList.add("para");
    para.textContent = taskDetails;

    let completed=document.createElement("button");
    completed.classList.add("completed");
    completed.textContent = "✔ Complete";

    let del=document.createElement("button");
    del.classList.add("del");
    del.textContent = "✖ Delete";

    task.appendChild(para);
    task.appendChild(completed);
    task.appendChild(del);
    things.appendChild(task);
    events.appendChild(things);
    document.body.appendChild(events);

    completed.addEventListener("click",function () {
        para.style.textDecoration="line-through";
        para.style.color="gray";
        completed.remove();
    });
    del.addEventListener("click",function(){

        tasks=tasks.filter(function(item) {
            return item!==para.textContent;
        });

        localStorage.setItem("tasks",JSON.stringify(tasks));
        events.classList.add("delete");
        updateCount();

        events.addEventListener("transitionend",function () {
            events.remove();
        },{ once:true});

    });
}

add.addEventListener("click",function(e) {
    e.preventDefault();
    if (input.value.trim()==="") {
        alert("Please Submit a Task");
        return;
    }

    tasks.push(input.value);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(input.value);
    updateCount();

    input.value="";
});
