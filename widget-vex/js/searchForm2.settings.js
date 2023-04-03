$(document).ready(function () {
    
    $('#tabs-ProducSettings').dnnTabs();
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function () {
        dnnEditBasicSettings();
        $('#tabs-ProducSettings').dnnTabs();
    });

    $("input[id='txtAirDepartureCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtAirArrivalCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtHotelCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtHotelCityCode']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtExtraCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtAirHotelDepartureCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtAirHotelArrivalCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtBusHotelDepartureCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtBusHotelArrivalCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtAirCarDepartureCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    $("input[id='txtAirCarArrivalCity']").netautocomplete('init', { type: "Cities", showExcluded: false });
    
    loadProduct('Air', true); 
    loadProduct('Hotel', true);
    loadProduct('Car', true);
    loadProduct('Extra', true);
    loadProduct('AirHotel', true);
    loadProduct('Bus', true);
    loadProduct('BusHotel', true);
    loadProduct('AirCar', true);

    // se inicializan los divs donde se validan el ingreso de ciudades y hoteles
    $("div[id='divAirDepartureCities']").bValidator();
    $("div[id='divAirArrivalCities']").bValidator();
    $("div[id='divHotelCities']").bValidator();
    $("div[id='divHotelHotels']").bValidator();
    $("div[id='divExtraCities']").bValidator();
    $("div[id='divAirHotelDepartureCities']").bValidator();
    $("div[id='divAirHotelArrivalCities']").bValidator();
    $("div[id='divBusHotelDepartureCities']").bValidator();
    $("div[id='divBusHotelArrivalCities']").bValidator();
    $("div[id='divAirCarDepartureCities']").bValidator();
    $("div[id='divAirCarArrivalCities']").bValidator();
    
    initProductSort();
});

function loadProduct(prod, isInit) {
    
    var cities, hotels;
    var productEnabled = $("input[id='" + prod + "Product_Enabled']")[0];

    if (productEnabled.checked) {
        $("input[id='" + prod + "ProductDefault']").prop('disabled', false);
        
        if (!isInit)
            addSortProduct(prod);
    } else {
        $("input[id='" + prod + "ProductDefault']").prop('checked', false);
        $("input[id='" + prod + "ProductDefault']").prop('disabled', true);

        $("input[id='" + prod + "Product_ProductOption']:eq(0)").prop('checked', true);
        $("input[id='" + prod + "Product_ProductOption']:eq(0)").next().prop("class", "dnnRadiobutton dnnRadiobutton-checked");
        $("input[id='" + prod + "Product_ProductOption']:eq(1)").next().prop("class", "dnnRadiobutton");


        if (!isInit)
            deleteSortProduct(prod);
    }

    switch (prod) {
        case 'Air':
            if (productEnabled.checked) {
                $("div[id='divAirProductOption']").show();

                cities = $("input[id='AirProduct_Cities']").val();

                if (cities != "") {
                    showHideProductOption(prod, 'CityCodes');
                } else {
                    showHideProductOption(prod, 'AutoComplete');
                }
            } else {
                showHideProductOption(prod, 'AutoComplete');
                $("div[id='divAirProductOption']").hide();
            }
            break;
        case 'Hotel':
            if (productEnabled.checked) {
                $("div[id='divHotelProductOption']").show();

                cities = $("input[id='HotelProduct_Cities']").val();
                hotels = $("input[id='HotelProduct_Hotels']").val();

                if (cities == "" && hotels == "") {
                    showHideProductOption(prod, 'AutoComplete');
                } else {
                    if (cities != "") {
                        showHideProductOption(prod, 'CityCodes');
                    } else {
                        showHideProductOption(prod, 'HotelCodes');
                    }
                }
            } else {
                showHideProductOption(prod, 'AutoComplete');
                $("div[id='divHotelProductOption']").hide();
            }
            break;
        case 'Car':
            if (productEnabled.checked) {
                $("div[id='divCarProductOption']").show();
            } else {
                $("div[id='divCarProductOption']").hide();
            }
            break;
        case 'Extra':
            if (productEnabled.checked) {
                $("div[id='divExtraProductOption']").show();
                $("div[id='divExtraSettings']").show();
                
                if ($("input[id='ExtraProduct_ExtraView']")[0].checked) {
                    showHideExtraTypes(true);
                } else {
                    showHideExtraTypes(false);
                }

                cities = $("input[id='ExtraProduct_Cities']").val();

                if (cities != "") {
                    showHideProductOption(prod, 'CityCodes');
                } else {
                    showHideProductOption(prod, 'AutoComplete');
                }
            } else {
                showHideProductOption(prod, 'AutoComplete');
                $("div[id='divExtraProductOption']").hide();
                $("div[id='divExtraSettings']").hide();
            }
            break;
        case 'AirHotel':
            if (productEnabled.checked) {
                
                $("div[id='divAirHotelProductOption']").show();
                $("div[id='divAirHotelSettings']").show();

                cities = $("input[id='AirHotelProduct_Cities']").val();

                if (cities != "") {
                    showHideProductOption(prod, 'CityCodes');
                } else {
                    showHideProductOption(prod, 'AutoComplete');
                }
            } else {
                showHideProductOption(prod, 'AutoComplete');
                $("div[id='divAirHotelProductOption']").hide();
                $("div[id='divAirHotelSettings']").hide();
            }
            break;
        case 'Bus':
            if (productEnabled.checked) {
                $("div[id='divBusProductOption']").show();
            } else {
                $("div[id='divBusProductOption']").hide();
            }
            break;
        case 'BusHotel':
            if (productEnabled.checked) {
                $("div[id='divBusHotelProductOption']").show();
                $("div[id='divBusHotelSettings']").show();

                cities = $("input[id='BusHotelProduct_Cities']").val();

                if (cities != "") {
                    showHideProductOption(prod, 'CityCodes');
                } else {
                    showHideProductOption(prod, 'AutoComplete');
                }
            } else {
                showHideProductOption(prod, 'AutoComplete');
                $("div[id='divBusHotelProductOption']").hide();
                $("div[id='divBusHotelSettings']").hide();
            }
            break;
        case 'AirCar':
            if (productEnabled.checked) {
                $("div[id='divAirCarProductOption']").show();

                cities = $("input[id='AirCarProduct_Cities']").val();

                if (cities != "") {
                    showHideProductOption(prod, 'CityCodes');
                } else {
                    showHideProductOption(prod, 'AutoComplete');
                }
            } else {
                showHideProductOption(prod, 'AutoComplete');
                $("div[id='divAirCarProductOption']").hide();
            }
            break;
    }
}

