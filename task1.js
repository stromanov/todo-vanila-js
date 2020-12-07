const inputField = document.querySelector("input#value-to-save");
const btn = document.querySelector("button#submite");
const btnDelete = document.querySelector("button#delete");

const filterAll = document.querySelector("button#filter-all");
const filterProcess = document.querySelector("button#filter-process");
const filterCompleted = document.querySelector("button#filter-completed");

const filter = (tasks, type = "tasks") => {
  if (type == "tasksProcess") {
    let clearTasks = tasks.filter((task) => !task.isDone);
    return clearTasks;
  }
  if (type == "tasksCompleted") {
    let clearTasks = tasks.filter((task) => task.isDone);
    return clearTasks;
  }
  if (type == "tasks") {
    return tasks;
  }
};

// Выводим таски на экран
const viewTask = () => {
  taskParse = JSON.parse(localStorage.getItem("tasks"));
  taskName = filter(taskParse, localStorage.getItem("filter"));

  if (!localStorage.getItem("filter")) {
    taskName = localStorage.setItem('filter', 'tasks')
  }

  if (JSON.parse(localStorage.getItem("tasks"))) {
    for (let i = 0; i < taskName.length; i++) {
      // Строим DOM элементы
      let div = document.createElement("div");
      div.setAttribute("id", i);
      let delBtn = document.createElement("button");
      delBtn.innerHTML = "Х";

      delBtn.id = taskName[i].id;

      div.innerHTML = taskName[i].value;
      let check = document.createElement("input");
      check.id = taskName[i].id;
      check.setAttribute("type", "checkbox");
      check.setAttribute("class", "checkbox");

      if (taskName[i].isDone == 1) {
        check.checked = 1;
      }
      // закидываем в DOM построенные элементы
      let taskContainer = document.querySelector("div#content");
      taskContainer.append(div);
      div.append(check); // input.checked (input)
      div.append(delBtn);
      // Прикрепляем к построенным элементам листинеры
      check.addEventListener("change", (e) => saveBtn(e.target));
      delBtn.addEventListener("click", (e) => deleteTask(e.target));
    }
  }
};

const saveBtn = (btnId) => {
  const isDone = (tasks) => {
    if (tasks.id == btnId.id && tasks.isDone == 0) {
      tasks.isDone = 1;
    } else if (tasks.id == btnId.id && tasks.isDone == 1) {
      tasks.isDone = 0;
    }
  };

  const parseLC = JSON.parse(localStorage.getItem("tasks"));
  const task = parseLC.map((tasks) => isDone(tasks));
  localStorage.setItem("tasks", JSON.stringify(parseLC));
};

// Сохраняем в LC значение input
const saveTask = () => {
  if (inputField.value.trim()) {
    let task = {
      id: Date.now(),
      value: inputField.value,
      isDone: 0,
    };
    if (localStorage.getItem("tasks")) {
      let jsonValueParse = JSON.parse(localStorage.getItem("tasks"));

      jsonValueParse.push(task);
      jsonValueParse = JSON.stringify(jsonValueParse);
      localStorage.setItem("tasks", jsonValueParse);
    } else {
      const jsonValue = JSON.stringify([task]);
      localStorage.setItem("tasks", jsonValue);
    }
  }
};

// Очистка выводимых данных после обновление LC
const clearTasks = () => {
  if (document.querySelector("div#content")) {
    let divContent = document.querySelector("div#content");
    while (divContent.firstChild) {
      divContent.removeChild(divContent.firstChild);
    }
  }
};

// Удалить все таски
const deleteTasks = () => {
  clearTasks();
};

// Удалить одну таску
const deleteTask = (taskbtn) => {
  clearTasks();
  const dlt = (tasks, id, currentId, parseLC) => {
    if (tasks.id == id) {
      parseLC.splice(currentId, 1);
      stringLC = JSON.stringify(parseLC);
      localStorage.setItem("tasks", stringLC);
    }
  };

  const parseLC = JSON.parse(localStorage.getItem("tasks"));
  const task = parseLC.map((tasks, currentId) => {
    dlt(tasks, taskbtn.id, currentId, parseLC);
  });
  viewTask();
};

const switchTasks = (taskName) => {
  localStorage.setItem("filter", taskName);
};

filterAll.addEventListener("click", () => {
  switchTasks("tasks");
  clearTasks();
  viewTask();
});

filterProcess.addEventListener("click", () => {
  switchTasks("tasksProcess");
  clearTasks();
  viewTask();
});
filterCompleted.addEventListener("click", () => {
  switchTasks("tasksCompleted");
  clearTasks();
  viewTask();
});

document.addEventListener("DOMContentLoaded", () => viewTask());

btn.addEventListener("click", () => {
  saveTask();
  clearTasks();
  viewTask();
});

btnDelete.addEventListener("click", () => deleteTasks());
