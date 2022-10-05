'use strict';

const STORAGE_KEY = 'todoDB';
var gFilterBy = {
    txt: '',
    status: '',
};
var gSortBy;
var gTodos;

_createTodos();

function getTodosForDisplay() {
    var todos = gTodos;
    if (!todos.length) showEmptyMsg('No Todos');
    else removeEmptyMsg();
    if (gFilterBy.status) {
        todos = todos.filter(
            (todo) =>
                (todo.isDone && gFilterBy.status === 'done') ||
                (!todo.isDone && gFilterBy.status === 'active')
        );
        var msg =
            gFilterBy.status === 'done' ? 'No done Todos' : 'No active Todos';
        if (!todos.length) showEmptyMsg(msg);
        else removeEmptyMsg();
    }
    todos = todos.filter((todo) =>
        todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase())
    );

    todos = !gSortBy ? todos : _sortTodos(todos, gSortBy);
    return todos;
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex((todo) => todo.id === todoId);
    gTodos.splice(todoIdx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    const todo = gTodos.find((todo) => todo.id === todoId);
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function addTodo(txt, time, priority) {
    const todo = _createTodo(txt, time, priority);
    gTodos.push(todo);
    _saveTodosToStorage();
}

function setFilter(status) {
    gFilterBy.status = status;
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getTotalCount() {
    return gTodos.length;
}

function getActiveCount() {
    return gTodos.filter((todo) => !todo.isDone).length;
}

function getTime() {
    const timeStamp = Date.now();
    const time = new Date(timeStamp).toLocaleString();
    return time;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);

    if (!todos || !todos.length) {
        todos = [
            {
                id: 't101',
                txt: 'Learn HTML',
                isDone: true,
                createdTime: '3.10.2022, 12:34:00',
                priority: 2,
            },
            {
                id: 't102',
                txt: 'Master JS',
                isDone: false,
                createdTime: '3.10.2022, 09:34:00',
                priority: 1,
            },
            {
                id: 't103',
                txt: 'Study CSS',
                isDone: false,
                createdTime: '3.10.2022, 07:34:00',
                priority: 3,
            },
        ];
    }

    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, time, priority) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createdTime: time,
        priority,
    };
    return todo;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}

function _makeId(length = 5) {
    var txt = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}

function _sortTodos(todos, sortBy) {
    switch (sortBy) {
        case 'txt':
            console.log(todos);
            return todos.sort((a, b) => (a.txt > b.txt ? 1 : -1));
        case 'createdTime':
            return todos.sort((a, b) =>
                a.createdTime > b.createdTime ? 1 : -1
            );
        case 'priority':
            return todos.sort((a, b) => a.priority - b.priority);
        case 'noSort':
            return gTodos;
    }
}
