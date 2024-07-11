import {
    Button,
    PanelBody,
    RangeControl,
    SelectControl,
    TextControl,
    ToggleControl,
    TabPanel,
    NumberControl
} from '@wordpress/components'
import {InspectorControls} from '@wordpress/block-editor'
import {Component} from '@wordpress/element'
import {more} from '@wordpress/icons'
import React from "react";
import {deviceLayout} from "../../../../helpers";

export default class Inspector extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <InspectorControls>
                {deviceLayout('col', this.props)}
            </InspectorControls>
        )
    }
}
