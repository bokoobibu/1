const createEl = (el, style=none, parent, text=undefined, func=undefined, dataId=false) => {
    const result = document.createElement(el);
    if (dataId) {
        createEl('p', 'input border-0 margin-0', result, text);
        createEl('button', 'input', result, 'Удалить', deleteItem);
        let idCount = localStorage.getItem('idItem');
        result.dataset.id = idCount;
        const userData = {
            id: idCount,
            text: text
        }
        if (style) {
            result.setAttribute('class', style);
        }
        idCount++;
        localStorage.setItem('idItem', JSON.stringify(idCount));
        let myArrayData = JSON.parse(localStorage.getItem('myArrayData')) || [];
        myArrayData.push(userData);
        localStorage.setItem('myArrayData', JSON.stringify(myArrayData));
    }
    else {
        if (text) {
            result.textContent = text;
        }
        if (style) {
            result.setAttribute('class', style);
        }
        if (func) {
            result.onclick = func; // Присваиваем функцию напрямую в качестве обработчика события
        }
    }
    parent.appendChild(result);
}

const createToDo = () => {
    let inputTextValue = document.querySelector('.input-text').value;
    if (!document.querySelector('.list') && inputTextValue) {
        createEl('ul', 'list', document.querySelector('.container-full-hd'));
        createEl('li', 'item', document.querySelector('.list'), inputTextValue, undefined, true);
        document.querySelector('.input-text').value = '';
    }
    else if (!inputTextValue) {
        document.querySelector('.alert').classList.toggle('alert-show');
        setTimeout(() => {document.querySelector('.alert').classList.toggle('alert-show')}, 4000);
    }
    else {
        createEl('li', 'item', document.querySelector('.list'), inputTextValue, undefined, true);
        document.querySelector('.input-text').value = '';
    }
}

const clearToDo = () => {
    if (localStorage.getItem('myArrayData')) {
        localStorage.removeItem('myArrayData');
        document.querySelector('.list').remove();
    }
}

const deleteItem = (event) => {
    const parentEl = event.target.parentNode;
    const itemId = parentEl.dataset.id;

    let myArrayData = JSON.parse(localStorage.getItem('myArrayData')) || [];
    
    // Находим индекс элемента в массиве
    const index = myArrayData.findIndex(item => item.id === itemId);
    
    if (index !== -1) {
        // Удаляем элемент из массива
        myArrayData.splice(index, 1);
        
        // Обновляем данные в localStorage
        localStorage.setItem('myArrayData', JSON.stringify(myArrayData));
        
        // Удаляем элемент из DOM
        parentEl.remove();
    } else {
        console.log('Элемент не найден в массиве');
    }
}


(() => {
    if (!localStorage.getItem('idItem')) {
        localStorage.setItem('idItem', 0);
    }

    const toDoListApp = () => {
        const body = document.body;
        function setFavicon(url) {
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = url;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        
        // Установка favicon
        setFavicon('favicon.png');

        const htmlTitle = document.title = "To Do List";
        body.classList.add('margin-0');
        createEl('div', 'container-full-hd', body);
        createEl('h1', 'title', document.querySelector('.container-full-hd'), 'To Do List');
        createEl('p', 'alert', document.querySelector('.container-full-hd'), 'Поле пустое!');
        createEl('div', 'btn-container', document.querySelector('.container-full-hd'));
        createEl('input', 'input input-text', document.querySelector('.btn-container'));
        createEl('button', 'input add-btn', document.querySelector('.btn-container'), 'Добавить', createToDo);
        createEl('button', 'input', document.querySelector('.container-full-hd'), 'Очистить', clearToDo);
        if (localStorage.getItem('myArrayData')) {
            // Получаем массив из localStorage
            let myArrayData = JSON.parse(localStorage.getItem('myArrayData')) || [];

            let listElement = document.querySelector('.list');
            // Получаем элемент <ul> для списка
                createEl('ul', 'list', document.querySelector('.container-full-hd'));

            // Проходим по каждому элементу массива и создаем <li> элементы
            myArrayData.forEach((item) => {
                let listItem = document.createElement('li');
                listItem.dataset.id = item.id;
                listItem.classList.add('item');
                createEl('p', 'input border-0 margin-0', listItem, item.text);
                createEl('button', 'input', listItem, 'Удалить', deleteItem);
                document.querySelector('.list').appendChild(listItem);
            });
        }
    }

    toDoListApp();
})();
