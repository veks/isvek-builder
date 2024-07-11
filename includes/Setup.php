<?php
/**
 * Setup class.
 *
 * @class   Setup
 * @version 1.0.0
 * @package Isvek\Plugin
 */

namespace Isvek\Plugin;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Setup' ) ) {

	/**
	 * Setup class.
	 */
	class Setup extends Bootstrap {

		public function __construct() {
			if ( is_admin() ) {
				add_action( 'admin_init', [ $this, 'set_options' ], 11 );
			}

			add_action( 'block_categories_all', [ $this, 'add_block_categories' ], 11, 2 );
			add_action( 'wp_head', [ $this, 'add_header' ], 999 );
			add_action( 'wp_footer', [ $this, 'add_footer' ], 999 );
			add_action( 'isvek_plugin_deactivation_hook', [ $this, 'uninstall' ], 1 );
		}

		/**
		 * Проверка на существование опций.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function set_options() {
			$options                 = apply_filters( 'isvek_plugin_options', [] );
			$isvek_plugin_db_version = get_option( 'isvek_plugin_db_version' );

			if ( version_compare( $this->get_db_version(), $isvek_plugin_db_version, '>' ) ) {
				if ( false === $isvek_plugin_db_version ) {
					add_option( 'isvek_plugin_db_version', $this->get_db_version() );
				} else if ( empty( $isvek_plugin_db_version ) || version_compare( $this->get_db_version(), $isvek_plugin_db_version, '>' ) ) {
					update_option( 'isvek_plugin_db_version', $this->get_db_version() );
				}

				if ( ! empty( $options ) ) {
					foreach ( $options as $option_name => $value ) {
						$option = get_option( $option_name );

						if ( false === $option ) {
							add_option( $option_name, $value );
						} else if ( empty( $option ) || version_compare( $this->get_db_version(), $isvek_plugin_db_version, '>' ) ) {
							update_option( $option_name, $value );
						}
					}
				}
			}
		}

		/**
		 * Добавить блок категорий.
		 *
		 * @since 1.0.0
		 *
		 * @param array $categories Категории.
		 *
		 * @return array
		 */
		public function add_block_categories( array $categories ): array {
			return array_merge(
				$categories,
				[
					[
						'slug'  => $this->get_block_category_slug(),
						'title' => $this->get_name(),
					],
				]
			);
		}

		/**
		 * Добавляет пользовательский код в шапку сайта.
		 *
		 * Эта функция выводит пользовательский код, указанный в настройках плагина, в шапке сайта.
		 *
		 * @since 1.0.0
		 */
		public function add_header() {
			echo wp_unslash( html_entity_decode( isvek_plugin_get_option( 'isvek_plugin_settings_basic', 'header-code-editor' ) ) );
		}

		/**
		 * Добавляет пользовательский код в подвал сайта.
		 *
		 * Эта функция выводит пользовательский код, указанный в настройках плагина, в подвале сайта.
		 *
		 * @since 1.0.0
		 */
		public function add_footer() {
			echo wp_unslash( html_entity_decode( isvek_plugin_get_option( 'isvek_plugin_settings_basic', 'footer-code-editor' ) ) );
		}

		/**
		 * Удаляет все данные при удалении плагина.
		 *
		 * Удаляет хранимые данные, связанные с установкой плагина.
		 *
		 * @since 1.0.0
		 */
		public function uninstall() {
			delete_option( 'isvek_plugin_db_version' );
			$options = apply_filters( 'isvek_plugin_options', [] );

			if ( ! empty( $options ) ) {
				foreach ( $options as $option_name => $value ) {
					delete_option( $option_name );
				}
			}
		}
	}
}
