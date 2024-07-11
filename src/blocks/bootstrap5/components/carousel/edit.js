import Carousel from 'react-bootstrap/Carousel'
import {
  MediaUpload,
  MediaPlaceholder,
  useBlockProps,
  BlockControls,
  RichText,
  URLInput
} from '@wordpress/block-editor'
import {
  ToolbarButton,
  ToolbarGroup,
} from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element'
import Inspector from './components/inspector'
import './editor.scss'

export default function Edit (props) {
  const {
    attributes: {
      carouselImages,
      blockId,
      carouselCaption,
      carouselVariantDark,
      carouselIndicators,
      carouselInterval,
      carouselControls,
      carouselFade,
      carouselWrap,
      carouselUrl,
      carouselPause
    },
    setAttributes,
    clientId,
  } = props

  useEffect(() => setAttributes({ blockId: clientId }), [setAttributes])

  const [activeIndex, setActiveIndex] = useState(0)
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex)
  }

  return (
    <div {...useBlockProps()}>
      {
        carouselImages.length > 0 && (
          <BlockControls>
            <ToolbarGroup>
              <MediaUpload
                allowedTypes={['image']}
                value={carouselImages.map(img => img.id)}
                multiple
                gallery
                render={({ open }) => (
                  <ToolbarButton
                    icon={carouselImages.length === 0 ? 'plus' : 'edit'}
                    onClick={open}
                    label="Добавить изображение"
                  />
                )}
                onSelect={(newMedia) => {
                  const newImages = newMedia.map((img) =>
                    carouselImages.find((c) => c.id === img.id)
                      ? carouselImages.find((c) => c.id === img.id)
                      : {
                        id: img.id,
                        sizes: img.sizes.full,
                        caption: img.caption || '',
                        description: '',
                        url: '',
                      }
                  )
                  setAttributes({
                    carouselImages: newImages
                  })
                  setActiveIndex(0)
                }}
              />
            </ToolbarGroup>
          </BlockControls>
        )
      }
      <Inspector {...props} />
      {carouselImages.length === 0 ? (
        <MediaPlaceholder
          onSelect={(media) => {
            if (media && media[0].id) {
              setAttributes({
                carouselImages: media.map((img) => ({
                  id: img.id,
                  sizes: img.media_details && img.media_details.sizes.full.source_url ? { url: img.media_details.sizes.full.source_url } : img.sizes.full,
                  caption: img.caption || '',
                  description: '',
                  url: '',
                }))
              })
              setActiveIndex(0)
            }
          }}
          labels={{ title: 'Слайдер изображений' }}
          allowedTypes={['image']}
          multiple
        />
      ) : (
        <Carousel
          className={`carousel-${blockId}`}
          onSelect={handleSelect}
          activeIndex={activeIndex}
          indicators={carouselIndicators}
          interval={carouselInterval * 1000}
          controls={carouselControls}
          fade={carouselFade}
          variant={carouselVariantDark ? 'dark' : ''}
          wrap={carouselWrap}
          pause={carouselPause ? 'hover' : false}
        >
          {carouselImages.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block img-fluid w-100"
                src={item.sizes.url}
              />
              <Carousel.Caption>
                {carouselCaption && (
                  <RichText
                    tagName="h3"
                    allowedFormats={[]}
                    value={carouselImages[index].caption}
                    placeholder="Подпись"
                    onChange={(caption) => {
                      setAttributes({
                        carouselImages: [
                          ...carouselImages.slice(0, index),
                          Object.assign(carouselImages[index], { caption }),
                          ...carouselImages.slice(index + 1),
                        ],
                      })
                    }}
                  />
                )}
                {carouselCaption && (
                  <RichText
                    tagName="p"
                    allowedFormats={[]}
                    value={carouselImages[index].description}
                    placeholder="Описание"
                    onChange={(description) => {
                      setAttributes({
                        carouselImages: [
                          ...carouselImages.slice(0, index),
                          Object.assign(carouselImages[index], { description }),
                          ...carouselImages.slice(index + 1),
                        ],
                      })
                    }}
                  />
                )}
                {carouselUrl && (
                  <URLInput
                    value={carouselImages[index].url}
                    onChange={(url) => {
                      setAttributes({
                        carouselImages: [
                          ...carouselImages.slice(0, index),
                          Object.assign(carouselImages[index], { url }),
                          ...carouselImages.slice(index + 1),
                        ],
                      })
                    }}
                  />
                )}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  )
}
