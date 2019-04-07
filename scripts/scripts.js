//Developer: Trent Brew
//Description: JQuery for fancy interactions

//-----------------------------global variables--------------------------------

var menuActive = false;
var scrollLimit = 650;
var navHeight = 80;
var topbarHeight = 30;
var fadeRate = .0025;
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
    setTimeout(function() {
      $("#mobile-link1").css('opacity','1');
    }, 1000);
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
    "background-color":"rgba(0,0,0,0)",
    "box-shadow":"none"
  });
}

function swoopLogo() {
  //console.log("swoopage");
  $(".logo").css({
    "width":"120px",
    "height":"55px",
    "margin":"auto",
    "left":"30px",
    "right":"100%",
    "top":"12px",
    "background-image":"url('res/logo(dark).png')"
  });

  /*$(".nav a").css({
    "color":"black"
  });*/

  $(".nav .indicator").css({
    "background-color":"black"
  });

  $(".active").css({
    "background-color":"#0288d1"
  });
}

function unswoopLogo() {
  //console.log("swoopage");
  $(".logo").css({
    "width":"350px",
    "height":"200px",
    "margin":"auto",
    "left":"0px",
    "right":"0px",
    "top":"-450px",
    "background-image":"url('res/logo(white).png')"
  });

  $(".nav a").css({
    "color":"white"
  });

  $(".nav .indicator").css({
    "background-color":"white"
  });

  $(".active").css({
    "background-color":"white"
  });
}

function fadeBanner(scroll) {
  clearVal = (scroll * fadeRate);
  $(".banner-container").css({
    'background':'linear-gradient(rgba(179,229,252,' + clearVal + '),rgba(255,255,255,' + clearVal + ')),url()'
  });

  $(".nav-links a").css({
    "color":"rgb(" + (255 - scroll) + "," + (255 - scroll) + "," + (255 - scroll) + ")"
  });

  $(".subtitle").css({
    "opacity": 1 - (clearVal)
  });

  $(".banner-button").css({
    "opacity": 1 - (clearVal)
  });

  console.log("scroll: " + scroll);
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

function animateIndicator() {
  $('.indicator').css({
    'width':'100%'
  });
}

//----------------------------------events-------------------------------------

$(window).ready(function() {
  console.log("the window is ready"); //test for working script

  //auto scroll animation for quote button
  $(".banner-button").click(function () {
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

  $(".nav-links a").hover(
    function() {
      //mouse-on
      $(this).find(".indicator").css({
        "width":"100%",
        "opacity":"1"
      });
    },
    function() {
      $(this).find(".indicator").css({
        "width":"10px",
        "opacity":"0"
      });
    }
  );
  //no animation for active tab
  $(".nav-links a").hover(
    function() {
      //mouse-on
      $(this).find(".active").css({
        "width":"100%",
        "opacity": "1"
      });
    },
    function() {
      $(this).find(".active").css({
        "width":"100%",
        "opacity":"1"
      });
    }
  );
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  //console.log(scroll);

  var scrollTemp = scrollq[1];
  scrollq = [scrollTemp, scroll];

  //conditionals below check whether navbar should be sticky or not
  if($(".nav").width() > 768) { //conditional prevents parallax on mobile
    if(scroll >= (scrollLimit - navHeight - topbarHeight)) {
      lockNav();
    }
    else {
      unlockNav();
    }

    if(scroll >= 110) { //animates logo if user scrolls past 250px
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