function showHideProductOption(prod, type) {
    
    switch (type) {
        case "AutoComplete":

            $("div[id='div" + prod + "Cities']").hide();
            $("div[id='div" + prod + "Hotels']").hide();
            
            if (prod == "Hotel" || prod == "Extra")
                deleteAllCityList(prod, null);

            if (prod == "Hotel")
                deleteAllHotelList(prod);

            if (prod == "Air" || prod == "AirHotel" || prod == "BusHotel" || prod == "AirCar") {
                deleteAllCityList(prod, "Departure");
                deleteAllCityList(prod, "Arrival");
            }

            break;
        case "CityCodes":

            $("div[id='div" + prod + "Cities']").show();
            $("div[id='div" + prod + "Hotels']").hide();

            if (prod == "Hotel")
                deleteAllHotelList(prod, null);

            if (prod == "Air" || prod == "AirHotel" || prod == "BusHotel" || prod == "AirCar") {
                activeAllCityList(prod, "Departure");
                activeAllCityList(prod, "Arrival");
            }

            if (prod == "Hotel" || prod == "Extra")
                activeAllCityList(prod, null);

            break;
        case "HotelCodes":

            $("div[id='div" + prod + "Cities']").hide();
            $("div[id='div" + prod + "Hotels']").show();

            if (prod == "Hotel" || prod == "Extra")
                deleteAllCityList(prod, null);
            
            if (prod == "Air" || prod == "AirHotel" || prod == "BusHotel" || prod == "AirCar") {
                deleteAllCityList(prod, "Departure");
                deleteAllCityList(prod, "Arrival");
            }

            if (prod == "Hotel")
                activeAllHotelList(prod, null);

            break;
    }
}

function activeAllCityList(prod, type) {
    
    var cities = eval($("input[id='" + prod + "Product_Cities']").val());
    var prodDivName = (prod == "Air" || prod == "AirHotel" || prod == "BusHotel" || prod == "AirCar") ? prod + type : prod;
    
    if (cities != undefined) {

        // se agregan los items al listado
        cities.forEach(function (item) {
            if (type == item.Type) {
                $("div[id='div" + prodDivName + "AssociatedCities']").append("<span id=\"city-" + getIATACode(item.City) + "\" class=\"spanList\">" + item.City + "&nbsp;&nbsp;<input type=\"image\" src=\"/DesktopModules/MVC/SearchForm2/Images/delete.png\" onclick=\"deleteCityList('" + item.City + "', '" + prod + "','" + type + "'); return false;\" /><br /></span>");

                // Si se habia puesto en Remove, se actualiza a NA
                if (item.Id > 0 && item.ActionType == "Remove") {
                    cities = updateListCode(cities, item.Id, "NA")
                }
            }
        });

        // se actualiza el hidden
        if (cities.length > 0) {
            $("input[id='" + prod + "Product_Cities']").val(convertJson2string(cities));
        }

        $("div[id='div" + prod + "AssociatedCities']").show();
    }
}

