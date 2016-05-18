$(document).ready(->
  # When to post your product

  if localStorage.getItem("firstComment")
    $("#first-comment").val(localStorage.getItem("firstComment"))

  $('#timezone').change(->
    tomorrow   = moment().add('days', 1).format("YYYY-MM-DD")
    california = moment.tz("#{tomorrow} 00:01", "America/Los_Angeles")
    $("#time-to-post").html(
      california.clone().tz($('#timezone').val()).format('LT')
    )
  )
  unless typeof Intl.DateTimeFormat().resolvedOptions().timeZone is 'undefined'
    $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change")

  drop = (file)->
    reader = new FileReader()
    reader.onload = (e)->
      $('.thumbnail-destination').attr('style', "background-image: url('#{e.target.result}')").html('')
    reader.readAsDataURL(file);

  # Thumbnail
  $("#thumbnail-input").change(->
    if (this.files && this.files[0])
      drop(this.files[0])
  )

  $("a.thumbnail-uploader")[0].addEventListener("dragover", (e) ->
    e.preventDefault()
  , false)

  $("a.thumbnail-uploader")[0].addEventListener("drop",  (e) ->
    e.preventDefault()
    drop(e.dataTransfer.files[0])
  , false)

  $("a.thumbnail-uploader").click((e)->
     e.preventDefault()
     $("#thumbnail-input").trigger('click')
  )

  $("#first-comment").on('change keyup paste', ->
    localStorage.setItem("firstComment", $(this).val())
  )
)
