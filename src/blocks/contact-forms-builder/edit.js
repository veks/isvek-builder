import { useBlockProps, } from '@wordpress/block-editor'
import {
  Button,
  CheckboxControl,
  SelectControl,
  TextControl,
  Disabled,
} from '@wordpress/components'
import { ReactSortable } from 'react-sortablejs'
import Inspector from './components/inspector'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useEffect } from '@wordpress/element'
import './editor.scss'

export default function Edit (props) {
  const {
    attributes: {
      fields,
    },
    clientId,
    setAttributes,
  } = props

  useEffect(() => setAttributes({ blockId: clientId }), [setAttributes])
  const editField = (event) => {
    if (!event.target.closest('.contact-forms-plugin-list-group-item').querySelector('.contact-forms-plugin-editor').classList.contains('show')) {
      let listGroup = event.target.closest('.contact-forms-plugin-list-group').childNodes

      listGroup.forEach(el => {
        if (el.querySelector('.contact-forms-plugin-editor').classList.contains('show')) {
          el.querySelector('.contact-forms-plugin-editor').classList.remove('show')
        }
      })
    }

    event.target.closest('.contact-forms-plugin-list-group-item').querySelector('.contact-forms-plugin-editor').classList.toggle('show')
  }
  const removeField = (index) => {
    if (window.confirm('Вы уверены, что хотите удалить это?')) {
      setAttributes({
        fields: [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ],
      })
    }
  }

  return (
    <>
      <div {...useBlockProps()}>
        <Inspector {...props} />
        <Tabs
          defaultActiveKey="form"
          transition={true}
          className="mb-3"
        >
          <Tab eventKey="form" title="Форма">
            <div className={'contact-forms-builder'}>
              {fields.length === 0 && (
                <div className={'contact-forms-plugin-title'}>
                  Нажми на меня чтобы добавить поля
                </div>
              )}
              <ReactSortable
                list={fields}
                setList={(value) => {
                  setAttributes({ fields: value })
                }}
                className="contact-forms-plugin-list-group"
                animation={200}
                handle={'.contact-forms-plugin-handle'}
                delayOnTouchStart={true}
                forceFallback={true}
                delay={2}
              >
                {fields.map((field, index) => (
                  <div key={index} data-id={index} className={'contact-forms-plugin-list-group-item'}>
                    <div className={'contact-forms-plugin-block'}>
                      <div className="contact-forms-plugin-handle">::::</div>
                      <div className={'name'}>
                        {field.label}
                        {field.validation.required && (
                          <span style={{ color: 'red', paddingLeft: '.5rem' }}>*</span>
                        )}
                      </div>
                      <div className={'contact-forms-plugin-button-group'}>

                        <Button
                          className={'contact-forms-plugin-edit is-primary'}
                          onClick={event => editField(event)}
                        >
                          <span className="dashicons dashicons-edit"/>
                        </Button>
                        <Button
                          variant="primary"
                          className={'contact-forms-plugin-remove is-primary'}
                          onClick={() => removeField(index)}
                        >
                          <span className="dashicons dashicons-trash"/>
                        </Button>
                      </div>
                    </div>
                    <div className={'contact-forms-plugin-editor'}>
                      {(field.type !== 'hidden') && (
                        <CheckboxControl
                          label={'Обязательное поле'}
                          checked={field.validation.required}
                          onChange={(value) => {
                            const newFields = Object.assign({}, fields[index])

                            newFields.validation.required = value

                            setAttributes([...fields, { fields: [newFields] }])
                          }}
                        />
                      )}
                      <TextControl
                        label={'Наименование'}
                        value={field.label}
                        onChange={(value) => {
                          setAttributes([
                            ...fields, {
                              fields: [
                                ...fields.slice(0, index),
                                Object.assign(fields[index], { 'label': value }),
                                ...fields.slice(index + 1),
                              ],
                            }])
                        }}
                      />
                      <SelectControl
                        label={'Тип поля'}
                        value={field.type}
                        options={[
                          { value: 'text', label: 'Строковое поле' },
                          { value: 'hidden', label: 'Скрытое поле' },
                          { value: 'textarea', label: 'Текстовое поле' },
                          { value: 'email', label: 'Адрес электронной почты' },
                          { value: 'tel', label: 'Поле для телефона' },
                          { value: 'number', label: 'Числовое поле' },
                        ]}
                        onChange={(value) => {
                          setAttributes([
                            ...fields, {
                              fields: [
                                ...fields.slice(0, index),
                                Object.assign(fields[index], { 'type': value }),
                                ...fields.slice(index + 1),
                              ],
                            }])
                        }}
                      />
                      {(field.type !== 'hidden') && (
                        <TextControl
                          label={'Подсказка'}
                          value={field.description}
                          onChange={(value) => {
                            setAttributes([
                              ...fields, {
                                fields: [
                                  ...fields.slice(0, index),
                                  Object.assign(fields[index],
                                    { 'description': value }),
                                  ...fields.slice(index + 1),
                                ],
                              }])
                          }}
                        />)}
                      {(field.type !== 'hidden') && (
                        <TextControl
                          label={'Текст в незаполненном поле (placeholder)'}
                          value={field.placeholder}
                          onChange={(value) => {
                            setAttributes([
                              ...fields, {
                                fields: [
                                  ...fields.slice(0, index),
                                  Object.assign(fields[index],
                                    { 'placeholder': value }),
                                  ...fields.slice(index + 1),
                                ],
                              }])
                          }}
                        />)}
                      <Disabled>
                        <TextControl
                          label={'Имя'}
                          value={field.name}
                          style={{ opacity: 0.7 }}
                          onChange={(value) => {
                            setAttributes([
                              ...fields, {
                                fields: [
                                  ...fields.slice(0, index),
                                  Object.assign(fields[index], { 'name': value }),
                                  ...fields.slice(index + 1),
                                ],
                              }])
                          }}
                        />
                      </Disabled>

                      {(field.type === 'textarea') && (
                        <TextControl
                          label={'Ряды'}
                          type={'number'}
                          className={'small-text'}
                          value={field.min}
                          onChange={(value) => {
                            setAttributes([
                              ...fields, {
                                fields: [
                                  ...fields.slice(0, index),
                                  Object.assign(fields[index], { 'rows': value }),
                                  ...fields.slice(index + 1),
                                ],
                              }])
                          }}
                        />
                      )}
                      {(field.type === 'number') && (
                        <>
                          <TextControl
                            label={'Минимальное значение'}
                            type={'number'}
                            className={'small-text'}
                            value={field.min}
                            onChange={(value) => {
                              setAttributes([
                                ...fields, {
                                  fields: [
                                    ...fields.slice(0, index),
                                    Object.assign(fields[index], { 'min': value }),
                                    ...fields.slice(index + 1),
                                  ],
                                }])
                            }}
                          />
                          <TextControl
                            label={'Максимальное значение'}
                            type={'number'}
                            className={'small-text'}
                            value={field.max}
                            onChange={(value) => {
                              setAttributes([
                                ...fields, {
                                  fields: [
                                    ...fields.slice(0, index),
                                    Object.assign(fields[index], { 'max': value }),
                                    ...fields.slice(index + 1),
                                  ],
                                }])
                            }}
                          />
                          <TextControl
                            label={'Шаг'}
                            type={'number'}
                            className={'small-text'}
                            value={field.step}
                            onChange={(value) => {
                              setAttributes([
                                ...fields, {
                                  fields: [
                                    ...fields.slice(0, index),
                                    Object.assign(fields[index], { 'step': value }),
                                    ...fields.slice(index + 1),
                                  ],
                                }])
                            }}
                          />
                        </>
                      )}
                      {(field.type !== 'hidden') && (
                        <SelectControl
                          label="Размер поля"
                          value={field.width}
                          options={[
                            { label: '100%', value: '12' },
                            { label: '75%', value: '9' },
                            { label: '50%', value: '6' },
                            { label: '25%', value: '3' },
                          ]}
                          onChange={(value) => {
                            setAttributes([
                              ...fields, {
                                fields: [
                                  ...fields.slice(0, index),
                                  Object.assign(fields[index], { 'width': value }),
                                  ...fields.slice(index + 1),
                                ],
                              }])
                          }}
                        />)}
                      <SelectControl
                        label="Вывод данных"
                        value={field.data.type}
                        options={[
                          { label: 'Нет', value: '' },
                          { label: 'get_the_ID', value: 'get_the_ID' },
                          { label: 'product_get_id', value: 'product_get_id' },
                          { label: 'product_get_sku', value: 'product_get_sku' },
                          { label: 'Фильтр', value: 'filter' },
                        ]}
                        onChange={(value) => {
                          setAttributes([
                            ...fields, {
                              fields: [
                                ...fields.slice(0, index),
                                Object.assign(fields[index], {
                                  'data': {
                                    'type': value,
                                    'filter_name': 'isvek_plugin_field_filter'
                                  }
                                }),
                                ...fields.slice(index + 1),
                              ],
                            }])
                        }}
                      />
                      {(field.data && field.data.type === 'filter') && (
                        <TextControl
                          label={'Название фильтра'}
                          type={'text'}
                          className={'small-text'}
                          value={field.data.filter_name}
                          onChange={(value) => {
                            setAttributes([
                              ...fields, {
                                fields: [
                                  ...fields.slice(0, index),
                                  Object.assign(fields[index], {
                                    'data': {
                                      'type': 'filter',
                                      'filter_name': value
                                    }
                                  }),
                                  ...fields.slice(index + 1),
                                ],
                              }])
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
          </Tab>
          <Tab eventKey="template" title="Шаблон HTML письма">
            {fields.map((field, index) => (

              <div className={`field-${index}`} key={index}>
                <strong>{field.label}</strong>
                <br/>
                {field.type === 'hidden' ? 'Данные из фильтра' : 'Текс введенный пользователем'}
                <hr/>
              </div>
            ))}
          </Tab>
          <Tab eventKey="debug" title="Отладка">
              <pre>
                {JSON.stringify(fields, undefined, 2)}
              </pre>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
