var $ = require('jquery-detached').getJQuery();

$(function() {
    // Horrible ugly hack...
    // We need to use Behaviour.js to wait until after radioBlock.js Behaviour.js rules
    // have been applied, otherwise row-set rows become visible across sections.
    var done = false;            
    Behaviour.specify(".block-control", 'row-set-block-control', 1000, function() { // jshint ignore:line
        if (done) {
            return;
        }
        done = true;

        // Only do job configs for now.
        var configTables = $('.job-config.tabbed');
        if (configTables.size() > 0) {
            var tabBarWidget = require('./widgets/config/tabbar.js');
            
            configTables.each(function() {
                var tabBar = tabBarWidget.addTabs($(this));
                tabBar.onShowSection(function() {
                    // Hook back into hudson-behavior.js
                    Event.fire(window, 'jenkins:bottom-sticker-adjust'); // jshint ignore:line
                });
            });
        }    
    });
});
