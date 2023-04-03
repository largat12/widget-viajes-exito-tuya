function loadPortalConfig() {

    var portalConfig = eval($("input[id='PortalConfig']").val());

    if (portalConfig != undefined) {

        $PortalId = portalConfig[0].PortalId;
        $UserService = portalConfig[0].UserService;
        $BranchCode = portalConfig[0].BranchCode;
        $UrlDomainNS = portalConfig[0].UrlDomainNS;
        $IsLinkGenerator = portalConfig[0].IsLinkGenerator;
        $BusinessUnit = portalConfig[0].BusinessUnit;
        $SalesChannel = portalConfig[0].SalesChannel;
        $ClientId = portalConfig[0].ClientId;
        $SessionTokenSSO = portalConfig[0].SessionTokenSSO;
        $CurrentCulture = portalConfig[0].CurrentCulture;
        $ListCodes = eval($("input[id='ListCodes']").val());
        $GeoLocationProducts = eval($("input[id='GeoLocationProducts']").val());
        $IsMobile = window.innerWidth <= 767;

        $jsonPax = { Adults: "1", Childs: "0", Infants: "0" };
        $jsonPaxRoom = { Room: "1", Adults: "1", Childs: "0", AgeChilds: "" };
        $jsonArrayPaxRoom = [$jsonPaxRoom];

        return true;
    } else {

        return false;
    }
}

function loadSalesRestRules(portalId) {

    $.getJSON('/Portals/' + portalId.toString() + '/Netactica/data/netactica.salesrestrules.json')
        .done(function (data) {
            $jsonSalesRestRules = data;
        });
}

function initWidget(tabwidget) {

    initAirProduct(tabwidget);
    initHotelProduct(tabwidget);
    initCarProduct(tabwidget);
    initExtraProduct(tabwidget);
    initAirHotelProduct(tabwidget);
    initBusProduct(tabwidget);
    initBusHotelProduct(tabwidget);
    initAirCarProduct(tabwidget);

    // se reordenan los tabs del widget
    $("ul[id='widget-tabs']", $(tabwidget)).each(function () {
        $(this).html($(this).children('li').sort(function (a, b) {
            return ($(b).data('sort')) < ($(a).data('sort')) ? 1 : -1;
        }));
    });

    // se inicializan los popups
    initPopups(tabwidget);

    // se muestra el widget una vez inicializado
    $(tabwidget).show();

    // funionalidad para los tabs en mobile
    // 28 (px) tamaño link, 60 (px) tamaño tab producto
    $maxScrollLeft = ($("div[id='divMobileTabsContent'] li", $(tabwidget)).length - (($("div[id='divMobileTabsContent']", $(tabwidget)).width() - 28) / 60)) * 60;

    if ($maxScrollLeft <= 0) {

        $("a[id='aMobileTabsNav']", $(tabwidget)).hide();
        $("div[id='divMobileTabsContent'] ul[id='widget-tabs']", $(tabwidget)).css("width", function () {
            return $("div[id='divMobileTabsContent'] li", $(tabwidget)).length * 60 + 15;
        });

    } else {

        var addPxls = 38;
        var pixels = ($("div[id='divMobileTabsContent']", $(tabwidget)).width() - ($("div[id='divMobileTabsContent'] li", $(tabwidget)).length * 60))
        if (pixels > 0 && pixels < 28) {
            $("a[id='aMobileTabsNav']", $(tabwidget)).hide();
            addPxls = 15;
        }

        $("a[id='aMobileTabsNav']", $(tabwidget)).click(function () {

            scrollLeft = $("div[id='divMobileTabsContent']", $(tabwidget)).scrollLeft();

            if (scrollLeft >= 0 && scrollLeft <= ($maxScrollLeft / 2)) {
                $("div[id='divMobileTabsContent']", $(tabwidget)).animate({ scrollLeft: $maxScrollLeft }, 400);
            } else {
                $("div[id='divMobileTabsContent']", $(tabwidget)).animate({ scrollLeft: 0 }, 400);
            }

        });

        $("div[id='divMobileTabsContent'] ul[id='widget-tabs']", $(tabwidget)).css("width", function () {
            return ($("div[id='divMobileTabsContent'] li", $(tabwidget)).length * 60) + addPxls;
        });

        $("div[id='divMobileTabsContent']", $(tabwidget)).scroll(function () {

            if ($(this).scrollLeft() >= 0 && $(this).scrollLeft() <= ($maxScrollLeft / 2)) {
                if ($("a[id='aMobileTabsNav']", $(tabwidget)).hasClass("mobile-tabs-prev")) {
                    $("a[id='aMobileTabsNav']", $(tabwidget)).addClass("mobile-tabs-next");
                    $("a[id='aMobileTabsNav']", $(tabwidget)).removeClass("mobile-tabs-prev");
                }
            } else {
                if ($("a[id='aMobileTabsNav']", $(tabwidget)).hasClass("mobile-tabs-next")) {
                    $("a[id='aMobileTabsNav']", $(tabwidget)).addClass("mobile-tabs-prev");
                    $("a[id='aMobileTabsNav']", $(tabwidget)).removeClass("mobile-tabs-next");
                }
            }

        });

    }

    // se inicializa el bValidator
    $(tabwidget).bValidator();

    if ($('.widget-tabs-container').width() < 600 && $(window).width() > 1024) {
        $('#HotelDatesRooms .col-lg-9').addClass('fixColumns100')
        $('#HotelDatesRooms .col-lg-3').addClass('fixColumns50')
        $('#divHotelTogglePromoCode .col-lg-3').addClass('fixColumns50')
    }
}

