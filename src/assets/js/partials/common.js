/*
 Third party
 */

$(function () {
    /*console.log('in common.js! ');*/
})

var intervalID_header_bg_img,
    count_bg_img = 2,
    /*3*/
    count_img_name = 1;

var contentSlider = {
    s1: {
        h1: "Срочная эвакуация <br />любого вида транспорта",
        ad: "Подача эвакуатора за 30 минут по Минску <br />с юридической гарантией перевозки."
    },
    s2: {
        h1: "Круглосуточная <br />автопомощь на дороге",
        ad: "Выезд специалиста за 30 минут по Минску <br />и исправление возникших неполадок."
    },
    parentBlock: $('#header-content'),
    bgTarget: $('#header-content')
};

$(document).ready(function () {

    // Ajax send mail
    $(".order").submit(function (e) {
        ajax(this);

        return false;
	});

    $('.submit').click(function () {
        var recipient = $(this).data('submit');

        $(this).prop('disabled', true);

        setTimeout(function () {
            $('.submit').prop('disabled', false);
        }, 1000);

        $(recipient).submit();

        return false;
    });

    logoToPhone();

    $('#modalOrder').on('show.bs.modal', function (event) {
        centerModal; /* вертикальное центрирование */
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('service'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        /*modal.find('#orderFormLabel').text('Заявка на услугу ' + '"' + recipient + '"');*/
        /*modal.find('#whichService').val(recipient);*/
        $('#whichService').val(recipient);

    });

    $('.modal-vertical-centered').on('show.bs.modal', centerModal);

    $(window).on("resize", function () {
        $('.modal-vertical-centered:visible').each(centerModal);
    });

    /* Background rotate header */
    /*$('#hc-indicators li').click(function () {
        var imgDir = "url(../assets/img/header/bgs/",
            imgName,
            imgType = ".jpg)",
            img;

        $('#hc-indicators li').removeClass('active');
        $(this).addClass('active');

        imgName = $(this).attr('value');
        img = imgDir + imgName + imgType;

        $('#header-content').css("background-image", img);
    });*/

    if (getPageSize()[2] < 768) {
        contentSlider.bgTarget = $('#header-content .slider-bg-xs');
    }

    $(window).resize(function () {
        targetBlockSlider(contentSlider.bgTarget);
        logoToPhone();
    });

    /* Background rotate header */
    intervalID_header_bg_img = setInterval(function () {
        count_img_name++;
        if (count_img_name > count_bg_img) {
            count_img_name = 1;
        }
        contentSlider.bgTarget.css("background-image", "url(../assets/img/header/bgs/" + count_img_name + ".jpg)");

        /* Добавляем смену заголовков - уже тип слайдер нормальный */
        /*
         * 5 утра... ничё в голову другова не приходит толкового...
         * Переделать нужно как-нить.
         * Переспрашивал же сцуко, планируется при смене сладов и текс какой нить меняться или ещё что-то???? - Нет!
         * Уже да... Короч для SEO H1 нужно и должно быть 1 на странице...
         * Менять все стили я не буду!
         * Буду ;) извращатся на js!
         * -------------------------------------------------------
         * Поменял анимацию на прозрачность. Пока всё на этом ).
         */

        /*contentSlider.parentBlock.find('h1').stop().animate({
            opacity: 0
        }, 500);
        contentSlider.parentBlock.find('.addsc').stop().animate({
            opacity: 0
        }, 500);

        setTimeout(function () {
            switch (count_img_name) {
            case 1:
                {
                    contentSlider.parentBlock.find('h1').html(contentSlider.s1.h1);
                    contentSlider.parentBlock.find('.addsc').html(contentSlider.s1.ad);
                    break;
                }
            case 2:
                {
                    contentSlider.parentBlock.find('h1').html(contentSlider.s2.h1)
                    contentSlider.parentBlock.find('.addsc').html(contentSlider.s2.ad)
                    break;
                }
            }

            contentSlider.parentBlock.find('h1').stop().animate({
                opacity: 1
            }, 500);
            contentSlider.parentBlock.find('.addsc').stop().animate({
                opacity: 1
            }, 500);
        }, 600);*/

    }, 7000);

    /* Анимирование через прозрачность услуги в шапке после загрузке страницы */
    $('#header-content .anim').each(function (i, elem) {
        setTimeout(function () {
            $(elem).animate({
                opacity: 1
            }, 500);

            if (i == 2) {
                setTimeout(function () {
                    if (getPageSize()[2] < 768) {
                        $('#header-content .slider-bg-xs').css("background-image", "url(../assets/img/header/bgs/1.jpg)");
                    }
                }, i * 200);
            }

        }, i * 200);
    });

    /* Анимирование навигации после загрузки страницы */
    /*setTimeout(function () {
        $('#bs-navbar-collapse-1 li a').each(function (i, elem) {
            setTimeout(function () {
                $(elem).addClass("animated fadeInRightBig");
            }, 500 + i * 500);
        });
    }, 500);*/

    /* смена фона кнопок в форме заяве */
    $('#modalOrder .modal-footer .phone')
        .mouseenter(function () {
            $('#modalOrder .modal-footer .submit').removeClass("bg_h");
            $(this).addClass("bg_h");
        })
        .mouseleave(function () {
            $(this).removeClass("bg_h");
            $('#modalOrder .modal-footer .submit').addClass("bg_h");
        });

    /* чтоб весь блок кликабельный был и открывал форму заявки */
    $('#services .tile').click(function () {
        var service = $(this).data('service');

        $('#modalOrder').modal('show');
        $('#whichService').val(service);
    });

    /* inview  */
    /*$('#services .tile').one('inview', function (event) {

        var Block = $(this);

        // Show a smooth animation
        Block.animate({
            opacity: 1
        }, 1500);
    });*/

    /* inview  */
    /*jQuery('#services .tile').bind('inview', function (event, visible) {
        if (visible) {
            $(this).stop().animate({
                opacity: 1
            });
            //$(this).stop().addClass("animated flipInX");
            //flipInX
        } else {
            $(this).stop().animate({
                opacity: 0
            });
            //$(this).stop().removeClass("animated flipInX");
        }
    });*/

    /* inview  */
    jQuery('#benefits .ico img').bind('inview', function (event, visible) {
        if (visible) {
            $(this).stop().addClass("animated bounceIn");
        } else {
            $(this).stop().removeClass("animated bounceIn");
        }
    });

    /* Удалено со страницы */
    /*$('#carpark .car').one('inview', function (event) {

        var Block = $(this);

        // Show a smooth animation
        Block.animate({
            opacity: 1
        }, 1500);
    });*/

});

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2;
    $dialog.css("margin-top", offset);
}

