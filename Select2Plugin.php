<?php

/**
 * @file
 * Select2 plugin main file.
 */

/**
 * Select2 plugin main class.
 */
class Select2Plugin extends Omeka_Plugin_AbstractPlugin
{
    protected $_hooks = array(
        'install',
        'uninstall',
        'initialize',
        'admin_head',
        'config_form',
        'config',
    );

    protected $_options = array(
        'select2_css_selector' => 'body.item-types select.existing-element-drop-down, body.advanced-search select.advanced-search-element',
    );

    public function hookInstall()
    {
        $this->_installOptions();
    }

    public function hookUninstall()
    {
        $this->_uninstallOptions();
    }

    /**
     * Set up plugins, translations, and filters
     */
    public function hookInitialize()
    {
        add_translation_source(dirname(__FILE__) . '/languages');
    }

    public function hookAdminHead()
    {
        $selector = get_option('select2_css_selector');
        if ($selector) {
            queue_js_file('select2.min');
            queue_css_file('select2.min');

            $selector = preg_replace('/\s+/', ' ', $selector);
            $selector = json_encode($selector);
            queue_js_string("
                Omeka.Select2 = {};
                Omeka.Select2.CssSelector = $selector;
            ");

            queue_js_file('select2_apply');
        }
    }

    public function hookConfigForm()
    {
        require dirname(__FILE__) . '/config_form.php';
    }

    public function hookConfig($args)
    {
        $select2_css_selector = $args['post']['select2_css_selector'];
        set_option('select2_css_selector', $select2_css_selector);
    }
}
