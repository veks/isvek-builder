jQuery(document).ready(function ($) {
  const file_select = function () {
    let selector_file_select = $('.file-select')

    if (selector_file_select) {
      selector_file_select.each(function () {
        let $this = $(this)
        let file_select_button = $this.find('.file-select-button')
        let file_delete_button = $this.find('.file-delete-button')
        let file_select_input = $this.find('.file-select-input')

        let wp_media_file_select

        file_select_button.click(function (event) {
          event.preventDefault()

          if (wp_media_file_select) {
            wp_media_file_select.open()
            return
          }

          wp_media_file_select = wp.media.frames.file_frame = wp.media({
            title: 'Выбор файла',
            button: {
              text: 'Выбрать файл'
            },
            multiple: false
          })

          wp_media_file_select.on('select', function () {
            let attachment = wp_media_file_select.state().get('selection').first().toJSON()

            file_delete_button.removeClass('hidden')

            file_select_button.html('Изменить').attr('title', 'Изменить')

            file_select_input.val(attachment.url)
          })

          wp_media_file_select.open()
        })

        file_delete_button.on('click', function (event) {
          event.preventDefault()

          $(this).addClass('hidden')

          file_select_button.text('Добавить').attr('title', 'Добавить')
          file_select_input.val('')
        })
      })
    }
  }
  const image_select = function () {
    let selector_image_select = $('.image-select')

    if (selector_image_select) {
      selector_image_select.each(function () {
        let $this = $(this)
        let image_select_button = $this.find('.image-select-button')
        let image_delete_button = $this.find('.image-delete-button')
        let image_select_input = $this.find('.image-select-input')
        let image_container = $this.find('.image-container')

        let wp_media_image_select

        image_select_button.click(function (event) {
          event.preventDefault()

          if (wp_media_image_select) {
            wp_media_image_select.open()
            return
          }

          wp_media_image_select = wp.media.frames.file_frame = wp.media({
            title: 'Выбор изображения',
            button: {
              text: 'Выбрать изображение'
            },
            library: { type: 'image' },
            multiple: false
          })

          wp_media_image_select.on('select', function () {
            let attachment = wp_media_image_select.state().get('selection').first().toJSON()

            image_container.html('')
            image_container.html('<img src="' + attachment.url + '" alt="" style="max-width:100%; border: 1px solid #cdcdcd;"/>')

            image_delete_button.removeClass('hidden')

            image_select_button.html('Изменить').attr('title', 'Изменить')

            image_select_input.val(attachment.id)
          })

          wp_media_image_select.open()
        })

        image_delete_button.on('click', function (event) {
          event.preventDefault()

          image_container.html('')

          $(this).addClass('hidden')

          image_select_button.text('Добавить').attr('title', 'Добавить')
          image_select_input.val('')
        })
      })
    }
  }

  file_select()
  image_select()
})
