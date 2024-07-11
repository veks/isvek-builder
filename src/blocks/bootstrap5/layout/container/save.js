import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor'

export default function Save ({ attributes: { classNameContainer } }) {
  const blockProps = useBlockProps.save({ className: classNameContainer ?? '' })
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return (
    <div {...innerBlocksProps} />
  )
}
