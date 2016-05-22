$(document).ready(->
  setThumbnail = (img)->
    $('.thumbnail').attr('style', "background-image: url('#{img}')").html('')

  drop = (file)->
    reader = new FileReader()
    reader.onload = (e)->
      setThumbnail(e.target.result)
      localStorage.setItem("thumbnail", e.target.result)
    reader.readAsDataURL(file);

  # When to post your product
  $('#timezone').change(->
    localStorage.setItem("timezone", $(this).val())
    tomorrow   = moment().add('days', 1).format("YYYY-MM-DD")
    california = moment.tz("#{tomorrow} 00:01", "America/Los_Angeles")
    time = california.clone().tz($(this).val()).format('LT').split(" ")
    $("#time-to-post").html(
      "<div class='col'><span class='hour'>#{time[0]}</span></div><div class='col'><span class='am #{if time[1] is 'AM' then 'selected' else ''}'>AM</span><span class='pm #{if time[1] is 'PM' then 'selected' else ''}'>PM</span></div"
    )
  )

  $('#ph-content-editable .ph-title').on('blur keyup paste input', ->
    localStorage.setItem("ph-title", $(this).html())
  )

  $('#ph-content-editable .ph-subtitle').on('blur keyup paste input', ->
    localStorage.setItem("ph-subtitle", $(this).html())
  )

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

  # LocalStorage
  if localStorage.getItem("firstComment")
    $("#first-comment").val(localStorage.getItem("firstComment"))

  if localStorage.getItem("thumbnail")
    setThumbnail(localStorage.getItem("thumbnail"))

  if localStorage.getItem("timezone")
    $('#timezone').val(localStorage.getItem("timezone")).trigger("change")

  if !localStorage.getItem("backstory")
    $('.removable-box').removeClass('hide')

  if localStorage.getItem("ph-title")
    $('#ph-content-editable .ph-title').html(localStorage.getItem("ph-title"))

  if localStorage.getItem("ph-subtitle")
    $('#ph-content-editable .ph-subtitle').html(localStorage.getItem("ph-subtitle"))

  unless localStorage.getItem("timezone")
    unless typeof Intl is 'undefined'
      $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone).trigger("change")
    else
      $('#timezone').val(moment.tz.guess()).trigger("change")

  # General stuff
  $("a.button-close").click (e)->
    e.preventDefault()
    $container = $(e.currentTarget).closest('.removable-box')
    $container.addClass('hide')
    localStorage.setItem("backstory", 'hide')

  $('#facebook-link').click ->
    window.open("http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURI('http://thehuntchecklist.com/'), 'facebook-share-dialog', 'width=626,height=436')
  $('#google-link').click ->
      window.open("https://plus.google.com/share?url=" + encodeURI('http://thehuntchecklist.com/'), 'google-share-dialog', 'width=626,height=436')

  # Tick
  requestTick = (fn, args...) ->
    return if @ticking
    @ticking = true

    window.requestAnimationFrame =>
      @ticking = false
      fn.call(this, args...)

  # Scroll
  initScroll = ->
    @latestScrolled = window.pageYOffset

    @$topbar = $('.topbar')
    @topbarCollapsed = undefined
    @topbarCheckpoint = $('.hero').height() * 0.8

    updateScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    window.addEventListener('resize', updateCheckpoint)

  updateCheckpoint = ->
    @topbarCheckpoint = $('.hero').height() * 0.8

  onScroll = ->
    @latestScrolled = window.pageYOffset
    requestTick(updateScroll)

  updateScroll= ->
    toggleTopbar()

  # Topbar
  toggleTopbar= ->
    if @latestScrolled >= @topbarCheckpoint
      return if @topbarCollapsed
      @topbarCollapsed = true
      @$topbar.addClass('visible')
    else
      return if @topbarCollapsed is false
      @topbarCollapsed = false
      @$topbar.removeClass('visible')

  initScroll()
)
