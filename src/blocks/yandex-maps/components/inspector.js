import { Component } from '@wordpress/element'
import { PanelBody, RangeControl, TextareaControl, ToggleControl } from '@wordpress/components'
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor'

export default class Inspector extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {
      attributes: {
        zoom,
        width,
        height,
        placemarkColor,
        address,
        substituteAddress
      },
      setAttributes,
    } = this.props

    return (
      <InspectorControls>
        <PanelBody title="Настройки" initialOpen={true}>
          <RangeControl
            label="Ширина карты"
            help="Ширина в процентах"
            value={width}
            onChange={(value) =>
              setAttributes({ width: value })
            }
            renderTooltipContent={value => `${value}%`}
            min={1}
            max={100}
          />
          <RangeControl
            label="Высота карты"
            help="Высота в пикселях максимальнрое значение 1000px"
            value={height}
            onChange={(value) =>
              setAttributes({ height: value })
            }
            renderTooltipContent={value => `${value}px`}
            min={1}
            max={1000}
          />
          <RangeControl
            label="Зум"
            value={zoom}
            onChange={(value) =>
              setAttributes({ zoom: value })
            }
            min={0}
            max={21}
          />
          <ToggleControl
            label="Подставлять адрес с интерактивной карты"
            checked={substituteAddress}
            onChange={(value) =>
              setAttributes({ substituteAddress: value })
            }
          />
          <TextareaControl
            label="Адресс"
            value={address}
            onChange={(value) =>
              setAttributes({ address: value })
            }
          />
          <PanelColorSettings
            title="Цвета"
            colorSettings={[
              {
                value: placemarkColor,
                onChange: (value) => setAttributes({ placemarkColor: value }),
                label: 'Цвет маркера',
              }
            ]}
          />
        </PanelBody>
      </InspectorControls>
    )
  }
}
