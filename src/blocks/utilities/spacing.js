import {
  Button,
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
} from '@wordpress/components'
import { InspectorControls } from '@wordpress/block-editor'
import { Component } from '@wordpress/element'

export default class Spacing extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const devices = ['sm', 'md', 'lg', 'xl', 'xxl']
    const sides = ['t', 'b', 's', 'e', 'x', 'y']
    const {
      attributes: {
        padding,
        classNameMargin
      },
      setAttributes,
    } = this.props

    const forNumber = (start = 0, end = 5, before = '', append = '') => {
      const val = []

      for (let i = start; i < end; i++) {
        let current = before + i + append

        val.push([current])
      }

      val.push([before + 'auto' + append])

      return val
    }
    const options = (tag) => {
      const val = []

      val.push(forNumber(0, 5, `${tag}-`))

      console.log(forNumber(0, 5, `${tag}-${el}-`))
      devices.forEach(el => {
        val.push(forNumber(0, 5, `${tag}-${el}-`))
      })

      sides.forEach(el => {
        val.push(forNumber(0, 5, `${tag}${el}-`))
      })

      return val
    }

    return (
      <InspectorControls>
        <PanelBody title="Настройки" initialOpen={true}>
          <SelectControl
            label="Отступа от каждого края элемента"
            multiple
            value={classNameMargin}
            options={options('m')}
            onChange={(value) => setAttributes({ classNameMargin: value })}
          />
        </PanelBody>
      </InspectorControls>
    )
  }
}
