import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor'
import Card from 'react-bootstrap/Card'

export default function Save (props) {
  const {
    attributes: {
      blockId,
      classNameCard,
      classNameBody,
      title,
      titleShow
    },
    setAttributes,
    clientId,
  } = props
  const blockProps = useBlockProps.save({ className: classNameCard ?? '' })

  return (
    <div {...blockProps}>
      <div className={classNameBody}>
        {titleShow && (
          <div className={'card-title'}>
            {title}
          </div>
        )}
        <div className={'card-text'}>
          <InnerBlocks.Content/>
        </div>
      </div>
    </div>
  )
}
