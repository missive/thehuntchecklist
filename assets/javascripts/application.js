(function() {
  $(document).ready(function() {
    $('#timezone').change(function() {
      var california, tomorrow;
      tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
      california = moment.tz(tomorrow + " 00:01", "America/Los_Angeles");
      return $("#time-to-post").html(california.clone().tz($('#timezone').val()).format('LT'));
    });
    if (typeof Intl.DateTimeFormat().resolvedOptions().timeZone !== 'undefined') {
      $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change");
    }
    return $("#thumbnail-input").change(function() {
      var reader;
      if (this.files && this.files[0]) {
        reader = new FileReader();
        reader.onload = function(e) {
          return $('#thumbnail').attr('style', "background-image: url('" + e.target.result + "')");
        };
        return reader.readAsDataURL(this.files[0]);
      }
    });
  });

}).call(this);
