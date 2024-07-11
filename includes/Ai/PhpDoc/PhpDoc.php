<?php
/**
 * PhpDoc class.
 *
 * @class   PhpDoc
 * @version 1.0.0
 * @package Isvek\Plugin\Ai\PhpDoc
 */

namespace Isvek\Plugin\Ai\PhpDoc;

use Exception;
use FilesystemIterator;
use RecursiveDirectoryIterator;
use WP_CLI;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Ai\PhpDoc\PhpDoc' ) ) {

	/**
	 * WPphpdoc class.
	 */
	class PhpDoc {

		/**
		 * Конструктор класса.
		 *
		 * Инициализирует объект и добавляет команды WP-CLI для обработки PHPDoc.
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			if ( defined( 'WP_CLI' ) && WP_CLI ) {
				try {
					//wp ib phpDocFile --file=".\includes\Ai\file.php"
					//wp ib phpDocDir --dir=".\includes\"
					WP_CLI::add_command( 'ib phpDocFile', [ $this, 'process_file' ] );
					WP_CLI::add_command( 'ib phpDocDir', [ $this, 'process_dir' ] );
				} catch ( Exception $e ) {
					error_log( $e->getMessage() );
				}
			}
		}

		/**
		 * Обрабатывает файл для генерации блоков PHPDoc для функций.
		 *
		 * @since 1.0.0
		 *
		 * @param array $assoc_args Дополнительные аргументы.
		 * @param array $args Аргументы функции.
		 *
		 * @return bool Возвращает true, если операция завершилась успешно, и false в случае ошибок.
		 * @throws Exception
		 */
		public function process_file( array $args = [], array $assoc_args = [] ): bool {
			$args        = (object) [ 'file' => $args[0] ?? '' ];
			$functions   = ( new FileParser )->get_functions_from_file( $args->file );
			$completions = 0;
			$errors      = 0;

			foreach ( $functions as $function ) {
				if ( ! $function['phpdoc'] ) {
					WP_CLI::line( sprintf( 'Найдена функция без док блока: %s', $function['name'] ) );

					try {
						$docs = DocumentationGenerator::crate_doc_block( $function['body'] );

						if ( ( new FileWriter )->write_doc_block( $args->file, $function['body'], $docs ) ) {
							WP_CLI::line( sprintf( 'Написал док блок для %s', $function['name'] ) );
							$completions ++;
						} else {
							WP_CLI::error( sprintf( 'Сгенерированный док блок для функции < %s >, но не смог записать его в файл.', $function['name'] ) );
							$errors ++;
						}
					} catch ( Exception $error ) {
						WP_CLI::line( sprintf( 'Не удалось сгенерировать блок документов для %s %s', $function['name'], $error->getMessage() ) );
					}
				}

				@flush();
				@ob_flush();
			}

			if ( empty( $functions ) ) {
				WP_CLI::line( 'В файле не найдено ни одной функции.' );
			}

			if ( $completions > 0 ) {
				WP_CLI::line( sprintf( 'Готовая обработка %s с %s Записанные блоки PHPDoc и %s ошибок.', $args->file, $completions, $errors ) );
			}

			return ! ( $errors > 0 );
		}

		/**
		 * Обрабатывает каталог с файлами.
		 *
		 * Метод проходит по каталогу и обрабатывает каждый файл. Может работать в рекурсивном режиме для обхода подкаталогов.
		 *
		 * @since 1.0.0
		 *
		 * @param array $assoc_args Массив ассоциативных аргументов для функции.
		 * @param array $args Массив аргументов для функции.
		 *
		 * @return int Возвращает флаг успешного выполнения операции.
		 * @throws Exception
		 */
		public function process_dir( array $args = [], array $assoc_args = [] ): int {
			$args    = (object) [ 'dir' => $args[0] ?? '', 'recursive' => $args[1] ?? true ];
			$success = true;

			if ( $args->recursive ) {
				WP_CLI::line( 'Установлен флаг рекурсии.' );
			}

			WP_CLI::line( sprintf( 'Каталог обработки: %s ', $args->dir ) );

			if ( ! is_dir( $args->dir ) ) {
				WP_CLI::line( sprintf( '%s не является действительным каталогом.', $args->dir ) );
			}

			$iterator = new RecursiveDirectoryIterator( $args->dir, FilesystemIterator::SKIP_DOTS );

			foreach ( $iterator as $file ) {
				if ( $file->isFile() && $file->getExtension() == 'php' ) {
					$success = $this->process_file( [ $file->getPathname() ] );
				}

				if ( $file->isDir() && $args->recursive ) {
					$this->process_dir( [ $file->getPathname(), true ] );
				}

				@flush();
				@ob_flush();
			}

			WP_CLI::line( 'Завершена обработка всех каталогов.' );

			return $success;
		}
	}
}
