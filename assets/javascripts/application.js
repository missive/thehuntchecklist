(function() {
  $(document).ready(function() {
    var drop, setThumbnail;
    setThumbnail = function(img) {
      return $('.thumbnail-destination').attr('style', "background-image: url('" + img + "')").html('');
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
      var california, tomorrow;
      localStorage.setItem("timezone", $(this).val());
      tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
      california = moment.tz(tomorrow + " 00:01", "America/Los_Angeles");
      return $("#time-to-post").html(california.clone().tz($(this).val()).format('LT'));
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
    if (!localStorage.getItem("timezone")) {
      if (typeof Intl.DateTimeFormat().resolvedOptions().timeZone !== 'undefined') {
        return $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change");
      }
    }
  });

}).call(this);
