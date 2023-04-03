/**
 * jQuery.AutoComplete - Transforma cualquier input en un AutoComplete.
 * Valores posibles: Airlines, Airports, Cities, Countries.
 * Copyright (c) 2012 Diego Mantelli - dmantelli(at)gmail(dot)com
 * Desarrollado para Netactica S.A.
 * Fecha: 10/07/2012
 * @author Diego Mantelli
 * @version 1.4
 * Ultima Modificacion: 18/03/2013
 */

(function ($) {
    var defaultOptions = {
        type: 'Airlines',
        showIcon: false,
        showExcluded: false,
        scrollable: true,
        onSelect: function () {
            jQuery("#"+this.elementId).siblings(".bVErrMsgContainer").remove()
		    jQuery("#"+this.elementId).removeClass("bvalidator_invalid")
        }
    };

    var normalize = function (term) {
        var ret = "";
        for (var i = 0; i < term.length; i++) {
            ret += $accentMap[term.charAt(i)] || term.charAt(i);
        }
        return ret;
    }

    var _getExternalFileKey = function (type, isNormalized, options) {
        if (!options.dataSupplier) {
            return "external_file_" + type + (isNormalized ? "_norm" : "");
        }

        var elementIdSplitted = options.elementId.split('_');
        return 'dataSupplier_' + elementIdSplitted[elementIdSplitted.length - 1] + (isNormalized ? "_norm" : "");
    }

    var _getDataExternalFileWithType = function (type, isNormalized, options) {
        var externalFileKey = _getExternalFileKey(type, isNormalized, options);
        return window[externalFileKey];
    }

    var _setDataExternalFileWithType = function (type, isNormalized, data, options) {
        var externalFileKey = _getExternalFileKey(type, isNormalized, options);
        window[externalFileKey] = data;
        return window[externalFileKey];
    }

    var _isNeighborhood = function (type) {
        return type === "Neighborhood";
    }

    var _createExternalFileWithTypeNormalized = function (type, options) {
        var isNeighborhood = _isNeighborhood(type);
        var items = null;
        var matches_ori = _getDataExternalFileWithType(type, false, options) || [];

        if (type == 'Cities' && typeof (external_file_cities_duplicate) != "undefined") {
            // Add cities duplicates
            try {
                items = $.merge(matches_ori, window["external_file_cities_duplicate"]);
            }
            catch (err) { items = matches_ori; }
        } else {
            items = matches_ori;
        }

        items = items || [];

        if (!isNeighborhood && !_getDataExternalFileWithType(type, true, options)) {
            var arrExternalFileWithTypeNormalized = [];
            for (var i = 0; i < items.length; i++) {
                var tag = items[i];
                var newTag = null;
                var hasExclude = tag.indexOf("|E") !== -1;
                if (hasExclude) {
                    if (options.showExcluded) {
                        newTag = tag.replace("|E", "");
                    }
                    else {
                        continue;
                    }
                }
                else {
                    newTag = tag;
                }

                var code = undefined;

                var indexOfOpenParenthesis = newTag.indexOf('(');
                if (indexOfOpenParenthesis !== -1) {
                    code = normalize(newTag.substring(indexOfOpenParenthesis + 1, newTag.length - 1)).toUpperCase();
                }

                var indexOfComma = newTag.indexOf(",");
                if (indexOfComma !== -1) {
                    newTag = newTag.substring(0, indexOfComma);
                }

                arrExternalFileWithTypeNormalized.push({
                    desc: normalize(newTag).toUpperCase(),
                    code: code,
                    indexOfExternalFile: i,
                    hasExclude
                });
            };

            return _setDataExternalFileWithType(type, true, arrExternalFileWithTypeNormalized, options);
        }

        //Si es de tipo Neighborhood tengo que fijarme que la ciudad NO este excluida
        if (isNeighborhood && !_getDataExternalFileWithType(type, true, options)) {
            var arrExternalFileWithTypeNormalized = [];
            _createExternalFileWithTypeNormalized("Airports", options);
            var citiesEnum = Enumerable.from(_createExternalFileWithTypeNormalized("Cities", options));

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var cityItem = citiesEnum.firstOrDefault(function (city) {
                    return city.code === item.City;
                });

                if (!cityItem || (!options.showExcluded && cityItem.hasExclude)) {
                    continue;
                }

                arrExternalFileWithTypeNormalized.push({
                    desc: normalize(item.Desc).toUpperCase(),
                    code: cityItem.code, //Pongo el Codigo de la ciudad
                    id: item.Code,
                    indexOfExternalFile: i,
                    hasExclude: cityItem.hasExclude
                });
            };

            return _setDataExternalFileWithType(type, true, arrExternalFileWithTypeNormalized, options);
        }

        return _getDataExternalFileWithType(type, true, options);
    }

    var _createNetAutocompleteSearchMethod = function (type, options) {
        var isNeighborhood = _isNeighborhood(type);
        //Definicion de funciones de busqueda
        var netAutocompleteSearchMethodCommonKey = "NetAutocompleteSearchMethodCommon";
        if (!isNeighborhood) {
            if (!window[netAutocompleteSearchMethodCommonKey]) {
                //Funcion de busqueda general en el array de datos de autocomplete
                window[netAutocompleteSearchMethodCommonKey] = function (searchOptions) {
                    var normalizedTerm = searchOptions.normalizedTerm;
                    var normalizedTermUpperCase = searchOptions.normalizedTermUpperCase;
                    var type = searchOptions.type;

                    var result = [];
                    var indexOfExistingCode = -1;

                    var findByCode = normalizedTerm.length === 3;
                    var items = _getDataExternalFileWithType(type, false, options);
                    var itemsNormalized = _getDataExternalFileWithType(type, true, options);
                    for (var i = 0; i < itemsNormalized.length; i++) {
                        var itemNorm = itemsNormalized[i];
                        var itemMatch = (findByCode ? (itemNorm.code.indexOf(normalizedTermUpperCase) !== -1) : false);
                        var hasCodeMatch = false;
                        if (itemMatch) {
                            hasCodeMatch = true;
                            indexOfExistingCode++;
                        }
                        else {
                            itemMatch = itemNorm.desc.indexOf(normalizedTermUpperCase) !== -1;
                        }

                        if (itemMatch) {
                            var item = items[itemNorm.indexOfExternalFile];
                            var isItemAnObject = typeof item === 'object';
                            var desc = isItemAnObject ? item.Desc : item;
                            var itemToPush = {
                                desc: itemNorm.hasExclude ? desc.replace("|E", "") : desc,
                                type: type,
                                code: itemNorm.code
                            };

                            if (isItemAnObject) {
                                itemToPush.id = itemNorm.id;
                            }

                            if (hasCodeMatch) {
                                result.splice(indexOfExistingCode, 0, itemToPush);
                            }
                            else {
                                result.push(itemToPush);
                            }
                        }
                    }

                    return result;
                };
            }

            return window[netAutocompleteSearchMethodCommonKey];
        }

        //Funcion de busqueda de Zonas en el array de datos de autocomplete
        var netAutocompleteSearchMethodNeighborhoodKey = "NetAutocompleteSearchMethodNeighborhood";
        if (!window[netAutocompleteSearchMethodNeighborhoodKey]) {
            window[netAutocompleteSearchMethodNeighborhoodKey] = function (searchOptions) {
                var normalizedTerm = searchOptions.normalizedTerm;
                var normalizedTermUpperCase = searchOptions.normalizedTermUpperCase;

                var results = [];

                //Creo el metodo de busqueda comun por las dudas que no se encuentre creado
                var commonSearchMethod = _createNetAutocompleteSearchMethod("ALL", options);
                var searchTypes = ["Airports", "Cities", "Neighborhood"];
                for (var i = 0; i < searchTypes.length; i++) {
                    var searchType = searchTypes[i];
                    var searchResults = commonSearchMethod({
                        normalizedTerm: normalizedTerm,
                        normalizedTermUpperCase: normalizedTermUpperCase,
                        type: searchType
                    });

                    if (searchResults) {
                        for (var j = 0; j < searchResults.length; j++) {
                            results.push(searchResults[j]);
                        }
                    }
                }

                return results;
            };
        }

        return window[netAutocompleteSearchMethodNeighborhoodKey];
    }

    var methods = {
        init: function (options) {
            var translationsStr = this.attr('translations');
            var translations;
            if (translationsStr) {
                translations = JSON.parse(translationsStr);
            }

            if (options && typeof (options) == 'object') {
                options = $.extend({}, defaultOptions, options);
            };

            if ($(this).length > 0) {
                options.elementId = $(this)[0].id;

                _createExternalFileWithTypeNormalized(options.type, options);
                var searchMethod = _createNetAutocompleteSearchMethod(options.type, options);
                var $uiautcomplete = $(this).autocomplete({
                    source: function (request, response) {
                        var self = this;
                        if (self.renderItemsTimeoutId) {
                            clearTimeout(self.renderItemsTimeoutId);
                            delete self.renderItemsTimeoutId;
                        }

                        var normalizedTerm = normalize(request.term);
                        var result = searchMethod({
                            normalizedTerm: normalizedTerm,
                            normalizedTermUpperCase: normalizedTerm.toUpperCase(),
                            type: options.type
                        });

                        response(result);
                    },
                    autoFocus: true,
                    select: function (event, ui) {
                        if (ui.item.label) {
                            ui.item.value = ui.item.label;
                            return;
                        }

                        $(this).netautocomplete('setSelectedInfo', {
                            type: ui.item.type,
                            desc: ui.item.desc,
                            code: ui.item.code,
                            id: ui.item.id
                        });
                        ui.item.value = ui.item.desc;
                    },
                    delay: 0
                }).data("ui-autocomplete");
                
                $uiautcomplete._renderItem = function (ul, item) {
                    

                    var type = options.type;
                    var desc = item.value || item.desc;
                    var code = item.code,
                        isNeighborhood = (type === "Neighborhood");
                    if (!isNeighborhood && !item.label) {
                        item.label = desc;
                    }

                    if (type == "AirportsCities") {
                        // si hay guión (-) es una ciudad
                        if (desc.substring(desc.indexOf('(') + 1, desc.indexOf(')') + 1).indexOf('-') < 0) {
                            item.description = "";
                            if (desc.substring(0, desc.indexOf('|') + 1).length > 0) {
                                item.description = desc.substring(0, desc.indexOf('|'));
                                item.label = item.label.substring(item.label.indexOf("|") + 1, item.label.length);
                            }

                            //var urlIcon = window.location.origin + "/DesktopModules/MVC/SearchForm2/Images/marker.png";
                            var urlIcon = "<span class='icon-destino'></span>"
                            return $('<li class="ui-menu-item"></li>')
                                .data("item.autocomplete", item)
                                .append("<a><table style='margin-bottom: 0 !important; border-radius: 1px;'><td width='30px' valign='middle' style='padding: 2px 0 2px 0 !important'>" + urlIcon + "</td><td valign='' align='left' style='padding: 0 !important'>" + item.label + "<br><span class='nts-text-secondary'>" + item.description + "</span></td></tr></table></a>")
                                .appendTo(ul);
                        }
                        else {
                            item.label = item.label.substring(item.label.indexOf("|") + 1, item.label.length);
                            item.label = item.label.substring(0, item.label.indexOf("(") + 1) + item.label.substring(item.label.indexOf("-") + 1, item.label.length);

                            var urlIcon = "<span class='icon-ida-regreso'></span>";
                            return $('<li class="ui-menu-item"></li>')
                                .data("item.autocomplete", item)
                                .append("<a><table style='margin-bottom: 0 !important; border-radius: 1px;'><td width='30px' valign='middle' style='padding: 2px 0 2px 0 !important'>" + urlIcon + "</td><td valign='' align='left' style='padding: 0 !important'>" + item.label + "<br><span class='nts-text-secondary'></span></td></tr></table></a>")
                                .appendTo(ul);
                        }
                    }

                    else if (isNeighborhood) {

                        var neighborhoodTypeTranslated = item.type;
                        switch (item.type) {
                            case "Airports":
                                neighborhoodTypeTranslated = "Aeropuerto";
                                break;

                            case "Cities":
                                neighborhoodTypeTranslated = "Ciudad";
                                break;

                            case "Neighborhood":
                                neighborhoodTypeTranslated = "Zona";
                                break;
                        }

                        return $('<li class="ui-menu-item"></li>')
                            .data("item.autocomplete", item)
                            .append("<a style='display: flex; flex-direction: row;'><div style='flex: 0 1 350px;'>" + desc + "</div><div style='text-align: center;flex: 1 1 auto;display: flex;'><div style='flex: 0 1 170px;'>" + neighborhoodTypeTranslated + "</div></div></a>")
                            .appendTo(ul);
                    }
                    else {
                        return $("<li></li>")
                            .data("item.autocomplete", item)
                            .append("<a><table style='margin-bottom: 0 !important; border-radius: 1px;'><td width='30px' valign='middle' style='padding: 2px 0 2px 0 !important'><span class='icon-destino'></span></td><td valign='' align='left' style='padding: 0 !important'>" + item.label + "</td></tr></table></a>")
                            .appendTo(ul);
                    }
                };

                $uiautcomplete._renderMenu = function (ul, items) {
                    var self = this;
                    var itemsChunk = items.splice(0, 100);

                    for (var i = 0; i < itemsChunk.length; i++) {
                        var item = itemsChunk[i];
                        self._renderItemData(ul, item);
                    }

                    if (items.length > 0) {
                        self.renderItemsTimeoutId = setTimeout(function () {
                            self._renderMenu.call(self, ul, items);
                        }, 100);
                    }
                    else {
                        if (self.renderItemsTimeoutId) {
                            delete self.renderItemsTimeoutId;
                        }
                    }
                };

                if (typeof options.onSelect == 'function') {
                    $(this).bind("autocompleteselect", function (event, ui) {
                        
                        setTimeout(function () {
                            //console.log(event.target.id);
                            options.onSelect();
                           
                            //$("#"+event.target.id).siblings(".bVErrMsgContainer").remove();
                            //$("#"+event.target.id).removeClass("bvalidator_invalid")
                        }, 10);
                        /*$(this).bind("click",function(event, ui){
                            //$("#netactica_booking_form").data('bValidator').validate();
                        })*/
                    });

                }

                if (options.scrollable)
                    $(this).autocomplete("widget").addClass("netsuiteautocomplete")
                    $(this).autocomplete("widget").css({ "max-height": "150px", "overflow-y": "auto", "overflow-x": "hidden" });

            }
        },

        change: function (options) {
            
            $(this).autocomplete("destroy");
            $(window).unbind('.netautocomplete');

            if (options && typeof (options) == 'object') {
                options = $.extend({}, defaultOptions, options);
            };

            $(this).netautocomplete(options);
        },

        setSelectedInfo: function (info) {
            var dataId = $(this).attr('data-id');
            if (dataId) {
                $("#" + dataId).data('selectedInfo', info);
            }
            $(this).data('selectedInfo', info);
        },

        getSelectedInfo: function () {
            return $(this).data('selectedInfo');
        },

        getCode: function () {
            var selectedInfo = $(this).netautocomplete("getSelectedInfo");
            if (selectedInfo) {
                return selectedInfo.code;
            }

            if ($(this).val() != "" && $(this).val().indexOf("(") >= 0 && $(this).val().indexOf(")") > 0) {
                return $(this).val().substr($(this).val().indexOf('(') + 1).replace(")", "");
                debugger
            }

            return "";
        },
        getType: function () {
            var selectedInfo = $(this).netautocomplete("getSelectedInfo");
            if (selectedInfo) {
                return selectedInfo.type;
            }
            return "";
        },
        getId: function () {
            var selectedInfo = $(this).netautocomplete("getSelectedInfo");
            if (selectedInfo) {
                return selectedInfo.id;
            }
            return "";
        }
    };

    $.fn.netautocomplete = function (method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };
})(jQuery);