function validate(target) {

    /*var name, tel;

    name = $(target).find('input:text').val();
    tel = $(target).find('input:tel').val();*/

    //переменная formValid
    var formValid = true;

    $(target).find('input').each(function () {
        //найти предков, которые имеют класс .form-group, для установления success/error
        var formGroup = $(this).parents('.form-group');
        //найти glyphicon, который предназначен для показа иконки успеха или ошибки
        var glyphicon = formGroup.find('.form-control-feedback');
        //для валидации данных используем HTML5 функцию checkValidity

        if (this.checkValidity() && ($(this).val() != "")) {
            //добавить к formGroup класс .has-success, удалить has-error
            formGroup.addClass('has-success').removeClass('has-error');
            //добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
            /*glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');*/
        } else {
            //добавить к formGroup класс .has-error, удалить .has-success
            formGroup.addClass('has-error').removeClass('has-success');
            //добавить к glyphicon класс glyphicon-remove, удалить glyphicon-ok
            /*glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');*/
            //отметить форму как невалидную
            formValid = false;
        }
    });

    //если форма валидна, то
    if (formValid) {
        return true;
    }

    return false;
}

function targetBlockSlider(ob) {
    if (getPageSize()[2] < 768) {
        contentSlider.bgTarget = $('#header-content .slider-bg-xs');
        $('#header-content .slider-bg-xs').css("background-image", "url(../assets/img/header/bgs/" + count_img_name + ".jpg)");
    } else {
        contentSlider.bgTarget = $('#header-content');
        $('#header-content .slider-bg-xs').css("background-image", "url(../assets/img/header/bgs/transparent.png)");
        $('#header-content').css("background-image", "url(../assets/img/header/bgs/" + count_img_name + ".jpg)");
    }
}

function logoToPhone() {
    if (getPageSize()[2] < 768) {
        $('#header .logo a').attr("href", "tel:+375447685685").html("(44) 7 685 685");
    } else {
        $('#header .logo a').attr("href", ".").html("Увезём");
    }
}

function ajax(ob) {
    var msg;
    var processor;
    var result;

    var result = $("#result");

    if (!validate(ob)) {
        /*result.addClass("text-danger bg-danger").text("Пожалуйста, проверьте введённые данные!");*/
        return false;
    }

    processor = "./mail.php";

    $.ajax({
        type: "POST",
        url: processor,
        data: $(ob).serialize(),
        error: function (xhr, str) {
            /*result.addClass("text-danger bg-danger").text("Пожалуйста, проверьте введённые данные!");*/
        }
    }).done(function (msg) {

        /*if(msg === "OK"){
            var result = "<div = 'bg-success'>Спасибо за заявку! Мы вам перезвоним!</div>"
            form.html(result);
        } else {
            form.html(msg);
        }*/

        $(ob).find("[type='text']").val("");
        $(ob).trigger("reset");
        /*result.addClass("text-success bg-success").removeClass("text-danger bg-danger").text("Ваша заявка принята!");*/

        /*setTimeout(function () {
        	$.fancybox.close();
        	result.addClass("animated zoomInDown show").fadeIn('slow');
        }, 500);*/

        setTimeout(function () {
            //сркыть модальное окно
            $('#modalOrder').modal('hide');
            //отобразить сообщение об успехе
            $('#modalAlert-success').modal('show');
            /*result.removeClass("text-danger bg-danger text-success bg-success").text("");*/
            $('.submit').prop('disabled', false);
        }, 1000);

    });

    return false;
}

/* create social networking pop-ups*/
/* Убрано со страницы */
/*(function () {
    // link selector and pop-up window size
    var Config = {
        Link: "a.share",
        Width: 500,
        Height: 500
    };

    // add handler links
    var slink = document.querySelectorAll(Config.Link);
    for (var a = 0; a < slink.length; a++) {
        slink[a].onclick = PopupHandler;
    }

    // create popup
    function PopupHandler(e) {
        e = (e ? e : window.event);

        var t = e.currentTarget;

        var
            px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
            py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);

        // open popup
        var popup = window.open(t.href, "social",
            "width=" + Config.Width + ",height=" + Config.Height +
            ",left=" + px + ",top=" + py +
            ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
        if (popup) {
            popup.focus();
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        }

        return !!popup;
    }

}());*/

// Кроссбраузерное получение размеров окна на JS
function getPageSize() {
    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight) { // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    return [pageWidth, pageHeight, windowWidth, windowHeight];
}
