/*
Ciudad		        -> city
			        -> multi_city_vicinity
			        -> province_state
			        -> country
			        -> continent

Hotel		        -> Hotel

Aeropuertos	        -> airpot

Puntos de interes 	-> point_of_interest
			        -> metro_station
			        -> train_station

Zonas			    -> neigborhood 
			        -> high_level_region
*/

var staticContentAutocomplete = (function () {

    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match;
            });
        };
    }

    function split(val) {
        return val.split(/,\s*/);
    }
    function extractLast(term) {
        return split(term).pop();
    }




    function LoadNetsuiteAutocomplete(
        moduleId,
        inputid,
        optionsElementId,
        userservices,
        destinationType,
        destinationId,
        lang,
        options = {}) {
        
       
        
        /*$('#' + inputid).on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })*/
        var autocompleteHotelObjects = "";
        var autocompleteLocationItems = "";
        var arrayCategoryLocation       =  {"city":"Ciudad", "multi_city_vicinity":"Ciudad", "province_state":"Ciudad", "country":"Ciudad", "continent":"Ciudad",
                                            "airport":"Aeropuertos",
                                            "point_of_interest":"Puntos de Interes","metro_station":"Puntos de Interes","train_station":"Puntos de Interes",
                                            "neighborhood":"Zonas","high_level_region":"Zonas",}
        var $uiautcompleteStaticContent = $('#' + inputid).autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.getJSON(json_settings.ProductUrl+"/NetCoreapi/AutocompleteDestinationStaticContent?searchCriteria=" + request.term + "&userServices=" + userservices + "&lang=" + lang,
                    function (responseData) {
                        var data = [];
                        autocompleteHotelObjects = responseData.Hotels.filter(h => h.hotel_name).map((hotel) => {
                                return {
                                    'name': hotel.hotel_name,
                                    'subtitle': (typeof hotel.address == "undefined" ? "" : hotel.address),
                                    'type': 'hotel',
                                    'id': hotel.Id,
                                    'category':"Hotel"
                                }
                            });
                        
                        autocompleteLocationItems = responseData.Locations.map((location) => {
                                
                                return {
                                    'name': location.Name,
                                    'subtitle': (typeof location.NameFull == "undefined" ? "" : location.NameFull),
                                    'type': location.Type,
                                    'id': location.Id,
                                    'category': arrayCategoryLocation[location.Type]
                                }

                        });


                        var autocompleteObjectsSinOrganizar       = autocompleteLocationItems.concat(autocompleteHotelObjects);
                        var ordenArrayStaticContent               = ["Ciudad","Hotel","Aeropuertos","Puntos de interes","Zonas"]
                        var ordenArrayStaticContentSubGroup       = ["multi_city_vicinity","city","hotel","province_state", "country", "continent","airport","point_of_interest","metro_station","train_station","neighborhood","high_level_region"]

                        var autocompleteObjects = [];

                        ordenArrayStaticContent.forEach((elem1, i) => 
                        {
                            ordenArrayStaticContentSubGroup.forEach((elem2, i) =>
                            {
                                //if(elem2 != "multi_city_vicinity"){
                                    autocompleteObjectsSinOrganizar.forEach((elem3, i) =>
                                    {
                                        if (elem3.category == elem1 && elem3.type == elem2)
                                        {
                                            autocompleteObjects.push(elem3);
                                        }
                                    });
                                //}

                            });
                        });


                        


                        autocompleteObjects.map((item) => {
                            var icon = '';
                            var iconType = '';
                            if (item.category == 'Hotel') {
                                icon        = '<span class="icon-hotel"></span>';
                                iconType    = 'hotel'
                            }
                            else if(item.category == 'Ciudad'){
                                icon        = '<span class="icon-destino"></span>';
                                iconType    = 'ciudad'
                            }
                            else if(item.category == 'Aeropuertos'){
                                icon        = '<span class="icon-avion"></span>';
                                iconType    = 'aeropuertos'
                            }
                            else if(item.category == 'Puntos de interes'){
                                icon        = '<span class="puntos-de-interes"></span>';
                                iconType    = 'puntos-de-interes'
                            }
                            else if(item.category == 'Zonas'){
                                icon        = '<span class="icon-circuitos"></span>';
                                iconType    = 'zonas'
                            }
                            else {
                                icon        = '<span class="icon-circuitos"></span>';
                                iconType    = 'location'
                            }
                            
                            item.icon=icon;
                            item.iconType=iconType;
                            data.push(item);
                        })
                        response(data)
                    });
            },
            focus: function (event, ui) {
                //$('#' + inputid).val(ui.item.label);
                return false;
            },
            search: function () {
                // custom minLength
        
            },
            select: function (event, ui) {
                var itemId   = ui.item.id
                var itemName = ui.item.subtitle
                var itemType = ui.item.type
                
                if(itemType == 'hotel'){
                    itemName = ui.item.name
                }

                selectOption(itemName, itemType, itemId, inputid, optionsElementId,moduleId);

                return false;
            },
            
        }).data("ui-autocomplete")


       $('#' + inputid).autocomplete("widget").css({ "max-height": "280px", "overflow-y": "auto", "overflow-x": "hidden"});
        $uiautcompleteStaticContent._renderItem = function (ul, item, index) {
                ul.addClass("netsuiteautocomplete");

                return $('<li item-id="'+item.id+'" item-name="'+item.name+'" item-type="'+item.type+'" input-id="'+inputid+'" item-search="'+item.iconType+'"></li>')
                                .data("item.autocomplete", item)
                                .append("<a><table style='margin-bottom: 0 !important; border-radius: 1px;'><td width='30px' valign='middle' style='padding: 2px 0 2px 0 !important'>" + item.icon + "</td><td valign='' align='left' style='padding: 0 !important'>" + item.name + "<br><span class='nts-text-secondary'>" + item.subtitle + "</span></td></tr></table></a>")
                                .appendTo(ul);



            };
    }

    function selectOption(name, destinationtype, destinationid, inputid, optionsElementsId,moduleId) {   
        
        $('#' + inputid).attr("destinationtype", destinationtype == "hotel" ? "hotelid" : "location");
        $('#' + inputid).attr("destinationid", destinationid);
        $('#' + inputid).val(name);
    }

    return {
        LoadNetsuiteAutocomplete
    }

})()