function activeAllHotelList(prod, type) {
    
    var hotels = eval($("input[id='HotelProduct_Hotels']").val());
    var desc;
    
    if (hotels != undefined) {

        // se agregan los items al listado
        hotels.forEach(function (item) {
            
            desc = "<strong>" + getResource("lblCity") + ":</strong> " + item.City + " " +
                "<strong>" + getResource("lblProductCode") + ":</strong> " + item.ProductCode + " " +
                "<strong>" + getResource("lblProductName") + ":</strong> " + item.ProductName;

            $("div[id='divHotelAssociatedHotels']").append("<span id=\"hotel-" + getIATACode(item.City) + "-" + item.ProductCode + "\" class=\"spanList\">" + desc + "&nbsp;&nbsp;<input type=\"image\" src=\"/DesktopModules/MVC/SearchForm2/Images/delete.png\" onclick=\"deleteHotelList('" + item.City + "','" + item.ProductCode + "'); return false;\" /><br /></span>");

            // Si se habia puesto en Remove, se actualiza a NA
            if (item.Id > 0 && item.ActionType == "Remove") {
                cities = updateListCode(hotels, item.Id, "NA")
            }
        });

        // se actualiza el hidden
        if (hotels.length > 0) {
            $("input[id='HotelProduct_Hotels']").val(convertJson2string(hotels));
        }

        $("div[id='divHotelAssociatedHotels']").show();
    }
}

function addCityList(prod, type) {
    
    var cityCode;
    var cities = eval($("input[id='" + prod + "Product_Cities']").val());
    var prodDivName = (prod == "Air" || prod == "AirHotel" || prod == "BusHotel" || prod == "AirCar") ? prod + type : prod;
    var city = $("input[id='txt" + prodDivName + "City']").val();
    
    $("input[id$='txt" + prodDivName + "City']").attr({ "data-bvalidator": "required, autocomplete[city]" });
    
    if ($("div[id='div" + prodDivName + "Cities']").data("bValidator").validate() &&
        (cities == undefined || (cities != undefined && findInListCode(cities, city, null, type).length == 0))) {

        // se agrega al listado
        cityCode = getIATACode(city);
        
        $("div[id='div" + prodDivName + "AssociatedCities']").append("<span id=\"city-" + cityCode + "\" class=\"spanList\">" + city + "&nbsp;&nbsp;<input type=\"image\" src=\"/DesktopModules/MVC/SearchForm2/Images/delete.png\" onclick=\"deleteCityList('" + city + "', '" + prod + "', '" + type + "'); return false;\" /><br /></span>");

        // se agrega al arreglo
        cities = addListCode(cities, city, null, null, type);

        // se actualiza el hidden
        if (cities.length > 0) {
            $("input[id='" + prod + "Product_Cities']").val(convertJson2string(cities));
        }

        if (!$("div[id='div" + prodDivName + "AssociatedCities']").is(":visible"))
            $("div[id='div" + prodDivName + "AssociatedCities']").show();
    }

    $("input[id='txt" + prodDivName + "City']").val("");
    $("input[id$='txt" + prodDivName + "City']").removeAttr("data-bvalidator");
}

