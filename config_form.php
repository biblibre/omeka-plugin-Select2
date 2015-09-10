<div class="field">
    <div class="two columns alpha">
        <label for="select2_css_selector">
            <?php echo __('CSS Selector'); ?>
        </label>
    </div>
    <div class="inputs five columns omega">
        <p class="explanation">
            <?php
                echo __('Select2 will be applied to the following selectors. '
                    . 'Separate multiple selectors with comma.');
            ?>
        </p>
        <?php
            echo get_view()->formTextarea('select2_css_selector',
                get_option('select2_css_selector'), null);
        ?>
    </div>
</div>
