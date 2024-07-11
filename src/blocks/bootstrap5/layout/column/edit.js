import {
  useBlockProps,
  BlockControls,
  useInnerBlocksProps,
} from '@wordpress/block-editor'
import { ToolbarDropdownMenu } from '@wordpress/components'
import { stretchFullWidth } from '@wordpress/icons'
import Inspector from './components/inspector'

export default function Edit (props) {
  const {
    attributes: {
      classNameCol,
      classNameAlignSelf
    }
  } = props

  const classCol = Object.values(classNameCol).map(c => c).join(' ')
  const classAlignSelf = Object.values(classNameAlignSelf).map(c => c).join(' ')
  const classes = [classCol, classAlignSelf].join('')
  const blockProps = useBlockProps({ className: classes })
  const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps)

  return (
    <div {...innerBlocksProps} style={{ border: '2px dashed #cdcdcd', padding: '1rem' }}>
      <Inspector {...props} />
      <div style={{ borderBottom: '2px solid #cdcdcd', marginBottom: '.5rem' }}>
        <strong>{innerBlocksProps['data-title']}</strong>
      </div>
      {children}
    </div>
  )
}
