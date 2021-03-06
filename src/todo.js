/**This anonymous function is executed on window load and makes an XMLHttpRequest to retrieve the data from json asynchronously. */


window.onload = function () {
    let xhr = new XMLHttpRequest();
    jsondata = "./assets/todo.json"
    xhr.open('GET', jsondata, true);
    xhr.responseType = 'text';

    xhr.onload = function () {
        if (this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            loadData(data);
        }
    };
    xhr.send();
};

/**
 *This function loads the JSON data into variables which will be used later to display them.
 *
 * @param {*} data
 */
function loadData(data) {
    for (let i = 0; i < data.length; i++) {


        let TodoTitle = document.createTextNode(data[i].Title);
        let TodoAuthor = document.createTextNode(data[i].Author);
        let TodoDate = document.createTextNode(data[i].date);
        let todoTextItem = data[i].ToDoText;
        addJson(TodoTitle, TodoAuthor, TodoDate, todoTextItem);
    }
}

/**
 *This function will load the JSON objected into the todolist webapplication UI.
 *
 * @param {*} TodoTitle
 * @param {*} TodoAuthor
 * @param {*} TodoDate
 * @param {*} todoTextItem
 */
function addJson(TodoTitle, TodoAuthor, TodoDate, todoTextItem) {

    let div = document.getElementById("container1");
    let span = document.createElement("div");
    let spanParent = document.createElement("div");
    spanParent.setAttribute("class", "spanParent");
    span.setAttribute("class", "containers");
    let textdiv = document.createElement("div");
    let dateAuthor = document.createElement("div");
    let dateText = document.createTextNode(TodoDate.data);
    let authorText = document.createTextNode(TodoAuthor.data);
    dateAuthor.appendChild(dateText);

    let authorDiv = document.createElement("div");
    authorDiv.appendChild(authorText)
    authorDiv.setAttribute("class", "authorDiv");

    dateAuthor.appendChild(authorDiv);
    dateAuthor.setAttribute("class", "dateauthor");
    let title = document.getElementById("titlex").value;
    let titleText;

    titleText = document.createTextNode(TodoTitle.data);
    textdiv.appendChild(titleText);
    textdiv.setAttribute("class", "textDiv")


    document.createElement("br");
    let todoItem = document.createElement("input");
    todoItem.setAttribute("class", "taskInput");
    todoItem.type = 'text';
    let iconAdd = document.createElement("i");
    iconAdd.setAttribute("class", "fa fa-plus");
    let iconDel = document.createElement("i");
    iconDel.innerHTML = "delete";
    iconDel.setAttribute("class", "material-icons");
    iconDel.addEventListener("click", deleteToDoList);
    textdiv.appendChild(iconDel);
    span.appendChild(textdiv);
    span.appendChild(todoItem);
    span.appendChild(iconAdd);
    span.appendChild(dateAuthor);
    div.appendChild(span);

    let ul = document.createElement("ul");
    ul.setAttribute("class", "uList");

    for (let i = 0; i < todoTextItem.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("class", "list");
        let create = document.createTextNode(todoTextItem[i])
        li.appendChild(create);
        ul.appendChild(li);
        spanParent.appendChild(ul);
        span.appendChild(spanParent);
        let cl = close();
        li.appendChild(cl);
        cl.addEventListener("click", deleteToDoItem);
        li.addEventListener("click", strikeout);
    }



    iconAdd.addEventListener("click", function () {
        let todoItemValue = todoItem.value;
        let todoItemText1 = document.createTextNode(todoItemValue);
        let li = document.createElement("li");
        li.setAttribute("class", "list");
        let cl = close();

        if (todoItemValue === '') {
            alert("Please enter some value");
        } else {
            li.appendChild(todoItemText1);
            ul.appendChild(li);
            spanParent.appendChild(ul);
            span.appendChild(spanParent);
        }
        todoItem.value = '';
        li.appendChild(cl);
        cl.addEventListener("click", deleteToDoItem);
        li.addEventListener("click", strikeout);
    });
}


/**
 *This function is for the close icon for the todo list item.
 *
 * @returns
 */
function close() {
    let close = document.createElement("i");
    close.setAttribute("class", "material-icons")
    close.innerHTML = 'delete';
    return close;

}

let btn = document.getElementById("btn");
btn.addEventListener("click", addToDoList);

/**
 *This function adds Todolist.
 *
 */
function addToDoList() {
    let div = document.getElementById("container1");
    let span = document.createElement("div");
    let spanParent = document.createElement("div");
    spanParent.setAttribute("class", "spanParent");
    span.setAttribute("class", "containers");
    let textdiv = document.createElement("div");


    let dateAuthor = document.createElement("div");
    let date = new Date().toLocaleDateString();
    let dateText = document.createTextNode(date);

    let author = document.getElementById("authoruser").innerHTML;
    let authortext = document.createTextNode(author);

    let authorDiv = document.createElement("div");
    authorDiv.appendChild(authortext);
    authorDiv.setAttribute("class", "authorDiv");



    dateAuthor.appendChild(dateText);
    dateAuthor.appendChild(authorDiv);
    dateAuthor.setAttribute("class", "dateauthor");



    let title = document.getElementById("titlex").value;
    let titleText = document.createTextNode(title);
    let ul = document.createElement("ul");
    ul.setAttribute("class", "uList");
    let iconAdd = document.createElement("i");
    iconAdd.setAttribute("class", "fa fa-plus");
    let todoItem = document.createElement("input");
    todoItem.setAttribute("class", "taskInput");
    todoItem.type = 'text';
    let iconDel = document.createElement("i");
    iconDel.innerHTML = "delete";
    iconDel.setAttribute("class", "material-icons");
    iconDel.addEventListener("click", deleteToDoList);
    if (title === "") {

        alert("Please enter a title");
    } else {
        textdiv.appendChild(titleText);

        textdiv.setAttribute("class", "textDiv")
        document.createElement("br");
        textdiv.appendChild(iconDel);
        span.appendChild(textdiv);
        span.appendChild(todoItem);
        span.appendChild(iconAdd);
        span.appendChild(dateAuthor);
        div.appendChild(span);
        document.getElementById("titlex").value = "";
    }
    iconAdd.addEventListener("click", function () {
        let todoItemValue = todoItem.value;
        let todoItemText = document.createTextNode(todoItemValue);
        let li = document.createElement("li");
        li.setAttribute("class", "list");

        let close = document.createElement("i");
        close.setAttribute("class", "material-icons")
        close.innerHTML = 'delete';

        if (todoItemValue === '') {
            alert("Please enter some value");
        } else {
            li.appendChild(todoItemText);
            ul.appendChild(li);
            spanParent.appendChild(ul)
            span.appendChild(spanParent);
        }
        todoItem.value = '';
        li.appendChild(close);
        close.addEventListener("click", deleteToDoItem);
        li.addEventListener("click", strikeout);

    });

}
/**
 *This function is used to delete the todo list
 *
 * @param {*} evt
 */
function deleteToDoList(evt) {
    evt.target.parentNode.parentNode.style.display = "none";
}
/**
 *This function is used to add line-through text decoration on todo tasks
 *
 * @param {*} evt
 */
function strikeout(evt) {
    evt.target.classList.toggle("strike");
}
/**
 *This function is used to delete the Todo tasks inside the todo lists
 *
 * @param {*} evt
 */
function deleteToDoItem(evt) {
    evt.target.parentNode.parentNode.removeChild(evt.target.parentNode);
}