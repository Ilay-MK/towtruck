/*
 Third party
 */

$(function(){
    /*console.log('in plugins.js! ');*/
})

$(document).ready(function() {

    // Скроллинг
    $(".scrollTo").click(function () {
        $.scrollTo($(this).attr('href'), 800, {
			offset: 0
		});
        $('.navbar-toggle').click(); /*для того, чтобы свернуть менюшку для удобства*/
		return false;
	});

});
