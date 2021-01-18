$(document).ready( function () {
    $('.menu-sticky .nav li a').hover(
        function(){
            $("a.active").addClass('inactive').removeClass('active');
        },
        function(){
            $("a.inactive").addClass('active').removeClass('inactive');
        }
    );
    $(".close-menu").click(function(e){
        e.preventDefault();
        $('body').css('overflow', 'auto');
        $(".menu-sm").removeClass("active");
        $(".overlay-black").removeClass("overlay-black-visible");
    });
    $("#nav-icon").click(function(e){
        $('body').css('overflow', 'hidden');
        $('.menu-sm').addClass('active');
        $(".overlay-black").addClass("overlay-black-visible");
    });
    $(".menu-sm ul .sub-menu").click(function(e){
        $(".menu-sm ul .sub-menu ul").slideUp(300)
        if(!$(this).find("ul").is(":visible")){
            $(this).find("ul").slideDown(300);
        }
    });
    $(".thumbnail").click(function(){
        $(this).parent().addClass('selected').siblings().removeClass('selected');
        $(".attachment-detail").addClass('show');
    });
    $(".check .thumnail-delete").click( function () {
        $(".list-media ul li").removeClass('selected');
        $(".attachment-detail").removeClass('show');
    });
});
$(function(){
    var mq = window.matchMedia("(max-width: 640px)");
    if(mq.matches){
        $(".info-container li ul").hide();

        $(".info-container li").click(function(e){
            $(".info-container li ul").slideUp(300)
            if(!$(this).find("ul").is(":visible")){
                $(this).find("ul").slideDown(300);
            }
        });
    }
    else{
        $(".info-container li ul").show();
    }
})

$(function() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 60) {
            $('.menu-sticky').addClass('is-sticky');
        }
        if ($(this).scrollTop() < 60) {
            $('.menu-sticky').removeClass('is-sticky');
        }
    });
});
$(document).ready(function() {
    var submitIcon = $('.post-search-icon');
    var submitInput = $('.post-search-input');
    var searchBox = $('.post-search');
    var isOpen = false;

    $(document).mouseup(function () {
        if (isOpen == true) {
            submitInput.val('');
            $('.post-search-submit').css('z-index', '-999');
            submitIcon.click();
        }
    });

    submitIcon.mouseup(function () {
        return false;
    });

    searchBox.mouseup(function () {
        return false;
    });

    submitIcon.click(function () {
        if (isOpen == false) {
            searchBox.addClass('post-search-open');
            isOpen = true;
        } else {
            searchBox.removeClass('post-search-open');
            isOpen = false;
        }
    });
});