function initAirProduct(tabwidget) {

    if ($("div[id='air']", $(tabwidget)).length > 0) {

        // Checked Round Trip Type
        $("div[id='divAirMultiDestination']", $(tabwidget)).hide();
        $("input[name='AirTripType']:eq(0)", $(tabwidget)).prop('checked', true);
        changeTripType(tabwidget, 'Air', 'RT');

        // On click events
        $("input[id='rdAirTripTypeRT']", $(tabwidget)).click(function () {
            changeTripType(tabwidget, 'Air', 'RT');
        });
        $("input[id='rdAirTripTypeOW']", $(tabwidget)).click(function () {
            changeTripType(tabwidget, 'Air', 'OW');
        });
        $("input[id='rdAirTripTypeMD']", $(tabwidget)).click(function () {
            changeTripType(tabwidget, 'Air', 'MD');
        });
        $("a[id='addAirFlight2']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divMDFlight3', 'divAirFlight2Opt');
        });
        $("a[id='addAirFlight3']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divMDFlight4', 'divAirFlight3Opt');
        });
        $("a[id='addAirFlight4']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divMDFlight5', 'divAirFlight4Opt');
        });
        $("a[id='addAirFlight5']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divMDFlight6', 'divAirFlight5Opt');
        });
        $("a[id='delAirFlight3']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divAirFlight2Opt', 'divMDFlight3');
        });
        $("a[id='delAirFlight4']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divAirFlight3Opt', 'divMDFlight4');
        });
        $("a[id='delAirFlight5']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divAirFlight4Opt', 'divMDFlight5');
        });
        $("a[id='delAirFlight6']", $(tabwidget)).click(function () {
            showHideFligth(tabwidget, 'divAirFlight5Opt', 'divMDFlight6');
        });
        $("a[id='airPopUpBtn']", $(tabwidget)).click(function () {
            openPopUp(tabwidget, 'AirPaxPopUp', 'paxPopUp', 'Air');
        });
        $("input[id='txtAirDateFrom']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirDateFrom1']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirDateFrom2']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirDateFrom3']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirDateFrom4']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirDateFrom5']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirDateFrom6']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirDateTo']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateArrival"));
        });

        // Data validators
        var maxMessage = $("input[id='txtAirNumberPassenger']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger");
        $("input[id='txtAirNumberPassenger']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger", maxMessage.replace('{0}', $MaxPassengerSearch));
        $("input[id='txtAirNumberPassenger']", $(tabwidget)).attr("data-bvalidator", "validateMaxPassenger[" + tabwidget + ":Air:" + $MaxPassengerSearch + "], validateQuantityInfants[" + tabwidget + ":Air]");

        // Hide elements
        if (!$PromoCodeAllowed) {
            $("div[id='divAirTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtAirPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }
        if (!$AirFlexDateEnabled) {
            $("div[id='divAirFlexDates']", $(tabwidget)).hide();
            $("div[id='divAirBaggageIncluded']", $(tabwidget)).removeClass('col-sm-6 col-md-6 col-lg-6');
            $("div[id='divAirBaggageIncluded']", $(tabwidget)).addClass('col-sm-12 col-md-12 col-lg-12');
        }

        // Load Airlines

        var arrPreferredAirline = $("input[id='hdPreferredAirlines']", $(tabwidget)).val().split(',');
        var preferedAirlines = external_file_Airlines.sort().filter(function (airline) {
            return (arrPreferredAirline.indexOf(airline.substring(airline.indexOf("("), airline.indexOf(")") + 1)) >= 0);
        });

        var normalAirlines = external_file_Airlines.sort().filter(function (airline) {
            return (arrPreferredAirline.indexOf(airline.substring(airline.indexOf("("), airline.indexOf(")") + 1)) < 0);
        });
        if (preferedAirlines.length > 0) {            convertArrayToArrayCodeName(preferedAirlines, 'AutoComplete').forEach(function (item) {
                $("select[id='ddlAirline']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name.toLowerCase() + " (" + item.Code + ")"
                }));
            });            /*$(preferedAirlines).each(function (index, elem) {
                $("select[id='ddlAirline']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name.toLowerCase() + " (" + item.Code + ")"
                }));
            });*/

            $("select[id='ddlAirline']", $(tabwidget)).append('<option data-divider="true"></option>');
        }
        convertArrayToArrayCodeName(normalAirlines, 'AutoComplete').forEach(function (item) {
            $("select[id='ddlAirline']", $(tabwidget)).append($('<option>', {
                value: item.Code,
                text: item.Name.toLowerCase() + " (" + item.Code + ")"
            }));
        });

        if (preferedAirlines.length > 0) {
            $("select[id='ddlAirline']", $(tabwidget)).selectpicker();
            $("select[id='ddlAirline']", $(tabwidget)).selectpicker('setStyle', 'form-control special-options-input selectpicker', 'add');
        }

        // Change Attributes
        if ($("div[id='divAirAccountCode']", $(tabwidget)).length > 0) {
            $("div[id='divAirDepartureTime']", $(tabwidget)).removeClass("fix-padding-left");
            $("div[id='divAirDepartureTime']", $(tabwidget)).addClass("fix-padding-right");
            $("div[id='divAirReturnTime']", $(tabwidget)).removeClass("fix-padding-right");
            $("div[id='divAirReturnTime']", $(tabwidget)).addClass("fix-padding-left");
        }

        // Load Cities
        var airCitiesFrom = filterListCode($ListCodes, 'AirProduct', 'Departure');
        var airCitiesTo = filterListCode($ListCodes, 'AirProduct', 'Arrival');

        // Load Cities From
        if (airCitiesFrom.length > 0) {

            convertArrayToArrayCodeName(airCitiesFrom, 'ListCodes').forEach(function (item) {

                $("select[id='ddlAirCityFrom']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divAirCityFromControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlAirCityFrom']", $(tabwidget)).show();
            $("select[id='ddlAirCityFrom']", $(tabwidget)).change(function () {
                setTimeout(function () {
                    if (airCitiesTo.length > 0) {
                        //$("select[id='ddlAirCityTo']", $(tabwidget)).focus();
                    } else {
                        //$("input[id='txtAirCityTo']", $(tabwidget)).focus();
                        //$("div[id='divAirCityToControlMobile']", $(tabwidget)).trigger("click");
                    }
                }, 10);
            });
        } else {

            var airGeo = filterList($GeoLocationProducts, 'AirProduct');
            if (airGeo.length > 0 && airGeo[0].Enabled) {
                setGeolocationCity('txtAirCityFrom', tabwidget);
                setGeolocationCity('txtAirCityFrom1', tabwidget);
            }

            $("input[id='txtAirCityFrom']", $(tabwidget)).show();
        }

        // Load Cities To
        if (airCitiesTo.length > 0) {
            convertArrayToArrayCodeName(airCitiesTo, 'ListCodes').forEach(function (item) {

                $("select[id='ddlAirCityTo']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divAirCityToControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlAirCityTo']", $(tabwidget)).show();
            $("select[id='ddlAirCityTo']", $(tabwidget)).change(function () {
                setTimeout(function () {
                    //showDatePick(tabwidget, 'txtAirDateFrom', getResource("DateDeparture"));
                }, 10);
            });
        } else {
            $("input[id='txtAirCityTo']", $(tabwidget)).show();
        }

        // Clean elements
        cleanElements($("div[id='air'] input", $(tabwidget)));
        $("input[id='txtAirNumberPassenger']", $(tabwidget)).val("1");
        $("input[id='hdnAirPassengers']", $(tabwidget)).val(JSON.stringify($jsonPax));

        // Init Autocomplete
        initAirAutocomplete(tabwidget, airCitiesTo.length);
        $("input[id*='txtAirCity']", $(tabwidget)).click(function () {
            this.setSelectionRange(0, this.value.length);
        });

        // Pre-autocomplete Cities on Multidestination
        $("input[id='txtAirCityTo1']", $(tabwidget)).change(function () {
            if ($("input[name='AirTripType']:eq(2)", $(tabwidget)).prop('checked'))
                $('input[id$=txtAirCityFrom2]', $(tabwidget)).val($("input[id='txtAirCityTo1']", $(tabwidget)).val());
        });
        $("input[id='txtAirCityTo2']", $(tabwidget)).change(function () {
            if ($("input[name='AirTripType']:eq(2)", $(tabwidget)).prop('checked'))
                $('input[id$=txtAirCityFrom3]', $(tabwidget)).val($("input[id='txtAirCityTo2']", $(tabwidget)).val());
        });
        $("input[id='txtAirCityTo3']", $(tabwidget)).change(function () {
            if ($("input[name='AirTripType']:eq(2)", $(tabwidget)).prop('checked'))
                $('input[id$=txtAirCityFrom4]', $(tabwidget)).val($("input[id='txtAirCityTo3']", $(tabwidget)).val());
        });
        $("input[id='txtAirCityTo4']", $(tabwidget)).change(function () {
            if ($("input[name='AirTripType']:eq(2)", $(tabwidget)).prop('checked'))
                $('input[id$=txtAirCityFrom5]', $(tabwidget)).val($("input[id='txtAirCityTo4']", $(tabwidget)).val());
        });
        $("input[id='txtAirCityTo5']", $(tabwidget)).change(function () {
            if ($("input[name='AirTripType']:eq(2)", $(tabwidget)).prop('checked'))
                $('input[id$=txtAirCityFrom6]', $(tabwidget)).val($("input[id='txtAirCityTo5']", $(tabwidget)).val());
        });

        // Init Datepickers
        var airSalesRestRuleFrom = valSalesRestRules('AirProduct', 'from');
        $("input[id*='txtAirDateFrom']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $AirAdvancedPurchaseDays,
            maxDate: 355,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {

                if (this.id == "txtAirDateFrom")
                    return getPaintedDates(date, airSalesRestRuleFrom, $("input[id='txtAirDateFrom']", $(tabwidget)), $("input[id='txtAirDateTo']", $(tabwidget)));

                return [true];
            },
            onChangeMonthYear: function () {
                var txtId = this.id;

                setTimeout(function () {
                    addHeaderDatePick(tabwidget, txtId, getResource("DateDeparture"));
                }, 5);
            }
        });
        var airSalesRestRuleTo = valSalesRestRules('AirProduct', 'to');
        $("input[id='txtAirDateTo']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: 0,
            maxDate: 355,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {

                if (this.id == "txtAirDateTo")
                    return getPaintedDates(date, airSalesRestRuleTo, $("input[id='txtAirDateFrom']", $(tabwidget)), $("input[id='txtAirDateTo']", $(tabwidget)));

                return [true];
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtAirDateTo', getResource("DateArrival"));
                }, 5);
            }
        });
        $("input[id='txtAirDateFrom']", $(tabwidget)).change(function () {
            $("input[id='txtAirDateTo']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtAirDateFrom']", $(tabwidget)).datepicker('getDate'));
        });
        $("input[id='txtAirDateFrom1']", $(tabwidget)).change(function () {
            $("input[id='txtAirDateFrom2']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtAirDateFrom1']", $(tabwidget)).datepicker('getDate'));
        });
        $("input[id='txtAirDateFrom2']", $(tabwidget)).change(function () {
            $("input[id='txtAirDateFrom3']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtAirDateFrom2']", $(tabwidget)).datepicker('getDate'));
        });
        $("input[id='txtAirDateFrom3']", $(tabwidget)).change(function () {
            $("input[id='txtAirDateFrom4']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtAirDateFrom3']", $(tabwidget)).datepicker('getDate'));
        });
        $("input[id='txtAirDateFrom4']", $(tabwidget)).change(function () {
            $("input[id='txtAirDateFrom5']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtAirDateFrom4']", $(tabwidget)).datepicker('getDate'));
        });
        $("input[id='txtAirDateFrom5']", $(tabwidget)).change(function () {
            $("input[id='txtAirDateFrom6']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtAirDateFrom5']", $(tabwidget)).datepicker('getDate'));
        });

        // Departure Time On Change
        $("select[id='ddlAirDepartureTime1']", $(tabwidget)).change(function () {
            setTimeout(function () {
                $("input[id='txtAirCityTo2']", $(tabwidget)).focus();
                if ($IsMobile)
                    $("div[id='divAirCityTo2ControlMobile']", $(tabwidget)).trigger('click');
            }, 10);
        });
        $("select[id='ddlAirDepartureTime2']", $(tabwidget)).change(function () {
            setTimeout(function () {
                if ($("input[id='txtAirCityTo3']", $(tabwidget)).is(':visible')) {
                    $("input[id='txtAirCityTo3']", $(tabwidget)).focus();
                    if ($IsMobile)
                        $("div[id='divAirCityTo3ControlMobile']", $(tabwidget)).trigger('click');
                } else {
                    // llamado para abrir el popup de pasajeros
                    openPopUp(tabwidget, 'AirPaxPopUp', 'paxPopUp', 'Air');
                }
            }, 10);
        });
        $("select[id='ddlAirDepartureTime3']", $(tabwidget)).change(function () {
            setTimeout(function () {
                if ($("input[id='txtAirCityTo4']", $(tabwidget)).is(':visible')) {
                    $("input[id='txtAirCityTo4']", $(tabwidget)).focus();
                    if ($IsMobile)
                        $("div[id='divAirCityTo4ControlMobile']", $(tabwidget)).trigger('click');
                } else {
                    // llamado para abrir el popup de pasajeros
                    openPopUp(tabwidget, 'AirPaxPopUp', 'paxPopUp', 'Air');
                }
            }, 10);
        });
        $("select[id='ddlAirDepartureTime4']", $(tabwidget)).change(function () {
            setTimeout(function () {
                if ($("input[id='txtAirCityTo5']", $(tabwidget)).is(':visible')) {
                    $("input[id='txtAirCityTo5']", $(tabwidget)).focus();
                    if ($IsMobile)
                        $("div[id='divAirCityTo5ControlMobile']", $(tabwidget)).trigger('click');
                } else {
                    // llamado para abrir el popup de pasajeros
                    openPopUp(tabwidget, 'AirPaxPopUp', 'paxPopUp', 'Air');
                }
            }, 10);
        });
        $("select[id='ddlAirDepartureTime5']", $(tabwidget)).change(function () {
            setTimeout(function () {
                if ($("input[id='txtAirCityTo6']", $(tabwidget)).is(':visible')) {
                    $("input[id='txtAirCityTo6']", $(tabwidget)).focus();
                    if ($IsMobile)
                        $("div[id='divAirCityTo6ControlMobile']", $(tabwidget)).trigger('click');
                } else {
                    // llamado para abrir el popup de pasajeros
                    openPopUp(tabwidget, 'AirPaxPopUp', 'paxPopUp', 'Air');
                }
            }, 10);
        });
        $("select[id='ddlAirDepartureTime6']", $(tabwidget)).change(function () {
            setTimeout(function () {
                // llamado para abrir el popup de pasajeros
                openPopUp(tabwidget, 'AirPaxPopUp', 'paxPopUp', 'Air');
            }, 10);
        });

        // Button Search On Click
        $("input[id='btnSearchAir']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/Air";
                var cityFrom = ($("select[id='ddlAirCityFrom']", $(tabwidget)).is(':visible')) ? $("select[id='ddlAirCityFrom']", $(tabwidget)).val() : getIATACode($("input[id='txtAirCityFrom']", $(tabwidget)).val());
                var cityFrom1 = getIATACode($("input[id='txtAirCityFrom1']", $(tabwidget)).val());
                var cityFrom2 = getIATACode($("input[id='txtAirCityFrom2']", $(tabwidget)).val());
                var cityFrom3 = getIATACode($("input[id='txtAirCityFrom3']", $(tabwidget)).val());
                var cityFrom4 = getIATACode($("input[id='txtAirCityFrom4']", $(tabwidget)).val());
                var cityFrom5 = getIATACode($("input[id='txtAirCityFrom5']", $(tabwidget)).val());
                var cityFrom6 = getIATACode($("input[id='txtAirCityFrom6']", $(tabwidget)).val());
                var cityTo = ($("select[id='ddlAirCityTo']", $(tabwidget)).is(':visible')) ? $("select[id='ddlAirCityTo']", $(tabwidget)).val() : getIATACode($("input[id='txtAirCityTo']", $(tabwidget)).val());
                var cityTo1 = getIATACode($("input[id='txtAirCityTo1']", $(tabwidget)).val());
                var cityTo2 = getIATACode($("input[id='txtAirCityTo2']", $(tabwidget)).val());
                var cityTo3 = getIATACode($("input[id='txtAirCityTo3']", $(tabwidget)).val());
                var cityTo4 = getIATACode($("input[id='txtAirCityTo4']", $(tabwidget)).val());
                var cityTo5 = getIATACode($("input[id='txtAirCityTo5']", $(tabwidget)).val());
                var cityTo6 = getIATACode($("input[id='txtAirCityTo6']", $(tabwidget)).val());
                var dateFrom = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateFrom']").datepicker("getDate"));
                var dateFrom1 = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateFrom1']").datepicker("getDate"));
                var dateFrom2 = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateFrom2']").datepicker("getDate"));
                var dateFrom3 = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateFrom3']").datepicker("getDate"));
                var dateFrom4 = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateFrom4']").datepicker("getDate"));
                var dateFrom5 = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateFrom5']").datepicker("getDate"));
                var dateFrom6 = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateFrom6']").datepicker("getDate"));
                var departureTime1 = $("select[id='ddlAirDepartureTime1']", $(tabwidget)).val();
                var departureTime2 = $("select[id='ddlAirDepartureTime2']", $(tabwidget)).val();
                var departureTime3 = $("select[id='ddlAirDepartureTime3']", $(tabwidget)).val();
                var departureTime4 = $("select[id='ddlAirDepartureTime4']", $(tabwidget)).val();
                var departureTime5 = $("select[id='ddlAirDepartureTime5']", $(tabwidget)).val();
                var departureTime6 = $("select[id='ddlAirDepartureTime6']", $(tabwidget)).val();
                var dateTo = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirDateTo']").datepicker("getDate"));
                var pax = JSON.parse($("input[id='hdnAirPassengers']", $(tabwidget)).val());
                var flexDates = ($("input[id='chkdivAirFlexDates']", $(tabwidget)).is(':visible') && $("input[id='chkdivAirFlexDates']", $(tabwidget)).prop('checked')) ? "3" : "NA";
                var airline = ($("select[id='ddlAirline']", $(tabwidget)).val() != "") ? $("select[id='ddlAirline']", $(tabwidget)).val() : "NA";
                var accountCode = ($("input[id='txtAirAccountCode']", $(tabwidget)).is(':visible') && $("input[id='txtAirAccountCode']", $(tabwidget)).val() != "") ? $("input[id='txtAirAccountCode']", $(tabwidget)).val() : "NA";
                var typeCabin = ($("select[id='ddlAirTypeCabin']", $(tabwidget)).val() != "") ? $("select[id='ddlAirTypeCabin']", $(tabwidget)).val() : "NA";
                var timeFrom = ($("select[id='ddlAirDepartureTime']", $(tabwidget)).val() != "") ? $("select[id='ddlAirDepartureTime']", $(tabwidget)).val() : "NA";
                var timeTo = ($("select[id='ddlAirReturnTime']", $(tabwidget)).val() != "") ? $("select[id='ddlAirReturnTime']", $(tabwidget)).val() : "NA";
                var baggageIncluded = ($("input[id='chkAirBaggageIncluded']", $(tabwidget)).is(':visible') && $("input[id='chkAirBaggageIncluded']", $(tabwidget)).prop('checked')) ? "true" : "false";
                var promoCode = $("input[id='txtAirPromoCode']", $(tabwidget)).val();

                switch ($("input[name='AirTripType']:checked").val()) {
                    case "OW":

                        url += "/OW";
                        url += "/" + cityFrom;
                        url += "/" + cityTo
                        url += "/" + dateFrom;
                        url += "/" + pax.Adults;
                        url += "/" + pax.Childs;
                        url += "/" + pax.Infants;
                        url += "/" + flexDates;
                        url += "/" + airline;
                        url += "/" + accountCode;
                        url += "/" + typeCabin;
                        url += "/" + timeFrom;

                        break;
                    case "RT":

                        url += "/RT";
                        url += "/" + cityFrom;
                        url += "/" + cityTo
                        url += "/" + dateFrom;
                        url += "/" + dateTo;
                        url += "/" + pax.Adults;
                        url += "/" + pax.Childs;
                        url += "/" + pax.Infants;
                        url += "/" + flexDates;
                        url += "/" + airline;
                        url += "/" + accountCode;
                        url += "/" + typeCabin;

                        if (timeFrom != "NA" && timeTo != "NA") {
                            url += "/" + timeFrom + "," + timeTo;
                        } else if (timeFrom != "NA" && timeTo == "NA") {
                            url += "/" + timeFrom + ",NA";
                        } else if (timeFrom == "NA" && timeTo != "NA") {
                            url += "/NA," + timeTo;
                        } else {
                            url += "/NA";
                        }

                        break;
                    case "MD":

                        url += "/MD";

                        // Cities from
                        url += "/" + cityFrom1 + "," + cityFrom2;
                        if (cityFrom3 != "" && cityTo3 != "")
                            url += "," + cityFrom3;
                        if (cityFrom4 != "" && cityTo4 != "")
                            url += "," + cityFrom4;
                        if (cityFrom5 != "" && cityTo5 != "")
                            url += "," + cityFrom5;
                        if (cityFrom6 != "" && cityTo6 != "")
                            url += "," + cityFrom6;

                        // Cities to
                        url += "/" + cityTo1 + "," + cityTo2;
                        if (cityFrom3 != "" && cityTo3 != "")
                            url += "," + cityTo3;
                        if (cityFrom4 != "" && cityTo4 != "")
                            url += "," + cityTo4;
                        if (cityFrom5 != "" && cityTo5 != "")
                            url += "," + cityTo5;
                        if (cityFrom6 != "" && cityTo6 != "")
                            url += "," + cityTo6;

                        // Departure date
                        url += "/" + dateFrom1 + "," + dateFrom2;
                        if (dateFrom3 != "")
                            url += "," + dateFrom3;
                        if (dateFrom4 != "")
                            url += "," + dateFrom4;
                        if (dateFrom5 != "")
                            url += "," + dateFrom5;
                        if (dateFrom6 != "")
                            url += "," + dateFrom6;

                        url += "/" + pax.Adults;
                        url += "/" + pax.Childs;
                        url += "/" + pax.Infants;

                        break;
                }

                url += "/" + baggageIncluded;

                if ($("input[name='AirTripType']:checked").val() == "MD") {
                    url += "/" + airline + "/" + typeCabin;

                    //Departure Times
                    if (departureTime1 == "" && departureTime2 == "" && departureTime3 == "" &&
                        departureTime4 == "" && departureTime5 == "" && departureTime6 == "") {
                        url += "/NA";
                    } else {
                        url += "/" + departureTime1 + "," + departureTime2;
                        if (dateFrom3 != "")
                            url += "," + departureTime3;
                        if (dateFrom4 != "")
                            url += "," + departureTime4;
                        if (dateFrom5 != "")
                            url += "," + departureTime5;
                        if (dateFrom6 != "")
                            url += "," + departureTime6;
                    }
                }

                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }
}

function initAirAutocomplete(tabwidget, lenCitiesto) {

    // City From

    $("input[id='txtAirCityFrom']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityFrom1']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityFrom2']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityFrom3']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityFrom4']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityFrom5']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityFrom6']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    // City To

    $("input[id='txtAirCityTo']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityTo1']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityTo2']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityTo3']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityTo4']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityTo5']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

    $("input[id='txtAirCityTo6']", $(tabwidget)).netautocomplete('init', {
        type: "AirportsCities",
        showExcluded: false
    });

}

function initHotelProduct(tabwidget) {

    if ($("div[id='hotel']", $(tabwidget)).length > 0) {

        // On click events
        $("a[id='hotelPopUpBtn']", $(tabwidget)).click(function () {
            openPopUp(tabwidget, 'HotelPaxPopUp', 'paxRoomPopUp', 'Hotel');
        });
        $("input[id='txtHotelDateFrom']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateCheckin"));
        });
        $("input[id='txtHotelDateTo']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateCheckout"));
        });

        // Data validators
        var maxMessage = $("input[id='txtHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger");
        $("input[id='txtHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger", maxMessage.replace('{0}', $MaxPassengerSearch));
        $("input[id='txtHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator", "validateMaxPassenger[" + tabwidget + ":Hotel:" + $MaxPassengerSearch + "]");

        // Hide elements
        if (!$PromoCodeAllowed) {
            $("div[id='divHotelTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtHotelPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Load Cities or Hotel Product
        var hotelList = filterListCode($ListCodes, 'HotelProduct', null);
        if (hotelList.length > 0) {
            var codeItem, nameItem;
            convertArrayToArrayCodeName(hotelList, 'ListCodes').forEach(function (item) {

                codeItem = (item.ProductCode == null) ? item.Code : item.Code + "|" + item.ProductCode;
                nameItem = (item.ProductName == null) ? item.Name : item.ProductName;

                $("select[id='ddlHotelCity']", $(tabwidget)).append($('<option>', {
                    value: codeItem,
                    text: nameItem
                }));
            });
            $("div[id='divHotelCityControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlHotelCity']", $(tabwidget)).show();
            $("select[id='ddlHotelCity']", $(tabwidget)).change(function () {
                setTimeout(function () {
                    showDatePick(tabwidget, 'txtHotelDateFrom', getResource("DateCheckin"));
                }, 10);
            });
        } else {

            var hotelGeo = filterList($GeoLocationProducts, 'HotelProduct');
            if (hotelGeo.length > 0 && hotelGeo[0].Enabled)
                setGeolocationCity('txtHotelCity', tabwidget);

            $("input[id='txtHotelCity']", $(tabwidget)).show();
        }

        // Clean elements
        cleanElements($("div[id='hotel'] input", $(tabwidget)));
        $("input[id='txtHotelNumberRooms']", $(tabwidget)).val("1");
        $("input[id='txtHotelNumberPassenger']", $(tabwidget)).val("1");
        $("input[id='hdnHotelPassengers']", $(tabwidget)).val(JSON.stringify($jsonArrayPaxRoom));

        // Init Autocomplete
        if (hotelList.length == 0) {
            $("input[id='txtHotelCity']", $(tabwidget)).netautocomplete('init', {
                type: "Cities",
                showExcluded: false
            });
            $("input[id='txtHotelCity']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Init Datepickers
        var hotelDaysAvailableOnCalendarToSearch = 548;
        var hotelSalesRestRuleFrom = valSalesRestRules('HotelProduct', 'from')
        $("input[id='txtHotelDateFrom']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $HotelAdvancedPurchaseDays,
            maxDate: hotelDaysAvailableOnCalendarToSearch - 1,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, hotelSalesRestRuleFrom, $("input[id='txtHotelDateFrom']", $(tabwidget)), $("input[id='txtHotelDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtHotelDateFrom', getResource("DateCheckin"));
                }, 5);
            }
        });
        var hotelSalesRestRuleTo = valSalesRestRules('HotelProduct', 'to');
        $("input[id='txtHotelDateTo']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $HotelAdvancedPurchaseDays,
            maxDate: $HotelAdvancedPurchaseDays,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, hotelSalesRestRuleTo, $("input[id='txtHotelDateFrom']", $(tabwidget)), $("input[id='txtHotelDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtHotelDateTo', getResource("DateCheckout"));
                }, 5);
            }
        });
        $("input[id='txtHotelDateFrom']", $(tabwidget)).change(function () {
            var minDateTo_hotel = new Date(
                $.datepicker.formatDate('yy', $("input[id='txtHotelDateFrom']", $(tabwidget)).datepicker('getDate')),
                $.datepicker.formatDate('mm', $("input[id='txtHotelDateFrom']", $(tabwidget)).datepicker('getDate')) * 1 - 1,
                $.datepicker.formatDate('dd', $("input[id='txtHotelDateFrom']", $(tabwidget)).datepicker('getDate')) * 1
            );

            var maxDateTo_hotel = minDateTo_hotel;
            minDateTo_hotel = addDays(minDateTo_hotel, 1);

            var _maxDaysAllowedSelected = 30;
            var today = new Date();
            var diff = Math.floor((minDateTo_hotel - today) / (1000 * 60 * 60 * 24));
            if (diff >= ((hotelDaysAvailableOnCalendarToSearch) - _maxDaysAllowedSelected)) {
                _maxDaysAllowedSelected = _maxDaysAllowedSelected - (diff - ((hotelDaysAvailableOnCalendarToSearch) - _maxDaysAllowedSelected));
            }

            maxDateTo_hotel = addDays(maxDateTo_hotel, _maxDaysAllowedSelected);

            $("input[id='txtHotelDateTo']", $(tabwidget)).datepicker("option", "minDate", minDateTo_hotel);
            $("input[id='txtHotelDateTo']", $(tabwidget)).datepicker("option", "maxDate", maxDateTo_hotel);

        });


        // Button Search On Click
        $("input[id='btnSearchHotel']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/Hotel";
                var city = ($("select[id='ddlHotelCity']", $(tabwidget)).is(':visible')) ? $("select[id='ddlHotelCity']", $(tabwidget)).val() : getIATACode($("input[id='txtHotelCity']", $(tabwidget)).val());
                var paxRoom = getPaxByArray(JSON.parse($("input[id='hdnHotelPassengers']", $(tabwidget)).val()), 'Hotel')
                var hotelCode = "NA";
                var promoCode = $("input[id='txtHotelPromoCode']", $(tabwidget)).val();

                if (city.indexOf("|") > 0) {

                    var arrCity = city.split("|");
                    city = arrCity[0];
                    hotelCode = arrCity[1];
                }

                url += "/" + city;
                url += "/" + $.datepicker.formatDate("yy-mm-dd", $("input[id='txtHotelDateFrom']").datepicker("getDate"));
                url += "/" + $.datepicker.formatDate("yy-mm-dd", $("input[id='txtHotelDateTo']").datepicker("getDate"));
                url += "/" + paxRoom;
                url += "/" + hotelCode;

                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }

}

