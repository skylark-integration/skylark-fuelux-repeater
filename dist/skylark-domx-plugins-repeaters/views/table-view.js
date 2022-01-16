/**
 * skylark-domx-plugins-repeaters - The skylark repeater plugin library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx-plugins/skylark-domx-plugins-repeaters/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-toggles/checkbox","../view-type-registry","./view-base"],function(t,e,s,i,n,a,o,r,l){var d=l.inherit({klassName:"TableView",options:{columnRendered:null,columnSizing:!0,columnSyncing:!0,highlightSortedColumn:!0,infiniteScroll:!1,noItemsHTML:"no items found",selectable:!0,sortClearing:!1,rowRendered:null,frozenColumns:0,actions:!1,viewClass:"repeater-table",tableWrapperClass:"repeater-table-wrapper",checkClass:"repeater-table-check",headingClass:"repeater-table-heading",actionsPlaceHolderClass:"repeater-table-actions-placeholder"},clearSelectedItems:function(){this.repeater.$canvas.find(`.${this.options.checkClass}`).remove(),this.repeater.$canvas.find(`.${this.options.viewClass} table tbody tr.selected`).removeClass("selected")},highlightColumn:function(t,e){var s=this.repeater.$canvas.find(`.${this.options.tableWrapperClass} > table tbody`);(this.options.highlightSortedColumn||e)&&(s.find("td.sorted").removeClass("sorted"),s.find("tr").each(function(){a(this).find("td:nth-child("+(t+1)+")").filter(function(){return!a(this).parent().hasClass("empty")}).addClass("sorted")}))},getSelectedItems:function(){var t=[];return this.repeater.$canvas.find(`.${this.options.viewClass} .${this.options.tableWrapperClass} > table tbody tr.selected`).each(function(){var e=a(this);t.push({data:e.data("item_data"),element:e})}),t},positionHeadings:function(){var t=this.repeater.$().find(`.${this.options.tableWrapperClass}`),e=t.offset().left;t.scrollLeft()>0?t.find(`.${this.options.headingClass}`).each(function(){var t=a(this),s=t.parents("th:first").offset().left-e+"px";t.addClass("shifted").css("left",s)}):t.find(`.${this.options.headingClass}`).each(function(){a(this).removeClass("shifted").css("left","")})},setSelectedItems:function(t,e){var s,i,n,o=this.options.selectable,r=this,l=t;a.isArray(l)||(l=[l]);var d=function(t){i=a(this),(i.data("item_data")||{})[l[s].property]===l[s].value&&c(i,l[s].selected,t)},c=function(t,s,i){var n;void 0===s||s?(e||"multi"===o||r.clearSelectedItems(),t.hasClass("selected")||(t.addClass("selected"),(r.options.frozenColumns||"multi"===r.options.selectable)&&((n=r.repeater.$().find(".frozen-column-wrapper tr:nth-child("+(i+1)+")")).addClass("selected"),n.find(".repeater-select-checkbox").addClass("checked")),r.options.actions&&r.repeater.$().find(".actions-column-wrapper tr:nth-child("+(i+1)+")").addClass("selected"),t.find("td:first").prepend(`<div class="${this.options.checkClass}"><span class="glyphicon glyphicon-ok"></span></div>`))):(r.options.frozenColumns&&((n=r.repeater.$().find(".frozen-column-wrapper tr:nth-child("+(i+1)+")")).addClass("selected"),n.find(".repeater-select-checkbox").removeClass("checked")),r.options.actions&&r.repeater.$().find(".actions-column-wrapper tr:nth-child("+(i+1)+")").removeClass("selected"),t.find(`.${this.options.checkClass}`).remove(),t.removeClass("selected"))};for(n=!0===e||"multi"===o?l.length:o&&l.length>0?1:0,s=0;s<n;s++)void 0!==l[s].index?(i=this.repeater.$canvas.find(`.${this.options.viewClass} .${this.options.tableWrapperClass} > table tbody tr:nth-child(`+(l[s].index+1)+")")).length>0&&c(i,l[s].selected,l[s].index):void 0!==l[s].property&&void 0!==l[s].value&&this.repeater.$canvas.find(`.${this.options.viewClass} .${this.options.tableWrapperClass} > table tbody tr`).each(d)},sizeHeadings:function(){var t=this;this.repeater.$().find(`.${this.options.viewClass} table`).find("thead th").each(function(){var e=a(this),s=e.find(`.${t.options.headingClass}`);s.css({height:e.outerHeight()}),s.outerWidth(s.data("forced-width")||e.outerWidth())})},setFrozenColumns:function(){var t=this.repeater.$canvas.find(".table-frozen"),e=this.repeater.$().find(".repeater-canvas"),s=this.repeater.$().find(`.${this.options.viewClass} .${this.options.tableWrapperClass} > table`),i=this.repeater.$().find(`.${this.options.viewClass}`),n=this.options.frozenColumns,o=this;if("multi"===this.options.selectable&&(n+=1,e.addClass("multi-select-enabled")),t.length<1){var r=a('<div class="frozen-column-wrapper"></div>').insertBefore(s),l=s.clone().addClass("table-frozen");l.find("th:not(:lt("+n+"))").remove(),l.find("td:not(:nth-child(n+0):nth-child(-n+"+n+"))").remove();var d=l.clone().removeClass("table-frozen");d.find("tbody").remove();var c=a('<div class="frozen-thead-wrapper"></div>').append(d),h=c.find("th label.checkbox-custom.checkbox-inline");h.attr("id",h.attr("id")+"_cloned"),r.append(l),i.append(c),this.repeater.$canvas.addClass("frozen-enabled")}this.sizeFrozenColumns(),a(`.frozen-thead-wrapper .${this.options.headingClass}`).on("click",function(){var t=a(this).parent("th").index();t+=1,o.repeater.$().find(`.${this.options.tableWrapperClass} > table thead th:nth-child(`+t+`) .${this.options.headingClass}`)[0].click()})},positionColumns:function(){var t=this.repeater.$().find(".repeater-canvas"),e=t.scrollTop(),s=t.scrollLeft(),i=this.options.frozenColumns||"multi"===this.options.selectable,n=this.options.actions,a=this.repeater.$().find(".repeater-canvas").outerWidth(),o=this.repeater.$().find(`.${this.options.viewClass} .${this.options.tableWrapperClass} > table`).outerWidth()-(a-(this.repeater.$().find(".table-actions")?this.repeater.$().find(".table-actions").outerWidth():0))>=s;e>0?t.find(`.${this.options.headingClass}`).css("top",e):t.find(`.${this.options.headingClass}`).css("top","0"),s>0?(i&&(t.find(".frozen-thead-wrapper").css("left",s),t.find(".frozen-column-wrapper").css("left",s)),n&&o&&(t.find(".actions-thead-wrapper").css("right",-s),t.find(".actions-column-wrapper").css("right",-s))):(i&&(t.find(".frozen-thead-wrapper").css("left","0"),t.find(".frozen-column-wrapper").css("left","0")),n&&(t.find(".actions-thead-wrapper").css("right","0"),t.find(".actions-column-wrapper").css("right","0")))},createItemActions:function(){var e,s="",i=this,n=this.repeater.$().find(`.${this.options.viewClass} .${this.options.tableWrapperClass} > table`),o=this.repeater.$canvas.find(".table-actions"),r=this.options.actions.items.length;if(1==r){var l=this.options.actions.items[0];if(s='<a href="javascript:void(0)" data-action="'+l.name+'" class="action-item"> '+l.html+"</a>",o.length<1){var d=a('<div class="actions-column-wrapper" style="width: '+this.options.actions.width+'px"></div>').insertBefore(n);(p=n.clone().addClass("table-actions")).find("th:not(:last-child)").remove(),p.find("tr td:not(:last-child)").remove(),p.find("td").each(function(e){var n=a(this).parent().attr("id"),o=a("#"+n).data("item_data");i.options.exceptActionRows&&o&&t.inArray(i.options.exceptActionRows,o.name)?a(this).html("-"):a(this).html(s),a(this).find("a").attr("data-row",e+1)})}}else{for(e=0;e<r;e++){var c=(l=this.options.actions.items[e]).html;s+='<li class="'+l.name+'"><a href="javascript:void(0)" data-action="'+l.name+'" class="action-item"> '+c+"</a></li>"}var h='<ul class="ul-inline list-unstyled ul-horizontally" role="menu">'+s+"</ul>";if(o.length<1){var p;d=a('<div class="actions-column-wrapper" style="width: '+this.options.actions.width+'px"></div>').insertBefore(n);if((p=n.clone().addClass("table-actions")).find("th:not(:last-child)").remove(),p.find("tr td:not(:last-child)").remove(),"multi"===this.options.selectable||"action"===this.options.selectable)p.find("thead tr").html('<th><div class="repeater-list-heading">'+h+"</div></th>"),"action"!==this.options.selectable&&p.find("thead .btn").attr("disabled","disabled");else{var f=this.options.actions.label||'<span class="actions-hidden">a</span>';p.find("thead tr").addClass("empty-heading").html("<th>"+f+'<div class="repeater-list-heading">'+f+"</div></th>")}p.find("td").each(function(t){a(this).html(h).addClass("r-list-action"),a(this).find("a").attr("data-row",t+1)})}}d.append(p),this.repeater.$canvas.addClass("actions-enabled"),this.sizeActionsTable(),this.repeater.$().find(".table-actions tbody .action-item").on("click",function(t){if(!i.isDisabled){var e={actionName:a(this).data("action"),rows:[a(this).data("row")]};i.getActionItems(e,t)}}),this.repeater.$().find(".table-actions thead .action-item").on("click",function(t){if(!i.isDisabled){var e={actionName:a(this).data("action"),rows:[]},s=`.${this.options.tableWrapperClass} > table .selected`;"action"===i.options.selectable&&(s=`.${this.options.tableWrapperClass} > table tr`),i.repeater.$().find(s).each(function(t){e.rows.push(t+1)}),i.getActionItems(e,t)}})},getActionItems:function(t,e){for(var s=[],i=a.grep(this.options.actions.items,function(e){return e.name===t.actionName})[0],n=0,o=t.rows.length;n<o;n++){var r=this.repeater.$canvas.find(`.${this.options.tableWrapperClass} > table tbody tr:nth-child(`+t.rows[n]+")");s.push({item:r,rowData:r.data("item_data")})}if(1===s.length&&(s=s[0]),i.clickAction){i.clickAction(s,function(){},e)}},sizeActionsTable:function(){var t=this.repeater.$().find(`.${this.options.viewClass} table.table-actions`),e=t.find("thead tr th"),s=this.repeater.$().find(`.${this.options.tableWrapperClass} > table`);e.outerHeight(s.find("thead tr th").outerHeight()),e.find(`.${this.options.headingClass}`).outerHeight(e.outerHeight()),t.find("tbody tr td:first-child").each(function(t){a(this).outerHeight(s.find("tbody tr:eq("+t+") td").outerHeight())})},sizeFrozenColumns:function(){var t=this.repeater.$().find(`.${this.options.viewClass} .${this.options.tableWrapperClass} > table`);this.repeater.$().find(`.${this.options.viewClass} table.table-frozen tr`).each(function(e){a(this).height(t.find("tr:eq("+e+")").height())});var e=t.find("td:eq(0)").outerWidth();this.repeater.$().find(".frozen-column-wrapper, .frozen-thead-wrapper").width(e)},frozenOptionsInitialize:function(){var t=this.repeater.$().find(".frozen-column-wrapper .checkbox-inline"),e=this.repeater.$().find(".header-checkbox .checkbox-custom"),s=this.repeater.$().find(`.${this.options.viewClass} table`),i=this;this.repeater.$().find("tr.selectable").on("mouseover mouseleave",function(t){var e=a(this).index();e+=1,"mouseover"===t.type?s.find("tbody tr:nth-child("+e+")").addClass("hovered"):s.find("tbody tr:nth-child("+e+")").removeClass("hovered")}),e.plugin("lark.toggles.checkbox"),t.plugin("lark.toggles.checkbox");var n=this.repeater.$().find(".table-frozen tbody .checkbox-inline"),o=this.repeater.$().find(".frozen-thead-wrapper thead .checkbox-inline input");function r(t){i.revertingCheckbox=!0,t.checkbox("toggle"),delete i.revertingCheckbox}n.on("change",function(t){if(t.preventDefault(),!i.revertingCheckbox)if(i.isDisabled)r(a(t.currentTarget));else{var e=a(this).attr("data-row");e=parseInt(e,10)+1,i.repeater.$().find(`.${this.options.tableWrapperClass} > table tbody tr:nth-child(`+e+")").click();var s=i.repeater.$().find(".table-frozen tbody .checkbox-inline.checked").length;0===s?(o.prop("checked",!1),o.prop("indeterminate",!1)):s===n.length?(o.prop("checked",!0),o.prop("indeterminate",!1)):(o.prop("checked",!1),o.prop("indeterminate",!0))}}),o.on("change",function(e){i.revertingCheckbox||(i.isDisabled?r(a(e.currentTarget)):a(this).is(":checked")?(i.repeater.$().find(`.${this.options.tableWrapperClass} > table tbody tr:not(.selected)`).click(),i.repeater.$().trigger("selected",t)):(i.repeater.$().find(`.${this.options.tableWrapperClass} > table tbody tr.selected`).click(),i.repeater.$().trigger("deselected",t)))})},cleared:function(){this.options.columnSyncing&&this.sizeHeadings()},dataOptions:function(t){return this.sortDirection&&(t.sortDirection=this.sortDirection),this.sortProperty&&(t.sortProperty=this.sortProperty),t},enabled:function(t){this.options.actions&&(t.status?(this.repeater.$canvas.find(".repeater-actions-button").removeAttr("disabled"),this.toggleActionsHeaderButton()):this.repeater.$canvas.find(".repeater-actions-button").attr("disabled","disabled"))},initialize:function(t,e){this.sortDirection=null,this.sortProperty=null,this.specialBrowserClass=this.specialBrowserClass(),this.actions_width=void 0!==this.options.actions.width?this.options.actions.width:37,this.noItems=!1,e()},resize:function(){this.sizeColumns(this.repeater.$().find(`.${this.options.tableWrapperClass} > table thead tr`)),this.options.actions&&this.sizeActionsTable(),(this.options.frozenColumns||"multi"===this.options.selectable)&&this.sizeFrozenColumns(),this.options.columnSyncing&&this.sizeHeadings()},selected:function(){var t,e=this.options.infiniteScroll;this.firstRender=!0,this.repeater.$loader.addClass("noHeader"),e&&(t="object"==typeof e?e:{},this.repeater.infiniteScrolling(!0,t))},before:function(t){var e,s=t.container.find(`.${this.options.viewClass}`),i=this;return t.data.count>0?this.noItems=!1:this.noItems=!0,s.length<1&&((s=a(`<div class="${this.options.viewClass} `+this.specialBrowserClass()+`" data-preserve="shallow"><div class="${this.options.tableWrapperClass}" data-infinite="true" data-preserve="shallow"><table aria-readonly="true" class="table" data-preserve="shallow" role="grid"></table></div></div>`)).find(`.${this.options.tableWrapperClass}`).on("scroll.lark.repeaterList",function(){i.options.columnSyncing&&i.positionHeadings()}),(i.options.frozenColumns||i.options.actions||"multi"===i.options.selectable)&&t.container.on("scroll.lark.repeaterList",function(){i.positionColumns()}),t.container.append(s)),t.container.removeClass("actions-enabled actions-enabled multi-select-enabled"),e=s.find("table"),this.renderThead(e,t.data),this.renderTbody(e,t.data),!1},renderItem:function(t){return this.renderRow(t.container,t.subset,t.index),!1},after:function(){var t;return!this.options.frozenColumns&&"multi"!==this.options.selectable||this.noItems||this.setFrozenColumns(),this.options.actions&&!this.noItems&&(this.createItemActions(),this.sizeActionsTable()),!this.options.frozenColumns&&!this.options.actions&&"multi"!==this.options.selectable||this.noItems||(this.positionColumns(),this.frozenOptionsInitialize()),this.options.columnSyncing&&(this.sizeHeadings(),this.positionHeadings()),(t=this.repeater.$canvas.find(`.${this.options.tableWrapperClass} > table .${this.options.headingClass}.sorted`)).length>0&&this.highlightColumn(t.data("fu_item_index")),!1},areDifferentColumns:function(t,e){if(!e)return!1;if(!t||e.length!==t.length)return!0;for(var s=0,i=e.length;s<i;s++){if(!t[s])return!0;for(var n in e[s])if(e[s].hasOwnProperty(n)&&t[s][n]!==e[s][n])return!0}return!1},renderColumn:function(t,e,s,i,n){var o=i[n].className,r=e[s][i[n].property],l=a("<td></td>"),d=i[n]._auto_width,c=i[n].property;if(!1!==this.options.actions&&"@_ACTIONS_@"===c&&(r=`<div class="${this.options.actionsPlaceHolderClass}" style="width: `+this.actions_width+'px"></div>'),r=void 0!==r?r:"",l.addClass(void 0!==o?o:"").append(r),void 0!==d&&l.outerWidth(d),t.append(l),"multi"===this.options.selectable&&"@_CHECKBOX_@"===i[n].property){var h='<label data-row="'+s+'" class="checkbox-custom checkbox-inline body-checkbox repeater-select-checkbox"><input class="sr-only" type="checkbox"></label>';l.html(h)}return l},renderHeader:function(t,e,s){var i,n,o,r,l,d="glyphicon-chevron-down",c="glyphicon-chevron-up",h=a(`<div class="${this.options.headingClass}"><span class="glyphicon rlc"></span></div>`),p=(this.repeater.$().attr("id")+"_"||"")+"checkall",f=`<div class="${this.options.headingClass} header-checkbox">`+'<label id="'+p+'" class="checkbox-custom checkbox-inline"><input class="sr-only" type="checkbox" value=""><span class="checkbox-label">&nbsp;</span></label></div>',u=a("<th></th>"),m=this;if(h.data("fu_item_index",s),h.prepend(e[s].label),u.html(h.html()).find("[id]").removeAttr("id"),"@_CHECKBOX_@"!==e[s].property?u.append(h):u.append(f),i=u.add(h),r=h.find(".glyphicon.rlc:first"),l=r.add(u.find(".glyphicon.rlc:first")),this.options.actions&&"@_ACTIONS_@"===e[s].property){var b=this.actions_width;u.css("width",b),h.css("width",b)}void 0!==(n=e[s].className)&&i.addClass(n),(o=e[s].sortable)&&(i.addClass("sortable"),h.on("click.lark.repeaterList",function(){m.isDisabled||(m.sortProperty="string"==typeof o?o:e[s].property,h.hasClass("sorted")?r.hasClass(c)?(l.removeClass(c).addClass(d),m.sortDirection="desc"):m.options.sortClearing?(i.removeClass("sorted"),l.removeClass(d),m.sortDirection=null,m.sortProperty=null):(l.removeClass(d).addClass(c),m.sortDirection="asc"):(t.find(`th, .${m.options.headingClass}`).removeClass("sorted"),l.removeClass(d).addClass(c),m.sortDirection="asc",i.addClass("sorted")),m.repeater.render({clearInfinite:!0,pageIncrement:null}))})),"asc"!==e[s].sortDirection&&"desc"!==e[s].sortDirection||(t.find(`th, .${this.options.headingClass}`).removeClass("sorted"),i.addClass("sortable sorted"),"asc"===e[s].sortDirection?(l.addClass(c),this.sortDirection="asc"):(l.addClass(d),this.sortDirection="desc"),this.sortProperty="string"==typeof o?o:e[s].property),t.append(u)},renderRow:function(t,e,s){var i=a("<tr></tr>");if(this.options.selectable&&(i.data("item_data",e[s]),"action"!==this.options.selectable)){i.addClass("selectable"),i.attr("tabindex",0);var n=this;i.on("click.lark.repeaterList",function(){(function(t){var e="multi"===t.options.selectable,s=t.options.actions,i=t.$();if(!t.isDisabled){var n=a(this),o=a(this).index()+1,r=i.find(".frozen-column-wrapper tr:nth-child("+o+")"),l=i.find(".actions-column-wrapper tr:nth-child("+o+")"),d=i.find(".frozen-column-wrapper tr:nth-child("+o+") .checkbox-inline");n.is(".selected")?(n.removeClass("selected"),e?(d.click(),r.removeClass("selected"),s&&l.removeClass("selected")):n.find(`.${this.options.checkClass}`).remove(),i.trigger("deselected.lark.repeaterList",n)):(e?(d.click(),n.addClass("selected"),r.addClass("selected"),s&&l.addClass("selected")):(t.$canvas.find(`.${this.options.checkClass}`).remove(),t.$canvas.find(`.${this.options.viewClass} tbody tr.selected`).each(function(){a(this).removeClass("selected"),i.trigger("deselected.lark.repeaterList",a(this))}),n.find("td:first").prepend(`<div class="${this.options.checkClass}"><span class="glyphicon glyphicon-ok"></span></div>`),n.addClass("selected"),r.addClass("selected")),i.trigger("selected.lark.repeaterList",n)),this.toggleActionsHeaderButton(t)}}).call(this,n)}),i.keyup(function(t){13===t.keyCode&&i.trigger("click.lark.repeaterList")})}this.options.actions&&!this.options.selectable&&i.data("item_data",e[s]);for(var o=[],r=0,l=this.columns.length;r<l;r++)o.push(this.renderColumn(i,e,s,this.columns,r));if(t.append(i),this.options.columnRendered)for(var d=0,c=o.length;d<c;d++)"@_CHECKBOX_@"!==this.columns[d].property&&"@_ACTIONS_@"!==this.columns[d].property&&this.options.columnRendered({container:i,columnAttr:this.columns[d].property,item:o[d],rowData:e[s]},function(){});this.options.rowRendered&&this.options.rowRendered({container:t,item:i,rowData:e[s]},function(){})},renderTbody:function(t,e){var s,i=t.find("tbody");i.length<1&&(i=a('<tbody data-container="true"></tbody>'),t.append(i)),"string"==typeof e.error&&e.error.length>0?((s=a('<tr class="empty text-danger"><td colspan="'+this.columns.length+'"></td></tr>')).find("td").append(e.error),i.append(s)):e.items&&e.items.length<1&&((s=a('<tr class="empty"><td colspan="'+this.columns.length+'"></td></tr>')).find("td").append(this.options.noItemsHTML),i.append(s))},renderThead:function(t,e){var s,i,n,o=e.columns||[],r=t.find("thead");if(this.firstRender||this.areDifferentColumns(this.columns,o)||0===r.length){if(r.remove(),"multi"===this.options.selectable&&!this.noItems){o.splice(0,0,{label:"c",property:"@_CHECKBOX_@",sortable:!1})}if(this.columns=o,this.firstRender=!1,this.repeater.$loader.removeClass("noHeader"),this.options.actions){var l={label:this.options.actions.label||'<span class="actions-hidden">a</span>',property:"@_ACTIONS_@",sortable:!1,width:this.actions_width};o.push(l)}for(n=(r=a('<thead data-preserve="deep"><tr></tr></thead>')).find("tr"),s=0,i=o.length;s<i;s++)this.renderHeader(n,o,s);if(t.prepend(r),"multi"===this.options.selectable&&!this.noItems){var d=this.repeater.$().find(`.${this.options.tableWrapperClass} .header-checkbox`).outerWidth();a.grep(o,function(t){return"@_CHECKBOX_@"===t.property})[0].width=d}this.sizeColumns(n)}},sizeColumns:function(t){var e,s,i,n,o=[],r=this;if(this.options.columnSizing&&(e=0,n=0,t.find("th").each(function(){var t,s=a(this);if(void 0!==r.columns[e].width)t=r.columns[e].width,s.outerWidth(t),n+=s.outerWidth(),r.columns[e]._auto_width=t;else{var i=s.find(`.${r.options.headingClass}`).outerWidth();o.push({col:s,index:e,minWidth:i})}e++}),(s=o.length)>0)){var l=this.repeater.$canvas.find(`.${this.options.tableWrapperClass}`).outerWidth();for(i=Math.floor((l-n)/s),e=0;e<s;e++)o[e].minWidth>i&&(i=o[e].minWidth),o[e].col.outerWidth(i),this.columns[o[e].index]._auto_width=i}},specialBrowserClass:function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE "),s=t.indexOf("Firefox");return e>0?"ie-"+parseInt(t.substring(e+5,t.indexOf(".",e)),10):s>0?"firefox":""},toggleActionsHeaderButton:function(){var t=`.${this.options.tableWrapperClass} > table .selected`,e=this.repeater.$().find(".table-actions");"action"===this.options.selectable&&(t=`.${this.options.tableWrapperClass} > table tr`),this.repeater.$canvas.find(t).length>0?e.find("thead .btn").removeAttr("disabled"):e.find("thead .btn").attr("disabled","disabled")}});return r.table={name:"table",ctor:d},d});
//# sourceMappingURL=../sourcemaps/views/table-view.js.map
