var $wiki = $('#wiki-results'),
  $submit = $('#search-btn'),
  $random = $('#random-btn'),
  $search = $('#search-bar')

function wikiSearch () {
  var searchTxt = $search.val()
  var apiLink = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
  var apiRest = '&limit=20&format=json&callback=?'
  var apiCall = apiLink + searchTxt + apiRest
  $.getJSON(apiCall, function (data) {
    for (var i = 0; i < data[1].length; i++) {
      var articleLink = data[3][i]
      var articleHeadline = data[1][i]
      var articleText = data[2][i]
      $wiki.append('<div class="result"><h3 class="result__title"><a href="' + articleLink + '" target=_blank>' + articleHeadline + '</a></h3><p class="result__url">' + articleLink + '</p><p class="result__content">' + articleText + '</p></div>')
    }
  })
};

$(document).ajaxComplete(function () {
  $('main').show()
  $('footer').show()
  $('header').addClass('header--active')
})
$(document).ajaxStart(function () {
  clear()
  $('footer').hide()
})
function clear () {
  $('.result').remove()
}

$submit.click(function (e) {
  e.preventDefault()
  wikiSearch()
})

$random.click(function (e) {
  e.preventDefault()
  window.open('https://en.wikipedia.org/wiki/Special:Random')
})