function addHotelList() {
    
    var cityCode, desc;
    var city = $("input[id='txtHotelCityCode']").val();
    var productCode = $("input[id='txtHotelProductCode']").val();
    var productName = $("input[id='txtHotelProductName']").val();
    var hotels = eval($("input[id='HotelProduct_Hotels']").val());

    $("input[id$='txtHotelCityCode']").attr({ "data-bvalidator": "required, autocomplete[city]" });
    $("input[id$='txtHotelProductCode']").attr({ "data-bvalidator": "required" });
    $("input[id$='txtHotelProductName']").attr({ "data-bvalidator": "required" });
    
    if ($("div[id='divHotelHotels']").data("bValidator").validate() &&
        (hotels == undefined || (hotels != undefined && findInListCode(hotels, city, productCode, null).length == 0))) {

        // se agrega al listado
        cityCode = getIATACode(city);
        desc = "<strong>" + getResource("lblCity") + ":</strong> " + city + " " +
            "<strong>" + getResource("lblProductCode") + ":</strong> " + productCode + " " +
            "<strong>" + getResource("lblProductName") + ":</strong> " + productName;

        $("div[id='divHotelAssociatedHotels']").append("<span id=\"hotel-" + cityCode + "-" + productCode + "\" class=\"spanList\">" + desc + "&nbsp;&nbsp;<input type=\"image\" src=\"/DesktopModules/MVC/SearchForm2/Images/delete.png\" onclick=\"deleteHotelList('" + city + "', '" + productCode + "'); return false;\" /><br /></span>");

        // se agrega al arreglo
        hotels = addListCode(hotels, city, productCode, productName, null);

        // se actualiza el hidden
        if (hotels.length > 0) {
            $("input[id='HotelProduct_Hotels']").val(convertJson2string(hotels));
        }

        if (!$("div[id='divHotelAssociatedHotels']").is(":visible"))
            $("div[id='divHotelAssociatedHotels']").show();
    }

    $("input[id='txtHotelCityCode']").val("");
    $("input[id='txtHotelProductCode']").val("");
    $("input[id='txtHotelProductName']").val("");
    
    $("input[id$='txtHotelCityCode']").removeAttr("data-bvalidator");
    $("input[id$='txtHotelProductCode']").removeAttr("data-bvalidator");
    $("input[id$='txtHotelProductName']").removeAttr("data-bvalidator");
}

function deleteAllCityList(prod, type) {
    
    var cities = eval($("input[id='" + prod + "Product_Cities']").val());

    if (cities != undefined) {
        cities.forEach(function (item) {
            deleteCityList(item.City, prod, type);
        });
    }
}

function deleteAllHotelList(prod) {
    
    var hotels  = eval($("input[id='HotelProduct_Hotels']").val());
    
    if (hotels != undefined) {
        hotels.forEach(function (item) {
            deleteHotelList(item.City, item.ProductCode);
        });
    }
}

function deleteCityList(city, prod, type) {
    
    var cities = eval($("input[id='" + prod + "Product_Cities']").val());
    var prodDivName = (prod == "Air" || prod == "AirHotel" || prod == "BusHotel" || prod == "AirCar") ? prod + type : prod;
    
    if (cities != undefined) {

        var item = findInListCode(cities, city, null, type);

        if (item.length > 0) {

            if (item[0].ActionType == "NA") {
                // si viene de la carga se actualiza el ActionType
                cities = updateListCode(cities, item[0].Id, "Remove");
            } else {
                // si se acaba de ingresar se elimina del arreglo
                cities = deleteListCode(cities, item[0].City, item[0].ProductCode, item[0].Type);
            }

            // se actualiza el hidden
            if (cities.length > 0) {
                $("input[id='" + prod + "Product_Cities']").val(convertJson2string(cities));
            } else {
                $("input[id='" + prod + "Product_Cities']").val("");
            }

            $("div[id='div" + prodDivName + "AssociatedCities'] span[id='city-" + getIATACode(city) + "']").remove();
        }
    }
}

function deleteHotelList(city, productCode) {

    var hotels = eval($("input[id='HotelProduct_Hotels']").val());

    if (hotels != undefined) {

        var item = findInListCode(hotels, city, productCode, null);

        if (item.length > 0) {
            if (item[0].ActionType == "NA") {
                // si viene de la carga se actualiza el ActionType
                hotels = updateListCode(hotels, item[0].Id, "Remove");
            } else {
                // si se acaba de ingresar se elimina del arreglo
                hotels = deleteListCode(hotels, item[0].City, item[0].ProductCode, item[0].Type);
            }

            // se actualiza el hidden
            if (hotels.length > 0) {
                $("input[id='HotelProduct_Hotels']").val(convertJson2string(hotels));
            } else {
                $("input[id='HotelProduct_Hotels']").val("");
            }

            $("div[id='divHotelAssociatedHotels'] span[id='hotel-" + getIATACode(city) + "-" + productCode + "']").remove();
        }
    }
}

function showHideExtraTypes(show) {
    
    if ($("div[id='divExtraTypes']").html() == "")
        loadExtrasType(show);
    
    if (show) {
        $("div[id='divExtraTypes']").show();
    } else {
        evalExtrasType();
        $("div[id='divExtraTypes']").hide();
    }
}

