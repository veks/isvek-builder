import { PanelBody, SelectControl, TabPanel } from '@wordpress/components'

const getCols = (field, key) => {
  if (key === 'xs') {
    key = null
  }

  const device = `${field}-${(key ? key + '-' : '')}`
  const cols = []

  if (field === 'row-cols') {
    cols.push({ label: 'Нет', value: '' })

    for (let i = 1; i <= 12; i++) {
      if (i > 0) {
        cols.push({ label: i, value: device + i })
      }
    }
  } else {
    cols.push({ label: 'Нет', value: '' })

    for (let i = 1; i <= 12; i++) {
      cols.push({ label: i, value: device + i })
    }

    cols.push({ label: 'Auto', value: device + 'auto' })
  }

  return cols
}
const tabs = () => {
  const _tabs = []

  devices.forEach(device => {
    _tabs.push({
      name: device,
      title: device,
      className: device,
    })
  })

  return _tabs
}

const deviceLayout = (key, props) => {
  const {
    attributes: {
      classNameCol,
      classNameAlignSelf
    },
    attributes,
    setAttributes
  } = props

  return (
    <TabPanel
      tabs={tabs()}
    >
      {(tab) => (
        <PanelBody title={'Настройки ' + tab.title} initialOpen={true}>
          <SelectControl
            label="Вертикальное выравнивание"
            options={[
              { label: 'Нет', value: '' },
              { label: 'align-self-start', value: 'align-self-start' },
              { label: 'align-self-end', value: 'align-self-end' },
              { label: 'align-self-center', value: 'align-self-center' },
              { label: 'align-self-baseline', value: 'align-self-baseline' },
              { label: 'align-self-stretch', value: 'align-self-stretch' },
            ]}
            onChange={(value) => setAttributes({ classNameAlignSelf: { ...classNameAlignSelf, ...{ [tab.title]: value } } })}
            value={classNameAlignSelf[tab.title]}
            help={'Выравнивание столбца сверху вниз. Это будет применяться ко всем устройствам больших размеров, если не будет переопределено.'}
          />
          <SelectControl
            label="Столбцы"
            options={getCols('col', tab.title)}
            onChange={(value) => setAttributes({ classNameCol: { ...classNameCol, ...{ [tab.title]: value } } })}
            value={classNameCol[tab.title]}
            help={'Количество столбцов для охвата.'}
          />
        </PanelBody>
      )}
    </TabPanel>
  )
}

const devices = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const sides = ['t', 'b', 's', 'e', 'x', 'y']
const background = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'tertiary', 'transparent']

export {
  sides,
  devices,
  background,
  deviceLayout,
  getCols
}