function initCarProduct(tabwidget) {

    if ($("div[id='car']", $(tabwidget)).length > 0) {

        // Checked Return Type
        $("input[id='chkCarChangeReturn']", $(tabwidget)).prop('checked', false);
        changeReturnType(tabwidget, 'Same');

        // On click events
        $("input[id='txtCarDatePickup']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DatePickup"));
        });
        $("input[id='txtCarDateDropoff']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDropoff"));
        });

        // On change events
        $("input[id='chkCarChangeReturn']", $(tabwidget)).change(function () {
            if ($(this).prop('checked')) {
                changeReturnType(tabwidget, 'Distinct');
                $("input[id='txtCarAirportReturn']", $(tabwidget)).focus();

                if ($IsMobile)
                    setMobileFocus(tabwidget, 'txtCarAirportPickup');
            } else {
                changeReturnType(tabwidget, 'Same');
            }
        });

        // Init Inputs
        $("select[id='ddlCarTimePickup'] option[value='1000']", $(tabwidget)).prop('selected', true);

        $("select[id='ddlCarTimeDropoff'] option[value='1000']", $(tabwidget)).prop('selected', true);


        // Hide elements
        $("div[id='divCarAirportReturn']", $(tabwidget)).hide();
        if (!$PromoCodeAllowed) {
            $("div[id='divCarTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtCarPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Clean elements
        cleanElements($("div[id='car'] input", $(tabwidget)));

        // Init Autocomplete
        $("input[id='txtCarAirportPickup']", $(tabwidget)).netautocomplete('init', {
            type: "Airports",
            showExcluded: false
        });
        $("input[id='txtCarAirportReturn']", $(tabwidget)).netautocomplete('init', {
            type: "Airports",
            showExcluded: false
        });
        $("input[id='txtCarAirportPickup']", $(tabwidget)).click(function () {
            this.setSelectionRange(0, this.value.length);
        });
        $("input[id='txtCarAirportReturn']", $(tabwidget)).click(function () {
            this.setSelectionRange(0, this.value.length);
        });

        // Geolocation
        var carGeo = filterList($GeoLocationProducts, 'CarProduct');
        if (carGeo.length > 0 && carGeo[0].Enabled)
            setGeolocationCity('txtCarAirportPickup', tabwidget);

        // Init Datepickers
        var carSalesRestRuleFrom = valSalesRestRules('CarProduct', 'from');
        $("input[id='txtCarDatePickup']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $VehicleAdvancedPurchaseDays,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, carSalesRestRuleFrom, $("input[id='txtCarDatePickup']", $(tabwidget)), $("input[id='txtCarDateDropoff']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtCarDatePickup', getResource("DatePickup"));
                }, 5);
            }
        });
        var carSalesRestRuleTo = valSalesRestRules('CarProduct', 'to');
        $("input[id='txtCarDateDropoff']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $VehicleAdvancedPurchaseDays,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, carSalesRestRuleTo, $("input[id='txtCarDatePickup']", $(tabwidget)), $("input[id='txtCarDateDropoff']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtCarDateDropoff', getResource("DateDropoff"));
                }, 5);
            }
        });
        $("input[id='txtCarDatePickup']", $(tabwidget)).change(function () {
            $("input[id='txtCarDateDropoff']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtCarDatePickup']", $(tabwidget)).datepicker('getDate'));

        });

        // Button Search On Click
        $("input[id='btnSearchCar']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/Car";
                var promoCode = $("input[id='txtCarPromoCode']", $(tabwidget)).val();

                url += "/" + getIATACode($("input[id='txtCarAirportPickup']", $(tabwidget)).val());
                url += "/" + $.datepicker.formatDate("yy-mm-dd", $("input[id='txtCarDatePickup']").datepicker("getDate"));
                url += "/" + $("select[id='ddlCarTimePickup']").val();

                if ($("input[id='txtCarAirportReturn']", $(tabwidget)).is(":visible")) {
                    url += "/" + getIATACode($("input[id='txtCarAirportReturn']", $(tabwidget)).val());
                } else {
                    url += "/" + getIATACode($("input[id='txtCarAirportPickup']", $(tabwidget)).val());
                }

                url += "/" + $.datepicker.formatDate("yy-mm-dd", $("input[id='txtCarDateDropoff']").datepicker("getDate"));
                url += "/" + $("select[id='ddlCarTimeDropoff']").val();

                if ($("input[id='divCarTogglePromoCode']", $(tabwidget)).is(":visible")) {
                    url += "/" + $("input[id='txtCarPromoCode']", $(tabwidget)).val() + "/NA/NA";
                } else {
                    url += "/NA/NA/NA";
                }

                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }
}

function initExtraProduct(tabwidget) {

    if ($("div[id='extra']", $(tabwidget)).length > 0) {

        // On click events
        $("input[id='txtExtraDateFrom']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtExtraDateTo']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateArrival"));
        });

        // Hide elements
        if (!$PromoCodeAllowed) {
            $("div[id='divExtraTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtExtraPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Load Cities
        var extraCities = filterListCode($ListCodes, 'ExtraProduct', null);
        if (extraCities.length > 0) {
            convertArrayToArrayCodeName(extraCities, 'ListCodes').forEach(function (item) {
                $("select[id='ddlExtraCity']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divExtraCityControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlExtraCity']", $(tabwidget)).show();
            $("select[id='ddlExtraCity']", $(tabwidget)).change(function () {
                setTimeout(function () {
                    showDatePick(tabwidget, 'txtExtraDateFrom', getResource("DateDeparture"));
                }, 10);
            });
        } else {

            var extraGeo = filterList($GeoLocationProducts, 'ExtraProduct');
            if (extraGeo.length > 0 && extraGeo[0].Enabled)
                setGeolocationCity('txtExtraCity', tabwidget);

            $("input[id='txtExtraCity']", $(tabwidget)).show();
        }

        // Load Extra Types
        if ($("div[id='divExtraTypes']", $(tabwidget)).length > 0) {
            var extraTypes = eval($("input[id='ExtraProduct_Types']").val());
            var indexBreak = Math.floor(extraTypes.length / 2);
            var strHtml = "";
            var j = 1;

            for (var i = 0; i < extraTypes.length; i++) {
                strHtml += "<span><input type=\"checkbox\" value=\"" + extraTypes[i].TypeId + "\" id=\"chkExtraType_" + extraTypes[i].TypeId + "\">&nbsp;" + extraTypes[i].Name + "</span><br />"

                if (i == indexBreak) {
                    $("div[id='divExtraTypesCol" + j + "']", $(tabwidget)).html(strHtml);
                    strHtml = "";
                    j++;
                }
            }

            $("div[id='divExtraTypesCol" + j + "']", $(tabwidget)).html(strHtml);
        }

        // Clean elements
        cleanElements($("div[id='extra'] input", $(tabwidget)));

        // Init Autocomplete
        if (extraCities.length == 0) {
            $("input[id='txtExtraCity']", $(tabwidget)).netautocomplete('init', {
                type: "Cities",
                showExcluded: false
            });
            $("input[id='txtExtraCity']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Init Datepickers
        var extraSalesRestRuleFrom = valSalesRestRules('ExtraProduct', 'from');
        $("input[id='txtExtraDateFrom']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $TravelExtraAdvancedPurchaseDays,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, extraSalesRestRuleFrom, $("input[id='txtExtraDateFrom']", $(tabwidget)), $("input[id='txtExtraDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtExtraDateFrom', getResource("DateDeparture"));
                }, 5);
            }
        });
        var extraSalesRestRuleTo = valSalesRestRules('ExtraProduct', 'to');
        $("input[id='txtExtraDateTo']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: 0,
            maxDate: 0,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, extraSalesRestRuleTo, $("input[id='txtExtraDateFrom']", $(tabwidget)), $("input[id='txtExtraDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtExtraDateTo', getResource("DateArrival"));
                }, 5);
            }
        });
        $("input[id='txtExtraDateFrom']", $(tabwidget)).change(function () {
            var numRangeDays = Math.floor((new Date($("input[id='txtExtraDateFrom']", $(tabwidget)).datepicker('getDate') - new Date())) / 86400000);
            var maxDateTo = numRangeDays + $TravelExtraMaxDaysAllowedSearch;

            $("input[id='txtExtraDateTo']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtExtraDateFrom']", $(tabwidget)).datepicker('getDate'));
            $("input[id='txtExtraDateTo']", $(tabwidget)).datepicker("option", "maxDate", '+' + maxDateTo + 'd');

        });


        // Button Search On Click
        $("input[id='btnSearchExtra']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/Extras";
                var city = ($("select[id='ddlExtraCity']", $(tabwidget)).is(':visible')) ? $("select[id='ddlExtraCity']", $(tabwidget)).val() : getIATACode($("input[id='txtExtraCity']", $(tabwidget)).val());
                var promoCode = $("input[id='txtExtraPromoCode']", $(tabwidget)).val();

                var extrasTypes = "";
                $("div[id='divExtraTypes'] input[type='checkbox']:checked").each(function () {
                    extrasTypes += $(this).attr('value') + ",";
                });
                extrasTypes = (extrasTypes != "") ? extrasTypes.slice(0, -1) : "NA";

                var dateFrom = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtExtraDateFrom']").datepicker("getDate"));
                datefrom = (dateFrom != "") ? dateFrom : "NA";
                var dateTo = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtExtraDateTo']").datepicker("getDate"));
                dateTo = (dateTo != "") ? dateTo : "NA";

                url += "/" + city;
                url += "/" + extrasTypes;
                url += "/" + dateFrom;
                url += "/" + dateTo;
                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }
}

