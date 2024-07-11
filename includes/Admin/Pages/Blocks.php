<?php
/**
 * Blocks class.
 *
 * @class   Blocks
 * @version 1.0.0
 * @package Isvek\Plugin\Admin\Pages
 */

namespace Isvek\Plugin\Admin\Pages;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Admin\Pages\Blocks' ) ) {

	/**
	 * Blocks class.
	 */
	class Blocks {

		/**
		 * @var string
		 */
		protected string $id = 'blocks';

		/**
		 * @var string
		 */
		protected string $title = 'Блоки';

		/**
		 * @var string
		 */
		protected string $option_group = 'isvek_plugin_settings_option_group_blocks';

		/**
		 * @var string
		 */
		protected string $option_name = 'isvek_plugin_settings_blocks';

		/**
		 * @var string
		 */
		protected string $section_id = 'isvek_plugin_settings_section_blocks';

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
						'id'      => 'yandex-maps-key',
						'title'   => 'Api ключ яндекс карты',
						'desc'    => 'Ключ для обмена данными между сайтом и сервисом yandex maps.',
						'type'    => 'text',
						'link'    => [
							'text'   => 'Получить ключ',
							'url'    => 'https://developer.tech.yandex.ru/services/',
							'target' => true,
						],
						'default' => '26f05ec7-fb41-43a4-82ab-741c9f350377',
					]
				]
			];

			return $settings;
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
				'yandex-maps-key' => '26f05ec7-fb41-43a4-82ab-741c9f350377',
			];

			return $options;
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
				if ( $value === '' ) {
					add_settings_error( $this->option_name, $key, "Поле {$key} не должно быть пустым." );
				} else {
					$new_input[ $key ] = sanitize_text_field( $value );
				}
			}

			return $new_input;
		}
	}
}
