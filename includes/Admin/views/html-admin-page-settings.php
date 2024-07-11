<?php
/**
 * Settings View
 *
 * @package Isvek\Plugin\Admin
 */

defined( 'ABSPATH' ) || exit;

?>

<div class="wrap">
	<div id="icon-options-general" class="icon32"></div>

	<h1 class="wp-heading-inline">
		<?php echo esc_html( get_admin_page_title() ); ?>
		<sup style="font-size: small">Версия DB::<?php echo esc_html( $this->get_db_version() ); ?></sup>
	</h1>

	<?php settings_errors(); ?>

	<hr class="wp-header-end">

	<?php if ( ! empty( $tabs ) ) : ?>
		<h2 class="nav-tab-wrapper">
			<?php foreach ( $tabs as $id => $title ) : ?>
				<?php
				$id             = sanitize_text_field( $id );
				$nav_tab_active = $tab_current === $id ? ' nav-tab-active' : '';
				$url            = $id === $tab_default ? 'admin.php?page=isvek-plugin-settings' : 'admin.php?page=isvek-plugin-settings&tab=' . $id;
				?>
				<a href="<?php echo esc_url( admin_url( $url ) ); ?>"
				   class="nav-tab<?php echo esc_attr( $nav_tab_active ); ?>">
					<?php echo esc_html( $title ); ?>
				</a>
			<?php endforeach; ?>
		</h2>
	<?php endif; ?>

	<div id="poststuff">
		<div id="post-body" class="metabox-holder">
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortable">
					<div class="postbox">
						<div class="inside">

							<?php if ( ! empty( $tabs ) && ! empty( $this->settings ) ) : ?>

								<div class="tab-content">
									<form action="options.php" method="post">
										<?php

										foreach ( $this->settings as $setting ) {
											if ( isset( $setting['tab_id'] ) && $setting['tab_id'] === $tab_current ) {
												if ( isset( $setting['option_group'] ) ) {
													settings_fields( $setting['option_group'] );
												}

												if ( isset( $setting['section']['id'] ) ) {
													do_settings_sections( $setting['section']['id'] );
												}
											}
										}

										submit_button();
										?>
										<div class="clear"></div>
									</form>
								</div>
							<?php endif; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
