import { registerBlockType } from '@wordpress/blocks'
import block from './block.json'
import Edit from './edit'
import Save from './save'

export default registerBlockType(block, {
  edit: Edit,
  save: Save,
})

