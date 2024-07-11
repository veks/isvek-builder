import {useBlockProps,} from '@wordpress/block-editor'
import {useSelect, select} from '@wordpress/data'
import {useEffect} from '@wordpress/element'
import {SelectControl, Dashicon} from '@wordpress/components'
import './editor.scss'

export default function Edit(props) {
    const {
        attributes: {
            blockId,
            id,
        },
        setAttributes,
        clientId,
    } = props

    useEffect(() => setAttributes({blockId: clientId}), [setAttributes])

    const postType = useSelect((select) => select('core').getEntityRecords('postType', 'ib-contact-forms', {per_page: -1}), []);
    const options = []

    if (postType) {
        options.push({
            value: '',
            label: 'Выберите контактную форму'
        })
        postType.map(post => {
            options.push({
                value: post.id,
                label: post.title.rendered
            })
        })
    } else {
        options.push({
            value: '',
            label: 'Загрузка...'
        })
    }

    return (
        <div {...useBlockProps()}>
            <div className={'contact-forms'}>
                <Dashicon icon="feedback"/>
                <SelectControl
                    label={'Выберите контактную форму'}
                    options={options}
                    value={id}
                    onChange={(value) =>
                        setAttributes({id: value})
                    }
                />
            </div>
        </div>
    )
}
