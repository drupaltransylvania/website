/**
 * @file
 * DrupalCampTransylvania matchHeight behaviors.
 */

(function ($, Drupal) {

  'use strict';

  function scheduleTabs() {
    $('.day-tabs-container .day-tab').on('click', function () {
      var tabId = $(this).attr('data-tab');

      $('.day-tabs-container .day-tab').removeClass('active-tab');
      $('.day-tab-content').removeClass('active-tab-content');

      $(this).addClass('active-tab');
      $('#' + tabId).addClass('active-tab-content');
    });
  }

  function mobileScheduleSlider() {
    var roomSlider = $('.mobile-room-slider');
    var daySlider = $('.day-schedule');

    var roomSliderOptions = {
      infinite: false,
      arrows: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.day-schedule'
    };

    var dayScheduleOptions = {
      infinite: false,
      arrows: false,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.mobile-room-slider'
    }

    if ($(window).width() < 768) {
      if (roomSlider.hasClass('slick-initialized') == false) {
        roomSlider.slick(roomSliderOptions);
      }
      if (daySlider.hasClass('slick-initialized') == false) {
        daySlider.slick(dayScheduleOptions);
      }

      $('.day-tab').on('click', function () {
        if (roomSlider.hasClass('slick-initialized') || daySlider.hasClass('slick-initialized')) {
          roomSlider.slick('unslick');
          daySlider.slick('unslick');
          daySlider.slick(dayScheduleOptions);
          roomSlider.slick(roomSliderOptions);
        }
      });
    }
  }

  function calculateHeight() {
    var duration;
    var height;
    $('.schedule-item').each(function () {
      duration = $(this).attr('duration');
      height = parseInt(duration) * 7;
      $(this).height(height + 'px');
    });
  }

  scheduleTabs();
  mobileScheduleSlider();

  $(window).resize(function () {
    mobileScheduleSlider();
  });

})(jQuery, Drupal);
