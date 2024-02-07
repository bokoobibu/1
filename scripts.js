function createToDoItem() {
    let list = document.querySelector('ul');
    let inputText = document.querySelector('.input-text');
    let item = document.createElement('li');
    if (!list) {
        let toDoListContainer = document.querySelector('.container');
        list = document.createElement('ul');
        toDoListContainer.appendChild(list);
    }
    item.textContent = inputText.value;
    inputText.value = '';
    list.appendChild(item);
}
