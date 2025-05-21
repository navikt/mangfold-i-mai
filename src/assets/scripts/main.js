const addUmamiTracking = function () {
  var el = document.createElement('script')
  el.setAttribute(
    'src',
    'https://cdn.nav.no/team-researchops/sporing/sporing.js',
  )
  el.setAttribute('data-host-url', 'https://umami.nav.no')
  el.setAttribute('data-website-id', '97ae1e1a-cb15-4611-9a76-787c989f83d6')
  document.body.appendChild(el)
}

var CookieBanner = (function () {
  const markup = `<p>
  <strong>Får vi bruke valgfrie informasjons&shy;kapsler?</strong> Om du svarer ja, bruker vi informasjons&shy;kapsler og lignende teknologi til statistikk og analyse. Målet er å forstå hvordan du og andre bruker mangfoldimai.no, slik at vi kan forbedre nettsidene.
  </p>
  <div class="buttons">
    <button type="button" onclick="CookieBanner.acceptOptionalCookie();">Ja</button>
    <button type="button" onclick="CookieBanner.acceptFunctionalCookie();">Nei</button>
  </div>`

  return {
    cookieDuration: 14, // Number of days before the cookie expires, and banner reappears
    cookieName: 'cookieConsent', // Name of our cookie
    cookieValue: false, // Default value

    _createBanner: function () {
      var bodytag = document.getElementsByTagName('body')[0]
      var banner = document.createElement('div')
      banner.setAttribute('id', 'cookie-banner')
      banner.innerHTML = markup

      // Adds the Cookie Law Banner just after the opening <body> tag
      bodytag.prepend(banner)

      // Adds a class to the <body> tag when the banner is visible
      bodytag.classList.add('cookie-banner')

      // if (CookieBanner.createCookieWhenBannerIsShown) {
      //   CookieBanner.createAcceptCookie()
      // }
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

    _eraseCookie: function (name) {
      CookieBanner._createCookie(name, '', -1)
    },

    // Create the cookie
    createCookie: function () {
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

    acceptFunctionalCookie: function () {
      CookieBanner._createCookie(
        CookieBanner.cookieName,
        CookieBanner.cookieValue,
        CookieBanner.cookieDuration,
      )
      CookieBanner.closeBanner()
    },

    acceptOptionalCookie: function () {
      CookieBanner._createCookie(
        CookieBanner.cookieName,
        (CookieBanner.cookieValue = true),
        CookieBanner.cookieDuration,
      )
      CookieBanner.closeBanner()
    },

    showUnlessCookieExists: function () {
      if (document.cookie.startsWith(CookieBanner.cookieName) == '') {
        CookieBanner._createBanner()
      }
    },
  }
})()

window.onload = function () {
  const cookie = document.cookie.split('=')
  if (cookie[0] === CookieBanner.cookieName && cookie[1] === 'true') {
    addUmamiTracking()
  }
  CookieBanner.showUnlessCookieExists()
}
