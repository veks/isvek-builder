import ymaps from 'ymaps'

document.addEventListener('DOMContentLoaded', () => {
  let yandexMapsSelector = document.querySelectorAll('.yandex-maps')

  if (yandexMapsSelector) {
    setTimeout(() => {
      yandexMapsSelector.forEach(element => {
        ymaps.load(`https://api-maps.yandex.ru/2.1/?apikey=${isvekPluginYandexMapsArgs.key}&lang=ru_RU`)
          .then(maps => {
            const coords = element.getAttribute('data-yandex-maps-coords').split(',')
            const zoom = element.getAttribute('data-yandex-maps-zoom')
            const address = element.getAttribute('data-yandex-maps-address')
            const placemarkColor = element.getAttribute('data-yandex-maps-placemarkColor')
            const map = new maps.Map(element, {
              center: [coords[0], coords[1]],
              zoom: zoom
            })

            if (map) {
              document.querySelectorAll('.yandex-maps-placeholder').forEach(el => el.remove())

              element.childNodes[0].style.pointerEvents = 'none'

              element.addEventListener('click', () => {
                element.childNodes[0].style.pointerEvents = 'auto'
              })

              element.addEventListener('mouseleave', () => {
                element.childNodes[0].style.pointerEvents = 'none'
              })

              map.controls.remove('trafficControl')
              map.controls.remove('searchControl')
              map.controls.remove('geolocationControl')
              map.controls.remove('typeSelector')
              map.controls.remove('fullscreenControl')
              map.controls.remove('storage)')

              const placeMark = new maps.Placemark([coords[0], coords[1]], {
                balloonContent: address,
                iconCaption: address
              }, {
                preset: 'islands#greenDotIconWithCaption',
                iconColor: placemarkColor,
                iconCaptionMaxWidth: '500'
              })

              map.geoObjects.add(placeMark)
            }

          })
          .catch(error => console.log('Failed to load Yandex Maps', error))
      })
    }, 2500)
  }
})