function initAirHotelProduct(tabwidget) {

    if ($("div[id='airhotel']", $(tabwidget)).length > 0) {

        // On click events
        $("a[id='airHotelPopUpBtn']", $(tabwidget)).click(function () {
            openPopUp(tabwidget, 'AirHotelPaxPopUp', 'paxRoomPopUp', 'AirHotel');
        });
        $("input[id='txtAirHotelDateFrom']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirHotelDateTo']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateArrival"));
        });

        // Data validators
        var maxMessage = $("input[id='txtAirHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger");
        $("input[id='txtAirHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger", maxMessage.replace('{0}', $MaxPassengerSearch));
        $("input[id='txtAirHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator", "validateMaxPassenger[" + tabwidget + ":AirHotel:" + $MaxPassengerSearch + "], validateQuantityInfants[" + tabwidget + ":AirHotel]");

        // Hide elements
        if (!$PromoCodeAllowed) {
            $("div[id='divAirHotelTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtAirHotelPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Load Cities
        var airHotelCitiesFrom = filterListCode($ListCodes, 'AirHotelProduct', 'Departure');
        var airHotelCitiesTo = filterListCode($ListCodes, 'AirHotelProduct', 'Arrival');

        // Load Cities From
        if (airHotelCitiesFrom.length > 0) {
            convertArrayToArrayCodeName(airHotelCitiesFrom, 'ListCodes').forEach(function (item) {

                $("select[id='ddlAirHotelCityFrom']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divAirHotelCityFromControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlAirHotelCityFrom']", $(tabwidget)).show();
            $("select[id='ddlAirHotelCityFrom']", $(tabwidget)).change(function () {
                setTimeout(function () {
                    if (!airHotelCitiesTo.length > 0) {
                        $("div[id='divAirHotelCityToControlMobile']", $(tabwidget)).trigger("click");
                    }
                }, 10);
            });
        } else {

            var airHotelGeo = filterList($GeoLocationProducts, 'AirHotelProduct');
            if (airHotelGeo.length > 0 && airHotelGeo[0].Enabled)
                setGeolocationCity('txtAirHotelCityFrom', tabwidget);

            $("input[id='txtAirHotelCityFrom']", $(tabwidget)).show();
        }

        // Load Cities To
        if (airHotelCitiesTo.length > 0) {
            convertArrayToArrayCodeName(airHotelCitiesTo, 'ListCodes').forEach(function (item) {

                $("select[id='ddlAirHotelCityTo']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divAirHotelCityToControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlAirHotelCityTo']", $(tabwidget)).show();
        } else {
            $("input[id='txtAirHotelCityTo']", $(tabwidget)).show();
        }

        // Load Airlines

        var arrPreferredAirline = $("input[id='hdAirHotelPreferredAirlines']", $(tabwidget)).val().split(',');
        var preferedAirlines = external_file_Airlines.sort().filter(function (airline) {
            return (arrPreferredAirline.indexOf(airline.substring(airline.indexOf("("), airline.indexOf(")") + 1)) >= 0);
        });

        var normalAirlines = external_file_Airlines.sort().filter(function (airline) {
            return (arrPreferredAirline.indexOf(airline.substring(airline.indexOf("("), airline.indexOf(")") + 1)) < 0);
        });
        if (preferedAirlines.length > 0) {            convertArrayToArrayCodeName(preferedAirlines, 'AutoComplete').forEach(function (item) {
                $("select[id='ddlAirHotelAirline']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name.toLowerCase() + " (" + item.Code + ")"
                }));
            });

            $("select[id='ddlAirHotelAirline']", $(tabwidget)).append('<option data-divider="true"></option>');
        }
        convertArrayToArrayCodeName(normalAirlines, 'AutoComplete').forEach(function (item) {
            $("select[id='ddlAirHotelAirline']", $(tabwidget)).append($('<option>', {
                value: item.Code,
                text: item.Name.toLowerCase() + " (" + item.Code + ")"
            }));
        });

        if (preferedAirlines.length > 0) {
            $("select[id='ddlAirHotelAirline']", $(tabwidget)).selectpicker();
            $("select[id='ddlAirHotelAirline']", $(tabwidget)).selectpicker('setStyle', 'form-control special-options-input selectpicker', 'add');
        }

        // Clean elements
        cleanElements($("div[id='airhotel'] input", $(tabwidget)));
        $("input[id='txtAirHotelNumberRooms']", $(tabwidget)).val("1");
        $("input[id='txtAirHotelNumberPassenger']", $(tabwidget)).val("1");
        $("input[id='hdnAirHotelPassengers']", $(tabwidget)).val(JSON.stringify($jsonArrayPaxRoom));

        // Init Autocomplete
        if (airHotelCitiesFrom.length == 0) {
            $("input[id='txtAirHotelCityFrom']", $(tabwidget)).netautocomplete('init', {
                type: "AirportsCities",
                showExcluded: false
            });
            $("input[id='txtAirHotelCityFrom']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }
        if (airHotelCitiesTo.length == 0) {
            $("input[id='txtAirHotelCityTo']", $(tabwidget)).netautocomplete('init', {
                type: "AirportsCities",
                showExcluded: false
            });
            $("input[id='txtAirHotelCityTo']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Init Datepickers
        var airHotelAdvancedPurchaseDays = ($AirAdvancedPurchaseDays > $HotelAdvancedPurchaseDays) ? $AirAdvancedPurchaseDays : $HotelAdvancedPurchaseDays;
        var airHotelDaysAvailableOnCalendarToSearch = 355;
        var airHotelSalesRestRuleFrom = valSalesRestRules('AirHotelProduct', 'from');
        $("input[id='txtAirHotelDateFrom']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: airHotelAdvancedPurchaseDays,
            maxDate: airHotelDaysAvailableOnCalendarToSearch,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, airHotelSalesRestRuleFrom, $("input[id='txtAirHotelDateFrom']", $(tabwidget)), $("input[id='txtAirHotelDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtAirHotelDateFrom', getResource("DateDeparture"));
                }, 5);
            }
        });
        var airHotelSalesRestRuleTo = valSalesRestRules('AirHotelProduct', 'to');
        $("input[id='txtAirHotelDateTo']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: airHotelAdvancedPurchaseDays,
            maxDate: airHotelAdvancedPurchaseDays + 29,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, airHotelSalesRestRuleTo, $("input[id='txtAirHotelDateFrom']", $(tabwidget)), $("input[id='txtAirHotelDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtAirHotelDateTo', getResource("DateArrival"));
                }, 5);
            }
        });
        $("input[id='txtAirHotelDateFrom']", $(tabwidget)).change(function () {
            airHotelAdvancedPurchaseDays = new Date(
                $.datepicker.formatDate('yy', $("input[id='txtAirHotelDateFrom']", $(tabwidget)).datepicker('getDate')),
                $.datepicker.formatDate('mm', $("input[id='txtAirHotelDateFrom']", $(tabwidget)).datepicker('getDate')) * 1 - 1,
                $.datepicker.formatDate('dd', $("input[id='txtAirHotelDateFrom']", $(tabwidget)).datepicker('getDate')) * 1 + 1
            );
            $("input[id='txtAirHotelDateTo']", $(tabwidget)).datepicker("option", "minDate", airHotelAdvancedPurchaseDays);
            $("input[id='txtAirHotelDateTo']", $(tabwidget)).datepicker("option", "maxDate", addDays(airHotelAdvancedPurchaseDays, 29));
        });

        // Button Search On Click
        $("input[id='btnSearchAirHotel']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/Package";
                var cityFrom = ($("select[id='ddlAirHotelCityFrom']", $(tabwidget)).is(':visible')) ? $("select[id='ddlAirHotelCityFrom']", $(tabwidget)).val() : getIATACode($("input[id='txtAirHotelCityFrom']", $(tabwidget)).val());
                var cityTo = ($("select[id='ddlAirHotelCityTo']", $(tabwidget)).is(':visible')) ? $("select[id='ddlAirHotelCityTo']", $(tabwidget)).val() : getIATACode($("input[id='txtAirHotelCityTo']", $(tabwidget)).val());
                var dateFrom = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirHotelDateFrom']", $(tabwidget)).datepicker("getDate"));
                var dateTo = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirHotelDateTo']").datepicker("getDate"));
                var airPax = getPaxByArray(JSON.parse($("input[id='hdnAirHotelPassengers']", $(tabwidget)).val()), 'Air')
                var hotelPax = getPaxByArray(JSON.parse($("input[id='hdnAirHotelPassengers']", $(tabwidget)).val()), 'Hotel')
                var baggageIncluded = ($("input[id='chkAirHotelBaggageIncluded']", $(tabwidget)).is(':visible') && $("input[id='chkAirHotelBaggageIncluded']", $(tabwidget)).prop('checked')) ? "true" : "false";
                var promoCode = $("input[id='txtAirHotelPromoCode']", $(tabwidget)).val();
                var airline = ($("select[id='ddlAirHotelAirline']", $(tabwidget)).val() != "") ? $("select[id='ddlAirHotelAirline']", $(tabwidget)).val() : "NA";
                var typeCabin = ($("select[id='ddlAirHotelTypeCabin']", $(tabwidget)).val() != "") ? $("select[id='ddlAirHotelTypeCabin']", $(tabwidget)).val() : "Economy";
                var timeFrom = ($("select[id='ddlAirHotelDepartureTime']", $(tabwidget)).val() != "") ? $("select[id='ddlAirHotelDepartureTime']", $(tabwidget)).val() : "NA";
                var timeTo = ($("select[id='ddlAirHotelReturnTime']", $(tabwidget)).val() != "") ? $("select[id='ddlAirHotelReturnTime']", $(tabwidget)).val() : "NA";

                url += "/" + cityFrom;
                url += "/" + cityTo;

                // Bus parameters
                url += "/" + dateFrom;
                url += "/" + dateTo;
                url += "/" + airPax;

                // Hotel parameters
                url += "/" + dateFrom;
                url += "/" + dateTo;
                url += "/" + hotelPax;

                url += "/" + baggageIncluded;
                url += "/" + airline;
                url += "/" + typeCabin;

                if (timeFrom == "NA" && timeTo == "NA")
                    url += "/NA";
                else
                    url += "/" + timeFrom + "," + timeTo;

                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }
}

function initBusProduct(tabwidget) {

    if ($("div[id='bus']", $(tabwidget)).length > 0) {

        // Checked Round Trip Type
        $("input[name='BusTripType']:eq(0)", $(tabwidget)).prop('checked', true);
        changeTripType(tabwidget, 'Bus', 'RT');

        // On click events
        $("input[id='rdBusTripTypeRT']", $(tabwidget)).click(function () {
            changeTripType(tabwidget, 'Bus', 'RT');
        });
        $("input[id='rdBusTripTypeOW']", $(tabwidget)).click(function () {
            changeTripType(tabwidget, 'Bus', 'OW');
        });
        $("a[id='busPopUpBtn']", $(tabwidget)).click(function () {
            openPopUp(tabwidget, 'BusPaxPopUp', 'paxPopUp', 'Bus');
        });
        $("input[id='txtBusDateFrom']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtBusDateTo']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateArrival"));
        });

        // Data validators
        var maxMessage = $("input[id='txtBusNumberPassenger']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger");
        $("input[id='txtBusNumberPassenger']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger", maxMessage.replace('{0}', $MaxPassengerSearch));
        $("input[id='txtBusNumberPassenger']", $(tabwidget)).attr("data-bvalidator", "validateMaxPassenger[" + tabwidget + ":Bus:" + $MaxPassengerSearch + "], validateQuantityInfants[" + tabwidget + ":Bus]");

        // Hide elements
        if (!$PromoCodeAllowed) {
            $("div[id='divBusTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtBusPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Load Bus Companies
        convertArrayToArrayCodeName(external_file_BusCompanies, 'AutoComplete').forEach(function (item) {
            $("select[id='ddlBusCompany']", $(tabwidget)).append($('<option>', {
                value: item.Code,
                text: item.Name
            }));
        });

        // Clean elements
        cleanElements($("div[id='bus'] input", $(tabwidget)));
        $("input[id='txtBusNumberPassenger']", $(tabwidget)).val("1");
        $("input[id='hdnBusPassengers']", $(tabwidget)).val(JSON.stringify($jsonPax));

        // Init Autocomplete
        $("input[id='txtBusCityFrom']", $(tabwidget)).netautocomplete('init', {
            type: "Cities",
            showExcluded: false
        });
        $("input[id='txtBusCityTo']", $(tabwidget)).netautocomplete('init', {
            type: "Cities",
            showExcluded: false
        });
        $("input[id='txtBusCityFrom']", $(tabwidget)).click(function () {
            this.setSelectionRange(0, this.value.length);
        });
        $("input[id='txtBusCityTo']", $(tabwidget)).click(function () {
            this.setSelectionRange(0, this.value.length);
        });

        var busGeo = filterList($GeoLocationProducts, 'BusProduct');
        if (busGeo.length > 0 && busGeo[0].Enabled)
            setGeolocationCity('txtBusCityFrom', tabwidget);

        // Init Datepickers
        var busSalesRestRuleFrom = valSalesRestRules('BusProduct', 'from');
        $("input[id='txtBusDateFrom']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $AirAdvancedPurchaseDays,
            maxDate: 355,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, busSalesRestRuleFrom, $("input[id='txtBusDateFrom']", $(tabwidget)), $("input[id='txtBusDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtBusDateFrom', getResource("DateDeparture"));
                }, 5);
            }
        });
        var busSalesRestRuleTo = valSalesRestRules('BusProduct', 'to');
        $("input[id='txtBusDateTo']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: 0,
            maxDate: 355,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, busSalesRestRuleTo, $("input[id='txtBusDateFrom']", $(tabwidget)), $("input[id='txtBusDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtBusDateTo', getResource("DateArrival"));
                }, 5);
            }
        });
        $("input[id='txtBusDateFrom']", $(tabwidget)).change(function () {
            $("input[id='txtBusDateTo']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtBusDateFrom']", $(tabwidget)).datepicker('getDate'));

        });


        // Button Search On Click
        $("input[id='btnSearchBus']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/Bus";
                var cityFrom = getIATACode($("input[id='txtBusCityFrom']", $(tabwidget)).val());
                var cityTo = getIATACode($("input[id='txtBusCityTo']", $(tabwidget)).val());
                var dateFrom = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtBusDateFrom']").datepicker("getDate"));
                var dateTo = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtBusDateTo']").datepicker("getDate"));
                var pax = JSON.parse($("input[id='hdnBusPassengers']").val());
                var busCompany = ($("select[id='ddlBusCompany']", $(tabwidget)).val() != "") ? $("select[id='ddlBusCompany']", $(tabwidget)).val() : "NA";
                var timeFrom = ($("select[id='ddlBusDepartureTime']", $(tabwidget)).val() != "") ? $("select[id='ddlBusDepartureTime']", $(tabwidget)).val() : "NA";
                var timeTo = ($("select[id='ddlBusReturnTime']", $(tabwidget)).val() != "") ? $("select[id='ddlBusReturnTime']", $(tabwidget)).val() : "NA";
                var promoCode = $("input[id='txtBusPromoCode']", $(tabwidget)).val();

                switch ($("input[name='BusTripType']:checked").val()) {
                    case "OW":

                        url += "/OW";
                        url += "/" + cityFrom;
                        url += "/" + cityTo
                        url += "/" + dateFrom;
                        url += "/" + pax.Adults;
                        url += "/" + pax.Childs;
                        url += "/" + pax.Infants;
                        url += "/" + busCompany;
                        url += "/" + timeFrom;

                        break;
                    case "RT":

                        url += "/RT";
                        url += "/" + cityFrom;
                        url += "/" + cityTo
                        url += "/" + dateFrom;
                        url += "/" + dateTo;
                        url += "/" + pax.Adults;
                        url += "/" + pax.Childs;
                        url += "/" + pax.Infants;
                        url += "/" + busCompany;

                        if (timeFrom != "NA" && timeTo != "NA") {
                            url += "/" + timeFrom + "," + timeTo;
                        } else if (timeFrom != "NA" && timeTo == "NA") {
                            url += "/" + timeFrom + ",NA";
                        } else if (timeFrom == "NA" && timeTo != "NA") {
                            url += "/NA," + timeTo;
                        } else {
                            url += "/NA";
                        }

                        break;
                }

                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }
}

