<?php
/**
 * ContactFormsShortcode class.
 *
 * @class   Block
 * @version 1.0.0
 * @package Isvek\Plugin\Block\ContactForms
 */

namespace Isvek\Plugin\Block\ContactForms;

use Isvek\Plugin\Block\BlockAbstract;
use WP_Block;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Block\ContactForms\ContactForms' ) ) {

	/**
	 * ContactForms class.
	 */
	class ContactForms extends BlockAbstract {

		/**
		 * @var string
		 */
		public string $block_name = 'contact-forms';

		/**
		 * @var string
		 */
		public string $block_option_name = 'isvek_plugin_settings_contact_forms';

		/**
		 * Метод для инициализации.
		 *
		 * @since 1.0.0
		 */
		public function init() {
			// TODO: Implement init() method.
		}

		/**
		 * Метод для добавления скриптов в административной части.
		 *
		 * @since 1.0.0
		 */
		public function admin_enqueue_scripts() {
			// TODO: Implement admin_enqueue_scripts() method.
		}

		/**
		 * Метод для добавления скриптов.
		 *
		 * @since 1.0.0
		 */
		public function enqueue_scripts() {
			wp_register_script(
				$this->block_category_slug . '-' . $this->block_name . '-inputmask',
				$this->get_dir_url_js() . 'inputmask.min.js',
				true,
				'5.0.8-beta.2',
				true
			);

			wp_register_script(
				$this->block_category_slug . '-' . $this->block_name,
				$this->get_dir_url_js() . 'contact-forms.min.js',
				true,
				$this->get_version(),
				true
			);

			wp_localize_script(
				$this->block_category_slug . '-' . $this->block_name,
				'isvekPluginContactFormsArgs',
				[
					'url'                     => admin_url( 'admin-ajax.php' ),
					'googleKey'               => isvek_plugin_get_option( $this->block_option_name, 'google_key' ),
					'googleScriptLoadTimeout' => isvek_plugin_get_option( $this->block_option_name, 'google_script_load_timeout' ),
					'target'                  => '.ib-contact-forms',
					'action'                  => 'ib_contact_forms_action'
				]
			);

			wp_add_inline_script(
				$this->block_category_slug . '-' . $this->block_name,
				"isvekPlugin.ContactForms({target: isvekPluginContactFormsArgs.target, url: isvekPluginContactFormsArgs.url, googleKey: isvekPluginContactFormsArgs.googleKey, action: isvekPluginContactFormsArgs.action, googleScriptLoadTimeout: isvekPluginContactFormsArgs.googleScriptLoadTimeout})"
			);
		}

		/**
		 * Возвращает содержимое блока.
		 *
		 * Эта функция отображает содержимое блока и возвращает его.
		 *
		 * @since 1.0.0
		 *
		 * @param array $attributes Ассоциативный массив атрибутов блока.
		 * @param string $content Строка содержимого блока.
		 * @param WP_Block $block Объект блока WordPress.
		 *
		 * @return string Возвращает содержимое блока.
		 */
		public function render( array $attributes, string $content, WP_Block $block ): string {
			return $content;
		}
	}
}
