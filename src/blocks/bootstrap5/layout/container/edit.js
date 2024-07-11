import {
  useBlockProps,
  BlockControls,
  useInnerBlocksProps,
} from '@wordpress/block-editor'
import { ToolbarDropdownMenu } from '@wordpress/components'
import { stretchFullWidth } from '@wordpress/icons'

export default function Edit ({ attributes: { classNameContainer }, setAttributes, }) {
  const prefix = 'container'
  const blockProps = useBlockProps({ className: classNameContainer })
  const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps)
  const container = ['default', 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid']
  const toolbarDropdownMenuControls = container.map(element => ({
    title: element,
    onClick: () => setAttributes({
      classNameContainer: element === 'default' ? prefix : `${prefix}-${element}`,
    }),
  }))

  return (
    <div {...innerBlocksProps}
         style={{ border: '2px dashed #cdcdcd', padding: '1rem' }}>
      {
        <BlockControls>
          <ToolbarDropdownMenu
            icon={stretchFullWidth}
            label="Выберите размер контейнера"
            controls={toolbarDropdownMenuControls}
          />

        </BlockControls>
      }

      <div
        style={{ borderBottom: '2px solid #cdcdcd', marginBottom: '.5rem' }}>
        {innerBlocksProps['data-title']} {classNameContainer ?? ''}
      </div>
      {children}
    </div>
  )
}
