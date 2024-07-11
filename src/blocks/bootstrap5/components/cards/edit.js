import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor'
import Inspector from './components/inspector'
import Card from 'react-bootstrap/Card'
import { useEffect } from '@wordpress/element'
import Utilities from '../../../utilities/spacing'
import Spacing from '../../../utilities/spacing'

export default function Edit (props) {
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

  useEffect(() => setAttributes({ blockId: clientId }), [setAttributes])
  const blockProps = useBlockProps()
  //const {children, ...innerBlocksProps} = useInnerBlocksProps(blockProps)

  return (
    <Card {...blockProps}>
      <Spacing {...props}/>
      <Card.Body>
        {titleShow && (
          <Card.title>
            <RichText
              tagName="div"
              allowedFormats={[]}
              value={title}
              placeholder="Заголовок"
              onChange={(value) => {
                setAttributes({ title: value })
              }}
            />
          </Card.title>
        )}
        <div className={'card-text'}>
          <InnerBlocks/>
        </div>
      </Card.Body>
    </Card>
  )
}
