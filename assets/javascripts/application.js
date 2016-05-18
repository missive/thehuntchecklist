(function() {
  $(document).ready(function() {
    var drop;
    if (localStorage.getItem("firstComment")) {
      $("#first-comment").val(localStorage.getItem("firstComment"));
    }
    $('#timezone').change(function() {
      var california, tomorrow;
      tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
      california = moment.tz(tomorrow + " 00:01", "America/Los_Angeles");
      return $("#time-to-post").html(california.clone().tz($('#timezone').val()).format('LT'));
    });
    if (typeof Intl.DateTimeFormat().resolvedOptions().timeZone !== 'undefined') {
      $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change");
    }
    drop = function(file) {
      var reader;
      reader = new FileReader();
      reader.onload = function(e) {
        return $('.thumbnail-destination').attr('style', "background-image: url('" + e.target.result + "')").html('');
      };
      return reader.readAsDataURL(file);
    };
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
    return $("#first-comment").on('change keyup paste', function() {
      return localStorage.setItem("firstComment", $(this).val());
    });
  });

}).call(this);
