/**
 * --------------------------------------------------------------------------
 * Isvek (v1.0.0): modal.js
 * Licensed under MIT
 * --------------------------------------------------------------------------
 */

setTimeout(() => {
	let toggle = document.querySelectorAll('.customize-modal-code-editor-toggle')

	toggle.forEach(el => {
		let modalDialog = document.querySelector(el.getAttribute('data-modal-code-editor-target'))
		let textarea = modalDialog.querySelector('textarea')
		let textareaId = modalDialog.querySelector('textarea').getAttribute('id')
		let modalButtonSave = modalDialog.querySelector('.customize-modal-code-editor-save')
		let modalButtonClose = modalDialog.querySelector('.customize-modal-code-editor-close')
		let errorsMessage = modalDialog.querySelector('.customize-modal-code-editor-errors')
		let codeEditor = wp.codeEditor.initialize(textareaId, isvek_theme_customize_modal_code_editor.code_editor).codemirror
		let errors = false

		el.addEventListener('click', (event) => {
			event.preventDefault()

			modalDialog.classList.add('show')
		})

		codeEditor.on('change', event => {
			setTimeout(() => {
				let error = event.state.lint.marked.length

				if (1 <= error) {
					errorsMessage.style.display = 'block'
					errorsMessage.textContent = 'Синтаксическая ошибка.'
					modalButtonSave.setAttribute('disabled', '')
					errors = false
				} else {
					errors = true
					errorsMessage.style.display = 'none'
					modalButtonSave.removeAttribute('disabled')
				}
			} , 500)
		})

		modalButtonSave.addEventListener('click', (event) => {
			event.preventDefault()

			modalDialog.classList.remove('show')

			if (errors) {
				codeEditor.save()
				textarea.innerHTML = codeEditor.getValue()
				textarea.dispatchEvent(new Event('change'))
			}
		})

		document.addEventListener('click', (event) => {
			if (event.target === modalDialog || event.target === modalButtonClose) {
				modalDialog.classList.remove('show')
			}
		})
	})
}, 1000)
