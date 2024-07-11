<?php
/**
 * Utility class.
 *
 * @class   Utility
 * @version 1.0.0
 * @package Isvek\Plugin\Traits
 */

namespace Isvek\Plugin\Traits;

defined( 'ABSPATH' ) || exit;

if ( ! trait_exists( 'Isvek\Plugin\Traits\Utility' ) ) {

	/**
	 * Utility class.
	 */
	trait Utility {

		/**
		 * Возвращает название билдера.
		 *
		 * Этот метод возвращает строку с названием билдера "Isvek Builder".
		 *
		 * @since 1.0.0
		 *
		 * @return string Название билдера.
		 */
		public function get_name(): string {
			return 'Isvek Builder';
		}

		/**
		 * Возвращает базовое имя плагина.
		 *
		 * Эта функция возвращает базовое имя файла плагина, используемого в WordPress.
		 *
		 * @since 1.0.0
		 *
		 * @return string Базовое имя плагина.
		 */
		public function get_file(): string {
			return plugin_basename( ISVEK_PLUGIN_FILE );
		}

		/**
		 * Возвращает путь к директории плагина.
		 *
		 * Этот метод возвращает путь к директории плагина.
		 * Если указан путь, он добавляется к основному пути плагина.
		 *
		 * @since 1.0.0
		 *
		 * @param string $path Опциональный параметр, путь к дополнительному файлу или директории внутри плагина.
		 *
		 * @return string Полный путь к директории плагина.
		 */
		public function get_dir_path( string $path = '' ): string {
			if ( ! empty( $path ) ) {
				return plugin_dir_path( ISVEK_PLUGIN_FILE ) . $path;
			} else {
				return plugin_dir_path( ISVEK_PLUGIN_FILE );
			}
		}

		/**
		 * Получает URL папки плагина.
		 *
		 * Возвращает URL папки плагина с возможностью добавления относительного пути.
		 *
		 * @since 1.0.0
		 *
		 * @param string $path (optional) Путь внутри папки плагина.
		 *
		 * @return string URL папки плагина с указанным путем, если указан, в противном случае - URL папки плагина.
		 */
		public function get_dir_url( string $path = '' ): string {
			if ( ! empty( $path ) ) {
				return plugin_dir_url( ISVEK_PLUGIN_FILE ) . $path;
			} else {
				return plugin_dir_url( ISVEK_PLUGIN_FILE );
			}
		}

		/**
		 * Возвращает путь к директории блоков.
		 *
		 * Получает путь к директории блоков в теме.
		 *
		 * @since 1.0.0
		 *
		 * @param string $path Опциональный аргумент - поддиректория в директории блоков.
		 *
		 * @return string Возвращает строку с путем к директории блоков.
		 */
		public function get_blocks_dir_path( string $path = '' ): string {
			if ( ! empty( $path ) ) {
				return $this->get_dir_path( 'assets/blocks/' . $path . '/' );
			} else {
				return $this->get_dir_path( 'assets/blocks/' );
			}
		}

		/**
		 * Возвращает путь к директории шаблонов.
		 *
		 * @since 1.0.0
		 *
		 * @return string Путь к директории шаблонов.
		 */
		public function get_templates_dir_path(): string {
			return $this->get_dir_path( 'templates/' );
		}

		/**
		 * Возвращает URL директории со стилями CSS.
		 *
		 * @since 1.0.0
		 *
		 * @return string URL директории со стилями CSS.
		 */
		public function get_dir_url_css(): string {
			return $this->get_dir_url( 'assets/css/' );
		}

		/**
		 * Возвращает URL-адрес директории с JavaScript файлами.
		 *
		 * @since 1.0.0
		 *
		 * @return string URL-адрес директории с JavaScript файлами.
		 */
		public function get_dir_url_js(): string {
			return $this->get_dir_url( 'assets/js/' );
		}

		/**
		 * Возвращает строку слага плагина.
		 *
		 * Функция возвращает строку, представляющую слаг плагина.
		 *
		 * @since 1.0.0
		 *
		 * @return string Строка слага плагина.
		 */
		public function get_slug(): string {
			return 'isvek-plugin';
		}

		/**
		 * Возвращает наименование для слага настроек плагина.
		 *
		 * Возвращает строку, представляющую наименование для слага настроек плагина.
		 *
		 * @since 1.0.0
		 *
		 * @return string Строка с наименованием слага настроек.
		 */
		public function get_slug_settings(): string {
			return 'isvek-plugin-settings';
		}

		/**
		 * Возвращает префикс для использования в WordPress.
		 *
		 * Эта функция возвращает префикс 'ip' для использования в WordPress.
		 *
		 * @since 1.0.0
		 *
		 * @return string Префикс 'ip'.
		 */
		public function get_prefix(): string {
			return 'ip';
		}

		/**
		 * Возвращает имя опции, используемой плагином.
		 *
		 * @since 1.0.0
		 *
		 * @return string Имя опции.
		 */
		public function get_option_name(): string {
			return 'isvek_plugin';
		}

		/**
		 * Возвращает версию плагина.
		 *
		 * @since 1.0.0
		 *
		 * @return string Версия плагина.
		 */
		public function get_version(): string {
			return ISVEK_PLUGIN_VERSION;
		}

		/**
		 * Возвращает текущую версию базы данных плагина.
		 *
		 * Эта функция возвращает строку, представляющую версию базы данных, которую использует плагин.
		 *
		 * @since 1.0.0
		 *
		 * @return string Возвращает версию базы данных плагина.
		 */
		public function get_db_version(): string {
			return ISVEK_PLUGIN_DB_VERSION;
		}

		/**
		 * Возвращает строку, определяющую уровень доступа, необходимый для выполнения действия.
		 *
		 * @since 1.0.0
		 *
		 * @return string Уровень доступа "администратор".
		 */
		public function get_capability(): string {
			return 'administrator';
		}

		/**
		 * Возвращает название группы опций для плагина.
		 *
		 * @since 1.0.0
		 *
		 * @return string Название группы опций.
		 */
		public function get_option_group(): string {
			return 'isvek-plugin-option-group';
		}

		/**
		 * Возвращает строку, указывающую категорию блока.
		 *
		 * @since 1.0.0
		 *
		 * @return string Строка с названием категории блока.
		 */

		public function get_block_category_slug(): string {
			return 'isvek-plugin-blocks';
		}
	}
}
