//Developer: Trent Brew
//Description: JQuery for fancy interactions

//-----------------------------global variables--------------------------------

var menuActive = false;
var scrollLimit = 650;
var navHeight = 80;
var topbarHeight = 30;
var fadeRate = .002;
var clearVal = 0;

var bannerImages = ["res/banner1.jpg","res/lukes-locks-full.png"];
var scrollq = [0,0]; //buffer to differenciate scrolling up or down

//--------------------------------functions------------------------------------

function toggleMenu() {
  if(menuActive) {
    menuActive = false;
    $(".nav-links").css("display", "none");
    $(".nav").css("height", "80px");
    $(".nav-secondary").css("height", "80px");
    $(".menu-button").css("background-image","url('https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png')");
  }
  else {
    menuActive = true;
    $(".nav-links").css("display", "block");
    $(".nav").css("height", "100vh");
    $(".nav-secondary").css("height", "100vh");
    $(".menu-button").css("background-image", "url('https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-512.png')");
  }
}

function lockNav() {
  //console.log("lock nav");
  $(".nav").css({
    "position":"fixed",
    "top":topbarHeight +"px",
    "background-color":"white",
    "box-shadow":"0px 10px 25px 0px rgba(0,0,0,0.1)"
  });
}

function unlockNav() {
  //console.log("unlock nav");
  $(".nav").css({
    "position":"absolute",
    "top":scrollLimit - navHeight + "px",
    "background-color":"rgba(0,0,0,0)"
  });
}

function swoopLogo() {
  //console.log("swoopage");
  $(".logo").css({
    "width":"150px",
    "height":"75px",
    "margin":"auto",
    "left":"30px",
    "right":"100%",
    "top":"0px",
    "background-image":"url('res/lukes-locks-full.png')"
  });

  $(".nav a").css({
    "color":"black"
  });
}

function unswoopLogo() {
  //console.log("swoopage");
  $(".logo").css({
    "width":"400px",
    "height":"200px",
    "margin":"auto",
    "left":"0px",
    "right":"0px",
    "top":"-450px",
    "background-image":"url('res/lukes-locks-full-light.png')"
  });

  $(".nav a").css({
    "color":"white"
  });
}

function fadeBanner(scroll) {
  clearVal = (scroll * fadeRate);
  $(".banner").css({
    'background':'linear-gradient(rgba(255,255,255,' + clearVal + '),rgba(255,255,255,' + clearVal + ')),url(' + bannerImages[0] + ')',
    'background-size':'cover',
    'background-attachment':'fixed',
    'background-position':'center'
  });
}

function scrollingUp() {
  if(scrollq[0] > scrollq[1]) {
    return true;
  }
  else {
    return false;
  }
}

function scrollingDown() {
  if(scrollq[0] < scrollq[1]) {
    return true;
  }
  else {
    return false;
  }
}

//----------------------------------events-------------------------------------

$(window).ready(function() {
  console.log("the window is ready");
  //test for working script

  //auto scroll animation for quote button
  $(".banner-button").click(function (){
    $('html, body').animate({
        scrollTop: $(".about-us").offset().top - 175
    }, 2000);
  });

  //console.log($(".nav").width());

  /*setInterval(function() { //banner transition
    $(".banner").css({
      "background-image":bannerImages[i];
    });
  }, 3000);*/

  $(".menu-button").click(function() {
    console.log("button clicked");
    toggleMenu();
  });
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  //console.log(scroll);

  var scrollTemp = scrollq[1];
  scrollq = [scrollTemp, scroll];

  //conditionals below check whether navbar should be sticky or not
  if($(".nav").width() >= 768) { //conditional prevents parallax on mobile
    if(scroll >= (scrollLimit - navHeight - topbarHeight)) {
      lockNav();
    }
    else {
      unlockNav();
    }

    if(scroll >= 170) { //animates logo if user scrolls past 250px
      swoopLogo();
    }
    else {
      unswoopLogo();
    }

    if(scrollingUp() || scrollingDown()) {
      fadeBanner(scroll);
    }
  }
});
