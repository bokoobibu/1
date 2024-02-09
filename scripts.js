function createToDoItem() {
    let toDoListContainer = document.querySelector('.container');
    let inputText = document.querySelector('.input-text');
    let list = document.querySelector('ul');
    let countToDoItem = parseInt(document.querySelector('input[type="hidden"]').value);
    if (inputText.value.trim() === '') {
        if (!document.querySelector('.alert-input-text')) {
            let alertInputText = document.createElement('span');
            alertInputText.classList.add('alert-input-text');
            alertInputText.textContent = 'Поле пустое!';
            toDoListContainer.insertBefore(alertInputText, toDoListContainer.firstChild);
            setTimeout((() => {
                alertInputText.remove();
            }), 3000)
        }
    }
    else {
        if (!list) {
            list = document.createElement('ul');
            toDoListContainer.appendChild(list);
        }

        let item = document.createElement('li');
        item.dataset.id = countToDoItem;
        document.querySelector('input[type="hidden"]').value = countToDoItem.toString();
        list.appendChild(item);

        let itemInputText = document.createElement('p');
        itemInputText.classList.add('item__input-text');
        itemInputText.textContent = inputText.value;
        itemInputText.contentEditable = false;
        itemInputText.setAttribute('oninput', 'autoResize(this)');
        item.appendChild(itemInputText);

        let itemBtnContainer = document.createElement('div');
        itemBtnContainer.classList.add('item__btn-container');
        item.appendChild(itemBtnContainer);

        let btnEdit = document.createElement('button');
        btnEdit.classList.add('btn-edit');
        btnEdit.textContent = 'Редактировать';
        btnEdit.setAttribute('onclick', 'editItem('+countToDoItem+', this)');
        countToDoItem++;
        itemBtnContainer.appendChild(btnEdit);

        let btnDel = document.createElement('button');
        btnDel.classList.add('btn-del');
        btnDel.textContent = 'Удалить';
        btnDel.setAttribute('onclick', 'delItem('+countToDoItem+', this)');
        itemBtnContainer.appendChild(btnDel);

        inputText.value = '';
    }
} 

let valueEditItem = false;

function editItem(dataId, btnElement) {
    let item = btnElement.closest('li');
    let itemInputText = item.querySelector('.item__input-text');
    if (item && valueEditItem === false) {
        itemInputText.contentEditable = true;
        valueEditItem = true;
        itemInputText.focus();
        document.execCommand('selectAll', false, null);

        document.getSelection().collapseToEnd();
    }
    else {
        itemInputText.contentEditable = false;
        valueEditItem = false;
    }
}

function delItem(dataId, btnElement) {
    let item = btnElement.closest('li');
    let list = btnElement.closest('ul');
    let itemsCount = document.querySelectorAll('li').length;
    if (itemsCount === 1) {
        item.remove();
        list.remove();
    }
    item.remove();
}

document.querySelector('.input-text').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        createToDoItem();
    }
});

function cleanToDoList() {
    let list = document.querySelector('ul');
    if (list) {
        list.remove();
    }
}

function autoResize(a) {
    a.style.height = Math.min(a.scrollHeight, 200) + 'px';
}