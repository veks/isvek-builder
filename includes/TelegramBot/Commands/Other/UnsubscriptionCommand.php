<?php


namespace Longman\TelegramBot\Commands\UserCommands;

use Longman\TelegramBot\Commands\Command;
use Longman\TelegramBot\Commands\UserCommand;
use Longman\TelegramBot\Entities\ServerResponse;
use Longman\TelegramBot\Exception\TelegramException;

class UnsubscriptionCommand extends UserCommand {
	/**
	 * @var string
	 */
	protected $name = 'unsubscription';

	/**
	 * @var string
	 */
	protected $description = 'Отписка от уведомлений';

	/**
	 * @var string
	 */
	protected $usage = '/unsubscription';

	/**
	 * @var string
	 */
	protected $version = '1.0.0';

	/**
	 * @var string
	 */
	protected string $option_name = 'isvek_plugin_telegram_bot_subscribers';

	/**
	 * Main command execution
	 *
	 * @throws TelegramException
	 * @return ServerResponse
	 */
	public function execute(): ServerResponse {
		$message = $this->getMessage();

		$from       = $message->getFrom();
		$user_id    = $from->getId();
		$chat_id    = $message->getChat()->getId();
		$message_id = $message->getMessageId();
		$option     = get_option( $this->option_name );

		if ( false === $option ) {
			return $this->replyToChat( 'Ошибка, обратитесь к администратору этого сервера!' );
		}

		$get_option = array_get( $option, $user_id, false );

		if ( ! empty( $get_option ) ) {
			array_forget( $option, $user_id );
			update_option( $this->option_name, $option );

			$text = 'Вы отписались от уведомлений!' . PHP_EOL;

		} else {
			$text = 'Вы не подписаны на уведомления!' . PHP_EOL . 'Чтобы подписаться на уведомления, введите команду /subscription';
		}

		return $this->replyToChat( $text );
	}
}
