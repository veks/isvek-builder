import { registerBlockType } from '@wordpress/blocks'
import metadata from './block.json'
import Edit from './edit'
import Save from './save'

export default registerBlockType(metadata, {
  edit: Edit,
  save: Save,
})