function initBusHotelProduct(tabwidget) {

    if ($("div[id='bushotel']", $(tabwidget)).length > 0) {

        // On click events
        $("a[id='busHotelPopUpBtn']", $(tabwidget)).click(function () {
            openPopUp(tabwidget, 'BusHotelPaxPopUp', 'paxRoomPopUp', 'BusHotel');
        });
        $("input[id='txtBusHotelDateFrom']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtBusHotelDateTo']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateArrival"));
        });

        // Data validators
        var maxMessage = $("input[id='txtBusHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger");
        $("input[id='txtBusHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger", maxMessage.replace('{0}', $MaxPassengerSearch));
        $("input[id='txtBusHotelNumberRooms']", $(tabwidget)).attr("data-bvalidator", "validateMaxPassenger[" + tabwidget + ":BusHotel:" + $MaxPassengerSearch + "]");

        // Hide elements
        if (!$PromoCodeAllowed) {
            $("div[id='divBusHotelTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtBusHotelPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Load Cities
        var busHotelCitiesFrom = filterListCode($ListCodes, 'BusHotelProduct', 'Departure');
        var busHotelCitiesTo = filterListCode($ListCodes, 'BusHotelProduct', 'Arrival');

        // Load Cities From
        if (busHotelCitiesFrom.length > 0) {
            convertArrayToArrayCodeName(busHotelCitiesFrom, 'ListCodes').forEach(function (item) {

                $("select[id='ddlBusHotelCityFrom']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divBusHotelCityFromControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlBusHotelCityFrom']", $(tabwidget)).show();
            $("select[id='ddlBusHotelCityFrom']", $(tabwidget)).change(function () {
                setTimeout(function () {
                    if (busHotelCitiesTo.length > 0) {
                        $("select[id='ddlBusHotelCityTo']", $(tabwidget)).focus();
                    } else {
                        $("input[id='txtBusHotelCityTo']", $(tabwidget)).focus();
                        $("div[id='divBusHotelCityToControlMobile']", $(tabwidget)).trigger("click");
                    }
                }, 10);
            });
        } else {

            var busHotelGeo = filterList($GeoLocationProducts, 'BusHotelProduct');
            if (busHotelGeo.length > 0 && busHotelGeo[0].Enabled)
                setGeolocationCity('txtBusHotelCityFrom', tabwidget);

            $("input[id='txtBusHotelCityFrom']", $(tabwidget)).show();
        }

        // Load Cities To
        if (busHotelCitiesTo.length > 0) {
            convertArrayToArrayCodeName(busHotelCitiesTo, 'ListCodes').forEach(function (item) {

                $("select[id='ddlBusHotelCityTo']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divBusHotelCityToControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlBusHotelCityTo']", $(tabwidget)).show();
        } else {
            $("input[id='txtBusHotelCityTo']", $(tabwidget)).show();
        }

        // Clean elements
        cleanElements($("div[id='bushotel'] input", $(tabwidget)));
        $("input[id='txtBusHotelNumberRooms']", $(tabwidget)).val("1");
        $("input[id='txtBusHotelNumberPassenger']", $(tabwidget)).val("1");
        $("input[id='hdnBusHotelPassengers']", $(tabwidget)).val(JSON.stringify($jsonArrayPaxRoom));

        // Init Autocomplete
        if (busHotelCitiesFrom.length == 0) {
            $("input[id='txtBusHotelCityFrom']", $(tabwidget)).netautocomplete('init', {
                type: "Cities",
                showExcluded: false
            });
            $("input[id='txtBusHotelCityFrom']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }
        if (busHotelCitiesTo.length == 0) {
            $("input[id='txtBusHotelCityTo']", $(tabwidget)).netautocomplete('init', {
                type: "Cities",
                showExcluded: false
            });
            $("input[id='txtBusHotelCityTo']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }

        // Init Datepickers
        var busHotelAdvancedPurchaseDays = ($AirAdvancedPurchaseDays > $HotelAdvancedPurchaseDays) ? $AirAdvancedPurchaseDays : $HotelAdvancedPurchaseDays;
        var busHotelSalesRestRuleFrom = valSalesRestRules('BusHotelProduct', 'from');
        $("input[id='txtBusHotelDateFrom']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: busHotelAdvancedPurchaseDays,
            maxDate: 312,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, busHotelSalesRestRuleFrom, $("input[id='txtBusHotelDateFrom']", $(tabwidget)), $("input[id='txtBusHotelDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtBusHotelDateFrom', getResource("DateDeparture"));
                }, 5);
            }
        });
        var busHotelSalesRestRuleTo = valSalesRestRules('BusHotelProduct', 'to');
        $("input[id='txtBusHotelDateTo']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: busHotelAdvancedPurchaseDays,
            maxDate: busHotelAdvancedPurchaseDays + 29,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {
                return getPaintedDates(date, busHotelSalesRestRuleTo, $("input[id='txtBusHotelDateFrom']", $(tabwidget)), $("input[id='txtBusHotelDateTo']", $(tabwidget)));
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtBusHotelDateTo', getResource("DateArrival"));
                }, 5);
            }
        });
        $("input[id='txtBusHotelDateFrom']", $(tabwidget)).change(function () {
            busHotelAdvancedPurchaseDays = new Date(
                $.datepicker.formatDate('yy', $("input[id='txtBusHotelDateFrom']", $(tabwidget)).datepicker('getDate')),
                $.datepicker.formatDate('mm', $("input[id='txtBusHotelDateFrom']", $(tabwidget)).datepicker('getDate')) * 1 - 1,
                $.datepicker.formatDate('dd', $("input[id='txtBusHotelDateFrom']", $(tabwidget)).datepicker('getDate')) * 1 + 1
            );
            $("input[id='txtBusHotelDateTo']", $(tabwidget)).datepicker("option", "minDate", busHotelAdvancedPurchaseDays);
            $("input[id='txtBusHotelDateTo']", $(tabwidget)).datepicker("option", "maxDate", addDays(busHotelAdvancedPurchaseDays, 29));
        });

        // Button Search On Click
        $("input[id='btnSearchBusHotel']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/PackageBus";
                var cityFrom = ($("select[id='ddlBusHotelCityFrom']", $(tabwidget)).is(':visible')) ? $("select[id='ddlBusHotelCityFrom']", $(tabwidget)).val() : getIATACode($("input[id='txtBusHotelCityFrom']", $(tabwidget)).val());
                var cityTo = ($("select[id='ddlBusHotelCityTo']", $(tabwidget)).is(':visible')) ? $("select[id='ddlBusHotelCityTo']", $(tabwidget)).val() : getIATACode($("input[id='txtBusHotelCityTo']", $(tabwidget)).val());
                var dateFrom = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtBusHotelDateFrom']", $(tabwidget)).datepicker("getDate"));
                var dateTo = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtBusHotelDateTo']", $(tabwidget)).datepicker("getDate"));
                var busPax = getPaxByArray(JSON.parse($("input[id='hdnBusHotelPassengers']", $(tabwidget)).val()), 'Bus')
                var hotelPax = getPaxByArray(JSON.parse($("input[id='hdnBusHotelPassengers']", $(tabwidget)).val()), 'Hotel')
                var promoCode = $("input[id='txtBusHotelPromoCode']", $(tabwidget)).val();

                url += "/" + cityFrom;
                url += "/" + cityTo;

                // Bus parameters
                url += "/" + dateFrom;
                url += "/" + dateTo;
                url += "/" + busPax;

                // Hotel parameters
                url += "/" + dateFrom;
                url += "/" + dateTo;
                url += "/" + hotelPax;

                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }
}

function initAirCarProduct(tabwidget) {

    if ($("div[id='aircar']", $(tabwidget)).length > 0) {

        // On click events
        $("a[id='airCarPopUpBtn']", $(tabwidget)).click(function () {
            openPopUp(tabwidget, 'AirCarPaxPopUp', 'paxPopUp', 'AirCar');
        });
        $("input[id='txtAirCarDateFrom']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateDeparture"));
        });
        $("input[id='txtAirCarDateTo']", $(tabwidget)).click(function () {
            showDatePick(tabwidget, this.id, getResource("DateArrival"));
        });

        // Data validators
        var maxMessage = $("input[id='txtAirCarNumberPassenger']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger");
        $("input[id='txtAirCarNumberPassenger']", $(tabwidget)).attr("data-bvalidator-msg-validateMaxPassenger", maxMessage.replace('{0}', $MaxPassengerSearch));
        $("input[id='txtAirCarNumberPassenger']", $(tabwidget)).attr("data-bvalidator", "validateMaxPassenger[" + tabwidget + ":AirCar:" + $MaxPassengerSearch + "], validateQuantityInfants[" + tabwidget + ":AirCar]");

        // Hide elements
        if (!$PromoCodeAllowed) {
            $("div[id='divAirCarTogglePromoCode']", $(tabwidget)).hide();
        } else {
            $("input[id='txtAirCarPromoCode']", $(tabwidget)).click(function () {
                this.setSelectionRange(0, this.value.length);
            });
        }
        if (!$AirFlexDateEnabled) {
            $("div[id='divAirCarFlexDates']", $(tabwidget)).hide();
            $("div[id='divAirCarBaggageIncluded']", $(tabwidget)).removeClass('col-sm-6 col-md-6 col-lg-6');
            $("div[id='divAirCarBaggageIncluded']", $(tabwidget)).addClass('col-sm-12 col-md-12 col-lg-12');
        }

        // Load Airlines

        var arrPreferredAirline = $("input[id='hdAirCarPreferredAirlines']", $(tabwidget)).val().split(',');
        var preferedAirlines = external_file_Airlines.sort().filter(function (airline) {
            return (arrPreferredAirline.indexOf(airline.substring(airline.indexOf("("), airline.indexOf(")") + 1)) >= 0);
        });

        var normalAirlines = external_file_Airlines.sort().filter(function (airline) {
            return (arrPreferredAirline.indexOf(airline.substring(airline.indexOf("("), airline.indexOf(")") + 1)) < 0);
        });
        if (preferedAirlines.length > 0) {            convertArrayToArrayCodeName(preferedAirlines, 'AutoComplete').forEach(function (item) {
                $("select[id='ddlAirCarAirline']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name.toLowerCase() + " (" + item.Code + ")"
                }));
            });

            $("select[id='ddlAirCarAirline']", $(tabwidget)).append('<option data-divider="true"></option>');
        }
        convertArrayToArrayCodeName(normalAirlines, 'AutoComplete').forEach(function (item) {
            $("select[id='ddlAirCarAirline']", $(tabwidget)).append($('<option>', {
                value: item.Code,
                text: item.Name.toLowerCase() + " (" + item.Code + ")"
            }));
        });

        if (preferedAirlines.length > 0) {
            $("select[id='ddlAirCarAirline']", $(tabwidget)).selectpicker();
            $("select[id='ddlAirCarAirline']", $(tabwidget)).selectpicker('setStyle', 'form-control special-options-input selectpicker', 'add');
        }

        // Change Attributes
        if ($("div[id='divAirCarAccountCode']", $(tabwidget)).length > 0) {
            $("div[id='divAirCarDepartureTime']", $(tabwidget)).removeClass("fix-padding-left");
            $("div[id='divAirCarDepartureTime']", $(tabwidget)).addClass("fix-padding-right");
            $("div[id='divAirCarReturnTime']", $(tabwidget)).removeClass("fix-padding-right");
            $("div[id='divAirCarReturnTime']", $(tabwidget)).addClass("fix-padding-left");
        }

        // Load Cities
        var airCitiesFrom = filterListCode($ListCodes, 'AirCarProduct', 'Departure');
        var airCitiesTo = filterListCode($ListCodes, 'AirCarProduct', 'Arrival');

        // Init Autocomplete
        $("input[id='txtAirCarCityFrom']", $(tabwidget)).netautocomplete('init', {
            type: "AirportsCities",
            showExcluded: false
        });

        $("input[id='txtAirCarCityTo']", $(tabwidget)).netautocomplete('init', {
            type: "AirportsCities",
            showExcluded: false
        });

        // Load Cities From
        if (airCitiesFrom.length > 0) {

            convertArrayToArrayCodeName(airCitiesFrom, 'ListCodes').forEach(function (item) {

                $("select[id='ddlAirCarCityFrom']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divAirCarCityFromControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlAirCarCityFrom']", $(tabwidget)).show();
            $("select[id='ddlAirCarCityFrom']", $(tabwidget)).change(function () {
                setTimeout(function () {
                    if (airCitiesTo.length > 0) {
                        $("select[id='ddlAirCarCityTo']", $(tabwidget)).focus();
                    } else {
                        $("input[id='txtAirCarCityTo']", $(tabwidget)).focus();
                        $("div[id='divAirCarCityToControlMobile']", $(tabwidget)).trigger("click");
                    }
                }, 10);
            });
        } else {

            var airGeo = filterList($GeoLocationProducts, 'AirCarProduct');
            if (airGeo.length > 0 && airGeo[0].Enabled) {
                setGeolocationCity('txtAirCarCityFrom', tabwidget);
            }

            $("input[id='txtAirCarCityFrom']", $(tabwidget)).show();
        }

        // Load Cities To
        if (airCitiesTo.length > 0) {
            convertArrayToArrayCodeName(airCitiesTo, 'ListCodes').forEach(function (item) {

                $("select[id='ddlAirCarCityTo']", $(tabwidget)).append($('<option>', {
                    value: item.Code,
                    text: item.Name
                }));
            });
            $("div[id='divAirCarCityToControlMobile']", $(tabwidget)).hide();
            $("select[id='ddlAirCarCityTo']", $(tabwidget)).show();
        } else {
            $("input[id='txtAirCarCityTo']", $(tabwidget)).show();
        }

        // Clean elements
        cleanElements($("div[id='aircar'] input", $(tabwidget)));
        $("input[id='txtAirCarNumberPassenger']", $(tabwidget)).val("1");
        $("input[id='hdnAirCarPassengers']", $(tabwidget)).val(JSON.stringify($jsonPax));

        // Init Autocomplete
        initAirAutocomplete(tabwidget, airCitiesTo.length);
        $("input[id*='txtAirCarCity']", $(tabwidget)).click(function () {
            this.setSelectionRange(0, this.value.length);
        });

        // Init Datepickers
        var airSalesRestRuleFrom = valSalesRestRules('AirCarProduct', 'from');
        $("input[id*='txtAirCarDateFrom']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: $AirAdvancedPurchaseDays,
            maxDate: 355,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {

                if (this.id == "txtAirCarDateFrom")
                    return getPaintedDates(date, airSalesRestRuleFrom, $("input[id='txtAirCarDateFrom']", $(tabwidget)), $("input[id='txtAirCarDateTo']", $(tabwidget)));

                return [true];
            },
            onChangeMonthYear: function () {
                var txtId = this.id;

                setTimeout(function () {
                    addHeaderDatePick(tabwidget, txtId, getResource("DateDeparture"));
                }, 5);
            }
        });
        var airSalesRestRuleTo = valSalesRestRules('AirCarProduct', 'to');
        $("input[id='txtAirCarDateTo']", $(tabwidget)).datepicker({
            showOn: "none",
            minDate: 0,
            maxDate: 355,
            numberOfMonths: [1, 2],
            beforeShowDay: function (date) {

                if (this.id == "txtAirCarDateTo")
                    return getPaintedDates(date, airSalesRestRuleTo, $("input[id='txtAirCarDateFrom']", $(tabwidget)), $("input[id='txtAirCarDateTo']", $(tabwidget)));

                return [true];
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    addHeaderDatePick(tabwidget, 'txtAirCarDateTo', getResource("DateArrival"));
                }, 5);
            }
        });
        $("input[id='txtAirCarDateFrom']", $(tabwidget)).change(function () {
            $("input[id='txtAirCarDateTo']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txtAirCarDateFrom']", $(tabwidget)).datepicker('getDate'));

        });


        // Button Search On Click
        $("input[id='btnSearchAirCar']", $(tabwidget)).click(function (e) {

            if (!$(tabwidget).data('bValidator').validate()) {
                e.preventDefault();
            } else {
                if (!$IsLinkGenerator) {
                    $("div[id='divPreload']", $(tabwidget)).show();
                }

                var url = $UrlDomainNS + "/" + $CurrentCulture + "/AirCar";
                var cityFrom = ($("select[id='ddlAirCarCityFrom']", $(tabwidget)).is(':visible')) ? $("select[id='ddlAirCarCityFrom']", $(tabwidget)).val() : getIATACode($("input[id='txtAirCarCityFrom']", $(tabwidget)).val());
                var cityTo = ($("select[id='ddlAirCarCityTo']", $(tabwidget)).is(':visible')) ? $("select[id='ddlAirCarCityTo']", $(tabwidget)).val() : getIATACode($("input[id='txtAirCarCityTo']", $(tabwidget)).val());
                var dateFrom = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirCarDateFrom']").datepicker("getDate"));
                var dateTo = $.datepicker.formatDate("yy-mm-dd", $("input[id='txtAirCarDateTo']").datepicker("getDate"));
                var pax = JSON.parse($("input[id='hdnAirCarPassengers']", $(tabwidget)).val());
                var flexDates = ($("input[id='chkdivAirCarFlexDates']", $(tabwidget)).is(':visible') && $("input[id='chkdivAirCarFlexDates']", $(tabwidget)).prop('checked')) ? "3" : "NA";
                var airline = ($("select[id='ddlAirCarAirline']", $(tabwidget)).val() != "") ? $("select[id='ddlAirCarAirline']", $(tabwidget)).val() : "NA";
                var accountCode = ($("input[id='txtAirCarAccountCode']", $(tabwidget)).is(':visible') && $("input[id='txtAirCarAccountCode']", $(tabwidget)).val() != "") ? $("input[id='txtAirAccountCode']", $(tabwidget)).val() : "NA";
                var typeCabin = ($("select[id='ddlAirCarTypeCabin']", $(tabwidget)).val() != "") ? $("select[id='ddlAirCarTypeCabin']", $(tabwidget)).val() : "NA";
                var timeFrom = ($("select[id='ddlAirCarDepartureTime']", $(tabwidget)).val() != "") ? $("select[id='ddlAirCarDepartureTime']", $(tabwidget)).val() : "NA";
                var timeTo = ($("select[id='ddlAirCarReturnTime']", $(tabwidget)).val() != "") ? $("select[id='ddlAirCarReturnTime']", $(tabwidget)).val() : "NA";
                var baggageIncluded = ($("input[id='chkAirCarBaggageIncluded']", $(tabwidget)).is(':visible') && $("input[id='chkAirCarBaggageIncluded']", $(tabwidget)).prop('checked')) ? "true" : "false";
                var promoCode = $("input[id='txtAirCarPromoCode']", $(tabwidget)).val();

                url += "/" + cityFrom;
                url += "/" + cityTo
                url += "/" + dateFrom;
                url += "/" + dateTo;
                url += "/" + pax.Adults;
                url += "/" + pax.Childs;
                url += "/" + pax.Infants;
                url += "/" + flexDates;
                url += "/" + airline;
                url += "/" + accountCode;
                url += "/" + typeCabin;

                if (timeFrom != "NA" && timeTo != "NA") {
                    url += "/" + timeFrom + "," + timeTo;
                } else if (timeFrom != "NA" && timeTo == "NA") {
                    url += "/" + timeFrom + ",NA";
                } else if (timeFrom == "NA" && timeTo != "NA") {
                    url += "/NA," + timeTo;
                } else {
                    url += "/NA";
                }

                url += "/" + baggageIncluded;
                url += "/" + $UserService + "-show-" + $BranchCode;

                if ($IsLinkGenerator) {

                    $.iGrowl({
                        type: "info",
                        title: "Search Query String",
                        message: url,
                        icon: 'vicons-search',
                        placement: {
                            x: 'center',
                            y: 'top'
                        },
                        delay: 0
                    });
                } else {

                    // Other Request Settings
                    url += "-" + $SalesChannel + "-" + $ClientId + "-" + $BusinessUnit + "--" + $SessionTokenSSO + "----" + promoCode;
                    $('#Form').attr('action', url);
                    $('#Form').submit();
                    //location.href = url;
                }
            }
        });
    }
}

