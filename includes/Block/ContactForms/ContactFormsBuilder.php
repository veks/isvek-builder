<?php
/**
 * ContactFormsBuilder class.
 *
 * @class   Block
 * @version 1.0.0
 * @package Isvek\Plugin\Block\ContactForms
 */

namespace Isvek\Plugin\Block\ContactForms;

use Isvek\Plugin\Block\BlockAbstract;
use WP_Block;
use WP_Block_Editor_Context;
use WP_Block_Type_Registry;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Block\ContactForms\ContactFormsBuilder' ) ) {

	/**
	 * ContactFormsBuilder class.
	 */
	class ContactFormsBuilder extends BlockAbstract {

		/**
		 * @var string
		 */
		public string $block_name = 'contact-forms-builder';

		/**
		 * Метод для инициализации.
		 *
		 * @since 1.0.0
		 */
		public function init() {
			add_filter( 'allowed_block_types_all', [ $this, 'disable_blocks' ], 11, 2 );
		}

		/**
		 * Отключить блоки.
		 *
		 * @param bool|string[] $allowed_block_types Массив щелей типа блока, или булево значение для включения/выключения всех щелей.
		 * @param WP_Block_Editor_Context $block_editor_context
		 *
		 * @return array|bool
		 */
		public function disable_blocks( $allowed_block_types, WP_Block_Editor_Context $block_editor_context ) {
			$block_types      = WP_Block_Type_Registry::get_instance()->get_all_registered();
			$blocks           = [];
			$block_categories = $this->block_category_slug . "/" . $this->block_name;

			foreach ( $block_types as $block_type ) {
				if ( $block_categories === $block_type->name ) {
					continue;
				}

				$blocks[] = $block_type->name;
			}

			if ( ! empty( $block_editor_context->post->post_type ) && ( $block_editor_context->post->post_type !== 'ib-contact-forms' ) ) {
				return $blocks;
			}

			return $allowed_block_types;
		}


		/**
		 * Метод для добавления скриптов в административной части.
		 *
		 * @since 1.0.0
		 */
		public function admin_enqueue_scripts() {

		}

		/**
		 * Метод для добавления скриптов.
		 *
		 * @since 1.0.0
		 */
		public function enqueue_scripts() {

		}

		/**
		 * Обратный вызов рендеринга блочного типа.
		 *
		 * @param array $attributes Атрибуты.
		 * @param string $content Содержание.
		 * @param WP_Block $block
		 *
		 * @return mixed
		 * @since 1.0.0
		 */
		public function render( array $attributes, string $content, WP_Block $block ): string {
			return $content;
		}
	}
}
