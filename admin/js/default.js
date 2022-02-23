$(document).ready(function(){    
    $('.navbar-nav li a').click(function(e) {
        //window.location.replace($parent.prevObject[0].href);

        $('.navbar-nav li.active').removeClass('active');
        var $parent = $(this).parent();
        $parent.addClass('active');
        // e.preventDefault();
    });
}); 