function initPopups(tabwidget) {

    var lenMaxAgeChild = ($HotelsMaxAgeChild != 0) ? $HotelsMaxAgeChild : 12;
    for (var i = 0; i < lenMaxAgeChild + 1; i++) {
        $("div[id='divPaxRoomPopup'] select").append("<option value=\"" + i.toString() + "\">" + i.toString() + "</option>");
    }

    $("div.input-mobile-control", $(tabwidget)).click(function () {

        var inputId = $(this).attr("data-input-id");
        var labelText = $("input[id='" + inputId + "']", $(tabwidget)).prev().prev().text();

        if ($(this).attr("data-label") != undefined)
            labelText = $(this).attr("data-label");

        $("label[id='lblMobileAutocomplete']", $(tabwidget)).text(labelText);
        $("input[id='txtMobileAutocomplete']", $(tabwidget)).attr("data-id", inputId);

        if ($(this).attr("data-input-type") == "Cities")
            $("input[id='txtMobileAutocomplete']", $(tabwidget)).attr("placeholder", getResource("EnterCity"));
        else
            $("input[id='txtMobileAutocomplete']", $(tabwidget)).attr("placeholder", getResource("EnterAirport"));

        $("input[id='txtMobileAutocomplete']", $(tabwidget)).netautocomplete('init', {
            type: $(this).attr("data-input-type"),
            onSelect: function () {

                if ($("input[id='txtMobileAutocomplete']", $(tabwidget)).val() != "") {

                    inputId = $("input[id='txtMobileAutocomplete']", $(tabwidget)).attr("data-id");

                    $("input[id='" + inputId + "']", $(tabwidget)).val($("input[id='txtMobileAutocomplete']", $(tabwidget)).val());
                    $("input[id='txtMobileAutocomplete']", $(tabwidget)).val("");
                    $("div[id='divAutoCompleteMobileContainer']", $(tabwidget)).hide();

                    if ($("body").hasClass("no-scroll")) {
                        $("body").removeClass("no-scroll");
                    }

                    var yPos = parseFloat($("input[id='yPos']", $(tabwidget)).val());
                    $('html, body').scrollTop(yPos - 50.00);

                    $("input[id='txtMobileAutocomplete']", $(tabwidget)).autocomplete("destroy");
                    $(window).unbind('.netautocomplete');

                    setMobileFocus(tabwidget, inputId);

                }
            },
            showExcluded: false
        });

        $("#labelTitle").text($(this).attr("data-input-label"));

        if (!$("body").hasClass("no-scroll")) {
            $("body").addClass("no-scroll");
        }

        $("input[id='yPos']", $(tabwidget)).val($("input[id='" + inputId + "']", $(tabwidget)).offset().top);
        $("input[id='" + inputId + "']", $(tabwidget)).blur();
        $('html, body').scrollTop(0);

        $("div[id='divAutoCompleteMobileContainer']", $(tabwidget)).show();
        $("input[id='txtMobileAutocomplete']", $(tabwidget)).focus();

    });

    $("a[class='aMobileAutocompleteCancel']", $(tabwidget)).click(function () {

        if ($("body").hasClass("no-scroll")) {
            $("body").removeClass("no-scroll");
        }

        var yPos = parseFloat($("input[id='yPos']", $(tabwidget)).val());
        $('html, body').scrollTop(yPos - 50.00);

        $("div[id='divAutoCompleteMobileContainer']", $(tabwidget)).hide();
        $("input[id='txtMobileAutocomplete']", $(tabwidget)).val("");
        $("input[id='txtMobileAutocomplete']", $(tabwidget)).autocomplete("destroy");
        $(window).unbind('.netautocomplete');

    });

    $("div[id='divPaxRoomPopup'] .pax-number-block span[data-type='adt']").each(function () {
        $(this)[0].innerText = $(this)[0].innerText.replace("{0}", (lenMaxAgeChild + 1).toString());
    });

    $("div[id='divPaxRoomPopup'] .pax-number-block span[data-type='chd']").each(function () {
        $(this)[0].innerText = $(this)[0].innerText.replace("{0}", lenMaxAgeChild.toString());
    });

    $('.btn-number').click(function (e) {

        e.preventDefault();

        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        input = $("input[id='" + fieldName + "']");
        currentVal = parseInt(input.val());

        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });

    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });

    $('.input-number').change(function () {

        prod = $("div[id='" + $(this).parents()[5].id + "']").attr('data-prod');
        roomId = "";
        if (prod == undefined) {
            prod = $("div[id='" + $(this).parents()[8].id + "']").attr('data-prod');
            roomId = $("div[id='" + $(this).parents()[4].id + "']").attr('data-roomid');
        }

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());
        name = $(this).attr('name');
        id = $(this).attr('id');

        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + id + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }

        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + id + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }

        setTotalPaxPopup(tabwidget, prod, roomId, name, valueCurrent);
    });

    $("div[id='divPaxRoomPopup'] a[id='addRoomPaxRoomPopup']", $(tabwidget)).click(function () {

        prod = $("div[id='divPaxRoomPopup']").attr('data-prod');
        pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
        roomIdHide = parseInt($("div[id='divPaxRoomPopup']").attr('data-qty-rooms'));
        roomIdShow = roomIdHide + 1;
        tmpPaxRoom = JSON.parse(JSON.stringify($jsonPaxRoom));
        tmpPaxRoom.Room = roomIdShow.toString();
        pax.push(tmpPaxRoom)

        $("input[id='txt" + prod + "NumberRooms']", $(tabwidget)).val(roomIdShow.toString());
        $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).val(getQtyPaxByArray(pax));
        $("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val(JSON.stringify(pax));

        $("div[id='divPaxRoomPopup']").attr('data-qty-rooms', roomIdShow.toString());

        if ($("div[id='divPaxRoomPopup'] div[id='room" + roomIdHide.toString() + "'] a[id='delRoom" + roomIdHide.toString() + "PaxRoomPopup']").length > 0) {
            $("div[id='divPaxRoomPopup'] div[id='room" + roomIdHide.toString() + "'] a[id='delRoom" + roomIdHide.toString() + "PaxRoomPopup']").hide();
        }

        if ($("div[id='divPaxRoomPopup'] div[id='room" + roomIdShow.toString() + "'] a[id='delRoom" + roomIdShow.toString() + "PaxRoomPopup']").length > 0) {
            $("div[id='divPaxRoomPopup'] div[id='room" + roomIdShow.toString() + "'] a[id='delRoom" + roomIdShow.toString() + "PaxRoomPopup']").show();
        }

        if (roomIdShow == 4) {
            $("a[id='addRoomPaxRoomPopup']").hide();
        }

        $("div[id='divPaxRoomPopup'] div[id='room" + roomIdShow.toString() + "'] input[id='paxRoom" + roomIdShow.toString() + "AdtQuantity']").val("1");
        $("div[id='divPaxRoomPopup'] div[id='room" + roomIdShow.toString() + "'] input[id='paxRoom" + roomIdShow.toString() + "ChdQuantity']").val("0");
        $("div[id='divPaxRoomPopup'] div[id='room" + roomIdShow.toString() + "'] div[id*='Age']").hide();
        $("div[id='divPaxRoomPopup'] div[id='room" + roomIdShow.toString() + "']").show();

        $("div[id='divPaxRoomPopup'] div[class='pop-up-content']").animate({ scrollTop: $("div[id='divPaxRoomPopup'] div[id='divPaxRoomControl']").innerHeight() }, 400);
    });

    $("div[id='divPaxRoomPopup'] a[id='delRoom2PaxRoomPopup']", $(tabwidget)).click(function () {
        prod = $("div[id='divPaxRoomPopup']").attr('data-prod');
        pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
        pax.pop();

        $("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val(JSON.stringify(pax));
        $("input[id='txt" + prod + "NumberRooms']", $(tabwidget)).val("1");
        $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).val(getQtyPaxByArray(pax));

        $("div[id='divPaxRoomPopup']").attr('data-qty-rooms', "1");
        $("div[id='divPaxRoomPopup'] div[id='room2']").hide();
    });

    $("div[id='divPaxRoomPopup'] a[id='delRoom3PaxRoomPopup']", $(tabwidget)).click(function () {
        prod = $("div[id='divPaxRoomPopup']").attr('data-prod');
        pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
        pax.pop();

        $("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val(JSON.stringify(pax));
        $("input[id='txt" + prod + "NumberRooms']", $(tabwidget)).val("2");
        $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).val(getQtyPaxByArray(pax));

        $("div[id='divPaxRoomPopup']").attr('data-qty-rooms', "2");
        $("div[id='divPaxRoomPopup'] div[id='room3']").hide();
        $("a[id='delRoom2PaxRoomPopup']").show();
    });

    $("div[id='divPaxRoomPopup'] a[id='delRoom4PaxRoomPopup']", $(tabwidget)).click(function () {
        prod = $("div[id='divPaxRoomPopup']").attr('data-prod');
        pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
        pax.pop();

        $("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val(JSON.stringify(pax));
        $("input[id='txt" + prod + "NumberRooms']", $(tabwidget)).val("3");
        $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).val(getQtyPaxByArray(pax));

        $("div[id='divPaxRoomPopup']").attr('data-qty-rooms', "3");
        $("div[id='divPaxRoomPopup'] div[id='room4']").hide();
        $("a[id='delRoom3PaxRoomPopup']").show();
        $("a[id='addRoomPaxRoomPopup']").show();
    });

    $("div[id='divPaxRoomPopup'] select[id*='ddlRoom']", $(tabwidget)).change(function () {

        prod = $("div[id='divPaxRoomPopup']").attr('data-prod');
        pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
        roomId = $("div[id='" + $(this).parents()[5].id + "']").attr('data-roomid');
        index = $("select[id='" + $(this).attr("id") + "']").attr('data-index');

        paxRoom = $.grep(pax, function (e) {
            return e.Room == roomId;
        })[0];

        if (paxRoom != undefined) {
            ageChilds = paxRoom.AgeChilds.split("-");
            ageChilds[index] = $(this).val();
            paxRoom.AgeChilds = ageChilds.toString().replace(/,/g, "-");

            $("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val(JSON.stringify(pax));
        }
    });

    $("button[id='btbClosePaxPopup']", $(tabwidget)).click(function () {
        closePopup(tabwidget, 'paxPopUp');
    });

    $("button[id='btnClosePaxRoomPopup']", $(tabwidget)).click(function () {
        closePopup(tabwidget, 'paxRoomPopUp');
    });

    $("a[id='aClosePaxPopup']", $(tabwidget)).click(function () {
        closePopup(tabwidget, 'paxPopUp');
    });

    $("a[id='aClosePaxRoomPopup']", $(tabwidget)).click(function () {
        closePopup(tabwidget, 'paxRoomPopUp');
    });
}

function valSalesRestRules(prod, type) {

    if (typeof ($jsonSalesRestRules) == "undefined") {
        return [];
    }

    var rules = [];
    var rulesWithApplies = [];
    var rulesTmp = filterList($jsonSalesRestRules, prod);
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    rulesTmp.forEach(function (item) {

        if (item.ApplyTo != null && getDateDiff('d', today, new Date(item.ApplyTo)) <= 0) {
            return;
        }

        rules.push({
            ApplyFrom: item.ApplyFrom,
            ApplyTo: item.ApplyTo,
            Monday: (type == "from") ? item.DaysByFromDate.Monday : item.DaysByToDate.Monday,
            Tuesday: (type == "from") ? item.DaysByFromDate.Tuesday : item.DaysByToDate.Tuesday,
            Wednesday: (type == "from") ? item.DaysByFromDate.Wednesday : item.DaysByToDate.Wednesday,
            Thursday: (type == "from") ? item.DaysByFromDate.Thursday : item.DaysByToDate.Thursday,
            Friday: (type == "from") ? item.DaysByFromDate.Friday : item.DaysByToDate.Friday,
            Saturday: (type == "from") ? item.DaysByFromDate.Saturday : item.DaysByToDate.Saturday,
            Sunday: (type == "from") ? item.DaysByFromDate.Sunday : item.DaysByToDate.Sunday
        });
    });

    // Esta regla se antepone a cualquier otra, si existe las otras no aplican
    rulesWithApplies = $.grep(rules, function (e) {
        return e.ApplyFrom == null && e.ApplyTo == null;
    });

    return (rulesWithApplies.length > 0) ? rulesWithApplies : rules;
}
/**
 * /
 * @param {any} tabwidget
 * @param {any} id
 * Es funcion controla el focus en la presentacion mobile.
 * En este momento no se esa usando, pero no se elimina. 
 * Por si, se considera usarla despues.
 */
function setMobileFocus(tabwidget, id) {

    //switch (id) {
    //    case "txtAirCityFrom":
    //        if ($('input[id=txtAirCityTo]', $(tabwidget)).is(':visible')) {
    //            $("div[id='divAirCityToControlMobile']", $(tabwidget)).trigger('click');
    //        } else {
    //            $("select[id='ddlAirCityTo']", $(tabwidget)).focus();
    //        }
    //        break;
    //    case "txtAirCityFrom1":
    //        $("div[id='divAirCityTo1ControlMobile']", $(tabwidget)).trigger('click');
    //        break;
    //    case "txtAirCityFrom2":
    //        $("div[id='divAirCityTo2ControlMobile']", $(tabwidget)).trigger('click');
    //        break;
    //    case "txtAirCityFrom3":
    //        $("div[id='divAirCityTo3ControlMobile']", $(tabwidget)).trigger('click');
    //        break;
    //    case "txtAirCityFrom4":
    //        $("div[id='divAirCityTo4ControlMobile']", $(tabwidget)).trigger('click');
    //        break;
    //    case "txtAirCityFrom5":
    //        $("div[id='divAirCityTo5ControlMobile']", $(tabwidget)).trigger('click');
    //        break;
    //    case "txtAirCityFrom6":
    //        $("div[id='divAirCityTo6ControlMobile']", $(tabwidget)).trigger('click');
    //        break;
    //    case "txtAirCityTo":
    //        showDatePick(tabwidget, 'txtAirDateFrom', getResource("DateDeparture"));
    //        break;
    //    case "txtAirCityTo1":
    //        $('input[id$=txtAirCityFrom2]', $(tabwidget)).val($("input[id='txtAirCityTo1']", $(tabwidget)).val());
    //        showDatePick(tabwidget, 'txtAirDateFrom1', getResource("DateDeparture"));
    //        break;
    //    case "txtAirCityTo2":
    //        $('input[id$=txtAirCityFrom3]', $(tabwidget)).val($("input[id='txtAirCityTo2']", $(tabwidget)).val());
    //        showDatePick(tabwidget, 'txtAirDateFrom2', getResource("DateDeparture"));
    //        break;
    //    case "txtAirCityTo3":
    //        $('input[id$=txtAirCityFrom4]', $(tabwidget)).val($("input[id='txtAirCityTo3']", $(tabwidget)).val());
    //        showDatePick(tabwidget, 'txtAirDateFrom3', getResource("DateDeparture"));
    //        break;
    //    case "txtAirCityTo4":
    //        $('input[id$=txtAirCityFrom5]', $(tabwidget)).val($("input[id='txtAirCityTo4']", $(tabwidget)).val());
    //        showDatePick(tabwidget, 'txtAirDateFrom4', getResource("DateDeparture"));
    //        break;
    //    case "txtAirCityTo5":
    //        $('input[id$=txtAirCityFrom6]', $(tabwidget)).val($("input[id='txtAirCityTo5']", $(tabwidget)).val());
    //        showDatePick(tabwidget, 'txtAirDateFrom5', getResource("DateDeparture"));
    //        break;
    //    case "txtAirCityTo6":
    //        showDatePick(tabwidget, 'txtAirDateFrom6', getResource("DateDeparture"));
    //        break;
    //    case "txtHotelCity":
    //        showDatePick(tabwidget, 'txtHotelDateFrom', getResource("DateCheckin"));
    //        break;
    //    case "txtCarAirportPickup":
    //        if ($("input[id='txtCarAirportReturn']", $(tabwidget)).is(':visible')) {
    //            $("div[id='divCarAirportReturnControlMobile']", $(tabwidget)).trigger('click');
    //        } else {
    //            showDatePick(tabwidget, 'txtCarDatePickup', getResource("DatePickup"));
    //        }
    //        break;
    //    case "txtCarAirportReturn":
    //        if ($("input[id='txtCarDatePickup']", $(tabwidget)).val() == "") {
    //            showDatePick(tabwidget, 'txtCarDatePickup', getResource("DatePickup"));
    //        } else {
    //            showDatePick(tabwidget, 'txtCarDateDropoff', getResource("DateDropoff"));
    //        }
    //        break;
    //    case "txtExtraCity":
    //        showDatePick(tabwidget, 'txtExtraDateFrom', getResource("DateDeparture"));
    //        break;
    //    case "txtAirHotelCityFrom":
    //        if ($('input[id=txtAirHotelCityTo]', $(tabwidget)).is(':visible')) {
    //            $("div[id='divAirHotelCityToControlMobile']", $(tabwidget)).trigger('click');
    //        } else {
    //            $("select[id='ddlAirHotelCityTo']", $(tabwidget)).focus();
    //        }
    //        break;
    //    case "txtAirHotelCityTo":
    //        showDatePick(tabwidget, 'txtAirHotelDateFrom', getResource("DateDeparture"));
    //        break;
    //    case "txtBusCityFrom":
    //        $("div[id='divBusCityToControlMobile']", $(tabwidget)).trigger('click');
    //        break;
    //    case "txtBusCityTo":
    //        showDatePick(tabwidget, 'txtBusDateFrom', getResource("DateDeparture"));
    //        break;
    //    case "txtBusHotelCityFrom":
    //        if ($('input[id=txtBusHotelCityTo]', $(tabwidget)).is(':visible')) {
    //            $("div[id='divBusHotelCityToControlMobile']", $(tabwidget)).trigger('click');
    //        } else {
    //            $("select[id='ddlBusHotelCityTo']", $(tabwidget)).focus();
    //        }
    //        break;
    //    case "txtBusHotelCityTo":
    //        showDatePick(tabwidget, 'txtBusHotelDateFrom', getResource("DateDeparture"));
    //        break;
    //    case "txtAirCarCityFrom":
    //        if ($('input[id=txtAirCarCityTo]', $(tabwidget)).is(':visible')) {
    //            $("div[id='divAirCarCityToControlMobile']", $(tabwidget)).trigger('click');
    //        } else {
    //            $("select[id='ddlAirCarCityTo']", $(tabwidget)).focus();
    //        }
    //        break;
    //    case "txtAirCarCityTo":
    //        showDatePick(tabwidget, 'txtAirCarDateFrom', getResource("DateDeparture"));
    //        break;
    //}

}

