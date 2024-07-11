<?php
/**
 * Settings class.
 *
 * @class   Settings
 * @version 1.0.0
 * @package Isvek\Plugin\Admin
 */

namespace Isvek\Plugin\Admin;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Admin\Settings' ) ) {

	/**
	 * Settings class.
	 */
	class Settings extends Admin {

		/**
		 * @var array
		 */
		protected array $settings = [];

		/**
		 * Конструктор класса.
		 *
		 * Если текущий пользователь является администратором, этот конструктор добавляет действия 'admin_menu' и 'admin_init', которые вызывают функции 'admin_menu' и 'register_setting' соответственно.
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			if ( is_admin() ) {
				add_action( 'admin_menu', [ $this, 'admin_menu' ] );
				add_action( 'admin_init', [ $this, 'register_setting' ], 11 );
			}

			add_filter( 'plugin_action_links_' . $this->get_file(), [ $this, 'add_settings_link' ] );
		}

		/**
		 * Функция для добавления подменю настроек плагина в административное меню WordPress.
		 *
		 * Эта функция добавляет подменю 'Настройки' на страницу 'isvek-plugin' в административном меню WordPress.
		 * Она также добавляет действие 'admin_print_styles-' . $page, которое вызывает функцию 'print_styles' при печати стилей для этой страницы.
		 *
		 * @since 1.0.0
		 */
		public function admin_menu() {
			$page = add_submenu_page(
				$this->get_slug(),
				'Настройки расширений',
				'Настройки',
				'administrator',
				$this->get_slug_settings(),
				[ $this, 'page' ],
				81,
			);

			add_action( 'admin_print_styles-' . $page, [ $this, 'print_styles' ] );
		}

		/**
		 * Добавить ссылку на настройки в таблицу списка плагинов.
		 *
		 * @since 1.0.0
		 *
		 * @param array $links Существующие ссылки.
		 *
		 * @return array Измененные ссылки.
		 */
		public function add_settings_link( array $links ): array {
			$links[] = '<a href="admin.php?page=isvek-plugin-settings">Настройки</a>';

			return $links;
		}

		/**
		 * Функция для печати стилей на странице настроек плагина.
		 *
		 * Эта функция добавляет файл стилей 'settings.min.css' в очередь стилей WordPress для страницы настроек плагина.
		 * Версия файла стилей соответствует версии плагина.
		 *
		 * @since 1.0.0
		 */
		public function print_styles() {
			wp_enqueue_style( 'isvek-plugin-settings', $this->get_dir_url_css() . 'settings.min.css', false, $this->get_version() );
		}

		/**
		 * Функция для регистрации настроек плагина.
		 *
		 * Эта функция регистрирует настройки плагина, используя данные, полученные от фильтра `isvek_plugin_settings`.
		 * Для каждого набора настроек выполняются следующие действия:
		 * - Регистрация настроек с помощью register_setting().
		 * - Добавление разделов с помощью add_settings_section().
		 * - Добавление полей с помощью add_settings_field().
		 *
		 * @since 1.0.0
		 */
		public function register_setting() {
			$this->settings = apply_filters( 'isvek_plugin_settings', [] );

			if ( ! empty( $this->settings ) ) {
				usort( $this->settings, [ $this, 'sort_array' ] );

				foreach ( $this->settings as $setting ) {
					if ( isset( $setting['option_group'] ) && isset( $setting['option_name'] ) ) {
						register_setting(
							$setting['option_group'],
							$setting['option_name'],
							[ $this, 'settings_validate' ]
						);

						if ( isset( $setting['section']['id'] ) && isset( $setting['section']['title'] ) ) {
							add_settings_section(
								$setting['section']['id'],
								$setting['section']['title'],
								[ $this, 'display_section' ],
								$setting['section']['id']
							);
						}

						if ( isset( $setting['section']['id'] ) && isset( $setting['fields'] ) && is_array( $setting['fields'] ) && ! empty( $setting['fields'] ) ) {
							$page = $setting['tab_id'] ?? $setting['section']['id'];

							foreach ( $setting['fields'] as $field ) {
								if ( isset( $field['id'] ) && isset( $field['title'] ) && isset( $field['type'] ) ) {
									add_settings_field(
										$field['id'],
										$field['title'],
										isset( $field['callback'] ) && ! empty( $field['callback'] ) ? $field['callback'] : [
											$this,
											'display_field'
										],
										$setting['section']['id'],
										$setting['section']['id'],
										[
											'option_name' => $setting['option_name'],
											'field'       => $field,
											'label_for'   => sprintf( '%s-%s-%s', $page, $field['id'], $field['type'] ),
										]
									);
								}
							}
						}
					}
				}
			}
		}

		/**
		 * Функция для отображения секции.
		 *
		 * Эта функция отображает секцию на основе переданных аргументов.
		 *
		 * @since 1.0.0
		 *
		 * @param array $args Массив аргументов для отображения секции.
		 */
		public function display_section( array $args ) {
			if ( ! empty( $this->settings ) ) {
				foreach ( $this->settings as $setting ) {
					if ( isset( $setting['section']['id'] ) && $setting['section']['id'] === $args['id'] ) {
						if ( isset( $setting['section']['description'] ) && $setting['section']['description'] ) {
							echo '<p class="isvek-plugin-description description ' . esc_attr( $setting['section']['id'] ) . '">' . wp_kses_post( $setting['section']['description'] ) . '</p>';
						}
						break;
					}
				}
			}
		}

		/**
		 * Функция для отображения страницы настроек плагина.
		 *
		 * Эта функция отображает страницу настроек плагина, используя вкладки,
		 * определенные через фильтр 'isvek_plugin_settings_tabs_array'.
		 * Текущая вкладка определяется на основе параметра 'tab' в GET-запросе, если он присутствует,
		 * в противном случае используется вкладка по умолчанию,
		 * определенная через фильтр 'isvek_plugin_settings_tab_default'.
		 *
		 * @since 1.0.0
		 */
		public function page() {
			$tabs        = apply_filters( 'isvek_plugin_settings_tabs_array', [] );
			$tab_default = apply_filters( 'isvek_plugin_settings_tab_default', '' );
			$tab_current = isset( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ) ) : $tab_default;

			include_once __DIR__ . '/views/html-admin-page-settings.php';
		}

		/**
		 * Функция для проверки настроек.
		 *
		 * Эта функция проверяет входные данные и возвращает новый массив с очищенными данными.
		 *
		 * @since 1.0.0
		 *
		 * @param array $input Массив входных данных для проверки.
		 *
		 * @return array Возвращает новый массив с очищенными данными.
		 */
		public function settings_validate( array $input ): array {
			$filter = str_replace( 'sanitize_option_', 'isvek_plugin_validate_', current_filter() );

			return apply_filters( $filter, $input );
		}

		/**
		 * Функция для отображения поля.
		 *
		 * Эта функция отображает поле, если класс 'Isvek\Plugin\Admin\Fields' существует.
		 *
		 * @since 1.0.0
		 *
		 * @param array $args Массив аргументов для отображения поля.
		 *
		 * @return Fields|string Возвращает новый экземпляр класса Fields с переданными аргументами, если класс существует. В противном случае возвращает строку 'Поля не найдены'.
		 */
		public function display_field( array $args ) {
			if ( class_exists( 'Isvek\Plugin\Admin\Fields' ) ) {
				return new Fields( $args );
			}

			return 'Поля не найдены';
		}

		/**
		 * Функция для сортировки массива.
		 *
		 * Эта функция сортирует массив на основе значения 'order'.
		 *
		 * @since 1.0.0
		 *
		 * @param array $b Второй элемент для сравнения.
		 *
		 * @param array $a Первый элемент для сравнения.
		 *
		 * @return int Возвращает 0, если 'order' не установлен, 1, если 'order' первого элемента больше, чем второго, и 0 в противном случае.
		 */
		public function sort_array( array $a, array $b ): int {
			if ( ! isset( $a['order'] ) ) {
				return 0;
			}

			return ( $a['order'] > $b['order'] ) ? 1 : 0;
		}
	}
}
