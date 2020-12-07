const inputField = document.querySelector('#value-to-save');
const btn = document.querySelector('#submite');
const btnDelete = document.querySelector('#delete');

const filterAll = document.querySelector('#filter-all');
const filterProcess = document.querySelector('#filter-process');
const filterCompleted = document.querySelector('#filter-completed');

let todos = JSON.parse(localStorage.getItem('tasksAll'))
let filterStatus = localStorage.getItem('filter');

// Очистка выводимых данных после обновление LC
const clearTasks = () => {
  let divContent = document.querySelector('#content');
  divContent.innerHTML = '';
};

const filter = () => {
  if (todos){
    console.log(typeof(filterStatus))
    if (filterStatus === 'tasksProcess') {
      return todos.filter((task) => !task.isDone);
    }
    if (filterStatus === 'tasksCompleted') {
      return todos.filter((task) => task.isDone);
    } else {
      return todos;
    }
  }
}



// Выводим таски на экран
const displayTasks = () => {
  clearTasks();
  if  (!localStorage.getItem('filter')){
    localStorage.setItem('filter', 'tasksAll')
  }
  tasks = filter();

  if (todos) {

      tasks.forEach( (task, i) => {
      let taskContainer = document.querySelector('div#content');
      // Строим DOM элементы
      let div = document.createElement('div');
      div.setAttribute('id', i);
      div.setAttribute('class', 'task');

      let delBtn = document.createElement('button');
      delBtn.innerHTML = 'Х';
      delBtn.id = task.id; 
      delBtn.setAttribute('class','deleteTask')

      let checkbox = document.createElement('input');
      checkbox.id = task.id;
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('class', 'checkbox');

      checkbox.checked = task.isDone;
      // закидываем в DOM построенные элементы
      taskContainer.append(div);
      div.append(checkbox);
      div.append(task.value)
      div.append(delBtn);
      // Прикрепляем к построенным элементам листинеры
      checkbox.addEventListener('change', (e) => doNote(e.target));
      delBtn.addEventListener('click', (e) => deleteTask(e.target));
    })
  };
   
  }

const doNote = (checkbox) => { 
  todos.find((todo) =>{ 
    if (todo.id === Number(checkbox.id)) {
      todo.isDone = !todo.isDone 
    }
  })
  localStorage.setItem('tasksAll', JSON.stringify(todos));

};
// Сохраняем в LS значение input
const saveTask = () => {
  if (inputField.value.trim()) {
    let task = {
      id: Date.now(),
      value: inputField.value,
      isDone: false,
    };

    if (todos) {
      todos.push(task)
      localStorage.setItem('tasksAll', JSON.stringify(todos));
    } else {
      todos = [task]
      const stringifyTasks = JSON.stringify(todos);
      localStorage.setItem('tasksAll', stringifyTasks);
    }
  } else {
    alert('Введите корректные данные')
  }
  inputField.value = ''
};



// Удалить все таски
const deleteTasks = () => {
  clearTasks();
  localStorage.clear('tasks')
  todos = []
};

// Удалить одну таску
const deleteTask = (taskbtn) => {
  todos = todos.filter(todo => todo.id !== Number(taskbtn.id))
  localStorage.setItem('tasksAll', JSON.stringify(todos));
  displayTasks();
};

const switchTasks = (name) => {
  localStorage.setItem('filter', name);
  filterStatus = localStorage.getItem('filter');
};

filterAll.addEventListener('click', () => {
  switchTasks('tasksAll');
  displayTasks();
});

filterProcess.addEventListener('click', () => {
  switchTasks('tasksProcess');
  displayTasks();
});
filterCompleted.addEventListener('click', () => {
  switchTasks('tasksCompleted');
  displayTasks();
});

document.addEventListener('DOMContentLoaded', () => displayTasks());

btn.addEventListener('click', () => {
  saveTask();
  displayTasks();
});

btnDelete.addEventListener('click', () => deleteTasks());
