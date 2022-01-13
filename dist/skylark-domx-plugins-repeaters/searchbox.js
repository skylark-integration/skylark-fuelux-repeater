/**
 * skylark-domx-plugins-repeaters - The skylark repeater plugin library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx-plugins/skylark-domx-plugins-repeaters/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","./repeaters"],function(e,s,t,i,n,a,r,l){var h=r.Plugin.inherit({klassName:"SearchBox",pluginName:"lark.repeaters.searchbox",options:{clearOnEmpty:!1,searchOnKeyPress:!1,allowCancel:!1},_construct:function(s,t){this.overrided(s,t),this.$element=a(this._elm),this.$repeater=this.$element.closest(".repeater"),"true"===this.$element.attr("data-searchOnKeyPress")&&(this.options.searchOnKeyPress=!0),this.$button=this.$element.find("button"),this.$input=this.$element.find("input"),this.$icon=this.$element.find(".glyphicon, .fuelux-icon"),this.$button.on("click.lark.search",e.proxy(this.buttonclicked,this)),this.$input.on("keyup.lark.search",e.proxy(this.keypress,this)),this.$repeater.length>0&&this.$repeater.on("rendered.lark.repeater",e.proxy(this.clearPending,this)),this.activeSearch=""},_destroy:function(){return this.$element.remove(),this.$element.find("input").each(function(){a(this).attr("value",a(this).val())}),this.$element[0].outerHTML},search:function(e){this.$icon.hasClass("glyphicon")&&this.$icon.removeClass("glyphicon-search").addClass("glyphicon-remove"),this.$icon.hasClass("fuelux-icon")&&this.$icon.removeClass("fuelux-icon-search").addClass("fuelux-icon-remove"),this.activeSearch=e,this.$element.addClass("searched pending"),this.$element.trigger("searched.lark.search",e)},clear:function(){this.$icon.hasClass("glyphicon")&&this.$icon.removeClass("glyphicon-remove").addClass("glyphicon-search"),this.$icon.hasClass("fuelux-icon")&&this.$icon.removeClass("fuelux-icon-remove").addClass("fuelux-icon-search"),this.$element.hasClass("pending")&&this.$element.trigger("canceled.lark.search"),this.activeSearch="",this.$input.val(""),this.$element.trigger("cleared.lark.search"),this.$element.removeClass("searched pending")},clearPending:function(){this.$element.removeClass("pending")},action:function(){var e=this.$input.val();e&&e.length>0?this.search(e):this.clear()},buttonclicked:function(e){e.preventDefault(),a(e.currentTarget).is(".disabled, :disabled")||(this.$element.hasClass("pending")||this.$element.hasClass("searched")?this.clear():this.action())},keypress:function(e){13===e.which?(e.preventDefault(),this.action()):9===e.which?e.preventDefault():27===e.which?(e.preventDefault(),this.clear()):this.options.searchOnKeyPress&&this.action()},disable:function(){this.$element.addClass("disabled"),this.$input.attr("disabled","disabled"),this.options.allowCancel||this.$button.addClass("disabled")},enable:function(){this.$element.removeClass("disabled"),this.$input.removeAttr("disabled"),this.$button.removeClass("disabled")}});return r.register(h),l.SearchBox=h});
//# sourceMappingURL=sourcemaps/searchbox.js.map
