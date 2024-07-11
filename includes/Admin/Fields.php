<?php
/**
 * Fields class.
 *
 * @class   Fields
 * @version 1.0.0
 * @package Restoequip\Plugin
 */

namespace Isvek\Plugin\Admin;

if ( ! class_exists( 'Isvek\Plugin\Admin\Fields' ) ) {

	/**
	 * Fields class.
	 */
	class Fields extends Admin {

		/**
		 * @var string|mixed
		 */
		protected string $label_for;

		/**
		 * @var object
		 */
		protected object $field;

		/**
		 * @var string
		 */
		protected string $option_name;

		/**
		 * @var array|mixed
		 */
		protected $value = '';

		/**
		 * @var array
		 */
		private array $field_defaults = [
			'id'               => '',
			'title'            => '',
			'desc'             => '',
			'conditional_desc' => [],
			'default'          => null,
			'type'             => 'text',
			'placeholder'      => '',
			'choices'          => [],
			'class'            => 'regular-text',
			'disabled'         => false,
			'readonly'         => false,
			'autocomplete'     => 'off',
			'attributes'       => [],
			'custom_args'      => [],
			'settings'         => [],
		];

		/**
		 * Конструктор класса.
		 *
		 * Инициализирует экземпляр класса с заданными аргументами.
		 *
		 * @since 1.0.0
		 *
		 * @param array $args Аргументы для инициализации.
		 */
		public function __construct( array $args = [] ) {
			if ( ! empty( $args['option_name'] ) && is_string( $args['option_name'] ) ) {
				$this->option_name = $args['option_name'];
			}

			if ( ! empty( $args['field'] ) && is_array( $args['field'] ) ) {
				$this->field = (object) wp_parse_args( $args['field'], $this->field_defaults );
			}

			if ( isset( $this->option_name ) && isset( $this->field ) && ! empty( $this->field->id ) ) {
				$this->value = array_get( get_option( $this->option_name ), $this->field->id, $this->field->default );
			}

			if ( ! empty( $args['label_for'] ) ) {
				$this->label_for = $args['label_for'];
			}

			if ( isset( $this->option_name ) && isset( $this->field ) && isset( $this->label_for ) ) {
				$this->display_field();
			}
		}

		/**
		 * Отображает поле в форме настройки, в зависимости от типа поля.
		 *
		 * Вызывает соответствующие методы отображения полей в зависимости от их типа.
		 * В конце вызывает метод для вывода описания поля.
		 *
		 * @since 1.0.0
		 */
		public function display_field() {
			switch ( $this->field->type ) {
				case 'textarea':
					$this->field_textarea();
					break;
				case 'select':
				case 'multiselect':
				case 'select_2':
					$this->field_select();
					break;
				case 'checkbox':
					$this->field_checkbox();
					break;
				case 'checkboxes':
					$this->field_checkboxes();
					break;
				case 'radio':
					$this->field_radio();
					break;
				case 'wysiwyg':
					$this->field_wysiwyg();
					break;
				case 'code_editor':
					$this->field_code_editor();
					break;
				case 'color':
					$this->field_color();
					break;
				case 'hidden':
					$this->field_hidden();
					break;
				case 'file_select':
					$this->field_file_select();
					break;
				case 'image_select':
					$this->field_image_select();
					break;
				case 'text':
				case 'password':
				case 'email':
				case 'url':
				case 'tel':
				case 'number':
				case 'date':
				case 'datetime-local':
				case 'month':
				case 'week':
				case 'time':
				default:
					$this->field_default();
					break;
			}

			$this->description();
		}

		/**
		 * Выводит textarea поле формы.
		 *
		 * Данная функция генерирует HTML-разметку для textarea поля ввода.
		 *
		 * @since 1.0.0
		 */
		protected function field_textarea() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			$this->field->attributes['rows'] = ( ! empty( $this->field->attributes['rows'] ) ) ? absint( $this->field->attributes['rows'] ) : 5;
			$this->field->attributes['cols'] = ( ! empty( $this->field->attributes['cols'] ) ) ? absint( $this->field->attributes['cols'] ) : 40;
			$this->field->class              = array_to_css_classes( [ $this->field->class, 'large-text', 'code' ] );

			printf(
				'<textarea name="%1$s" id="%2$s" class="%4$s" placeholder="%5$s" autocomplete="%6$s" %7$s>%3$s</textarea>',
				esc_attr( $this->generate_field_name() ),
				esc_attr( $this->generate_field_id() ),
				esc_textarea( $this->value ),
				esc_attr( $this->field->class ),
				esc_attr( $this->field->placeholder ),
				esc_attr( $this->field->autocomplete ),
				$this->array_to_html_atts( $this->field->attributes ),
			);
		}

		/**
		 * Выполняет вывод HTML для поля типа select.
		 *
		 * Данная функция генерирует HTML для элемента select, учитывая различные параметры и атрибуты.
		 *
		 * @since 1.0.0
		 */
		protected function field_select() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			$this->field->class = str_replace( 'regular-text', '', $this->field->class );

			if ( in_array( $this->field->type, [ 'select_2', 'multiselect' ] ) ) {
				$this->field->attributes['multiple'] = 'multiple';
				$generate_field_name                 = $this->generate_field_name() . '[]';

				if ( $this->field->type === 'select_2' ) {
					$this->field->class = array_to_css_classes( [ $this->field->class, 'select-2' ] );
					$this->select_2_enqueue();
				}
			} else {
				$generate_field_name = $this->generate_field_name();
			}

			printf(
				'<select name="%1$s" id="%2$s" class="%3$s" %4$s>',
				esc_attr( $generate_field_name ),
				esc_attr( $this->generate_field_id() ),
				esc_attr( $this->field->class ),
				$this->array_to_html_atts( $this->field->attributes ),
			);

			if ( ! empty( $this->field->choices ) ) {
				foreach ( $this->field->choices as $key => $val ) {
					if ( is_array( $val ) ) {
						printf( '<optgroup label="%s">', esc_html( $key ) );
						foreach ( $val as $group_key => $group_val ) {
							$disabled = ! empty( $this->field->disabled ) && is_array( $this->field->disabled ) && in_array( (string) $group_key, $this->field->disabled, true ) ? disabled( true, true, false ) : '';
							$selected = selected( in_array( (string) $group_key, $this->value, true ), true, false );

							printf( '<option value="%1$s" %2$s %3$s>%4$s</option>', esc_attr( $group_key ), $disabled, $selected, esc_html( $group_val ) );
						}
						printf( '</optgroup>' );
						continue;
					}

					if ( is_array( $this->value ) ) {
						$selected = selected( in_array( (string) $key, $this->value, true ), true, false );
					} else {
						$selected = selected( $this->value, (string) $key, false );
					}

					$disabled = ! empty( $this->field->disabled ) && is_array( $this->field->disabled ) && in_array( (string) $key, $this->field->disabled, true ) ? disabled( true, true, false ) : '';

					printf(
						'<option value="%1$s" %2$s %3$s>%4$s</option>',
						esc_attr( $key ),
						$selected,
						$disabled,
						esc_html( $val )
					);
				}
			}

			printf( '</select>' );
		}

		/**
		 * Выводит поле чекбокса.
		 *
		 * @since 1.0.0
		 */
		protected function field_checkbox() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			$value = $this->value ?? '0';
			$label = ! empty( $this->field->label ) ? $this->field->label : $this->field->title;
			$desc  = is_string( $this->field->conditional_desc ) ? '<p class="description">' . $this->field->conditional_desc . '</p>' : '';

			print_r( '<fieldset>' );
			printf( '<input type="hidden" name="%1$s" value="0" />', esc_attr( $this->generate_field_name() ) );
			printf(
				'<input type="checkbox" name="%1$s" value="1" id="%2$s" class="%3$s" %4$s %5$s />',
				esc_attr( $this->generate_field_name() ),
				esc_attr( $this->generate_field_id() ),
				esc_attr( $this->field->class ),
				checked( $value, '1', false ),
				$this->array_to_html_atts( $this->field->attributes ),
			);
			printf(
				'<label for="%1$s">%2$s</label>%3$s',
				esc_attr( $this->generate_field_id() ),
				esc_html( $label ),
				$desc,
			);
			printf( '</fieldset>' );
		}

		/**
		 * Создает HTML-блок с выпадающим списком в виде чекбоксов.
		 *
		 * @since 1.0.0
		 */
		protected function field_checkboxes() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			if ( ! empty( $this->field->choices ) ) {
				$desc = is_array( $this->field->conditional_desc ) ? $this->field->conditional_desc : [];

				printf( '<input type="hidden" name="%s" value="0" />', $this->generate_field_name() );
				printf( '<fieldset><ul>' );

				foreach ( $this->field->choices as $key => $val ) {
					if ( is_array( $val ) ) {
						continue;
					}

					if ( is_array( $this->value ) ) {
						$checked = checked( in_array( (string) $key, $this->value, true ), true, false );
					} else {
						$checked = checked( $this->value, (string) $key, false );
					}

					if ( ! empty( $this->field->disabled ) && is_array( $this->field->disabled ) ) {
						$this->field->attributes['disabled'] = in_array( (string) $key, $this->field->disabled->disabled, true ) ? 'disabled' : '';
					}

					printf(
						'<li><label><input type="checkbox" name="%1$s[]" value="%3$s" id="%2$s" class="%4$s" %5$s %6$s /> %7$s</label>%8$s</li>',
						esc_attr( $this->generate_field_name() ),
						esc_attr( $this->generate_field_id() ),
						esc_html( $key ),
						esc_attr( $this->field->class ),
						esc_html( $checked ),
						$this->array_to_html_atts( $this->field->attributes ),
						esc_html( $val ),
						( ! empty( $desc[ $key ] ) ? '<p class="description">' . $desc[ $key ] . '</p>' : '' )
					);
				}

				printf( '</ul></fieldset>' );
			}
		}

		/**
		 * Выводит HTML для поля с радио-кнопками.
		 *
		 * @since 1.0.0
		 */
		protected function field_radio() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			if ( ! empty( $this->field->choices ) ) {
				print_r( '<fieldset><ul>' );

				foreach ( $this->field->choices as $key => $val ) {
					if ( is_array( $val ) ) {
						continue;
					}

					if ( ! empty( $this->field->disabled ) && is_array( $this->field->disabled ) ) {
						$this->field->attributes['disabled'] = in_array( (string) $key, $this->field->disabled, true ) ? 'disabled' : '';
					}

					$desc = is_array( $this->field->conditional_desc ) ? $this->field->conditional_desc : [];

					printf(
						'<li><label><input type="radio" name="%1$s" value="%3$s" id="%2$s" class="%4$s" %5$s %6$s />%7$s</label>%8$s</li>',
						esc_attr( $this->generate_field_name() ),
						esc_attr( $this->generate_field_id() ),
						esc_attr( $key ),
						esc_attr( $this->field->class ),
						checked( $key, $this->value, false ),
						$this->array_to_html_atts( $this->field->attributes ),
						esc_html( $val ),
						( ! empty( $desc[ $key ] ) ? '<p class="description">' . $desc[ $key ] . '</p>' : '<br>' ),
					);
				}

				printf( '</ul></fieldset>' );
			}
		}

		/**
		 * Создает поле WYSIWYG
		 *
		 * Подготавливает и отображает поле WYSIWYG в административной части WordPress.
		 *
		 * @since 1.0.0
		 */
		protected function field_wysiwyg() {
			$settings                  = wp_parse_args(
				$this->field->settings,
				[
					'wpautop'          => 1,
					'media_buttons'    => 1,
					'textarea_name'    => '',
					'textarea_rows'    => 20,
					'tabindex'         => null,
					'editor_css'       => '',
					'editor_class'     => esc_attr( $this->field->class ),
					'teeny'            => 0,
					'dfw'              => 0,
					'tinymce'          => 1,
					'quicktags'        => 1,
					'drag_drop_upload' => false
				]
			);
			$settings['textarea_name'] = $this->generate_field_name();

			wp_editor( $this->value, $this->generate_field_id(), $settings );
		}

		/**
		 * Регистрирует кодовый редактор для поля.
		 *
		 * Добавляет атрибуты и настройки для кодового редактора.
		 *
		 * @since 1.0.0
		 */
		protected function field_code_editor() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			$settings = wp_enqueue_code_editor(
				wp_parse_args(
					$this->field->settings,
					[
						'type'       => 'text/html',
						'codemirror' => [
							'indentUnit'     => 2,
							'tabSize'        => 2,
							'autoRefresh'    => true,
							'lineWrapping'   => true,
							"indentWithTabs" => true,
						]
					]
				)
			);

			$this->field->attributes['rows'] = ( ! empty( $this->field->attributes['rows'] ) ) ? absint( $this->field->attributes['rows'] ) : 5;
			$this->field->attributes['cols'] = ( ! empty( $this->field->attributes['cols'] ) ) ? absint( $this->field->attributes['cols'] ) : 40;
			$this->field->class              = array_to_css_classes( [ $this->field->class, 'large-text', 'code' ] );

			printf(
				'<textarea name="%1$s" id="%2$s" class="%4$s" placeholder="%5$s" autocomplete="%6$s" %7$s>%3$s</textarea>',
				esc_attr( $this->generate_field_name() ),
				esc_attr( $this->generate_field_id() ),
				esc_textarea( $this->value ),
				esc_attr( $this->field->class ),
				esc_attr( $this->field->placeholder ),
				esc_attr( $this->field->autocomplete ),
				$this->array_to_html_atts( $this->field->attributes ),
			);

			wp_add_inline_script(
				'code-editor',
				sprintf(
					'jQuery( function() { wp.codeEditor.initialize( "%1$s", %2$s ); } );',
					esc_attr( $this->generate_field_id() ),
					wp_json_encode( $settings )
				)
			);
		}

		/**
		 * Добавляет поле выбора цвета с возможностью использования Farbtastic Color Picker.
		 *
		 * @since 1.0.0
		 */
		protected function field_color() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			wp_enqueue_script( 'farbtastic' );

			printf( '<div style="position:relative;">' );

			printf(
				'<input type="text" name="%1$s" id="%2$s" value="%3$s" class="%4$s" %5$s />',
				esc_attr( $this->generate_field_name() ),
				esc_attr( $this->generate_field_id() ),
				esc_textarea( $this->value ),
				esc_attr( $this->field->class ),
				$this->array_to_html_atts( $this->field->attributes ),
			);

			printf( '<div id="color-%s" style="position:absolute;top:0;left:190px;background:#fff;z-index:9999;"></div>', esc_attr( $this->generate_field_id() ) );

			printf( '<script type="text/javascript">
                jQuery(document).ready(function($){
                    var colorPicker = $("#color-' . esc_attr( $this->generate_field_id() ) . '");
                    colorPicker.farbtastic("#' . esc_attr( $this->generate_field_id() ) . '");
                    colorPicker.hide();
                    $("#' . esc_attr( $this->generate_field_id() ) . '").on("focus", function(){
                        colorPicker.show();
                    });
                    $("#' . esc_attr( $this->generate_field_id() ) . '").on("blur", function(){
                        colorPicker.hide();
                        if($(this).val() == "") $(this).val("#");
                    });
                });
                </script>' );
			printf( '</div>' );
		}

		/**
		 * Выводит скрытое поле формы.
		 *
		 * Печатает HTML для скрытого поля ввода с указанными атрибутами.
		 *
		 * @since 1.0.0
		 */
		protected function field_hidden() {
			printf(
				'<input type="hidden" name="%1$s" value="%2$s" id="%3$s" class="%4$s" %5$s />',
				esc_attr( $this->generate_field_name() ),
				$this->value,
				esc_attr( $this->generate_field_id() ),
				esc_attr( $this->field->class ),
				$this->array_to_html_atts( $this->field->attributes )
			);
		}

		/**
		 * Выводит поле выбора файла в форме.
		 *
		 * Данная функция отображает HTML для поля выбора файла, которое может быть использовано в форме.
		 * Поддерживает отключение и только чтение, загрузку медиафайлов и локализацию скрипта.
		 *
		 * @since 1.0.0
		 */
		protected function field_file_select() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			wp_enqueue_media();

			$settings = wp_parse_args(
				$this->field->settings,
				[
					'attachment' => 'url'
				]
			);

			wp_localize_script( 'restoequip-plugin-settings', 're_plugin_settings', $settings );

			printf( '<div class="file-select %s">', esc_attr( $this->generate_field_id() ) );

			printf(
				'<input type="text" name="%1$s" value="%2$s" id="%3$s" class="%4$s file-select-input" %5$s />',
				esc_attr( $this->generate_field_name() ),
				$this->value,
				esc_attr( $this->generate_field_id() ),
				esc_attr( $this->field->class ),
				$this->array_to_html_atts( $this->field->attributes )
			);
			printf( '<div style="margin-top: .5rem">' );
			printf(
				'<a href="#" id="%1$s" class="button-secondary file-select-button" style="margin-right: .5rem" title="%2$s">%2$s</a>',
				esc_attr( $this->generate_field_id() ),
				! empty( $this->value ) ? 'Изменить' : 'Добавить'
			);
			printf(
				'<a href="#" id="%1$s" class="button-secondary file-delete-button%2$s" title="Удалить">Удалить</a>',
				esc_attr( $this->generate_field_id() ),
				empty( $this->value ) ? ' hidden' : ''
			);
			printf( '</div></div>' );
		}

		/**
		 * Выводит поле выбора изображения.
		 *
		 * @since 1.0.0
		 */
		protected function field_image_select() {
			$image_attributes = wp_get_attachment_image_src( $this->value );

			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			if ( is_array( $image_attributes ) ) {
				$image = '<img src="' . $image_attributes[0] . '" style="border: 1px solid #cdcdcd;">';
			} else {
				$image = '';
			}

			wp_enqueue_media();

			printf( '<div class="image-select %s">', esc_attr( $this->generate_field_id() ) );

			printf(
				'<input type="hidden" name="%1$s" value="%2$s" id="%3$s" class="%4$s image-select-input" />',
				esc_attr( $this->generate_field_name() ),
				$this->value,
				esc_attr( $this->generate_field_id() ),
				esc_attr( $this->field->class ),
			);

			printf(
				'<div class="image-container" style="width: 150px; height: auto;">%s</div>',
				$image
			);
			printf( '<div style="margin-top: .5rem">' );
			printf(
				'<a href="#" id="%1$s" class="button-secondary image-select-button" style="margin-right: .5rem" title="%2$s">%2$s</a>',
				esc_attr( $this->generate_field_id() ),
				is_array( $image_attributes ) ? 'Изменить' : 'Добавить'
			);

			printf(
				'<a href="#" id="%1$s" class="button-secondary image-delete-button%2$s" title="Удалить">Удалить</a>',
				esc_attr( $this->generate_field_id() ),
				! is_array( $image_attributes ) ? ' hidden' : ''
			);
			printf( '</div>' );
			printf( '</div>' );
		}

		/**
		 * Возвращает стандартное поле для вывода ввода данных.
		 *
		 * Этот метод генерирует стандартное поле ввода данных с учетом переданных параметров.
		 *
		 * @since 1.0.0
		 */
		protected function field_default() {
			if ( $this->field->disabled === true ) {
				$this->field->attributes['disabled'] = 'disabled';
			}

			if ( $this->field->readonly === true ) {
				$this->field->attributes['readonly'] = '';
			}

			printf(
				'<input type="%1$s" name="%2$s" id="%3$s" value="%4$s" class="%5$s" placeholder="%6$s" autocomplete="%7$s" %8$s />',
				esc_attr( $this->field->type ),
				esc_attr( $this->generate_field_name() ),
				esc_attr( $this->generate_field_id() ),
				esc_attr( $this->value ),
				esc_attr( $this->field->class ),
				esc_attr( $this->field->placeholder ),
				esc_attr( $this->field->autocomplete ),
				$this->array_to_html_atts( $this->field->attributes ),
			);
		}

		/**
		 * Загружает стили и скрипты для плагина Select2 и добавляет языковой файл для русского языка.
		 *
		 * @since 1.0.0
		 */
		protected function select_2_enqueue() {
			wp_enqueue_style( 'isvek-plugin-select-2', $this->get_dir_url_css() . 'select2.min.css', false, '4.1.0-rc.0' );
			wp_enqueue_script( 'isvek-plugin-select-2', $this->get_dir_url_js() . 'select2.min.js', [ 'jquery' ], '4.1.0-rc.0', true );
			wp_enqueue_script( 'isvek-plugin-select-2-i18n', $this->get_dir_url_js() . 'i18n/ru.js', [ 'jquery' ], '4.1.0-rc.0', true );
			wp_add_inline_script(
				'isvek-plugin-select-2',
				"(function ($) {
						$(document).ready(function () {
							$('select.select-2').each(function(index, el){
								var id = $(el).attr('id');
								$('#' + id).select2({ width:'100%', 'language':'ru'})
							});
						});
					})(jQuery);"
			);
		}

		/**
		 * Выводит описание поля с возможной ссылкой в заданном формате.
		 *
		 * @since 1.0.0
		 */
		protected function description() {
			if ( ! empty( $this->field->desc ) ) {
				printf( '<p class="description">%s</p>', esc_html( $this->field->desc ) );
			}

			if ( ! empty( $this->field->link ) && is_array( $this->field->link ) ) {
				$link_text   = $this->field->link['text'] ?? '';
				$link_url    = $this->field->link['url'] ?? '';
				$link_target = (bool) $this->field->link['target'] === true ? 'target="_blank"' : '';;

				printf( '<br>' );
				printf(
					'<a href="%1$s" %2$s>%3$s</a>',
					esc_url( $link_url ),
					esc_attr( $link_target ),
					esc_html( $link_text ),
				);
			}
		}

		/**
		 * Генерирует название поля для использования в форме.
		 *
		 * Возвращает строку, которая представляет собой форматированную строку со значением опции и идентификатором поля.
		 *
		 * @since 1.0.0
		 *
		 * @return string Сгенерированное название поля.
		 */
		protected function generate_field_name(): string {
			return sprintf( '%s[%s]', $this->option_name, $this->field->id );
		}

		/**
		 * Возвращает идентификатор поля.
		 *
		 * Метод возвращает идентификатор поля, который используется в качестве атрибута 'for'
		 * для связи метки поля с самим полем.
		 *
		 * @since 1.0.0
		 *
		 * @return string Идентификатор поля.
		 */
		protected function generate_field_id(): string {
			return $this->label_for;
		}

		/**
		 * Преобразует массив в строку атрибутов HTML.
		 *
		 * Преобразует переданный массив в строку атрибутов HTML.
		 * Если массив пустой или не является массивом, функция вернет false.
		 *
		 * @since 1.0.0
		 *
		 * @param array $array Массив атрибутов для преобразования.
		 *
		 * @return string|false Строка с атрибутами HTML или false.
		 */
		protected function array_to_html_atts( array $array = [] ) {
			if ( ! is_array( $array ) || empty( $array ) ) {
				return false;
			}

			$return = '';

			foreach ( $array as $key => $value ) {
				if ( '' === $value ) {
					$return .= sprintf( ' %s ', esc_attr( $key ) );
				}

				$return .= sprintf( '%s="%s" ', $key, esc_attr( $value ) );
			}

			return $return;
		}
	}
}