function loadExtrasType(show) {
    
    var types = eval($("input[id='ExtraProduct_Types']").val());
    var strHtml = "<div id=\"divExtraTypesList\">";

    if (types != undefined) {
        for (var i = 0; i < types.length; i++) {
            
            var checked = (types[i].Checked) ? "checked=\"checked\"" : null;
            strHtml += "<span><input type=\"checkbox\" id=\"chkExtraType_" + types[i].TypeId + "\" onclick=\"checkedExtraType(this.checked, " + types[i].TypeId + ");\"" + checked + ">" + types[i].Name + "</span><br />"

            if (i == 7 || i == 15 || i == 23) {
                strHtml += "</div><div id=\"divExtraTypesList\">";
            }
        }

        $("input[id='ExtraProduct_Types']").val(convertJson2string(types));
    }

    $("div[id='divExtraTypes']").html(strHtml + "</div>");
}

function evalExtrasType() {
    
    var types = eval($("input[id='ExtraProduct_Types']").val());
    var item;

    if (types != undefined) {
        for (var i = 0; i < types.length; i++) {
            
            item = findInExtrasType(types, types[i].TypeId);

            if (item != undefined && item[0].ActionType != "NA") {

                if (item[0].ActionType == "Create") {
                    $("input[id='chkExtraType_" + item[0].TypeId + "']").removeAttr("checked");
                    types = updateExtrasType(types, item[0].TypeId, "NA", true);
                } else {
                    $("input[id='chkExtraType_" + item[0].TypeId + "']").attr("checked", "checked");
                    types = updateExtrasType(types, item[0].TypeId, "NA", false);
                }
            }
        }

        $("input[id='ExtraProduct_Types']").val(convertJson2string(types));
    }
}

function checkedExtraType(isChecked, typeId) {
    
    var types = eval($("input[id='ExtraProduct_Types']").val());
    
    if (types != undefined) {

        var item = findInExtrasType(types, typeId);

        if (isChecked) {
            types = updateExtrasType(types, item[0].TypeId, "Create", true);
        } else {
            types = updateExtrasType(types, item[0].TypeId, "Remove", false);
        }

        $("input[id='ExtraProduct_Types']").val(convertJson2string(types));
    }
}

function initProductSort() {
    
    $("#sortable").sortable({
        cursor: "row-resize",
        scroll: true,
        scrollSensitivity: 30,
        scrollSpeed: 7,
        revert: true,
        stop: function (event, ui) {
            reSortProduct(eval($("input[id='ProductSort']").val()));
        }
    });

    loadProductSort();
}

function loadProductSort(prod) {
    
    var prodSort = sortArrayByKey(eval($("input[id='ProductSort']").val()).filter(function (e) { return (e.Sort != -1); }), "Sort");
    var container = $("#sortable");
    var children = container.children();
    container.empty();

    $.each(prodSort, function (index, item) {
        childIndex = findIndexInArray(children, 'Sort' + item.Product.toString());
        if (childIndex != undefined)
            container.append(children[childIndex]);
    });
}

function addSortProduct(prod) {
    
    var prodSort = eval($("input[id='ProductSort']").val());
    var item = $.grep(prodSort, function (e) { return e.Product == prod + "Product"; });
    var prodSortFilter = sortArrayByKey(prodSort.filter(function (e) { return (e.Sort != -1); }), "Sort");

    if (item.length > 0) {
        if (prodSortFilter == 0) {
            item[0].Sort = 1
        } else {
            item[0].Sort = prodSortFilter[prodSortFilter.length - 1].Sort + 1;
        }

        $("ul[id='sortable']").append("<li id=\"liSort" + prod + "Product\" class=\"ui-sortable-handle\">" + getResource("lbl" + prod + "Product") + "</li>");
    }

    $("input[id$='ProductSort']").val(convertJson2string(prodSort));
}

function deleteSortProduct(prod) {
    
    var prodSort = eval($("input[id='ProductSort']").val());
    var item = $.grep(prodSort, function (e) { return e.Product == prod + "Product"; });

    if (item.length > 0) {
        item[0].Sort = -1;
        $("ul[id='sortable'] li[id='liSort" + prod + "Product']").remove();
        reSortProduct(prodSort);
    }
}

function reSortProduct(prodSort) {
    
    var regNumber = new RegExp('^[0-9]$');
    var array = $("#sortable").sortable('toArray');
    var item;

    for (var key in array) {
        
        if (regNumber.test(key)) {

            item = $.grep(prodSort, function (e) { return e.Product == array[key].replace("liSort", ""); });

            if (item.length > 0) {
                item[0].Sort = parseInt(key) + 1;
            }
        }
    }

    $("input[id$='ProductSort']").val(convertJson2string(prodSort));
}