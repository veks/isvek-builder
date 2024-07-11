<?php
/**
 * FileParser class.
 *
 * @class   FileParser
 * @version 1.0.0
 * @package Isvek\Plugin\Ai\PhpDoc
 */

namespace Isvek\Plugin\Ai\PhpDoc;

use Exception;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Ai\PhpDoc\FileParser' ) ) {

	/**
	 * FileParser class.
	 */
	class FileParser {

		/**
		 * Получает информацию о функциях из строки кода.
		 *
		 * @since 1.0.0
		 *
		 * @param string $code Строка кода, из которой извлекаются функции.
		 *
		 * @return array Массив информации о функциях.
		 */
		public function get_functions_from_string( string $code ): array {
			$functions = [];
			$matches   = [];

			preg_match_all( '/^\s*(\/\*\*.*?\*\/)?\s*(?:(?:public|private|protected)\s+)?(?:static\s+)?function\s+(\w+)\s*\(([^)]*)\)\s*(?::\s?(\S+))?/ms', $code, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE );
			foreach ( $matches as $match ) {
				$functions[] = [
					'name'   => $match[2][0],
					'phpdoc' => self::get_php_doc_from_string( $match[0][0] ),
					'body'   => $match[0][0] . PHP_EOL . $this->get_function_body( $code, $match[0][1] ),
				];
			}

			return $functions;
		}

		/**
		 * Получает блок PHPDoc из строки.
		 *
		 * @since 1.0.0
		 *
		 * @param string $code Строка, содержащая PHP код.
		 *
		 * @return string|null Возвращает блок PHPDoc или null, если не найден.
		 */
		private function get_php_doc_from_string( string $code ): ?string {
			$matches = [];
			preg_match( '/^\s*\/\*\*(.*?)\*\//ms', $code, $matches );

			return $matches[0] ?? null;
		}

		/**
		 * Получает массив функций из файла.
		 *
		 * @since 1.0.0
		 *
		 * @param string $filePath Путь к файлу, из которого нужно получить функции.
		 *
		 * @return array Массив функций.
		 *
		 * @throws Exception Если файл не найден.
		 */
		public function get_functions_from_file( string $filePath ): array {
			if ( ! file_exists( $filePath ) ) {
				throw new Exception( "Файл не найден: $filePath" );
			}

			$code = file_get_contents( $filePath );

			return self::get_functions_from_string( $code );
		}

		/**
		 * Возвращает содержимое функции, начиная с указанного индекса.
		 *
		 * Этот метод получает строку и начальный индекс и извлекает содержимое функции,
		 * опираясь на открывающие и закрывающие скобки. Он возвращает содержимое функции
		 * внутри скобок, включая сами скобки.
		 *
		 * @since 1.0.0
		 *
		 * @param string $str Строка, содержащая функцию.
		 * @param int $startIndex Индекс, с которого начинать извлечение.
		 *
		 * @return string Содержимое функции, начиная с указанного индекса.
		 */
		private function get_function_body( string $str, int $startIndex ): string {
			$openBraceCount  = 0;
			$closeBraceCount = 0;
			$contents        = "";

			for ( $i = $startIndex; $i < strlen( $str ); $i ++ ) {
				if ( $str[ $i ] == "{" ) {
					$openBraceCount ++;
				} else if ( $str[ $i ] == "}" ) {
					$closeBraceCount ++;
				}

				if ( $openBraceCount > 0 ) {
					$contents .= $str[ $i ];
				}

				if ( $openBraceCount > 0 && $openBraceCount == $closeBraceCount ) {
					break;
				}
			}

			return $contents;
		}
	}
}
