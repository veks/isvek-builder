<?php
/**
 * TelegramBot class.
 *
 * @class   TelegramBot
 * @version 1.0.0
 * @package Isvek\Plugin\Admin\Page
 */

namespace Isvek\Plugin\Admin\Pages;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Admin\Pages\TelegramBot' ) ) {

	/**
	 * TelegramBot class.
	 */
	class TelegramBot {

		/**
		 * @var string
		 */
		protected string $id = 'telegram_bot';

		/**
		 * @var string
		 */
		protected string $title = 'Телеграм Бот';

		/**
		 * @var string
		 */
		protected string $option_group = 'isvek_plugin_settings_option_group_telegram_bot';

		/**
		 * @var string
		 */
		protected string $option_name = 'isvek_plugin_settings_telegram_bot';

		/**
		 * @var string
		 */
		protected string $section_id = 'isvek_plugin_settings_section_telegram_bot';

		/**
		 * Конструктор класса.
		 *
		 * Если текущий пользователь является администратором, добавляет фильтры для настроек плагина.
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			if ( is_admin() ) {
				add_filter( 'isvek_plugin_settings_tabs_array', [ $this, 'add_settings_page' ] );
				add_filter( 'isvek_plugin_options', [ $this, 'add_option' ] );
				add_filter( 'isvek_plugin_settings', [ $this, 'add_setting' ] );
				add_filter( 'isvek_plugin_validate_' . $this->option_name, [ $this, 'settings_validate' ] );
			}
		}

		/**
		 * Добавляет страницу настроек.
		 *
		 * Эта функция добавляет новую страницу настроек с идентификатором и заголовком текущего объекта.
		 *
		 * @since 1.0.0
		 *
		 * @param array $pages Массив существующих страниц настроек.
		 *
		 * @return array Массив страниц настроек после добавления новой страницы.
		 */
		public function add_settings_page( array $pages ): array {
			$pages[ $this->id ] = $this->title;

			return $pages;
		}

		/**
		 * Добавляет настройку.
		 *
		 * Эта функция добавляет новую настройку с идентификатором, названием группы опций, названием опции, разделом и полями текущего объекта.
		 *
		 * @since 1.0.0
		 *
		 * @param array $settings Массив существующих настроек.
		 *
		 * @return array Массив настроек после добавления новой настройки.
		 */
		public function add_setting( array $settings ): array {
			$settings[] = [
				'tab_id'       => $this->id,
				'option_group' => $this->option_group,
				'option_name'  => $this->option_name,
				'section'      => [
					'id'    => $this->section_id,
					'title' => $this->title,
					'order' => 1,
				],
				'fields'       => [
					[
						'id'       => 'hooks',
						'title'    => 'Установка',
						'type'     => false,
						'callback' => [ $this, 'callback_hooks' ]
					],
					[
						'id'    => 'api_key',
						'title' => 'API ключ',
						'desc'  => 'Этот ключ используется для доступа к HTTP API.',
						'type'  => 'text',
						'link'  => [
							'text'   => 'Описание Bot API приведено на этой странице.',
							'url'    => 'https://core.telegram.org/bots/api',
							'target' => true,
						],
					],
					[
						'id'    => 'bot_username',
						'title' => 'Имя бота',
						'type'  => 'text',
					],
					[
						'id'       => 'secret_key',
						'title'    => 'Секретный ключ',
						'type'     => 'text',
						'readonly' => true,
					],
					[
						'id'    => 'admins',
						'title' => 'Администраторы',
						'desc'  => 'Введите id администратора через запятую, пример 10000,10001,10002.',
						'type'  => 'text',
					],
				]
			];

			return $settings;
		}

		/**
		 * Функция обратного вызова для обработки хуков.
		 *
		 * Эта функция выводит кнопки для установки, удаления и проверки статуса веб-хука.
		 * Она также содержит встроенный JavaScript-код, который выполняет AJAX-запросы к соответствующим маршрутам REST API при нажатии этих кнопок.
		 *
		 * @since 1.0.0
		 *
		 * @param array $args Массив аргументов (не используется в этой функции).
		 */
		public function callback_hooks( $args ) {
			$subscribers = get_option( 'isvek_plugin_telegram_bot_subscribers' ) ?? [];

			$route           = 'ip_telegram_bot/v1';
			$secret_key      = isvek_plugin_get_option( $this->option_name, 'secret_key' );
			$set_web_hook    = home_url( "/wp-json/$route/set_web_hook/{$secret_key}", 'https' );
			$delete_web_hook = home_url( "/wp-json/$route/delete_web_hook/{$secret_key}", 'https' );
			$web_hook_info   = home_url( "/wp-json/$route/web_hook_info/{$secret_key}", 'https' );

			printf( '<p style="margin-bottom: .5rem;">Количество подписчиков на уведомления <strong>%s</strong></p>', count( $subscribers ) );
			printf( '<div class="ip-telegram-bot-message" style="display: none;"></div>' );
			printf( '<a href="%s" class="button button-primary ip-telegram-bot-set-web-hook" target="_blank">Установить хук</a>', $set_web_hook );
			printf( '<a href="%s" class="button button-primary ip-telegram-bot-delete-web-hook" target="_blank" style="margin-left: .5rem;">Удалить хук</a>', $delete_web_hook );
			printf( '<a href="%s" class="button button-primary ip-telegram-bot-web-hook-info" target="_blank" style="margin-left: .5rem;">Статус</a>', $web_hook_info );
			?>
			<script>
				jQuery(document).ready(function ($) {
					const message = $('.ip-telegram-bot-message')
					const ajax = function (route = '', callback = null,) {
						$.ajax({
							url: route,
							method: 'get',
							dataType: 'json',
							beforeSend: function (xhr) {
								xhr.setRequestHeader('X-WP-Nonce', '<?php echo wp_create_nonce( 'wp_rest' ); ?>')
							},
							success: function (response) {
								if (typeof callback === 'function') {
									callback(response)
								}
							},
							error: function (jqXHR, exception) {
								if (jqXHR.status === 0) {
									alert('Не удается подключиться. Проверьте сеть')
								} else if (jqXHR.status == 404) {
									alert('Запрашиваемая страница не найдена (404).')
								} else if (jqXHR.status == 500) {
									alert('Внутренняя ошибка сервера (500).')
								} else if (exception === 'parsererror') {
									alert('Запрошенный разбор JSON не удался.')
								} else if (exception === 'timeout') {
									alert('Ошибка тайм-аута.')
								} else if (exception === 'abort') {
									alert('Ajax-запрос прерван.')
								} else {
									alert('Непонятная ошибка. ' + jqXHR.responseText)
								}
							}
						})
					}

					$('.ip-telegram-bot-set-web-hook').click(function (event) {
						event.preventDefault()

						ajax('<?php echo $set_web_hook; ?>', function (response) {
							if (response.ok && response.description) {
								message.show().html('Webhook был установлен.')
							}
							setTimeout(() => {
								message.slideUp('slow')
							}, 10000)
						})
					})

					$('.ip-telegram-bot-delete-web-hook').click(function (event) {
						event.preventDefault()

						ajax('<?php echo $delete_web_hook; ?>', function (response) {
							if (response.ok && response.description) {
								message.show().html('Webhook был удален.')
							}

							setTimeout(() => {
								message.slideUp('slow')
							}, 10000)
						})
					})

					$('.ip-telegram-bot-web-hook-info').click(function (event) {
						event.preventDefault()

						ajax('<?php echo $web_hook_info; ?>', function (response) {
							if (response.ok) {
								message.show().html(`<pre style="width: 300px; word-wrap: break-word;">${JSON.stringify(response.result, undefined, 2)}</pre>`)
							}
							setTimeout(() => {
								message.slideUp('slow')
							}, 10000)
						})
					})
				})
			</script>
			<?php
		}

		/**
		 * Добавляет опцию.
		 *
		 * Эта функция добавляет новую опцию с именем текущего объекта и значениями по умолчанию для редакторов кода шапки и подвала.
		 *
		 * @since 1.0.0
		 *
		 * @param array $options Массив существующих опций.
		 *
		 * @return array Массив опций после добавления новой опции.
		 */
		public function add_option( array $options ): array {
			$options[ $this->option_name ] = [
				'api_key'      => '',
				'bot_username' => '',
				'secret_key'   => $this->rand_hash(),
				'admins'       => '',
			];

			$options['isvek_plugin_telegram_bot_subscribers'] = [];

			return $options;
		}

		/**
		 * Функция для генерации случайного хеша.
		 *
		 * Эта функция генерирует случайный хеш, используя функцию 'openssl_random_pseudo_bytes', если она доступна.
		 * В противном случае она использует функцию 'sha1' с 'wp_rand()' в качестве входных данных.
		 *
		 * @since 1.0.0
		 *
		 * @return string Случайный хеш.
		 */
		protected function rand_hash(): string {
			if ( ! function_exists( 'openssl_random_pseudo_bytes' ) ) {
				return sha1( wp_rand() );
			}

			return bin2hex( openssl_random_pseudo_bytes( 20 ) );
		}

		/**
		 * Проверяет входные данные настроек.
		 *
		 * Эта функция проверяет входные данные настроек и возвращает их. В настоящее время она не выполняет никакой проверки,
		 * и возвращает входные данные без изменений.
		 *
		 * @since 1.0.0
		 *
		 * @param array $input Массив входных данных настроек.
		 *
		 * @return array Массив проверенных входных данных настроек.
		 */
		public function settings_validate( array $input ): array {
			$new_input = [];

			foreach ( $input as $key => $value ) {
				if ( $key === 'api_key' && ! preg_match( '/(\d+):[\w\-]+/', $value ) ) {
					add_settings_error( $this->option_name, $key, 'Определен неверный API ключ.' );
				} else if ( $key === 'admins' && $value !== '' && ! preg_match( '/^\d+(,\d+)?$/', $value ) ) {
					add_settings_error( $this->option_name, $key, 'Неправильные id администраторов.' );
				} else {
					$new_input[ $key ] = sanitize_text_field( $value );
				}
			}

			return $new_input;
		}
	}
}
