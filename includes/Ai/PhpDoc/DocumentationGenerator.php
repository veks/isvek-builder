<?php
/**
 * DocumentationGenerator class.
 *
 * @class   DocumentationGenerator
 * @version 1.0.0
 * @package Isvek\Plugin\Ai\PhpDoc
 */

namespace Isvek\Plugin\Ai\PhpDoc;

use Isvek\Plugin\Ai\Ai;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Ai\PhpDoc\DocumentationGenerator' ) ) {

	/**
	 * DocumentationGenerator class.
	 */
	class DocumentationGenerator {

		/**
		 * Метод создания блока документации.
		 *
		 * @since 1.0.0
		 *
		 * @param string $function Имя функции.
		 *
		 * @return string Возвращает сгенерированный блок документации.
		 */
		public static function crate_doc_block( string $function ): string {
			$prompt     = 'Прочитайте следующую функцию WordPress PHP: """ ' . $function . ' """ Напиши блок на Русском языке стандартом WordPress PHPDoc для функции и добавляя @since 1.0.0:';
			$completion = Ai::gpt4( $prompt );

			if ( ! empty( $completion ) ) {
				return $completion;
			} else {
				return false;
			}
		}
	}
}
