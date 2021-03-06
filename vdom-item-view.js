'use strict';

var Marionette = require('backbone.marionette');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var convertHTML = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext')
});

module.exports = Marionette.ItemView.extend({
  attachElContent: function(html) {
    if (this.virtualEl) {
      var newVirtualEl = convertHTML(html.trim());
      var patches = diff(this.virtualEl, newVirtualEl);
      this.rootEl = patch(this.rootEl, patches);
      this.virtualEl = newVirtualEl;
    }
    else {
      this.virtualEl = convertHTML(html.trim());
      this.rootEl = createElement(this.virtualEl);
      this.$el.html(this.rootEl);
    }

    return this;
  },

  remove: function() {
    this.virtualEl = null;
    this.rootEl = null;
    Marionette.ItemView.prototype.remove.apply(this, arguments);
  }

});
