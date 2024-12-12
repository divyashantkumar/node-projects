const fs = require('fs');
const filePath = './tasks.json';


const command = process.argv[2];
const argument = process.argv[3];

/**
 * Finds the task with the given ID in the given array of tasks.
 * @param {number} id The ID of the task to be found.
 * @param {Array} tasks An array of tasks, each task being an object with the keys 'id', 'task', 'status', and 'comment'.
 * @returns {Object} The task with the given ID or null if not found.
 */
function findTask(id, tasks) {
    return tasks.find(t => t.id === id);
}

/**
 * Loads all tasks from the JSON file. If the file does not exist, it will return an empty array.
 * @returns {Array} An array of tasks, each task being an object with the keys 'id', 'task', 'status', and 'comment'.
 */
function loadTasks() {
    try {
        const buffer_data = fs.readFileSync(filePath);
        const stringified_JSON_data = buffer_data.toString('utf8');
        const json_data = JSON.parse(stringified_JSON_data);

        return json_data;
    } catch (error) {
        return [];
    }
}


/**
 * Saves all tasks to the JSON file.
 * @param {Array} tasks An array of tasks, each task being an object with the keys 'id', 'task', 'status', and 'comment'.
 */
function saveTask(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks));
}

/**
 * Removes the task with the given ID from the JSON file.
 * @param {number} id The ID of the task to be removed.
 */
function removeTask(id) {
    const tasks = loadTasks();
    const task = findTask(id, tasks);

    if (task) {  // if task exists
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        saveTask(tasks);

        console.log("Task removed");
    } else {
        console.log("Task Not Found! Please pass correct Id");
    }
}

/**
 * Updates the task with the given ID in the JSON file.
 * @param {number} id The ID of the task to be updated.
 * @param {string} updatedTask The new task value.
 */
function updateTask(id, updatedTask) {
    const tasks = loadTasks();
    const task = findTask(id, tasks);
    if (task) {  // if task exists
        const index = tasks.indexOf(task);
        tasks[index].task = updatedTask;

        saveTask(tasks);

        console.log("Task Updated Successfully");
    } else {
        console.log("Task Not Found! Please pass correct Id");
    }
}



if (command === "add") {     // add task to the JSON file
    const task = {
        id: Date.now(),
        task: argument,
        status: "todo", // todo/progress/done/halt
        comment: "",
    };

    const tasks = loadTasks();

    tasks.push({ ...task });

    saveTask(tasks);
} else if (command === "list") {  // list all the tasks to console
    const tasks = loadTasks();
    tasks.forEach(element => {
        console.log(element.id, " : ", element.task);
    });

} else if (command === "remove") {   // remove task from the JSON file
    removeTask(Number.parseInt(argument));
} else if (command === "update") {
    const updated_task = process.argv[4];
    const id = Number.parseInt(argument);

    updateTask(id, updated_task);
}

