$(document).ready(->
  # When to post your product
  $('#timezone').change(->
    tomorrow   = moment().add('days', 1).format("YYYY-MM-DD")
    california = moment.tz("#{tomorrow} 00:01", "America/Los_Angeles")
    $("#time-to-post").html(
      california.clone().tz($('#timezone').val()).format('ha z')
    )
  )
  unless typeof Intl.DateTimeFormat().resolvedOptions().timeZone is 'undefined'
    $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change")
)
