const getCookieByName = function (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}

const removeUmamiTracking = function () {
  const el = document.querySelector(
    'script[src="https://cdn.nav.no/team-researchops/sporing/sporing.js"]',
  )
  if (el) {
    el.parentNode.removeChild(el)
  }
  if (typeof window.umami !== 'undefined') {
    delete window.umami
  }
}

const addUmamiTracking = function () {
  if (typeof window.umami !== 'undefined') {
    return
  }
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
    <button type="button" onclick="CookieBanner.declineOptionalCookie();">Nei</button>
  </div>`

  return {
    cookieDuration: 14, // Number of days before the cookie expires, and banner reappears
    cookieName: 'cookieConsent', // Name of our cookie
    cookieValue: false, // Default value

    _createBanner: function () {
      if (document.getElementById('cookie-banner')) {
        return
      }
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

    declineOptionalCookie: function () {
      CookieBanner._createCookie(
        CookieBanner.cookieName,
        false,
        CookieBanner.cookieDuration,
      )
      removeUmamiTracking()
      CookieBanner.closeBanner()
    },

    acceptOptionalCookie: function () {
      CookieBanner._createCookie(
        CookieBanner.cookieName,
        true,
        CookieBanner.cookieDuration,
      )
      addUmamiTracking()
      CookieBanner.closeBanner()
    },

    showCookieBanner: function () {
      CookieBanner._createBanner()
    },

    showUnlessCookieExists: function () {
      const cookie = getCookieByName(CookieBanner.cookieName)
      if (cookie !== null) {
        CookieBanner._eraseCookie(CookieBanner.cookieName)
      }
      CookieBanner.showCookieBanner()
    },
  }
})()

// Make CookieBanner available globally
window.CookieBanner = CookieBanner

window.onload = function () {
  const cookie = getCookieByName(CookieBanner.cookieName)

  if (cookie === 'true') {
    addUmamiTracking()
  }

  if (cookie === null) {
    CookieBanner.showCookieBanner()
  }

  // Add event listener to the cookie consent change link
  const changeCookieConsentLink = document.getElementById(
    'change-cookie-consent',
  )
  if (changeCookieConsentLink) {
    changeCookieConsentLink.addEventListener('click', function (e) {
      e.preventDefault()
      CookieBanner.showUnlessCookieExists()
    })
  }
}
