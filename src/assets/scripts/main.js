// Creare's 'Implied Consent' EU Cookie Law Banner v:2.4
// Conceived by Robert Kent, James Bavington & Tom Foyster

// Put into a namespace and by Bjørn Rosell
// https://gist.github.com/rosell-dk/217e1cfdf09bf01bb19f56644be0c6f7

var CookieBanner = (function () {
  return {
    createCookieWhenBannerIsShown: false,
    createCookieWhenAcceptIsClicked: true,
    cookieDuration: 14, // Number of days before the cookie expires, and banner reappears
    cookieName: 'cookieConsent', // Name of our cookie
    cookieValue: 'accept-optional', // Value of cookie

    _createDiv: function (html) {
      var bodytag = document.getElementsByTagName('body')[0]
      var banner = document.createElement('div')
      banner.setAttribute('id', 'cookie-banner')
      banner.innerHTML = html

      // Adds the Cookie Law Banner just after the opening <body> tag
      bodytag.prepend(banner)

      // Adds a class to the <body> tag when the banner is visible
      bodytag.classList.add('show-cookie-banner')

      if (CookieBanner.createCookieWhenBannerIsShown) {
        CookieBanner.createAcceptCookie()
      }
    },

    _createCookie: function (name, value, days) {
      var expires
      if (days) {
        var date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toGMTString()
      } else {
        expires = ''
      }
      document.cookie = name + '=' + value + expires + '; path=/'
    },

    _checkCookie: function (name) {
      var nameEQ = name + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    },

    _eraseCookie: function (name) {
      CookieBanner._createCookie(name, '', -1)
    },

    // Create the cookie
    createAcceptFunctionalCookie: function () {
      CookieBanner._createCookie(
        CookieBanner.cookieName,
        CookieBanner.cookieValue,
        CookieBanner.cookieDuration,
      )
    },

    createAcceptOptionalCookie: function () {
      CookieBanner._createCookie(
        CookieBanner.cookieName,
        CookieBanner.cookieValue,
        CookieBanner.cookieDuration,
      )
    },

    closeBanner: function () {
      var element = document.getElementById('cookie-banner')
      element.parentNode.removeChild(element)
    },

    acceptFunctional: function () {
      CookieBanner.createAcceptFunctionalCookie()
      CookieBanner.closeBanner()
    },

    acceptOptional: function () {
      CookieBanner.createAcceptOptionalCookie()
      CookieBanner.closeBanner()
    },

    showUnlessAccepted: function (html) {
      if (
        CookieBanner._checkCookie(CookieBanner.cookieName) !=
        CookieBanner.cookieValue
      ) {
        CookieBanner._createDiv(html)
      }
    },
  }
})()

window.onload = function () {
  var html =
    '<p><strong>Får vi bruke valgfrie informasjons&shy;kapsler?</strong> ' +
    'Om du svarer ja, bruker vi informasjons&shy;kapsler og lignende teknologi til statistikk og analyse. Målet er å forstå hvordan du og andre bruker mangfoldimai.no, slik at vi kan forbedre nettsidene.</p>'

  // Add buttons
  html +=
    '<div class="buttons"><button type="button" onclick="CookieBanner.acceptOptional();">Ja</button> <button type="button" onclick="CookieBanner.acceptFunctional();">Nei</button></div>'

  CookieBanner.showUnlessAccepted(html)
}
