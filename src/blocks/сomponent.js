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

export default class Utilities extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const devices = ['sm', 'md', 'lg', 'xl', 'xxl']
    const {
      attributes: {
        padding,
        margin
      },
      setAttributes,
    } = this.props
    const marginVal = () => {
      const val = []

      for (let i = 1; i < 5; i++) {
        val.push({ label: i, value: i })
      }

      return val
    }

    return (
      <InspectorControls>
        <PanelBody title="Настройки" initialOpen={true}>
          <SelectControl
            label="Отступа от каждого края элемента"
            value={margin}
            options={marginVal()}
            onChange={(value) => setAttributes({ margin: value })}
          />
        </PanelBody>
      </InspectorControls>
    )
  }
}