function getPaintedDates(date, rules, objFrom, objTo) {

    if (objFrom.datepicker('getDate') != null && getDateDiff('d', objFrom.datepicker('getDate'), date) == 0) {
        return [true, 'ui-state-active-from'];
    }

    if (objTo.datepicker('getDate') != null && getDateDiff('d', objTo.datepicker('getDate'), date) == 0) {
        return [true, 'ui-state-active-to', 'n dias'];
    }

    if (objFrom.datepicker('getDate') != null && objTo.datepicker('getDate') != null &&
        (getDateDiff('d', objFrom.datepicker('getDate'), date) > 0 && getDateDiff('d', date, objTo.datepicker('getDate')) > 0)) {
        return [true, 'ui-state-active-from-to'];
    }

    var rulesTmp = [];

    if (rules.length == 1) {

        if (rules[0].ApplyFrom == null || (rules[0].ApplyFrom == null && rules[0].ApplyTo == null)) {

            if (!valRulesDates(date, rules[0]))
                return [false];

        } else if (rules[0].ApplyFrom != null) {

            rulesTmp = $.grep(rules, function (e) {
                return getDateDiff('d', new Date(e.ApplyFrom), date) >= 0;
            });

            if (!valRulesDates(date, rulesTmp[0]))
                return [false];

        }

    } else if (rules.length > 1) {

        // Recorremos las reglas para determinar cual debe aplicar
        rules.forEach(function (item) {

            if (item.ApplyFrom != null && getDateDiff('d', new Date(item.ApplyFrom), date) <= 0) {
                return;
            }

            if (item.ApplyTo != null && getDateDiff('d', date, new Date(item.ApplyTo)) <= 0) {
                return;
            }

            rulesTmp.push(item);
        });

        if (!valRulesDates(date, rulesTmp[0]))
            return [false];
    }

    return [true];

}

function valRulesDates(date, rule) {

    if (rule == null)
        return true;

    switch (date.getDay()) {
        case 0: // Sunday
            if (!rule.Sunday)
                return false;
            break;
        case 1: // Monday
            if (!rule.Monday)
                return false;
            break;
        case 2: // Tuesday
            if (!rule.Tuesday)
                return false;
            break;
        case 3: // Wednesday
            if (!rule.Wednesday)
                return false;
            break;
        case 4: // Thursday
            if (!rule.Thursday)
                return false;
            break;
        case 5: // Friday
            if (!rule.Friday)
                return false;
            break;
        case 6: // Saturday
            if (!rule.Saturday)
                return false;
            break;
    }

    return true
}

function getDateDiff(datepart, fromdate, todate) {
    var diff = 0;
    var date1_ms = fromdate.getTime();
    var date2_ms = todate.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    //take out milliseconds
    difference_ms = difference_ms / 1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var hours = Math.floor(difference_ms % 24);
    var days = Math.floor(difference_ms / 24);

    switch (datepart) {
        case 's':
            diff = seconds;
            break;
        case 'm':
            diff = minutes;
            break;
        case 'h':
            diff = hours;
            break;
        case 'd':
            diff = days;
            break;
    }

    return diff;
}

function changeTripType(tabwidget, prod, tripType) {

    switch (tripType) {
        case 'OW':
            // One Way
            if (!$("input[id='txt" + prod + "DateTo']", $(tabwidget)).hasClass("disabled")) {
                $("input[id='txt" + prod + "DateTo']", $(tabwidget)).addClass("disabled");
                $("input[id='txt" + prod + "DateTo']", $(tabwidget)).prop("disabled", true);
                $("input[id='txt" + prod + "DateTo']", $(tabwidget)).removeAttr("data-bvalidator");

                $("select[id='ddl" + prod + "ReturnTime']", $(tabwidget)).addClass("disabled");
                $("select[id='ddl" + prod + "ReturnTime']", $(tabwidget)).prop("disabled", true);
                if ($("input[id='txt" + prod + "DateTo']", $(tabwidget)).hasClass("bvalidator_invalid")) {
                    $("input[id='txt" + prod + "DateTo']", $(tabwidget)).removeClass('bvalidator_invalid');
                    $("input[id='txt" + prod + "DateTo']", $(tabwidget)).next().remove();
                }
            }

            if ($("div[id='divAirAccountCode']", $(tabwidget)).length > 0) {
                $("div[id='divAirDepartureTime']", $(tabwidget)).removeClass("fix-padding-left");
                $("div[id='divAirDepartureTime']", $(tabwidget)).addClass("fix-padding-right");
                $("div[id='divAirReturnTime']", $(tabwidget)).removeClass("fix-padding-right");
                $("div[id='divAirReturnTime']", $(tabwidget)).addClass("fix-padding-left");
            }

            if (prod == "Air" && $("div[id='divAirMultiDestination']", $(tabwidget)).is(":visible")) {

                $("div[id='divAirMultiDestination']", $(tabwidget)).hide();
                $("div[id='divAirCities']", $(tabwidget)).show();
                $("div[id='divAirDates']", $(tabwidget)).show();
                $("div[id='divAirDepartureTime']", $(tabwidget)).show();
                $("div[id='divAirReturnTime']", $(tabwidget)).show();

                if ($AirFlexDateEnabled && !$("div[id='divAirFlexDates']", $(tabwidget)).is(":visible")) {
                    $("div[id='divAirFlexDates']", $(tabwidget)).show();
                }

                if ($("div[id='divAirPassengers']", $(tabwidget)).hasClass("col-sm-12 col-md-12 col-lg-12")) {
                    $("div[id='divAirPassengersGuests']", $(tabwidget)).removeClass("col-sm-4 col-md-4 col-lg-4");
                    $("div[id='divAirPassengersGuests']", $(tabwidget)).addClass("col-sm-12 col-md-12 col-lg-12");
                    $("div[id='divAirPassengers']", $(tabwidget)).removeClass("col-sm-12 col-md-12 col-lg-12");
                    $("div[id='divAirPassengers']", $(tabwidget)).addClass("col-sm-4 col-md-4 col-lg-4");
                }

                if ($AirFlexDateEnabled && $("div[id='divAirBaggageIncluded']", $(tabwidget)).hasClass("col-sm-12 col-md-12 col-lg-12")) {
                    $("div[id='divAirBaggageIncluded']", $(tabwidget)).removeClass("col-sm-12 col-md-12 col-lg-12");
                    $("div[id='divAirBaggageIncluded']", $(tabwidget)).addClass("col-sm-6 col-md-6 col-lg-6");
                }
            }

            break;
        case 'RT':
            // Round Trip
            if ($("input[id='txt" + prod + "DateTo']", $(tabwidget)).hasClass("disabled")) {
                $("input[id='txt" + prod + "DateTo']", $(tabwidget)).removeClass('disabled');
                $("input[id='txt" + prod + "DateTo']", $(tabwidget)).removeProp('disabled');
                $("input[id='txt" + prod + "DateTo']", $(tabwidget)).attr("data-bvalidator", "required");
            }

            if ($("select[id='ddl" + prod + "ReturnTime']", $(tabwidget)).hasClass("disabled")) {
                $("select[id='ddl" + prod + "ReturnTime']", $(tabwidget)).removeClass('disabled');
                $("select[id='ddl" + prod + "ReturnTime']", $(tabwidget)).removeProp('disabled');
            }

            if (prod == "Air" && $("div[id='divAirMultiDestination']", $(tabwidget)).is(":visible")) {

                $("div[id='divAirMultiDestination']", $(tabwidget)).hide();
                $("div[id='divAirCities']", $(tabwidget)).show();
                $("div[id='divAirDates']", $(tabwidget)).show();
                $("div[id='divAirDepartureTime']", $(tabwidget)).show();
                $("div[id='divAirReturnTime']", $(tabwidget)).show();

                if ($AirFlexDateEnabled && !$("div[id='divAirFlexDates']", $(tabwidget)).is(":visible")) {
                    $("div[id='divAirFlexDates']", $(tabwidget)).show();
                }

                if ($("div[id='divAirPassengers']", $(tabwidget)).hasClass("col-sm-12 col-md-12 col-lg-12")) {
                    $("div[id='divAirPassengersGuests']", $(tabwidget)).removeClass("col-sm-4 col-md-4 col-lg-4");
                    $("div[id='divAirPassengersGuests']", $(tabwidget)).addClass("col-sm-12 col-md-12 col-lg-12");
                    $("div[id='divAirPassengers']", $(tabwidget)).removeClass("col-sm-12 col-md-12 col-lg-12");
                    $("div[id='divAirPassengers']", $(tabwidget)).addClass("col-sm-4 col-md-4 col-lg-4");
                }

                if ($AirFlexDateEnabled && $("div[id='divAirBaggageIncluded']", $(tabwidget)).hasClass("col-sm-12 col-md-12 col-lg-12")) {
                    $("div[id='divAirBaggageIncluded']", $(tabwidget)).removeClass("col-sm-12 col-md-12 col-lg-12");
                    $("div[id='divAirBaggageIncluded']", $(tabwidget)).addClass("col-sm-6 col-md-6 col-lg-6");
                }
            }

            // Datepickers
            $("input[id='txt" + prod + "DateFrom']", $(tabwidget)).change(function () {
                $("input[id='txt" + prod + "DateTo']", $(tabwidget)).datepicker("option", "minDate", $("input[id='txt" + prod + "DateFrom']", $(tabwidget)).datepicker('getDate'));
            });
            break;
        case 'MD':

            $("div[id='divAirMultiDestination']", $(tabwidget)).show();
            $("div[id='divAirCities']", $(tabwidget)).hide();
            $("div[id='divAirDates']", $(tabwidget)).hide();
            $("div[id='divAirDepartureTime']", $(tabwidget)).hide();
            $("div[id='divAirReturnTime']", $(tabwidget)).hide();

            if ($AirFlexDateEnabled && $("div[id='divAirFlexDates']", $(tabwidget)).is(":visible")) {
                $("div[id='divAirFlexDates']", $(tabwidget)).hide();
            }

            if ($("div[id='divAirPassengers']", $(tabwidget)).hasClass("col-sm-4 col-md-4 col-lg-4")) {
                $("div[id='divAirPassengersGuests']", $(tabwidget)).removeClass("col-sm-12 col-md-12 col-lg-12");
                $("div[id='divAirPassengersGuests']", $(tabwidget)).addClass("col-sm-4 col-md-4 col-lg-4");
                $("div[id='divAirPassengers']", $(tabwidget)).removeClass("col-sm-4 col-md-4 col-lg-4");
                $("div[id='divAirPassengers']", $(tabwidget)).addClass("col-sm-12 col-md-12 col-lg-12");
            }

            if ($AirFlexDateEnabled && $("div[id='divAirBaggageIncluded']", $(tabwidget)).hasClass("col-sm-6 col-md-6 col-lg-6")) {
                $("div[id='divAirBaggageIncluded']", $(tabwidget)).removeClass("col-sm-6 col-md-6 col-lg-6");
                $("div[id='divAirBaggageIncluded']", $(tabwidget)).addClass("col-sm-12 col-md-12 col-lg-12");
            }

            if (!$IsMobile) {

                var lblNbsp = "<label>&nbsp;</label>";

                if ($("div[id='divAirDepartureTime2']", $(tabwidget)).attr("style") == "display:none;" && $("div[id='divAirFlight2Opt'] label", $(tabwidget)).length == 0) {
                    var html = $("div[id='divAirFlight2Opt']", $(tabwidget)).html();
                    $("div[id='divAirFlight2Opt']", $(tabwidget)).html(lblNbsp + html);

                    $("a[id='addAirFlight2']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divMDFlight3', 'divAirFlight2Opt');
                    });
                }
                if ($("div[id='divAirDepartureTime3']", $(tabwidget)).attr("style") == "display:none;" && $("div[id='divAirFlight3Opt'] label", $(tabwidget)).length == 0) {
                    var html = $("div[id='divAirFlight3Opt']", $(tabwidget)).html();
                    $("div[id='divAirFlight3Opt']", $(tabwidget)).html(lblNbsp + html);

                    $("a[id='addAirFlight3']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divMDFlight4', 'divAirFlight3Opt');
                    });
                    $("a[id='delAirFlight3']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divAirFlight2Opt', 'divMDFlight3');
                    });
                }
                if ($("div[id='divAirDepartureTime4']", $(tabwidget)).attr("style") == "display:none;" && $("div[id='divAirFlight4Opt'] label", $(tabwidget)).length == 0) {
                    var html = $("div[id='divAirFlight4Opt']", $(tabwidget)).html();
                    $("div[id='divAirFlight4Opt']", $(tabwidget)).html(lblNbsp + html);

                    $("a[id='addAirFlight4']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divMDFlight5', 'divAirFlight4Opt');
                    });
                    $("a[id='delAirFlight4']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divAirFlight3Opt', 'divMDFlight4');
                    });
                }
                if ($("div[id='divAirDepartureTime5']", $(tabwidget)).attr("style") == "display:none;" && $("div[id='divAirFlight5Opt'] label", $(tabwidget)).length == 0) {
                    var html = $("div[id='divAirFlight5Opt']", $(tabwidget)).html();
                    $("div[id='divAirFlight5Opt']", $(tabwidget)).html(lblNbsp + html);

                    $("a[id='addAirFlight5']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divMDFlight6', 'divAirFlight5Opt');
                    });
                    $("a[id='delAirFlight5']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divAirFlight4Opt', 'divMDFlight5');
                    });
                }
                if ($("div[id='divAirDepartureTime6']", $(tabwidget)).attr("style") == "display:none;" && $("div[id='divAirFlight6Opt'] label", $(tabwidget)).length == 0) {
                    var html = $("div[id='divAirFlight6Opt']", $(tabwidget)).html();
                    $("div[id='divAirFlight6Opt']", $(tabwidget)).html(lblNbsp + html);

                    $("a[id='delAirFlight6']", $(tabwidget)).click(function () {
                        showHideFligth(tabwidget, 'divAirFlight5Opt', 'divMDFlight6');
                    });
                }
            }

            break;
    }
}

function changeReturnType(tabwidget, type) {

    if (type == "Distinct") {
        $("div[id='divCarAirportPickup']", $(tabwidget)).removeClass('col-sm-12 col-md-12 col-lg-12 fix-padding-right');
        $("div[id='divCarAirportPickup']", $(tabwidget)).addClass('col-sm-6 col-md-6 col-lg-6');
        $("div[id='divCarAirportReturn']", $(tabwidget)).show();
    } else {
        $("div[id='divCarAirportReturn']", $(tabwidget)).hide();
        $("div[id='divCarAirportPickup']", $(tabwidget)).removeClass('col-sm-6 col-md-6 col-lg-6');
        $("div[id='divCarAirportPickup']", $(tabwidget)).addClass('col-sm-12 col-md-12 col-lg-12 fix-padding-right');
    }

}

function convertArrayToArrayCodeName(array, type) {

    var arrCodeName = [];
    var isHotelList = false;
    var elem;

    array.forEach(function (item) {

        switch (type) {
            case "AutoComplete":
                elem = item;
                break;
            case "ListCodes":
                if (item.ProductCode)
                    isHotelList = true;

                elem = item.City;
                break;
        }

        arrCodeName.push({
            Code: getIATACode(elem),
            Name: elem.substring(0, elem.indexOf("(") - 1),
            ProductCode: item.ProductCode,
            ProductName: item.ProductName
        });
    });

    return (isHotelList) ? sortArrayByKey(arrCodeName, "ProductName") : sortArrayByKey(arrCodeName, "Name");
}

function cleanElements(div) {

    div.each(function () {

        switch (this.type) {
            case "text":
                this.value = "";
                break;
            case "checkbox":
                this.checked = false;
                break;
        }
    });
}

function addDays(myDate, days) {
    var today = new Date();

    if (myDate != null)
        return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000);

    return new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
}

function showHideFligth(tabwidget, divShow, divHide) {

    $("div[id='" + divShow + "']", $(tabwidget)).show();
    $("div[id='" + divHide + "']", $(tabwidget)).hide();

}

