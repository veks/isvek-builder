import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { useState, useRef, useEffect } from '@wordpress/element'
import { useBlockProps } from '@wordpress/block-editor'
import Inspector from './components/inspector.js'
import './editor.scss'

export default function Edit(props) {
    const {
        attributes: {
            blockId,
            coords,
            zoom,
            width,
            height,
            placemarkColor,
            address,
            substituteAddress
        },
        clientId,
        setAttributes,
    } = props

    useEffect(() => setAttributes({blockId: clientId}), [setAttributes])

    const maps = useRef(null)
    const [oldCoords, setOldCoords] = useState(coords)

    return (
      <div {...useBlockProps()}>
          <Inspector {...props} />
          <YMaps
            query={{
                lang: 'ru_RU',
                apikey: isvekPluginYandexMapsArgs.key,
                load: 'package.full'
            }}
            options={{
                searchControlProvider: 'yandex#search',
            }}
          >
              <Map
                defaultState={{
                    center: coords,
                    zoom: zoom,
                    type: 'yandex#map'
                }}
                state={{
                    center: oldCoords,
                    zoom: zoom
                }}
                className={`yandex-map yandex-map-${blockId}`}
                style={{
                    position: 'relative',
                    pointerEvents: 'none',
                    width: width + '%',
                    height: height + 'px'
                }}
                width={width + '%'}
                height={height + 'px'}
                onClick={event => {
                    setAttributes({
                        coords: event.get('coords'),
                    })
                    {
                        substituteAddress && (
                          maps.current.geocode(event.get('coords')).then((res) => {
                              let firstGeoObject = res.geoObjects.get(0)
                              setAttributes({ address: firstGeoObject.getAddressLine() })
                          })
                        )
                    }
                }}
                onLoad={(ymaps) => {
                    maps.current = ymaps
                    document.querySelectorAll(`.wp-block-isvek-plugin-blocks-yandex-maps`).forEach(elementBlock => {
                        elementBlock.addEventListener('click', () => {
                            document.querySelectorAll('.yandex-map').forEach(element => {
                                element.style.pointerEvents = 'auto'
                            })
                        })
                        elementBlock.addEventListener('mouseleave', () => {
                            document.querySelectorAll('.yandex-map').forEach(element => {
                                element.style.pointerEvents = 'none'
                            })
                        })
                    })
                    setOldCoords(coords)
                }}
                onBoundsChange={event => setAttributes({
                    zoom: event.originalEvent.newZoom
                })}
              >
                  <Placemark
                    geometry={coords}
                    properties={{
                        iconCaption: address,
                        balloonContent: address,
                    }}
                    options={{
                        iconColor: placemarkColor,
                        iconImageSize: [32, 32],
                        iconCaptionMaxWidth: '500'
                    }}
                  />
              </Map>
          </YMaps>
      </div>
    )
}
