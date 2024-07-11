<?php
/**
 * Basic class.
 *
 * @class   Basic
 * @version 1.0.0
 * @package Isvek\Plugin\Admin\Pages
 */

namespace Isvek\Plugin\Admin\Pages;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Admin\Pages\Basic' ) ) {

	/**
	 * Basic class.
	 */
	class Basic {

		/**
		 * @var string
		 */
		protected string $id = 'basic';

		/**
		 * @var string
		 */
		protected string $title = 'Основные настройки';

		/**
		 * @var string
		 */
		protected string $option_group = 'isvek_plugin_settings_option_group_basic';

		/**
		 * @var string
		 */
		protected string $option_name = 'isvek_plugin_settings_basic';

		/**
		 * @var string
		 */
		protected string $section_id = 'isvek_plugin_settings_section_basic';

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
				add_filter( 'isvek_plugin_settings_tab_default', [ $this, 'default_tab' ] );
				add_filter( 'isvek_plugin_options', [ $this, 'add_option' ] );
				add_filter( 'isvek_plugin_settings', [ $this, 'add_setting' ] );
			}
		}

		/**
		 * Возвращает идентификатор вкладки по умолчанию.
		 *
		 * Эта функция возвращает идентификатор текущего объекта, который используется как вкладка по умолчанию.
		 *
		 * @since 1.0.0
		 *
		 * @return string Идентификатор вкладки по умолчанию.
		 */
		public function default_tab(): string {
			return $this->id;
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
						'id'      => 'header-code-editor',
						'title'   => 'Скрипты в шапке',
						'desc'    => 'Вставьте код и он будет добавлен перед тегом &lt;head&gt;',
						'type'    => 'code_editor',
						'default' => '<!-- Code header -->',
					],
					[
						'id'      => 'footer-code-editor',
						'title'   => 'Скрипты в подвале',
						'desc'    => 'Вставьте код и он будет добавлен перед тегом &lt;/body&gt;.',
						'type'    => 'code_editor',
						'default' => '<!-- Code footer -->',
					],
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
				'header-code-editor' => '<!-- Code header -->',
				'footer-code-editor' => '<!-- Code footer -->',
			];

			return $options;
		}
	}
}
