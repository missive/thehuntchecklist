(function() {
  var slice = [].slice;

  $(document).ready(function() {
    var drop, initScroll, onScroll, requestTick, setThumbnail, toggleTopbar, updateCheckpoint, updateScroll;
    setThumbnail = function(img) {
      return $('.thumbnail').attr('style', "background-image: url('" + img + "')").html('');
    };
    drop = function(file) {
      var reader;
      reader = new FileReader();
      reader.onload = function(e) {
        setThumbnail(e.target.result);
        return localStorage.setItem("thumbnail", e.target.result);
      };
      return reader.readAsDataURL(file);
    };
    $('#timezone').change(function() {
      var california, time, tomorrow;
      localStorage.setItem("timezone", $(this).val());
      tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
      california = moment.tz(tomorrow + " 00:01", "America/Los_Angeles");
      time = california.clone().tz($(this).val()).format('LT').split(" ");
      return $("#time-to-post").html("<div class='col'><span class='hour'>" + time[0] + "</span></div><div class='col'><span class='am " + (time[1] === 'AM' ? 'selected' : '') + "'>AM</span><span class='pm " + (time[1] === 'PM' ? 'selected' : '') + "'>PM</span></div");
    });
    $('#ph-content-editable .ph-title').on('blur keyup paste input', function() {
      return localStorage.setItem("ph-title", $(this).html());
    });
    $('#ph-content-editable .ph-subtitle').on('blur keyup paste input', function() {
      return localStorage.setItem("ph-subtitle", $(this).html());
    });
    $("#thumbnail-input").change(function() {
      if (this.files && this.files[0]) {
        return drop(this.files[0]);
      }
    });
    $("a.thumbnail-uploader")[0].addEventListener("dragover", function(e) {
      return e.preventDefault();
    }, false);
    $("a.thumbnail-uploader")[0].addEventListener("drop", function(e) {
      e.preventDefault();
      return drop(e.dataTransfer.files[0]);
    }, false);
    $("a.thumbnail-uploader").click(function(e) {
      e.preventDefault();
      return $("#thumbnail-input").trigger('click');
    });
    $("#first-comment").on('change keyup paste', function() {
      return localStorage.setItem("firstComment", $(this).val());
    });
    if (localStorage.getItem("firstComment")) {
      $("#first-comment").val(localStorage.getItem("firstComment"));
    }
    if (localStorage.getItem("thumbnail")) {
      setThumbnail(localStorage.getItem("thumbnail"));
    }
    if (localStorage.getItem("timezone")) {
      $('#timezone').val(localStorage.getItem("timezone")).trigger("change");
    }
    if (!localStorage.getItem("backstory")) {
      $('.removable-box').removeClass('hide');
    }
    if (localStorage.getItem("ph-title")) {
      $('#ph-content-editable .ph-title').html(localStorage.getItem("ph-title"));
    }
    if (localStorage.getItem("ph-subtitle")) {
      $('#ph-content-editable .ph-subtitle').html(localStorage.getItem("ph-subtitle"));
    }
    if (!localStorage.getItem("timezone")) {
      if (typeof Intl !== 'undefined') {
        $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change");
      } else {
        $('#timezone').val(moment.tz.guess()).trigger("change");
      }
    }
    $("a.button-close").click(function(e) {
      var $container;
      e.preventDefault();
      $container = $(e.currentTarget).closest('.removable-box');
      $container.addClass('hide');
      return localStorage.setItem("backstory", 'hide');
    });
    $('#facebook-link').click(function() {
      return window.open("http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURI('http://thehuntchecklist.com/'), 'facebook-share-dialog', 'width=626,height=436');
    });
    $('#google-link').click(function() {
      return window.open("https://plus.google.com/share?url=" + encodeURI('http://thehuntchecklist.com/'), 'google-share-dialog', 'width=626,height=436');
    });
    requestTick = function() {
      var args, fn;
      fn = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (this.ticking) {
        return;
      }
      this.ticking = true;
      return window.requestAnimationFrame((function(_this) {
        return function() {
          _this.ticking = false;
          return fn.call.apply(fn, [_this].concat(slice.call(args)));
        };
      })(this));
    };
    initScroll = function() {
      this.latestScrolled = window.pageYOffset;
      this.$topbar = $('.topbar');
      this.topbarCollapsed = void 0;
      this.topbarCheckpoint = $('.hero').height() * 0.8;
      updateScroll();
      window.addEventListener('scroll', onScroll);
      window.addEventListener('resize', onScroll);
      return window.addEventListener('resize', updateCheckpoint);
    };
    updateCheckpoint = function() {
      return this.topbarCheckpoint = $('.hero').height() * 0.8;
    };
    onScroll = function() {
      this.latestScrolled = window.pageYOffset;
      return requestTick(updateScroll);
    };
    updateScroll = function() {
      return toggleTopbar();
    };
    toggleTopbar = function() {
      if (this.latestScrolled >= this.topbarCheckpoint) {
        if (this.topbarCollapsed) {
          return;
        }
        this.topbarCollapsed = true;
        return this.$topbar.addClass('visible');
      } else {
        if (this.topbarCollapsed === false) {
          return;
        }
        this.topbarCollapsed = false;
        return this.$topbar.removeClass('visible');
      }
    };
    return initScroll();
  });

}).call(this);
