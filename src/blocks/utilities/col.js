import {
  Button,
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
  BaseControl
} from '@wordpress/components'
import { InspectorControls } from '@wordpress/block-editor'
import { Component } from '@wordpress/element'
import Select from 'react-select'
import { devices, sides } from '../helpers'

export default class Spacing extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      attributes: {
        classNamePadding,
        classNameMargin
      },
      setAttributes,
    } = this.props

    const forNumber = (start = 0, end = 6, before = '', append = '') => {
      const val = []

      for (let i = start; i < end; i++) {
        let current = before + i + append

        val.push({ value: current, label: current })
      }

      val.push({ value: before + 'auto' + append, label: before + 'auto' + append })

      return val
    }

    const options = (tag) => {
      let val = []

      val.push(...forNumber(0, 6, `${tag}-`))

      devices.forEach(el => {
        val.push(...forNumber(0, 6, `${tag}-${el}-`))
      })

      sides.forEach(el => {
        val.push(...forNumber(0, 6, `${tag}${el}-`))

        devices.forEach(_el => {
          val.push(...forNumber(0, 6, `${tag}${el}-${_el}-`))
        })
      })

      return val
    }

    return (
      <PanelBody title="Отступы" initialOpen={true}>
        <BaseControl>
          <BaseControl.VisualLabel>
            <label id="aria-label" htmlFor="ib-margin">
              Устанавливает величину отступа от каждого края элемента
            </label>
          </BaseControl.VisualLabel>
          <Select
            aria-labelledby="aria-label"
            inputId="ib-margin"
            name="Отступа от каждого края элемента"
            value={classNameMargin}
            onChange={value => setAttributes({ classNameMargin: value })}
            options={options('m')}
            isMulti="true"
            placeholder={'Выбрать'}
          />
        </BaseControl>
        <BaseControl>
          <BaseControl.VisualLabel>
            <label id="aria-label" htmlFor="ib-padding">
              Устанавливает значение полей вокруг содержимого элемента
            </label>
          </BaseControl.VisualLabel>
          <Select
            aria-labelledby="aria-label"
            inputId="ib-padding"
            name="Отступа от каждого края элемента"
            value={classNamePadding}
            onChange={value => setAttributes({ classNamePadding: value })}
            options={options('p')}
            isMulti="true"
            placeholder={'Выбрать'}
          />
        </BaseControl>
      </PanelBody>
    )
  }
}
