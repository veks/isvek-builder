<?php
/**
 * ContactForms class.
 *
 * @class   ContactForms
 * @version 1.0.0
 * @package Isvek\Plugin\ContactForms
 */

namespace Isvek\Plugin\ContactForms;

use Isvek\Plugin\Traits\Utility;
use WP_Error;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\ContactForms\ContactForms' ) ) {

	/**
	 * ContactForms class.
	 */
	class ContactForms {

		use Utility;

		/**
		 * @var string
		 */
		public string $option_name = 'isvek_plugin_settings_contact_forms';

		/**
		 * @var string
		 */
		public string $action = 'ib_contact_forms_action';

		/**
		 * @var string
		 */
		public string $nonce = 'ib_contact_forms_nonce';

		/**
		 * @var string
		 */
		public string $post_type = 'ib-contact-forms';

		/**
		 * @var WP_Error
		 */
		protected WP_Error $wp_error;

		/**
		 * Конструктор.
		 *
		 * @return void
		 */
		public function __construct() {
			$this->wp_error = new WP_Error();

			add_shortcode( $this->post_type, [ $this, 'add_shortcode' ] );

			add_action( 'init', [ $this, 'register_post_type' ], 12 );
			add_action( 'manage_' . $this->post_type . '_posts_custom_column', [ $this, 'column' ], 10, 2 );

			add_filter( 'manage_' . $this->post_type . '_posts_columns', [ $this, 'columns' ] );

			if ( wp_doing_ajax() ) {
				add_action( 'wp_ajax_' . $this->action, [ $this, 'ajax' ] );
				add_action( 'wp_ajax_nopriv_' . $this->action, [ $this, 'ajax' ] );
			}
		}

		/**
		 * Функция для регистрации типа записи.
		 *
		 * Эта функция регистрирует новый тип записи с заданными параметрами.
		 *
		 * @since 1.0.0
		 */
		public function register_post_type() {
			register_post_type(
				$this->post_type, [
					'labels'            => [
						'name'               => 'Контактные формы',
						'singular_name'      => 'Контактные формы',
						'add_new'            => 'Добавить новую',
						'add_new_item'       => 'Добавить новую форму',
						'edit_item'          => 'Редактировать форму',
						'new_item'           => 'Новая форма',
						'view_item'          => 'Посмотреть форму',
						'search_items'       => 'Найти форму',
						'not_found'          => 'Формы не найдены',
						'not_found_in_trash' => 'В корзине форм не найдено',
					],
					'public'            => false,
					'hierarchical'      => false,
					'show_ui'           => true,
					'show_in_nav_menus' => false,
					'show_in_menu'      => $this->get_slug(),
					'menu_position'     => 1,
					'capability_type'   => 'page',
					'rewrite'           => false,
					'query_var'         => false,
					'show_in_rest'      => true,
					'supports'          => [ 'title', 'editor' ],
					'template'          => [
						[ $this->get_block_category_slug() . '/contact-forms-builder' ],
					],
					'template_lock'     => 'all',
					'_builtin'          => true
				]
			);
		}

		/**
		 * Добавить столбцы сообщений.
		 *
		 * @param array $columns Столбцы.
		 *
		 * @return mixed
		 */
		public function columns( array $columns ): array {
			$columns['shortcode'] = 'Шорткод';

			return $columns;
		}

		/**
		 * Добавить столбец сообщений.
		 *
		 * @param string $column Столбцы.
		 * @param int $post_id Идентификатор сообщения.
		 *
		 * @throws \Exception
		 */
		public function column( string $column, int $post_id ) {
			switch ( $column ) {
				case 'shortcode' :
					printf(
						'<input type="text" onfocus="this.select();" readonly="readonly" value="[' . $this->post_type . ' id=\'%1$s\']" class="large-text code">',
						esc_attr( $post_id )
					);
					break;
				default:
					throw new \Exception( 'Неожиданное значение' );
			}
		}

		/**
		 * Рендеринг шорт кода.
		 *
		 * @param array $attribute Атрибуты.
		 *
		 * @return string
		 */
		public function add_shortcode( array $attribute ): string {
			$attribute = (object) shortcode_atts( [ 'id' => null, ], $attribute );
			$get_post  = get_post( $attribute->id );

			if ( ! empty( $get_post->ID ) && $attribute->id !== '' ) {
				$blocks               = parse_blocks( $get_post->post_content );
				$id                   = $attribute->id;
				$fields               = apply_filters( "isvek_plugin_contact_forms_{$id}_fields", $blocks[0]['attrs']['fields'] ?? [] );
				$settings             = $this;
				$nameModalButton      = ! empty( $blocks[0]['attrs']['nameModalButton'] ) ? $blocks[0]['attrs']['nameModalButton'] : 'Открыть';
				$classNameModalButton = ! empty( $blocks[0]['attrs']['classNameModalButton'] ) ? $blocks[0]['attrs']['classNameModalButton'] : 'btn btn-primary';
				$classNameButton      = ! empty( $blocks[0]['attrs']['classNameButton'] ) ? $blocks[0]['attrs']['classNameButton'] : 'btn btn-primary';
				$nameButton           = ! empty( $blocks[0]['attrs']['nameButton'] ) ? $blocks[0]['attrs']['nameButton'] : '<i class="fa fa-paper-plane"></i> Отправить';
				$isModal              = ! empty( $blocks[0]['attrs']['isModal'] ) ?? false;

				wp_enqueue_script( $this->get_block_category_slug() . '-contact-forms-inputmask' );
				wp_enqueue_script( $this->get_block_category_slug() . '-contact-forms' );

				if ( $isModal ) {
					return isvek_plugin_get_template_html(
						'contact-forms/shortcode-modal.php',
						compact(
							'fields',
							'nameModalButton',
							'classNameModalButton',
							'classNameButton',
							'nameButton',
							'id',
							'settings',
							'isModal',
						)
					);
				} else {
					return isvek_plugin_get_template_html(
						'contact-forms/shortcode.php',
						compact(
							'fields',
							'id',
							'settings',
							'isModal',
							'nameModalButton',
							'classNameModalButton',
							'classNameButton',
							'nameButton',
						)
					);
				}
			} else {
				return "[" . $this->post_type . " id='Ошибка идентификатора']";
			}
		}

		/**
		 * Функция для обработки AJAX-запросов.
		 *
		 * Эта функция обрабатывает AJAX-запросы, проверяет поля формы на наличие ошибок и отправляет электронное письмо, если ошибок нет.
		 *
		 * @since 1.0.0
		 */
		public function ajax() {
			$post         = array_map( [ $this, 'sanitize' ], $_POST );
			$fields       = $this->check_fields( $post );
			$wp_error_all = [];

			if ( is_wp_error( $fields ) ) {
				foreach ( $fields->get_error_codes() as $code ) {
					$wp_error_all[] = [
						'code'    => $code,
						'message' => $fields->get_error_message( $code ),
						'data'    => $fields->get_error_data( $code )
					];
				}

				wp_send_json_error( $wp_error_all );
			} else {
				$this->send_email( $post );
				wp_send_json_success();
			}
		}

		/**
		 * Функция для отправки электронного письма.
		 *
		 * Эта функция отправляет электронное письмо с использованием данных формы и шаблона электронного письма.
		 *
		 * @since 1.0.0
		 *
		 * @param array $post Массив POST-запроса с данными формы.
		 */
		public function send_email( array $post ) {
			$get_post              = get_post( $post['id'] );
			$blocks                = parse_blocks( $get_post->post_content );
			$fields                = $blocks[0]['attrs']['fields'];
			$email                 = isvek_plugin_get_option( $this->option_name, 'email' );
			$noreply_email         = isvek_plugin_get_option( $this->option_name, 'noreply_email' );
			$telegram_send_massage = isvek_plugin_get_option( $this->option_name, 'telegram_send_massage' );
			$hook                  = str_replace( '-', '_', $this->post_type );

			do_action( "{$hook}_send_email", compact( 'fields', 'post', 'email', 'noreply_email' ) );

			add_filter( 'wp_mail_content_type', function () {
				return "text/html";
			} );

			if ( $telegram_send_massage ) {
				$text = sprintf( '<strong>[%1$s] - %2$s</strong>', get_the_title( $post['id'] ), current_time( 'd.m.Y H:i' ) ) . PHP_EOL;
				$text .= PHP_EOL;

				foreach ( $fields as $field ) {
					$text .= '<strong>' . esc_attr( $field['label'] ?? 'Метка' ) . '</strong>' . PHP_EOL;
					$text .= ! empty( $post[ $field['name'] ] ) ? esc_attr( $post[ $field['name'] ] ) : 'Пустое поле' . PHP_EOL;
					$text .= PHP_EOL;
				}

				isvek_plugin_telegram_send_message( $text );
			}

			wp_mail(
				$email,
				sprintf( '[%1$s] - %2$s', get_the_title( $post['id'] ), current_time( 'd.m.Y H:i' ) ),
				isvek_plugin_get_template_html( 'contact-forms/email.php', compact( 'fields', 'post' ) ),
				sprintf( 'From: no-reply <%s>', $noreply_email )
			);
		}

		/**
		 * Функция для проверки полей формы.
		 *
		 * Эта функция проверяет поля формы на наличие ошибок и добавляет их в объект wp_error, если они есть.
		 *
		 * @since 1.0.0
		 *
		 * @param array $post Массив POST-запроса с данными формы.
		 *
		 * @return true|WP_Error Возвращает объект wp_error, если есть ошибки, и true, если ошибок нет.
		 */
		public function check_fields( array $post ) {
			$get_post = get_post( $post['id'] ?? null );

			if ( ! isset( $post ) && ! isset( $post['action'] ) ) {
				$this->wp_error->add( 'action', 'Ошибка формы, перезагрузите страницу.', 'alert' );
			}

			if ( ! isset( $post[ $this->nonce ] ) || isset( $post[ $this->nonce ] ) && ! wp_verify_nonce( $post[ $this->nonce ], $this->action ) ) {
				$this->wp_error->add( $this->nonce, 'Очистите кэш браузера или перезагрузите страницу.', 'alert' );
			}

			if ( ! isset( $post['reCAPTCHA'] ) || ! $this->google_reCaptcha( $post['reCAPTCHA'] ) ) {
				$this->wp_error->add( 'reCAPTCHA', 'Похоже что вы бот. Повторите ваши действия через некоторое время.', 'alert' );
			}

			if ( ! isset( $post['agree'] ) || (string) $post['agree'] !== 'true' ) {
				$this->wp_error->add( 'agree', 'Подтвердите ваше согласие c политикой обработки персональных данных.', 'message' );
			}

			if ( ! isset( $post['id'] ) && empty( $get_post->ID ) ) {
				$this->wp_error->add( 'id', 'Контактная форма не найдена.', 'alert' );
			} else {
				$blocks       = parse_blocks( $get_post->post_content );
				$fields       = $blocks[0]['attrs']['fields'];
				$error_fields = [];

				if ( ! empty( $fields ) ) {
					foreach ( $fields as $field ) {
						if ( array_key_exists( $field['name'], $post ) ) {
							if ( isset( $post[ $field['name'] ] ) && $field['type'] === 'hidden' ) {
								continue;
							} else {
								if ( isset( $post[ $field['name'] ] ) && trim( $post[ $field['name'] ] ) == '' && (bool) $field['validation']['required'] === true ) {
									$this->wp_error->add( $field['name'], 'Это поле обязательно к заполнению.', 'message' );
								} else {
									if ( isset( $post[ $field['name'] ] ) && ! trim( $post[ $field['name'] ] ) == '' && (string) $field['type'] === 'tel' ) {
										if ( ! preg_match( '/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/', $post[ $field['name'] ] ) ) {
											$this->wp_error->add( $field['name'], 'Пожалуйста, введите правильный номер телефона.', 'message' );
										}
									}

									if ( isset( $post[ $field['name'] ] ) && ! trim( $post[ $field['name'] ] ) == '' && (string) $field['type'] === 'email' ) {
										if ( ! is_email( $post[ $field['name'] ] ) ) {
											$this->wp_error->add( $field['name'], 'Пожалуйста, введите действительный адрес электронной почты.', 'message' );
										}
									}
								}
							}
						} else {
							$error_fields[] = $field['label'];
						}
					}

					if ( ! empty( $error_fields ) ) {
						$this->wp_error->add( 'id', 'Не найдены поля <strong>[' . implode( ", ", $error_fields ) . ']</strong>. Перезагрузите страницу.', 'alert' );
					}
				} else {
					$this->wp_error->add( 'id', 'Не найдены поля контактной формы. Перезагрузите страницу.', 'alert' );
				}
			}

			if ( ! empty( $this->wp_error->get_error_codes() ) ) {
				return $this->wp_error;
			} else {
				return true;
			}
		}

		/**
		 * Функция для проверки ответа Google reCaptcha.
		 *
		 * Эта функция проверяет ответ Google reCaptcha, используя секретный ключ и ответ, полученный от пользователя.
		 *
		 * @since 1.0.0
		 *
		 * @param string $response Ответ Google reCaptcha от пользователя.
		 *
		 * @return bool Возвращает true, если проверка прошла успешно и оценка больше или равна заданному порогу.
		 * В противном случае возвращает false.
		 */
		public function google_reCaptcha( string $response ): bool {
			if ( empty( $response ) ) {
				return false;
			}

			$secret        = isvek_plugin_get_option( $this->option_name, 'google_secret_key' );
			$google_scope  = isvek_plugin_get_option( $this->option_name, 'google_scope' );
			$wp_remote_get = wp_remote_get( 'https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $response );
			$response      = json_decode( $wp_remote_get['body'] );

			if ( true === $response->success && $response->score >= $google_scope ) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Очищает переданную строку оставляя чистый текст: без HTML тегов, переносов строк и т.д.
		 *
		 * @since 1.0.0
		 *
		 * @param mixed $post Метод запроса.
		 *
		 * @return string
		 */
		public function sanitize( $post ): string {
			return sanitize_text_field( wp_unslash( $post ) );
		}
	}
}
