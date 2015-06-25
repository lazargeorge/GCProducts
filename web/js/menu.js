(function($) {

  $.fn.menumaker = function(options) {
      
      var toggle-navigation = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        breakpoint: 768,
        sticky: false
      }, options);

      return this.each(function() {
        toggle-navigation.find('li ul').parent().addClass('has-sub');
        if (settings.format != 'select') {
          toggle-navigation.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });

          multiTg = function() {
            toggle-navigation.find(".has-sub").prepend('<span class="submenu-button"></span>');
            toggle-navigation.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };

          if (settings.format === 'multitoggle') multiTg();
          else toggle-navigation.addClass('dropdown');
        }

        else if (settings.format === 'select')
        {
          toggle-navigation.append('<select style="width: 100%"/>').addClass('select-list');
          var selectList = toggle-navigation.find('select');
          selectList.append('<option>' + settings.title + '</option>', {
                                                         "selected": "selected",
                                                         "value": ""});
          toggle-navigation.find('a').each(function() {
            var element = $(this), indentation = "";
            for (i = 1; i < element.parents('ul').length; i++)
            {
              indentation += '-';
            }
            selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
          });
          selectList.on('change', function() {
            window.location = $(this).find("option:selected").val();
          });
        }

        if (settings.sticky === true) toggle-navigation.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() > settings.breakpoint) {
            toggle-navigation.find('ul').show();
            toggle-navigation.removeClass('small-screen');
            if (settings.format === 'select') {
              toggle-navigation.find('select').hide();
            }
            else {
              toggle-navigation.find("#menu-button").removeClass("menu-opened");
            }
          }

          if ($(window).width() <= settings.breakpoint && !toggle-navigation.hasClass("small-screen")) {
            toggle-navigation.find('ul').hide().removeClass('open');
            toggle-navigation.addClass('small-screen');
            if (settings.format === 'select') {
              toggle-navigation.find('select').show();
            }
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function(){

$(window).load(function() {
  $("#toggle-navigation").menumaker({
    title: "Menu",
    format: "dropdown"
  });


$('#toggle-navigation').prepend("<div id='menu-indicator'></div>");

var foundActive = false, activeElement, indicatorPosition, indicator = $('#toggle-navigation #menu-indicator'), defaultPosition;

$("#toggle-navigation > ul > li").each(function() {
  if ($(this).hasClass('active')) {
    activeElement = $(this);
    foundActive = true;
  }
});

if (foundActive === false) {
  activeElement = $("#toggle-navigation > ul > li").first();
}

defaultPosition = indicatorPosition = activeElement.position().left + activeElement.width()/2 - 5;
console.log(activeElement);
console.log(activeElement.position().left);
console.log(activeElement.width());
indicator.css("left", indicatorPosition);

$("#toggle-navigation > ul > li").hover(function() {
  activeElement = $(this);
  indicatorPosition = activeElement.position().left + activeElement.width()/2 - 5;
  indicator.css("left", indicatorPosition);
}, 
function() {
  indicator.css("left", defaultPosition);
});

});

});
})(jQuery);
