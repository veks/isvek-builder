import { Component } from '@wordpress/element'
import { PanelBody, SelectControl, RangeControl, ToggleControl, } from '@wordpress/components'
import { InspectorControls, } from '@wordpress/block-editor'

export default class Inspector extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {
      attributes: {
        carouselVariantDark,
        carouselInterval,
        carouselCaption,
        carouselIndicators,
        carouselControls,
        carouselFade,
        carouselWrap,
        carouselUrl,
        carouselPause
      },
      setAttributes,
    } = this.props

    return (
      <InspectorControls>
        <PanelBody title="Настройки" initialOpen={true}>
          <RangeControl
            label="Продолжительность автовоспроизведения (секунды)"
            value={carouselInterval}
            renderTooltipContent={value => `${value} сек.`}
            onChange={(value) =>
              setAttributes({ carouselInterval: value })
            }
            min={1}
            max={20}
          />
          <ToggleControl
            label="Темный вариант"
            help="Темный вариант цвета, который контролирует цвета элементов управления, индикаторов и подписей."
            checked={carouselVariantDark}
            onChange={(value) =>
              setAttributes({ carouselVariantDark: value })
            }
          />
          <ToggleControl
            label="Заголовок и подпись"
            help="Показать заголовок и подпись слайда."
            checked={carouselCaption}
            onChange={(value) =>
              setAttributes({ carouselCaption: value })
            }
          />
          <ToggleControl
            label="Индикаторы"
            help="Показать набор индикаторов положения слайда."
            checked={carouselIndicators}
            onChange={(value) =>
              setAttributes({ carouselIndicators: value })
            }
          />
          <ToggleControl
            label="Контроль"
            help="Показывать стрелки 'Назад' и 'Далее' в слайдере для изменения текущего слайда."
            checked={carouselControls}
            onChange={(value) =>
              setAttributes({ carouselControls: value })
            }
          />
          <ToggleControl
            label="Анимация слайдера"
            help="Анимирует слайды с помощью кроссфейдной анимации вместо стандартной слайдовой анимации."
            checked={carouselFade}
            onChange={(value) =>
              setAttributes({ carouselFade: value })
            }
          />
          <ToggleControl
            label="Обернуть вокруг"
            help="Должен ли слайдер работать непрерывно или иметь жесткие остановки."
            checked={carouselWrap}
            onChange={(value) =>
              setAttributes({ carouselWrap: value })
            }
          />
          <ToggleControl
            label="Включить ссылки"
            checked={carouselUrl}
            onChange={(value) =>
              setAttributes({ carouselUrl: value })
            }
          />
          <ToggleControl
            label="Остановить слайдер"
            help="Приостанавливает цикл слайдера при наведении мыши на слайдер"
            checked={carouselPause}
            onChange={(value) =>
              setAttributes({ carouselPause: value })
            }
          />
        </PanelBody>
      </InspectorControls>
    )
  }
}
