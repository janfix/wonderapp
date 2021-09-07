/*
Build by Wiquid's PCI Generator for TAO platform Free to use 
 */

define(['IMSGlobal/jquery_2_1_1',
    'OAT/util/html',
    'wonderpci/runtime/js/libs/konva.min'
], function($, html, Konva) {
    'use strict';

    function renderChoices(id, $container, config) {

        var json = config.stage;
        var KonvaContainer = $container.find(".KonvaContainer")[0];
        var stage = Konva.Node.create(json, KonvaContainer);
    }

    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config);

            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
        renderChoices: function(id, container, config) {
            renderChoices(id, $(container), config);
        }
    };
});