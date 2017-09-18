$(document).ready(function(){

    var render = function(){
        $('#Todo-form').empty()
        for (var i = 0; i < todoList.length; i++ ) {
            $('#Todo-form').append(`<li>${todoList[i]['todo-name']}</li>`)
        }
    }

    var getFreshData = function(){
        $.get('/item', function(data){
            console.log(data)
            todoList = data
            render()
        })
    }

    var todoList = []
    getFreshData()

    $('#Todo-form').on('submit', function(event){
        event.preventDefault()

        // in a jQuery event handler, `this` refers to the element that fired the event.
        console.log($( this ).serialize())

        $.post('/item', $(this).serialize(), function(data){
            console.log(data)
            getFreshData()
        })
    })

   

   

})