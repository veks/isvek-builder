<?php


namespace Longman\TelegramBot\Commands\UserCommands;

use Longman\TelegramBot\Commands\Command;
use Longman\TelegramBot\Commands\UserCommand;
use Longman\TelegramBot\Entities\ServerResponse;
use Longman\TelegramBot\Exception\TelegramException;

class SubscriptionCommand extends UserCommand {
	/**
	 * @var string
	 */
	protected $name = 'subscription';

	/**
	 * @var string
	 */
	protected $description = 'Подписка на уведомления';

	/**
	 * @var string
	 */
	protected $usage = '/subscription';

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
		$name       = implode( ' ', [ $from->getFirstName(), $from->getLastName() ] );
		$option     = get_option( $this->option_name );

		if ( false === $option ) {
			return $this->replyToChat( 'Ошибка, обратитесь к администратору этого сервера!' );
		}

		$get_option = array_get( $option, $user_id, false );

		if ( ! empty( $get_option ) ) {
			$text = 'Вы уже подписались на уведомления!' . PHP_EOL . 'Чтобы отписаться от уведомлений, введите команду /unsubscription';
		} else {
			$data = [ 'user_id' => $user_id, 'chat_id' => $chat_id, 'user_name' => $name, ];

			update_option( $this->option_name, array_set( $option, $user_id, $data ) );

			$text = 'Вы подписались на уведомления!';
		}

		return $this->replyToChat( $text );
	}
}
