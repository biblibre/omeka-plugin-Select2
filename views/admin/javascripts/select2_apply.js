(function($) {
  function select2_apply() {
    $(Omeka.Select2.CssSelector).select2();
  }

  // Select2 does not support to be cloned, it have to be destroyed first.
  // It is reapplied when the clone is attached to DOM (thanks to
  // MutationObserver)
  var originalClone = $.fn.clone;
  $.fn.clone = function() {
    try {
      $(this).find('select').filter(Omeka.Select2.CssSelector).each(function() {
        $(this).select2('destroy');
      });
    } catch (e) {}

    return originalClone.apply(this, arguments);
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
