import {
  PanelBody,
  BaseControl
} from '@wordpress/components'
import { InspectorControls } from '@wordpress/block-editor'
import { Component } from '@wordpress/element'
import Select from 'react-select'
import { background } from '../helpers'

export default class Background extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      attributes: {
        classNameBackground,
      },
      setAttributes,
    } = this.props

    const options = (tag) => {
      let val = []

      background.forEach(el => {
        let current = `${tag}-${el}`
        val.push({ value: current, label: current })
      })

      background.forEach(el => {
        let current = `${tag}-${el}-subtle`

        if ('transparent' !== el) {
          val.push({ value: current, label: current })
        }
      })

      return val
    }

    return (
      <PanelBody title="Фон" initialOpen={true}>
        <BaseControl>
          <BaseControl.VisualLabel>
            <label id="aria-label" htmlFor="ib-background">
              Универсальное свойство background позволяет установить одновременно до пяти характеристик фона
            </label>
          </BaseControl.VisualLabel>
          <Select
            aria-labelledby="aria-label"
            inputId="ib-background"
            name="Фон"
            value={classNameBackground}
            onChange={value => setAttributes({ classNameBackground: value })}
            options={options('bg')}
            isMulti={false}
            placeholder={'Выбрать'}
          />
        </BaseControl>
      </PanelBody>
    )
  }
}
