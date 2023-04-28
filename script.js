let insert_window = document.querySelector("#insert-window");
let btn_add = document.querySelector("#btn-add");
let bt_cancel = document.querySelector("#btn-cancel");

btn_add.addEventListener('click', function(){
    insert_window.classList.remove("d-none");
})
bt_cancel.addEventListener('click', function(){
    insert_window.classList.add("d-none");
})

// document.getElementsByName("tascks")[0].value.split('\n').slice(0,3).join('\n');
