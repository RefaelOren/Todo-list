'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    const todos = getTodosForDisplay();

    const strHTMLs = todos.map(
        (todo) => `<li>
                    <span class="${todo.isDone ? 'done' : ''}" id="text" 
                        onclick="onToggleTodo('${todo.id}')">${todo.txt}
                    </span>
                    <span class="time">${todo.createdTime}</span>
                    <span class="priority color-${todo.priority}">${
            todo.priority
        }</span>
                    <button onclick="onRemoveTodo(event,'${
                        todo.id
                    }')">X</button>
                </li>
               `
    );

    document.querySelector('ul').innerHTML = strHTMLs.join('');
    document.querySelector('span.total').innerText = getTotalCount();
    document.querySelector('span.active').innerText = getActiveCount();
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    var isSure = confirm('Are you sure you want to delete?');
    if (!isSure) return;
    console.log('Removing:', todoId);
    removeTodo(todoId);
    renderTodos();
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId);
    toggleTodo(todoId);
    renderTodos();
}

function onAddTodo(ev) {
    ev.preventDefault();
    const elTxt = document.querySelector('[name=txt]');
    const txt = elTxt.value;
    if (!txt) return;
    const createdTime = getTime();
    const elPriority = document.querySelector('[name=priority]');
    const priority = elPriority.value;
    addTodo(txt, createdTime, priority);
    // hide empty msg
    document.querySelector('h2').style.display = 'none';
    renderTodos();
    elTxt.value = '';
}

function onSetFilter(filterBy) {
    console.log('filterBy:', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt);
    setFilterByTxt(txt);
    renderTodos();
}

function onSetSort(sortBy) {
    console.log('sort by:', sortBy);
    setSort(sortBy);
    renderTodos();
}

function showEmptyMsg(msg) {
    console.log('hey');
    var elMsg = document.querySelector('h2');
    console.log(elMsg);
    elMsg.innerText = msg;
    elMsg.style.display = 'block';
}

function removeEmptyMsg() {
    var elMsg = document.querySelector('h2');
    elMsg.style.display = 'none';
}
