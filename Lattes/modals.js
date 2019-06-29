           $(document).ready(function() {
               console.log("modals loaded");
               $('.portfolio-content').click(function() {
                   var id = $(this).attr("id");
                   console.log(id + "-modal");
                   $("#" + id + "-modal").modal('show');
               });



           });
           