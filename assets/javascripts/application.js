(function() {
  $(document).ready(function() {
    $('#timezone').change(function() {
      var california, tomorrow;
      tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
      california = moment.tz(tomorrow + " 00:01", "America/Los_Angeles");
      return $("#time-to-post").html(california.clone().tz($('#timezone').val()).format('ha z'));
    });
    if (typeof Intl.DateTimeFormat().resolvedOptions().timeZone !== 'undefined') {
      return $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change");
    }
  });

}).call(this);
