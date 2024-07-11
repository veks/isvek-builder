import {
  Button,
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
} from '@wordpress/components'
import { InspectorControls } from '@wordpress/block-editor'
import { Component } from '@wordpress/element'

export default class Inspector extends Component {
  constructor (props) {
    super(props)
    this.state = { data: { type: '', label: '' } }
  }

  render () {
    const {
      attributes: {
        fields,
        isModal,
        nameModalButton,
        classNameModalButton,
        classNameButton,
        nameButton
      },
      setAttributes,
    } = this.props

    const uuidv4 = () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),)
    }

    const data = this.state.data
    const setData = (params) => this.setState({ data: params })

    return (
      <InspectorControls>
        <PanelBody title="Добавить поля" initialOpen={true}>
          <SelectControl
            label="Тип поля"
            value={data.type}
            options={[
              { value: null, label: 'Выберите тип поля' },
              { value: 'text', label: 'Строковое поле' },
              { value: 'hidden', label: 'Скрытое поле' },
              { value: 'textarea', label: 'Текстовое поле' },
              { value: 'email', label: 'Адрес электронной почты' },
              { value: 'tel', label: 'Поле для телефона' },
              { value: 'number', label: 'Числовое поле' },
            ]}
            onChange={(value) => setData({ 'type': value, 'label': '' })}
          />
          <TextControl
            value={data.label}
            label="Наименование"
            onChange={(value) => setData({ 'type': data.type, 'label': value })}
          />
          {/*{(data.type === 'select' || data.type === 'radio') && (
              <SelectControl
                label="Выберите тип поля"
                options={[
                  { value: null, label: 'Выберите тип поля' },
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                ]}
                onChange={(value) => {
                  setdata({ 'type': data.type, 'options': value })
                }}
              />
            )}*/}

          <Button
            className={'is-primary'}
            onClick={() => {
              const typeName = (type) => {
                const t = {
                  'text': 'Строковое поле',
                  'textarea': 'Текстовое поле',
                  'hidden': 'Скрытое поле',
                  'tel': 'Поле для телефона',
                  'email': 'Адрес электронной почты',
                  'number': 'Числовое поле',
                }
                return t[type]
              }

              if (data.type === undefined || data.type === '') {
                alert('Выберите тип поля')
              } else {
                setAttributes({
                  fields: ([
                    ...fields, {
                      label: data.label === '' ? typeName(data.type) : data.label,
                      type: data.type,
                      name: uuidv4(),
                      description: '',
                      placeholder: '',
                      width: '12',
                      validation: {
                        /*max: false,
                        min: false,
                        pattern: false,
                        maxLength: false,
                        minLength: false,*/
                        required: false,
                      },
                      data: {
                        'type': '',
                        'filter_name': 'isvek_plugin_field_filter'
                      }
                    }]),
                })

                setData({ 'type': '', 'label': '' })
              }
            }}
          >Добавить</Button>
        </PanelBody>
        <PanelBody title="Настройки модального окна" initialOpen={true}>
          <ToggleControl
            label="Включить модальое окно?"
            checked={isModal}
            onChange={(value) => setAttributes({ isModal: value })}
          />

          {isModal && (
            <>
              <TextControl
                value={nameModalButton}
                label="Название кнопки открытия окна"
                onChange={(value) => setAttributes({ nameModalButton: value })}
              />
              <TextControl
                value={classNameModalButton}
                label="Класс кнопки открытия окна"
                onChange={(value) => setAttributes({ classNameModalButton: value })}
              />
            </>
          )}
          <TextControl
            value={nameButton}
            label="Название кнопки отправить"
            onChange={(value) => setAttributes({ nameButton: value })}
          />
          <TextControl
            value={classNameButton}
            label="Класс кнопки отправить"
            onChange={(value) => setAttributes({ classNameButton: value })}
          />
        </PanelBody>
      </InspectorControls>
    )
  }
}
