/*:
 * @plugindesc Replace currency unit display with icon
 * @author munokura
 *
 * @param Gold Icon
 * @text Currency icon ID
 * @type string
 * @desc Icon ID used for currency unit
 * @default 313
 *
 * @help
 * Replaces Currency Unit display with an icon.
 *
 * Terms of Use
 * Copyright from the author is waived.
 * License- Public Domain
 */

(function() {
	'use strict';

    var parameters = PluginManager.parameters('MNKR_GoldIcon');
	var goldIcon = parseInt(parameters['Gold Icon'] || 313);

	Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
		this.resetTextColor();
		this.drawText(value, x, y, width - 36 - 6, 'right');
		this.drawIcon(goldIcon, x + width - 36, y);
	};

})();