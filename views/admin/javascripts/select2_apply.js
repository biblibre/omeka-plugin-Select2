(function($) {
  function select2_apply() {
    $(Omeka.Select2.CssSelector).select2();
  }

  $(document).ready(function() {
    select2_apply();

    if ('MutationObserver' in window) {
      // Monitor all DOM changes.
      // If a select is added, apply Select2 again.

      var observer = new MutationObserver(function(mutations) {
        var selects_found = false;
        mutations.forEach(function(mutation) {
          var addedNodes = mutation.addedNodes
          for (var i = 0; i < addedNodes.length; i++) {
            var node = addedNodes[i];
            if ($(node).find('select').length) {
              selects_found = true;
            };
          }
        });

        if (selects_found) {
          select2_apply();
        }
      });

      var target = document.body;
      var config = {childList: true, subtree: true};
      observer.observe(target, config);
    }
  });
})(jQuery);
