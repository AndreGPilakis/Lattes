    $(document).ready(function() {
        var tasks = [];


        //task object
        function Task(name, description, date) {
            this.name = name;
            this.description = description;
            this.date = date;
        }


        //to sort array by date
        function byDate(a, b) {
            if (a.date < b.date)
                return -1;
            if (a.date > b.date)
                return 1;
            return 0;
        }

        function updateTaskList() {
            $("#task-container").html("");
            for (x in tasks) {
                $("#task-container").append("<h1>"+ tasks[x].name + "</h1> <p1>" + tasks[x].description + " " + tasks[x].date + "<br></p1>");
            }
        }


        $("#new-task-button").click(function() {
            //add task
            tasks.push(new Task($('#new-task-title').val(), $('#new-task-description').val(), $('#new-task-date').val()));
            //resort
            tasks.sort(byDate);
            //update display
            updateTaskList();
            console.log(tasks);
        });




    });

























    //array of all tasks
    var tasks = [];



    $("#new-task-button").click(function() {
        //Create task object
        var newTask = new Task($('#new-task-title').val(), $('#new-task-description').val(), $('#new-task-date').val());
        tasks.push(newTask);
        //appends a div to show the info.
        $("#task-container").append("\
            <div class='task'> <h1>" + newTask.name + "</h1> \
            <p1>" + newTask.description + "<br>" + newTask.date + "<br> <button class='deleteTask'>delete </button></div>");
    });

    //We need to check the document on click for dynamically created icons.
    $(document).on("click", ".deleteTask", function() {
        console.log("clicked");
    });
    