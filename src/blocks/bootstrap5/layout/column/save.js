import {useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor'

export default function Save(props) {
  const {
    attributes: {
      classNameCol,
      classNameAlignSelf
    }
  } = props

  const classCol = Object.values(classNameCol).map(c => c).join(' ')
  const classAlignSelf = Object.values(classNameAlignSelf).map(c => c).join(' ')
  const classes = [classCol, classAlignSelf].join('')
    const blockProps = useBlockProps.save({ className: classes })
    const innerBlocksProps = useInnerBlocksProps.save(blockProps)

    return (
        <div {...innerBlocksProps} />
    )
}
