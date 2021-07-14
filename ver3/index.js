var translate = {
    ko: {
        buttons: {
            add: '추가하기',
            remove: '삭제',
            edit: '수정',
            cancel: '취소'
        }
    },
    en: {
        buttons: {
            add: 'add',
            remove: 'remove',
            edit: 'edit',
            cancel: 'cancel'
        }
    }
}


var store = {
    todos: ['sdadsa']
};

function createItem(textContent, index) {
    var li = document.createElement('li');

    li.textContent = textContent;

    li.ondblclick = function () {
        li.innerHTML = '';
        var input = document.createElement('input');
        var edit = document.createElement('button');
        var cancel = document.createElement('button');
        var remove = document.createElement('button');

        remove.textContent = translate.buttons.remove;
        remove.onclick = function () {
            store.todos = store.todos.filter(function (x, i) { return i !== index; });
            render();
        }

        edit.textContent = translate.buttons.edit;
        edit.onclick = function () {
            store.todos[index] = input.value;
            li.innerHTML = '';
            render();
        }

        cancel.textContent = translate.buttons.cancel;
        cancel.onclick = function () {
            store.todos[index] = textContent;
            li.innerHTML = '';
            render();
        }

        input.value = textContent;
        [input, edit, cancel, remove].map(function (item) { return li.appendChild(item); });
    }

    return li;
}

function addButton() {
    var add = document.getElementById('add');
    if (!add) {
        add = document.createElement('button');
        add.textContent = translate.buttons.add;
        add.id = 'add';

        document
            .getElementsByTagName('body')[0]
            .appendChild(add)

        add = document.getElementById('add');
    }

    add.onclick = function (e) {
        var item = window.prompt('add todos');
        store.todos.push(item);

        render();
    }
}

function render() {
    var list = document.getElementById('list');
    if (!list) {
        list = document.createElement('ul');
        list.id = 'list';

        document
            .getElementsByTagName('body')[0]
            .appendChild(list)

        list = document.getElementById('list');
    }

    list.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < store.todos.length; i++) {
        var item = createItem(store.todos[i], i);

        fragment.appendChild(item);
    }
  
    list.appendChild(fragment)
}

function main() {
    addButton();
    render();
}

document.addEventListener('DOMContentLoaded', main);