import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'

export default function Save ({ attributes: { classNameRow } }) {
  const blockProps = useBlockProps.save({ className: classNameRow ?? '' })
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return (
    <div {...innerBlocksProps} />
  )
}
