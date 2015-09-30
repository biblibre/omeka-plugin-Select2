# Select2 plugin for Omeka

This Omeka plugin allows to use [Select2](https://select2.github.io/) JS library on every dropdown list in Omeka.

It is configurable by using CSS selectors. Select2 will be applied on every select that match the selectors.
For instance, the default is:

    body.item-types select.existing-element-drop-down,
    body.advanced-search select.advanced-search-element

which enables Select2 on elements drop-down lists in advanced search and item type configuration pages
