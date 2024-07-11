import { Component } from '@wordpress/element'
import { PanelBody, SelectControl, RangeControl, ToggleControl, } from '@wordpress/components'
import { InspectorControls, } from '@wordpress/block-editor'
import Spacing from '../../../../utilities/spacing'
import Background from '../../../../utilities/background'

export default class Inspector extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      attributes: {
        headerShow,
        titleShow
      },
      setAttributes,
    } = this.props

    return (
      <InspectorControls>
        <PanelBody title="Настройки" initialOpen={true}>
          <ToggleControl
            label="Включить Заголовок"
            checked={headerShow}
            onChange={(value) => setAttributes({ headerShow: value })}
          />
          <ToggleControl
            label="Включить Название"
            checked={titleShow}
            onChange={(value) => setAttributes({ titleShow: value })}
          />
        </PanelBody>

        <Background {...this.props}/>
        <Spacing {...this.props}/>
      </InspectorControls>
    )
  }
}