function getPaxByArray(array, prod) {

    var strPax = "";

    if (prod == "Hotel") {

        array.forEach(function (item) {

            strPax += ((strPax !== "") ? "!" : "") + item.Adults;

            if (item.AgeChilds != "")
                strPax += "-" + item.AgeChilds;
        });

    } else { // Air or Bus

        var adt = 0;
        var chd = 0;
        var inf = 0;

        array.forEach(function (item) {

            adt += parseInt(item.Adults);

            item.AgeChilds.split('-').forEach(function (age) {

                if (parseInt(age) <= 2)
                    inf += 1;
                else
                    chd += 1;
            });

        });

        strPax = adt.toString() + "/" + chd.toString() + "/" + inf.toString();
    }

    return strPax;
}

function getQtyPaxByArray(array) {

    var totalPax = 0;

    array.forEach(function (item) {

        totalPax += parseInt(item.Adults) + parseInt(item.Childs);

    });

    return totalPax.toString();
}

// Date Picker Mobile functions

//Mostrar-mover  el calendario en toppage en versiones mobile
function showDatePick(tabwidget, id, text) {

    $("input[id='" + id + "']", $(tabwidget)).datepicker("show");

    if ($IsMobile) {

        addHeaderDatePick(tabwidget, id, text);

        if (!$("body").hasClass("no-scroll")) {
            $("body").addClass("no-scroll");
        }

        $("input[id='yPos']", $(tabwidget)).val($("input[id='" + id + "']", $(tabwidget)).offset().top);
        $("input[id='" + id + "']", $(tabwidget)).blur();
        $('html, body').scrollTop(0);

    }

}

function addHeaderDatePick(tabwidget, id, text) {

    if ($IsMobile) {

        if ($("div[id='ui-datepicker-div'] div[id='divTitleDatePicker']").length > 0) {
            $("div[id='ui-datepicker-div'] div[id='divTitleDatePicker']").remove();
        }

        if ($("div[id='ui-datepicker-div'] a[class='ui-datepicker-close']").length > 0) {
            $("div[id='ui-datepicker-div'] a[class='ui-datepicker-close']").remove();
        }

        htmladd = "<div id=\"divTitleDatePicker\" class=\"divTitleDatePicker\"><div class=\"row\"><h2 class=\"center\">" + text + "</h2></div></div>";
        $("div[id='ui-datepicker-div']").append(htmladd);

        $("div[id='divTitleDatePicker']").append("<a onclick=\"closeCA('" + tabwidget + "','" + id + "')\" class=\"ui-datepicker-close\"><i class=\"fa fa-times fa-x\"></i></a>");
        $(".ui-datepicker-calendar tbody tr td a.ui-state-default").each(function (index) { $(this).attr("onclick", "closeCA('" + tabwidget + "','" + id + "')"); });

    }

}

//Cerrar calendario y volver al ipunt desde donde se abrio
function closeCA(tabwidget, id) {

    var yPos = parseFloat($("input[id='yPos']", $(tabwidget)).val());
    $("input[id='" + id + "']", $(tabwidget)).datepicker("hide");
    $('html, body').scrollTop(yPos - 50.00);

    if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
    }

}

// PopUps functions

function openPopUp(tabwidget, popup, popType, prod) {

    var tooltipanchor = $("a[data-tooltipanchor='" + popup + "']", $(tabwidget));
    var yPos = $(tooltipanchor).offset();

    $("input[id='yPos']", $(tabwidget)).val(yPos.top);

    switch (popType) {
        case 'paxPopUp':

            $("div[id='divPaxPopup']").popup({
                type: 'tooltip',
                offsettop: 0,
                offsetleft: 16,
                horizontal: 'center',
                vertical: 'bottom',
                transition: '0.3s all 0.1s',
                //escape: false,
                //blur: false,
                tooltipanchor: tooltipanchor,
                onclose: function () {
                    var divPax = "#div" + prod + "PassengersGuests";

                    // se inicializa el bValidator solo para el div
                    if ($(divPax).data('bValidator') == null) {
                        $(divPax).bValidator();
                    }

                    if ($(divPax).data('bValidator') != null) {
                        $(divPax).data('bValidator').validate();
                    }
                }
            });

            $("div[id='divPaxPopup']").attr('data-prod', prod);

            var pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
            $("div[id='divPaxPopup'] input[id='paxAdtQuantity']").val(pax.Adults);
            $("div[id='divPaxPopup'] input[id='paxChdQuantity']").val(pax.Childs);
            $("div[id='divPaxPopup'] input[id='paxInfQuantity']").val(pax.Infants);

            if (pax.Adults == $("div[id='divPaxPopup'] input[id='paxAdtQuantity']").attr('min'))
                $(".btn-number[data-type='minus'][data-field='paxAdtQuantity']").attr('disabled', true);
            else
                $(".btn-number[data-type='minus'][data-field='paxAdtQuantity']").removeAttr('disabled');

            if (pax.Childs == $("div[id='divPaxPopup'] input[id='paxChdQuantity']").attr('min'))
                $(".btn-number[data-type='minus'][data-field='paxChdQuantity']").attr('disabled', true);
            else
                $(".btn-number[data-type='minus'][data-field='paxChdQuantity']").removeAttr('disabled');

            if (pax.Infants == $("div[id='divPaxPopup'] input[id='paxInfQuantity']").attr('min'))
                $(".btn-number[data-type='minus'][data-field='paxInfQuantity']").attr('disabled', true);
            else
                $(".btn-number[data-type='minus'][data-field='paxInfQuantity']").removeAttr('disabled');

            if (pax.Adults == $("div[id='divPaxPopup'] input[id='paxAdtQuantity']").attr('max'))
                $(".btn-number[data-type='plus'][data-field='paxAdtQuantity']").attr('disabled', true);
            else
                $(".btn-number[data-type='plus'][data-field='paxAdtQuantity']").removeAttr('disabled');

            if (pax.Childs == $("div[id='divPaxPopup'] input[id='paxChdQuantity']").attr('max'))
                $(".btn-number[data-type='plus'][data-field='paxChdQuantity']").attr('disabled', true);
            else
                $(".btn-number[data-type='plus'][data-field='paxChdQuantity']").removeAttr('disabled');

            if (pax.Infants == $("div[id='divPaxPopup'] input[id='paxInfQuantity']").attr('max'))
                $(".btn-number[data-type='plus'][data-field='paxInfQuantity']").attr('disabled', true);
            else
                $(".btn-number[data-type='plus'][data-field='paxInfQuantity']").removeAttr('disabled');

            if (!$("body").hasClass("no-scroll")) {
                $("body").addClass("no-scroll");
            }
            $('html, body').scrollTop(0);
            setTimeout(function () { $("div[id='divPaxPopup']").popup('show'); }, 10);

            break;

        case 'paxRoomPopUp':

            $("div[id='divPaxRoomPopup']").popup({
                type: 'tooltip',
                offsettop: 0,
                offsetleft: 20,
                horizontal: 'center',
                vertical: 'bottom',
                transition: '0.3s all 0.1s',
                //escape: false,
                //blur: false,
                tooltipanchor: tooltipanchor,
                onclose: function () {
                    var divPax = "#div" + prod + "RoomsGuests";

                    // se inicializa el bValidator solo para el div
                    if ($(divPax).data('bValidator') == null) {
                        $(divPax).bValidator();
                    }

                    if ($(divPax).data('bValidator') != null) {
                        $(divPax).data('bValidator').validate();
                    }
                }
            });

            if (prod == "Hotel") {
                $("div[id='divPaxRoomPopup'] input[name='paxRoomAdtQuantity']").attr('max', $MaxPassengerSearch);
            } else {
                $("div[id='divPaxRoomPopup'] input[name='paxRoomAdtQuantity']").attr('max', 7);
            }

            var roomPaxes = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());

            $("div[id='divPaxRoomPopup']").attr('data-prod', prod);
            $("div[id='divPaxRoomPopup']").attr('data-qty-rooms', roomPaxes.length.toString());
            $("div[id='divPaxRoomPopup'] div[id*='room']").hide()

            if (roomPaxes.length == 4) {
                $("a[id='addRoomPaxRoomPopup']").hide();
            } else {
                $("a[id='addRoomPaxRoomPopup']").show();
            }

            for (var i = 1; i <= 4; i++) {
                if ($("div[id='divPaxRoomPopup'] div[id='room" + i.toString() + "'] a[id='delRoom" + i.toString() + "PaxRoomPopup']").length > 0)
                    $("div[id='divPaxRoomPopup'] div[id='room" + i.toString() + "'] a[id='delRoom" + i.toString() + "PaxRoomPopup']").hide();
            }

            if (roomPaxes.length > 1) {
                $("div[id='divPaxRoomPopup'] div[id='room" + roomPaxes.length.toString() + "'] a[id='delRoom" + roomPaxes.length.toString() + "PaxRoomPopup']").show();
            }

            roomPaxes.forEach(function (item) {
                $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "']").show()
                $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] input[id='paxRoom" + item.Room + "AdtQuantity']").val(item.Adults);
                $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] input[id='paxRoom" + item.Room + "ChdQuantity']").val(item.Childs);

                $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] div[id*='Age']").hide();
                if (parseInt(item.Childs) > 0) {

                    $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] div[id*='ChildrensAge']").show();

                    ageChilds = item.AgeChilds.split('-');
                    for (var i = 0; i < parseInt(item.Childs); i++) {
                        $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] div[id='divRoom" + item.Room + "ChildAge" + (i + 1).toString() + "']").show();
                        $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] select[id='ddlRoom" + item.Room + "ChildAge" + (i + 1).toString() + "']").val(ageChilds[i]);
                    }
                }

                if (item.Adults == $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] input[id='paxRoom" + item.Room + "AdtQuantity']").attr('min'))
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='minus'][data-field='paxRoom" + item.Room + "AdtQuantity']").attr('disabled', true);
                else
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='minus'][data-field='paxRoom" + item.Room + "AdtQuantity']").removeAttr('disabled');

                if (item.Childs == $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] input[id='paxRoom" + item.Room + "ChdQuantity']").attr('min'))
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='minus'][data-field='paxRoom" + item.Room + "ChdQuantity']").attr('disabled', true);
                else
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='minus'][data-field='paxRoom" + item.Room + "ChdQuantity']").removeAttr('disabled');

                if (item.Adults == $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] input[id='paxRoom" + item.Room + "AdtQuantity']").attr('max'))
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='plus'][data-field='paxRoom" + item.Room + "AdtQuantity']").attr('disabled', true);
                else
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='plus'][data-field='paxRoom" + item.Room + "AdtQuantity']").removeAttr('disabled');

                if (item.Childs == $("div[id='divPaxRoomPopup'] div[id='room" + item.Room + "'] input[id='paxRoom" + item.Room + "ChdQuantity']").attr('max'))
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='plus'][data-field='paxRoom" + item.Room + "ChdQuantity']").attr('disabled', true);
                else
                    $("div[id='room" + item.Room + "'] .btn-number[data-type='plus'][data-field='paxRoom" + item.Room + "ChdQuantity']").removeAttr('disabled');
            });

            if (!$("body").hasClass("no-scroll")) {
                $("body").addClass("no-scroll");
            }
            $('html, body').scrollTop(0);
            setTimeout(function () { $("div[id='divPaxRoomPopup']").popup('show'); }, 10);

            break;

        default:
            break;
    }
}

function closePopup(tabwidget, popType) {

    var divPax;
    var yPos = parseFloat($("input[id='yPos']", $(tabwidget)).val());

    switch (popType) {
        case 'paxPopUp':

            prod = $("div[id='divPaxPopup']").attr('data-prod');
            divPax = "#div" + prod + "PassengersGuests";

            $("div[id='divPaxPopup']").popup('hide');
            $('html, body').scrollTop(yPos - 50.00);

            break;

        case 'paxRoomPopUp':

            prod = $("div[id='divPaxRoomPopup']").attr('data-prod');
            divPax = "#div" + prod + "RoomsGuests";

            $("div[id='divPaxRoomPopup']").popup('hide');
            $('html, body').scrollTop(yPos - 50.00);

            break;

        default:
            break;
    }

    if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
    }

    // se inicializa el bValidator solo para el div
    if ($(divPax).data('bValidator') == null) {
        $(divPax).bValidator();
    }

    if ($(divPax).data('bValidator') != null) {
        $(divPax).data('bValidator').validate();
    }

}

function setTotalPaxPopup(tabwidget, prod, roomId, paxType, valueCurrent) {

    pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());

    if (prod == "Air" || prod == "Bus" || prod == "AirCar") {

        switch (paxType) {
            case 'paxAdtQuantity':
                pax.Adults = valueCurrent.toString();
                break;
            case 'paxChdQuantity':
                pax.Childs = valueCurrent.toString();
                break;
            case 'paxInfQuantity':
                pax.Infants = valueCurrent.toString();
                break;
        }

        $("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val(JSON.stringify(pax));

        paxTotal = parseInt(pax.Adults) + parseInt(pax.Childs) + parseInt(pax.Infants);
        $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).val(paxTotal.toString());

    } else {

        paxRoom = $.grep(pax, function (e) {
            return e.Room == roomId;
        })[0];

        if (paxRoom != undefined) {
            if (paxType == "paxRoomAdtQuantity") {
                paxRoom.Adults = valueCurrent.toString();
            } else {
                isForShow = (valueCurrent > parseInt(paxRoom.Childs)) ? true : false;
                paxRoom.Childs = valueCurrent.toString();

                if (valueCurrent == 0) {
                    $("div[id='divPaxRoomPopup'] div[id='room" + roomId + "'] div[id*='Age']").hide();
                    paxRoom.AgeChilds = "";
                } else {
                    $("div[id='divPaxRoomPopup'] div[id='room" + roomId + "'] select[id='ddlRoom" + roomId + "ChildAge" + valueCurrent.toString() + "']").val("0");
                    $("div[id='divPaxRoomPopup'] div[id='room" + roomId + "'] div[id*='ChildrensAge']").show();
                    ageChilds = (paxRoom.AgeChilds != "") ? paxRoom.AgeChilds.split("-") : [];
                    if (isForShow) {
                        $("div[id='divPaxRoomPopup'] div[id='room" + roomId + "'] div[id*='divRoom" + roomId + "ChildAge" + valueCurrent.toString() + "']").show();
                        ageChilds.push("0");
                    } else {
                        $("div[id='divPaxRoomPopup'] div[id='room" + roomId + "'] div[id*='divRoom" + roomId + "ChildAge" + (valueCurrent + 1).toString() + "']").hide();
                        ageChilds.pop();
                    }
                    paxRoom.AgeChilds = ageChilds.toString().replace(/,/g, "-");
                }
            }

            if ($("div[id='divPaxRoomPopup']").attr('data-qty-rooms') == roomId) {
                $("div[id='divPaxRoomPopup'] div[class='pop-up-content']").animate({ scrollTop: $("div[id='divPaxRoomPopup'] div[id='divPaxRoomControl']").innerHeight() }, 400);
            }
        }

        $("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val(JSON.stringify(pax));
        $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).val(getQtyPaxByArray(pax).toString());
    }
}

// Validators functions

function validateQuantityInfants(v, tabwidget, prod) {

    var pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
    var boolReturn = true;

    if (prod === "Air" || prod === "Bus" || prod == "AirCar") {

        boolReturn = parseInt(pax.Adults) >= parseInt(pax.Infants);

    } else {

        pax.forEach(function (room) {

            var qtyPassengersInf = 0;

            if (parseInt(room.Childs) > 0) {

                room.AgeChilds.split("-").forEach(function (age) {

                    if (parseInt(age) <= 2) {
                        qtyPassengersInf += 1;
                    }

                });
            }

            if (boolReturn === true && parseInt(room.Adults) < qtyPassengersInf) {
                boolReturn = false;
            }
        });

    }

    return boolReturn;
}

function validateMaxPassenger(v, tabwidget, prod, max) {

    var pax = JSON.parse($("input[id='hdn" + prod + "Passengers']", $(tabwidget)).val());
    var boolReturn = false;

    if (prod == "Air" || prod == "Bus" || prod == "AirCar") {

        boolReturn = ((parseInt(pax.Adults) + parseInt(pax.Childs) + parseInt(pax.Infants)) <= max);

    } else {

        var qtyPassengers = 0;
        pax.forEach(function (item) {
            qtyPassengers += parseInt(item.Adults) + parseInt(item.Childs);
        });

        boolReturn = (qtyPassengers <= max);

        if (boolReturn) {
            if ($("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).hasClass("bvalidator_invalid")) {
                $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).removeClass('bvalidator_invalid');
            }
        } else {
            $("input[id='txt" + prod + "NumberPassenger']", $(tabwidget)).addClass('bvalidator_invalid');
        }
    }

    return boolReturn;
}