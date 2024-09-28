document.addEventListener("DOMContentLoaded", () => {
    //first we target all the element we need and store them in a variable
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

//then we make a empty array to store our todos
    //localStorage.getItem('tasks') this will return a string but we cannot use string here like ||
    //so we use JSON.parse to convert string back into a JS object or array here an array of tasks
    //as if localStorage.getItem('tasks') returns null then JSON.parse throws a error for that case we use || [] to handel that case
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        renderTask(task)
    })

//now we add event listeners
    addTaskButton.addEventListener("click", () => {
        //here we trim the input
        const taskText = todoInput.value.trim();
        //now we add conditions
        if(taskText === "") {
            return alert("Please enter some task");
        }
        //with new task we have to add unique id to it
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        }
        //to push new task in array
        tasks.push(newTask);
        //saving the task in local storage
        saveTask()
        renderTask(newTask)
        //clear input after adding task
        todoInput.value = "";
        console.log(tasks)
    })

//function to render task from local storage to screen
    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id', 'task.id')
        if(task.completed){
            li.classList.add('completed')
        }
        li.innerHTML = `<span> ${task.text}</span>
                        <button>delete</button>
`

        li.addEventListener('click', (e)=>{
            if(e.target.tagName === "BUTTON") return;
                task.completed = !task.completed;
                li.classList.toggle('completed')
                saveTask()
        })
        li.querySelector('button').addEventListener('click', (e)=>{
            e.stopPropagation()   //to prevent toggle from firing (event bubbling)
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove()
            saveTask()
        })

        todoList.appendChild(li)
    }

//function to save task in local storage
    function saveTask(){
        //here in setItem key can be of any type(object, array, string, etc) but value can only be string
        //so for that we use JSON.stringfy to convert any other type to string
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})