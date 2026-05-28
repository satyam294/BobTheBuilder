const arr = [];

function addTodo() {
    const input = document.querySelector('.inputField');
    const date = document.querySelector('.dateField');
    if(input.value === '') return;

    const todo = {
        name: input.value,
        dueDate: date.value
    };
    arr.push(todo);

    //render after insertion
    renderTodos();

    input.value = '';
}

function renderTodos() {
    const display = document.querySelector('.display');

    display.innerHTML = '';

    for(let i = 0; i < arr.length; i++) {
        //create 3 elements to fill 3 columns of the grid
        const d1 = document.createElement('div');
        const d2 = document.createElement('div');
        const delButton = document.createElement('button');

        //pass the index of each todo to its delete button
        d1.textContent = arr[i].name;

        d2.textContent = arr[i].dueDate;

        delButton.textContent = 'Delete';
        delButton.onclick = () => deleteTodo(i);
        delButton.classList.add("deleteButton");

        display.appendChild(d1);
        display.appendChild(d2);
        display.appendChild(delButton);
    }
}

function deleteTodo(index) {
    arr.splice(index, 1);  //delete(from, howmany)

    renderTodos();  //render after delete
}