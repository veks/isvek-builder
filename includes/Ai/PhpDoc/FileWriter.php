<?php
/**
 * FileWriter class.
 *
 * @class   FileWriter
 * @version 1.0.0
 * @package Isvek\Plugin\Ai\PhpDoc
 */

namespace Isvek\Plugin\Ai\PhpDoc;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Ai\PhpDoc\FileWriter' ) ) {

	/**
	 * FileWriter class.
	 */
	class FileWriter {

		/**
		 * Записывает документационный блок для функции.
		 *
		 * @since 1.0.0
		 *
		 * @param string $file Путь к файлу.
		 * @param string $body Тело функции.
		 * @param string $docblock Документационный блок для функции.
		 *
		 * @return bool Успешность записи документационного блока.
		 */
		public function write_doc_block( string $file, string $body, string $docblock ): bool {
			$docblock         = $this->clean_doc_block( $docblock );
			$body             = rtrim( explode( '{', $body, 2 )[0] );
			$docblock         = $this->indent_doc_block( trim( $docblock ), $this->get_leading_whitespace( $body ) );
			$originalContents = file_get_contents( $file );
			$newContents      = str_replace( $body, $docblock . PHP_EOL . $body, $originalContents, $c );
			file_put_contents( $file, $newContents );

			return $c == 1;
		}

		/**
		 * Получает ведущие пробелы из заданной строки.
		 *
		 * Эта функция принимает строку и извлекает ведущие пробелы из неё.
		 *
		 * @since 1.0.0
		 *
		 * @param string $str Строка, из которой нужно извлечь ведущие пробелы.
		 *
		 * @return string Ведущие пробелы из заданной строки.
		 */
		private function get_leading_whitespace( string $str ): string {
			$matches    = [];
			$whitespace = preg_match( '/^\s+/', $str, $matches ) ? $matches[0] : '';

			return str_replace( PHP_EOL, '', $whitespace );
		}

		/**
		 * Добавляет отступ к документационному блоку.
		 *
		 * Данная функция принимает строку документации и отступ в виде строки и возвращает строку с добавленным отступом к каждой строке.
		 *
		 * @since 1.0.0
		 *
		 * @param string $docs Строка документации для добавления отступа.
		 * @param string $whitespace Строка отступа, которую необходимо добавить к каждой строке в документации.
		 *
		 * @return string Возвращает строку документации с добавленным отступом к каждой строке.
		 */
		private function indent_doc_block( string $docs, string $whitespace ): string {
			$lines         = explode( PHP_EOL, $docs );
			$modifiedLines = array_map( function ( $line ) use ( $whitespace ) {
				return $whitespace . $line;
			}, $lines );

			return implode( PHP_EOL, $modifiedLines );
		}

		/**
		 * Очищает блок документации.
		 *
		 * Этот метод очищает блок документации, удаляя лишние символы и возвращая его как строку.
		 *
		 * @since 1.0.0
		 *
		 * @param string $str Строка с блоком документации.
		 *
		 * @return string Очищенный блок документации.
		 */
		private function clean_doc_block( string $str ): string {
			$startPos = strpos( $str, '/**' );
			$endPos   = strpos( $str, '*/' );
			if ( $startPos === false || $endPos === false ) {
				return '';
			}
			$startPos += 3;

			return PHP_EOL . '/**' . PHP_EOL . trim( substr( $str, $startPos, $endPos - $startPos ) ) . PHP_EOL . '*/';
		}
	}
}
