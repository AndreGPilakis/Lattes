           $(document).ready(function() {

               var navHeight = $("#navbar").height();
               console.log(navHeight);

               function scrollTo(location) {
                   $('html,body').animate({
                           scrollTop: ($("#section" + location).offset().top) - navHeight
                       },
                       '200');
               }

               $(".scrollButton").click(function() {
                   console.log("clicked");
                   scrollTo($(this).attr("data-scroll-location"));
               });

               $("#t").click(function() {
                   console.log("clicked");
                   scrollTo($(this).attr("data-scroll-location"));
               });

           });
           