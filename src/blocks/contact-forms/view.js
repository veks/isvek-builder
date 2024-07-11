const im = new Inputmask('8 (999) 999-99-99')

export function ContactForms (options) {
  document.addEventListener('DOMContentLoaded', () => {
    const defaultOption = {
      target: '.ib-contact-forms',
      url: null,
      googleKey: null,
      action: null,
      googleScriptLoadTimeout: 0,
    }
    const {
      target,
      url,
      googleKey,
      action,
      googleScriptLoadTimeout,
    } = Object.assign({}, defaultOption, options)
    const forms = document.querySelectorAll(target)
    const addScriptGoogleReCaptcha = (googleKey, timeout = 0) => {
      setTimeout(() => {
        let script = document.createElement('script')
        script.src = `https://www.google.com/recaptcha/api.js?render=${googleKey}`
        script.type = 'text/javascript'
        document.getElementsByTagName('head')[0].appendChild(script)
      }, (timeout * 1000))
    }
    const data = (form) => {
      const data = {}
      const formData = new FormData(form)

      formData.forEach((value, key) => {
        data[key] = value
      })

      return data
    }
    const validField = (element) => {
      let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i
      let regexTel = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i
      let invalidFeedback = element.parentElement.querySelector('.invalid-feedback')
      const messageInvalid = text => invalidFeedback.innerHTML = text

      element.setCustomValidity('')

      if (!element.validity.valid) {
        if (element.type === 'email' && !regexEmail.test(element.value)) {
          element.setCustomValidity('is-invalid')
          messageInvalid('Пожалуйста, введите действительный адрес электронной почты.')
        } else if (element.type === 'tel' && !regexTel.test(element.value)) {
          element.setCustomValidity('is-invalid')
          messageInvalid('Пожалуйста, введите правильный номер телефона.')
        } else if (element.type === 'checkbox' && element.name === 'agree') {
          element.setCustomValidity('is-invalid')
          messageInvalid('Подтвердите ваше согласие c политикой обработки персональных данных.')
        } else if (element.required === true && element.value === '') {
          messageInvalid('Это поле обязательно к заполнению.')
          element.setCustomValidity('is-invalid')
        }
      }
    }

    if (forms) {
      forms.forEach(form => {
        if (form !== null) {
          addScriptGoogleReCaptcha(googleKey, googleScriptLoadTimeout)
          form.querySelectorAll('input[type="tel"]').forEach(tel => im.mask(tel))

          let agree = form.querySelector('input[name="agree"]')

          if (agree) {
            agree.addEventListener('change', (event) => {
              if (event.currentTarget.checked) {
                event.target.value = true
              } else {
                event.target.value = ''
              }
            })
          }

          const buttonStatus = (status = true) => {
            let button = form.querySelector('button[type="submit"]')
            /*let old_text_content = button.textContent

            if (status) {
              button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Отправляем'
            } else {
              button.innerHTML = old_text_content
            }*/

            button.disabled = status
          }

          const alertStatus = (type, message = '') => {
            let alert = form.querySelector('.alert')

            switch (type) {
              case 'danger':
                alert.classList.remove('d-none')
                alert.classList.remove('alert-info')
                alert.classList.remove('alert-success')
                alert.classList.add('alert-danger')
                alert.textContent = ''
                alert.insertAdjacentHTML('afterbegin', message)
                break
              case 'info':
                alert.classList.remove('d-none')
                alert.classList.remove('alert-danger')
                alert.classList.remove('alert-success')
                alert.classList.add('alert-info')
                alert.textContent = ''
                alert.insertAdjacentHTML('afterbegin', message)
                break
              case 'success':
                alert.classList.remove('d-none')
                alert.classList.remove('alert-info')
                alert.classList.remove('alert-danger')
                alert.classList.add('alert-success')
                alert.textContent = ''
                alert.insertAdjacentHTML('afterbegin', message)
                break
              default:
                alert.textContent = ''
                alert.classList.add('d-none')
                alert.classList.remove('alert-info')
                alert.classList.remove('alert-danger')
                alert.classList.remove('alert-success')
                break
            }
          }

          form.addEventListener('submit', async event => {
            event.preventDefault()

            Array.from(form.elements).forEach(element => {
              element.setCustomValidity('')
              validField(element)
            })

            if (!form.checkValidity()) {
              event.stopPropagation()
              alertStatus('danger', 'Одно или несколько полей содержат ошибочные данные. Пожалуйста, проверьте их и попробуйте ещё раз.')
            } else {
              const getCaptcha = async () => {
                let recaptcha_token = ''
                grecaptcha.ready(() => {
                  grecaptcha.execute(googleKey, { action: `${action}` }).then((token) => {
                    recaptcha_token = token
                  })
                })

                while (recaptcha_token === '') {
                  await new Promise(r => setTimeout(r, 100))
                }

                return recaptcha_token
              }

              let reCAPTCHA = form.querySelector('input[name="reCAPTCHA"]')

              if (reCAPTCHA) {
                reCAPTCHA.value = ''
                setTimeout(async () => {
                  reCAPTCHA.value = await getCaptcha()
                }, 200)
              }

              alertStatus('info', 'Отправляем сообщение...')
              buttonStatus(true)

              setTimeout(async () => {
                await fetch(
                  url,
                  {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Cache-Control': 'no-cache',
                    },
                    body: new URLSearchParams(data(form)).toString(),
                  },
                ).then(response => response.json().then(data => ({
                  ok: response.ok,
                  status: response.status,
                  statusText: response.statusText,
                  ...data,
                }))).then(object => {
                  if (object.ok === true && object.status === 200) {
                    if (object.success === true) {
                      form.reset()
                      Array.from(form.elements).forEach(element => {
                        element.setCustomValidity('')
                      })
                      form.classList.remove('was-validated')
                      alertStatus('success', 'Сообщение успешно отправлено.')
                      buttonStatus(false)
                    } else {
                      const messageAlert = []

                      if (Array.isArray(object.data)) {
                        object.data.forEach(data => {
                          if (data.data === 'alert') {
                            messageAlert.push('• ' + data.message)
                          }

                          if (data.data === 'message') {
                            let field = form.querySelector(`[name="${data.code}"]`)

                            if (field !== null) {
                              let invalidFeedback = field.parentElement.querySelector(
                                '.invalid-feedback')
                              invalidFeedback.innerHTML = ''
                              field.classList.add('is-invalid')

                              field.addEventListener('change', event => {
                                event.target.setCustomValidity('')
                                event.target.classList.remove('is-invalid')
                                invalidFeedback.innerHTML = ''
                              })

                              field.setCustomValidity('is-invalid')
                              invalidFeedback.innerHTML = data.message
                            }
                          }
                        })

                        messageAlert.push('• Одно или несколько полей содержат ошибочные данные. Пожалуйста, проверьте их и попробуйте ещё раз.')
                      }

                      if (Array.isArray(messageAlert)) {
                        alertStatus('danger', [...messageAlert].join('<br>'))
                      }
                      buttonStatus(false)
                    }
                  } else {
                    alertStatus('danger', `Error code ${object.status} ${object.statusText}.`)
                    buttonStatus(false)
                    throw new Error(object.status)
                  }
                }).catch(error => {
                  alertStatus('danger', error)
                  buttonStatus(false)
                })
              }, (googleScriptLoadTimeout * 1000) + 2500)
            }

            form.classList.add('was-validated')
          })
        }
      })
    }
  })
}
