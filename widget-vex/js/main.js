

// Fixed MSI Netaautocomplete
jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();
var counthabitacionesHoteles = 1

function countFunhabitacionesHoteles(huespedes, habitaciones){
    var textoHuespedes = "";
    var textoHabitaciones = "";
    if(huespedes <= 1){
        textoHuespedes = "huésped";
    }
    else{
        textoHuespedes = "huéspedes";
    }
    if(habitaciones <= 1){
        textoHabitaciones = "habitación";
    }
    else{
        textoHabitaciones = "habitaciones";
    }
    jQuery("#txtNumPassengersHotelesComplete").html(`${habitaciones} ${textoHabitaciones}, ${huespedes} ${textoHuespedes}`)

}
function countHotelNumPassenger(){
    countFunhabitacionesHoteles(parseInt(jQuery("input#txtNumPassengersHoteles").val()), counthabitacionesHoteles);
}
var counthabitacionesPaquetes = 1
function countFunhabitacionesPaquetes(huespedes, habitaciones){
    var textoHuespedes = "";
    var textoHabitaciones = "";
    if(huespedes <= 1){
        textoHuespedes = "huésped";
    }
    else{
        textoHuespedes = "huéspedes";
    }
    if(habitaciones <= 1){
        textoHabitaciones = "habitación";
    }
    else{
        textoHabitaciones = "habitaciones";
    }
    jQuery("#txtNumPassengersPaquetesComplete").html(`${habitaciones} ${textoHabitaciones}, ${huespedes} ${textoHuespedes}`)

}
function countAirHotelNumPassenger(){
    countFunhabitacionesPaquetes(parseInt(jQuery("input#txtNumPassengersPaquetes").val()), counthabitacionesPaquetes);
}
function cerrarPopUp() {
    jQuery(".tab-content>.active .morePop").each( function() {
        if(jQuery(this).css("display") == "block"){
            jQuery(this).find(".btbClosePaxPopup").trigger("click")
        }
    })
}
function bgAutofocus(e, element){
    if($("#contentBgAutofocus").length == 0){
        var contentBgAutofocus = '<div id="contentBgAutofocus" onclick="javascript:cerrarPopUp();"></div>';
        setTimeout(function(){
            jQuery(element).before(contentBgAutofocus)
            $("#contentBgAutofocus").addClass('d-block')
        }, 100)
    }
    if(e == true){
        $("#contentBgAutofocus").addClass('d-block')
    }
    else if(e == false){
        $("#contentBgAutofocus").removeClass('d-block')
        $("#contentBgAutofocus").remove()
    }
}
//-------------------------------------------------------------------------------------------------
//----------------------- saber scroll para ubicacion de elemento ---------------------------------
//-------------------------------------------------------------------------------------------------
jQuery(window).scroll(function(){
    var alturaScroll = Math.round(jQuery(window).scrollTop());
    var alturaDeWidget = Math.round(jQuery(".newWidgetDefault").offsetTop);
    var alturaListSelector = jQuery(".newWidgetDefault ul.dropdown-menu.dropdown-menu-select").height();
    //-----------------------------------------------------------------------
    //--------------------------- scroll vertical ---------------------------
    //-----------------------------------------------------------------------
    var scrollVerticalSelector = alturaDeWidget - 300;
    var scrollVerticalHabitaciones = alturaDeWidget - 320
    if($(window).width() > 1200){
        //----------quitar scroll al body si lo tiene----
        jQuery('body[style="overflow: hidden;"]').css("overflow","auto");
        //---------------------- selector
        if(alturaScroll > scrollVerticalSelector){
            jQuery(".newWidgetDefault ul.dropdown-menu.dropdown-menu-select").addClass("debajo");
        }
        if(alturaScroll < scrollVerticalSelector){
            jQuery(".newWidgetDefault ul.dropdown-menu.dropdown-menu-select").removeClass("debajo");
        }
        //---------------------------------------------------------------
        //----------------------- Hoteles--------------------------------
        if(alturaScroll > scrollVerticalHabitaciones){
            jQuery("div#netactica_hotel_tab_widget div#habitacionesPop").addClass("debajo");
            jQuery(".newWidgetDefault div#habitacionesPopPaquetes").addClass("debajo");
        }
        if(alturaScroll < scrollVerticalHabitaciones){
            jQuery("div#netactica_hotel_tab_widget div#habitacionesPop").removeClass("debajo");
            jQuery(".newWidgetDefault div#habitacionesPopPaquetes").removeClass("debajo");
        }
    }
    
});
/*function cabinaElement(){
    if(jQuery(window).width() < 768){
        if(jQuery(".CabinType_netactica_air-desktop > .input-group").html() != undefined){
            jQuery(".CabinType_netactica_air-mobile").append(jQuery(".CabinType_netactica_air-desktop > .input-group"))
        }
        if(jQuery(".CabinType_netactica_airMulti-desktop > .input-group").html() != undefined){
            jQuery(".CabinType_netactica_airMulti-mobile").append(jQuery(".CabinType_netactica_airMulti-desktop > .input-group"))
        }
        if(jQuery(".CabinType_netactica_aircar-desktop > .input-group").html() != undefined){
            jQuery(".CabinType_netactica_aircar-mobile").append(jQuery(".CabinType_netactica_aircar-desktop > .input-group"))
        }
    }
    else{
        if(jQuery(".CabinType_netactica_air-mobile > .input-group").html() != undefined){
            jQuery(".CabinType_netactica_air-desktop").append(jQuery(".CabinType_netactica_air-mobile > .input-group"))
        }
        if(jQuery(".CabinType_netactica_airMulti-mobile > .input-group").html() != undefined){
            jQuery(".CabinType_netactica_airMulti-desktop").append(jQuery(".CabinType_netactica_airMulti-mobile > .input-group"))
        }
        if(jQuery(".CabinType_netactica_aircar-mobile > .input-group").html() != undefined){
            jQuery(".CabinType_netactica_aircar-desktop").append(jQuery(".CabinType_netactica_aircar-mobile > .input-group"))
        }
    }
}
cabinaElement();*/
function placeholderWidget(){
    if(jQuery(window).width() < 768){
        jQuery(".input-calendar").each(function(){
            var placeholder = jQuery(this).attr("placeholder-desktop")
            jQuery(this).attr("placeholder", placeholder)

        })
    }   
    else{
        jQuery(".input-calendar").each(function(){
            var placeholder = jQuery(this).attr("placeholder-desktop")
            jQuery(this).attr("placeholder", placeholder)

        })
    }
}
placeholderWidget();  
function scrollContenedorHabitaciones(e){
    $('div.morePop.morePopHabitaciones .contenedor-habitaciones').animate({
        scrollTop: $(e).offset().top + $(e).height()
        }, 500);
}

//-------------------------------------------------------------------------------------------------
//--------------------------revolcer resultado ciudad de desitno y ciudad de origen----------------
//-------------------------------------------------------------------------------------------------
var rotateRevolverVuelos = 0;
var rotateRevolverHoteles = 0;
var rotateRevolverPaquetes = 0;
var rotateRevolverAutos = 0;
var rotateRevolverActividades = 0;
function movilRotate(){
    if(jQuery(window).width() < 768){
        rotateRevolverVuelos = rotateRevolverVuelos - 90;
        rotateRevolverHoteles = rotateRevolverHoteles - 90;
        rotateRevolverPaquetes = rotateRevolverPaquetes - 90;
        rotateRevolverAutos = rotateRevolverAutos - 90;
        rotateRevolverActividades = rotateRevolverActividades - 90;
    }
    else{

    }
}
movilRotate();

$( window ).resize(function(){
    movilRotate();
    placeholderWidget();
})




//-------------------------------------------------------------------------------------------------
//-------------------------------------QUITAR AUTOFOCUS--------------------------------------------
//-------------------------------------------------------------------------------------------------



$(document).ready(function () { 
    

    function stickyWidget(){
        var widget = jQuery("article#widget")
        if(jQuery("article#widget").hasClass("sticky") ){
            if(jQuery(window).width() > 1000){
                if(!jQuery(widget).hasClass("sticky-wrapper")){
                    jQuery(widget).sticky({topSpacing:0});
                    jQuery(widget).addClass("is-sticky") 
                }
            }
            else if(jQuery(window).width() <= 1000){
                if(jQuery(widget).parent().hasClass("sticky-wrapper")){
                    jQuery(widget).unstick();
                    jQuery(widget).removeClass("is-sticky") 
                }
            }
        }
        
    }

    stickyWidget();
    jQuery(window).resize(function(){stickyWidget();})




    //boton de mis reservas
    let urlReservas = `${json_settings.ProductUrl}NetFulfillment/Login.aspx?UserService=${json_settings.UserService}&BranchCode=${json_settings.BranchCode.split("-")[0]}`
    jQuery("#sbm_netactica_reservas").attr("href", urlReservas)
    
    document.onmouseover = autocompleteInput()
    function autocompleteInput(){
        $("div#netactica_booking_form input").attr('autocomplete', 'no-complete');
        $('div#netactica_booking_form input').on('focus', function () {
            $(this).attr('autocomplete', 'no-complete')
        });
        $('div#netactica_booking_form input').on('blur', function () {
            $(this).attr('autocomplete', 'no-complete')
        });
        $('div#netactica_booking_form input').on('hover', function () {
            $(this).attr('autocomplete', 'no-complete')
        });
        $('div#netactica_booking_form input').on('active', function () {
            $(this).attr('autocomplete', 'no-complete')
        });
        $('div#netactica_booking_form input').on('click', function () {
            $(this).attr('autocomplete', 'no-complete')
        });
    }


    // Habitaciones hoteles
    var sumaPajaseros = 0;
    $.each($("[data-adultos='adultos']"), function (index, el) {
        if ($(this).parent().parent().parent().parent().css('display') != 'none') {
            sumaPajaseros += parseInt($(el).val());
        }
    });

    function cargarAutoSelectInput(){
        setTimeout(() => {
            // Tab vuelos
            // Ciudad Origen a Ciudad destino
            $("#CityPredictiveFrom_netactica_air").on("autocompleteselect", function () {
                $("#CityPredictiveTo_netactica_air").focus();  
                //bgAutofocus(true)
            });
            // Ciudad destino a fecha de salida
            $("#CityPredictiveTo_netactica_air").on("autocompleteselect", function () {
                $("#DateFrom_netactica_air").focus(); 
                //bgAutofocus(true)
            });

            // Multidestinos 1
            $("#CityPredictiveTo_1_netactica_air").on("autocompleteselect", function () {
                validarCiudadMultidestino();
                $("#DateFrom_1_netactica_air").change();
            //bgAutofocus(true)
            });
            // Multidestinos 2
            $("#CityPredictiveTo_2_netactica_air").on("autocompleteselect", function () {
                validarCiudadMultidestino();
                $("#DateFrom_2_netactica_air").change();
                //bgAutofocus(true)
            });
            // Multidestinos 3
            $("#CityPredictiveTo_3_netactica_air").on("autocompleteselect", function () {
                validarCiudadMultidestino();
                $("#DateFrom_3_netactica_air").change();
                //bgAutofocus(true)
            });
            // Multidestinos 4
            $("#CityPredictiveTo_4_netactica_air").on("autocompleteselect", function () {
                validarCiudadMultidestino();
                $("#DateFrom_4_netactica_air").change();
                //bgAutofocus(true)
            });
            // Multidestinos 5
            $("#CityPredictiveTo_5_netactica_air").on("autocompleteselect", function () {
                validarCiudadMultidestino();
                $("#DateFrom_5_netactica_air").change();
                //bgAutofocus(true)
            });
            // Multidestinos 6
            $("#CityPredictiveTo_6_netactica_air").on("autocompleteselect", function () {
                $("#DateFrom_6_netactica_air").change();
                //bgAutofocus(true)
            });

            // Tab Hoteles
            $("#CityPredictive_netactica_hotel").on("autocompleteselect", function () {
                $("#DateFrom_netactica_hotel").focus();
                //bgAutofocus(true)
            });

            // Tab Paquetes
            $("#CityPredictiveFrom_netactica_airhotel").on("autocompleteselect", function () {
                $("#CityPredictiveTo_netactica_airhotel").focus();
                //bgAutofocus(true)
            });
            $("#CityPredictiveTo_netactica_airhotel").on("autocompleteselect", function () {
                $("#DateFrom_netactica_airhotel").focus();
                //bgAutofocus(true)
            });

            // Tab Autos
            $("#AirportPredictiveFrom_netactica_car").on("autocompleteselect", function () {
                $("#DateFrom_netactica_car").focus();
            });

            // Tab Actividades
            $("#CityPredictive_netactica_extras").on("autocompleteselect", function () {
                $("#DateFrom_netactica_extras").focus();
                //bgAutofocus(true)
            });
        }, 10);
    }
    


  
    
    // ------------------------------------------------------
    //----------MULTIDESTINO OBTINE INFORMACION DE EL VUELO SELECCIONA
    // ------------------------------------------------------
   function validarCiudadMultidestino () {
        setTimeout(() => {
            if($("#CityPredictiveTo_1_netactica_air").val() != $("#CityPredictiveFrom_2_netactica_air").val()){
                $("#CityPredictiveFrom_2_netactica_air").val($("#CityPredictiveTo_1_netactica_air").val())
            }
            else if($("#CityPredictiveTo_2_netactica_air").val() != $("#CityPredictiveFrom_3_netactica_air").val()){
                if(jQuery('div#AirFlight3[style="display: none;"]').length != 1){
                    $("#CityPredictiveFrom_3_netactica_air").val($("#CityPredictiveTo_2_netactica_air").val())
                }
            }
            else if($("#CityPredictiveTo_3_netactica_air").val() != $("#CityPredictiveFrom_4_netactica_air").val()){
                if(jQuery('div#AirFlight4[style="display: none;"]').length != 1){
                    $("#CityPredictiveFrom_4_netactica_air").val($("#CityPredictiveTo_3_netactica_air").val())
                }
            }
            else if($("#CityPredictiveTo_4_netactica_air").val() != $("#CityPredictiveFrom_5_netactica_air").val()){
                if(jQuery('div#AirFlight5[style="display: none;"]').length != 1){
                    $("#CityPredictiveFrom_5_netactica_air").val($("#CityPredictiveTo_4_netactica_air").val())
                }
            }
            else if($("#CityPredictiveTo_5_netactica_air").val() != $("#CityPredictiveFrom_6_netactica_air").val()){
                if(jQuery('div#AirFlight6[style="display: none;"]').length != 1){
                    $("#CityPredictiveFrom_6_netactica_air").val($("#CityPredictiveTo_5_netactica_air").val())
                }
            }
        },10)
    }


    // Input 1
    $("#CityPredictiveTo_1_netactica_air").change(function () {
        $("#CityPredictiveFrom_2_netactica_air").val($(this).val());
    });
    // Input 2
    $("#CityPredictiveTo_2_netactica_air").change(function () {
        if(jQuery('div#AirFlight3[style="display: none;"]').length != 1){
            $("#CityPredictiveFrom_3_netactica_air").val($(this).val());
        }
        
    });
    // Input 3
    $("#CityPredictiveTo_3_netactica_air").change(function () {
        if(jQuery('div#AirFlight4[style="display: none;"]').length != 1){
            $("#CityPredictiveFrom_4_netactica_air").val($(this).val());
        }
        
    });
    // Input 4
    $("#CityPredictiveTo_4_netactica_air").change(function () {
        if(jQuery('div#AirFlight5[style="display: none;"]').length != 1){
            $("#CityPredictiveFrom_5_netactica_air").val($(this).val());
        }
        
    });
    // Input 5
    $("#CityPredictiveTo_5_netactica_air").change(function () {
        if(jQuery('div#AirFlight6[style="display: none;"]').length != 1){
            $("#CityPredictiveFrom_6_netactica_air").val($(this).val());
        }
        
    });




    






    /*Agregamos nueva funcionalidad del seleccionador de destinos*/

    $('.menudropdown-radio').find('input').change(function() {
        var dropdown = $(this).closest('.dropdown');
        var radioname = $(this).attr('name');
        var checked = 'input[name=' + radioname + ']:checked';
        //update the text
        var checkedtext = $(checked).closest('.menudropdown-radio').text();
        dropdown.find('button').text( checkedtext );
        //retrieve the checked value, if needed in page
        // var thisvalue = dropdown.find( checked ).val();
        $('.dropdown').removeClass('open');
    });
    
    /*Agregamos nueva funcionalidad del seleccionador de destinos*/

    $('.menudropdown-radioClase').find('input').change(function() {
      var dropdown = $(this).closest('.dropdown');
      var radioname = $(this).attr('name');
      var checked = 'input[name=' + radioname + ']:checked';
      //update the text
      var checkedtext = $(checked).closest('.menudropdown-radioClase').text();
      var sinClase = checkedtext.replace("Clase","")
      //console.log(checkedtext.trim());
      dropdown.find('button').text( sinClase );

      if(checkedtext.trim() == "Multidestino"){
        jQuery("div#AirFlightRTOW").css("display","none");
        jQuery("div#AirFlightRTOW > .ida-regreso").css("display","block");
        jQuery("div#AirFlightRTOW").addClass("Multidestino");
      }
      else if(checkedtext.trim() != "Multidestino"){
        jQuery("div#AirFlightRTOW").css("display","flex");
        jQuery("div#AirFlightRTOW > .ida-regreso").css("display","block");
        jQuery("div#AirFlightRTOW").removeClass("Multidestino");
      }
      //retrieve the checked value, if needed in page
      // var thisvalue = dropdown.find( checked ).val();
      $('.dropdown').removeClass('open');

    });

    // Mostrar los input de acuerdo a la seleccion del radio button
    $("#opcionesEspecialesActionLabelMulti").hide("fast");

    jQuery('input[name=TripType_netactica_air_hotel]').click(function(){
        var valor = $(this).val();
        if(valor == "airhotel"){
            jQuery("#btnOpcionesEspecialesAereoHotel").css("display","block");

            jQuery("#btnOpcionesEspecialesAereoAuto").css("display","none");
            jQuery("#opcionesEspecialesShowCar").hide("fast");
        }
        else if(valor == "aircar"){
            jQuery("#btnOpcionesEspecialesAereoHotel").css("display","none");
            jQuery("#opcionesEspecialesPaqShow").hide("fast");

            jQuery("#btnOpcionesEspecialesAereoAuto").css("display","block");
        }
    });
     $('input[name=TripType_netactica_air]').click(function () {




        jQuery("#DateFrom_netactica_air").datepicker('setDate', null);
        jQuery("#DateTo_netactica_air").datepicker('setDate', null);
        var valor = $(this).val();
        if (valor == "RT") {
            $("#visibleMultidestino a").appendTo('#visibleidayregreso');
            $(this).attr('checked', true);
            $("#RT").addClass('active');
            $("#OW").removeClass('active');
            $("#MD").removeClass('active');
            $('#AirFlightRTOW').show();
            // $(".col-md-3Show").removeClass("col-md-3");
            $(".col-md-3Show").addClass("col-6");
            $(".col-md-3Show").removeClass("col-md-3");
            $(".col-md-3Show").addClass("col-md-2");
            $('#divAirDatesTo').removeClass("disabled");
            $('#AirFlightsMT').hide();
            $('#horaRegresoAir').show();
            // Ocultamos los demas campos
            $(".js-showBlock").hide("slow");
            $("#opcionesEspecialesShow").hide("slow");
            $("#opcionesEspecialesShowMulti").hide("slow");
            $("input[name='opcionesEspeciales']").prop('checked', false);
            $("#opcionesEspecialesActionLabel").css("display","block");
            $("#opcionesEspecialesActionLabelMulti").css("display","none");
            $(this).parents(".tab-pane.active").find(".row.bd-contents").find(".encuentra-servicios-adicionales").css("display","block")


            $(".CabinType_netactica_air").css("display","block");
            $(".CabinType_netactica_airMulti").css("display","none");
            $("input#DateTo_netactica_air").removeAttr("disabled")
            $("input#DateTo_netactica_air").siblings(".icon-salida").removeAttr("disabled","disabled")



        } else if (valor == "OW") {

            $("#visibleMultidestino a").appendTo('#visibleidayregreso');
            $(this).attr('chWecked', true);
            $("#RT").removeClass('active');
            $("#OW").addClass('active');
            $("#MD").removeClass('active');
            $('#AirFlightRTOW').show();
            $('#divAirDatesTo').addClass("disabled");
            $('#horaRegresoAir').hide();
            $(".col-md-3Show").removeClass("col-md-2");
            $(".col-md-3Show").addClass("col-12");
            $(".col-md-3Show").removeClass("col-6");
            $('#AirFlightsMT').hide();
            // Ocultamos los demas campos
            $(".js-showBlock").hide("slow");
            $("input[name='opcionesEspeciales']").prop('checked', false);
            $("#opcionesEspecialesShow").hide("slow");
            $("#opcionesEspecialesShowMulti").hide("slow");
            $("#opcionesEspecialesActionLabel").css("display","block");
            $("#opcionesEspecialesActionLabelMulti").css("display","none");
            $(this).parents(".tab-pane.active").find(".row.bd-contents").find(".encuentra-servicios-adicionales").css("display","block")
            $(".CabinType_netactica_air").css("display","block");
            $(".CabinType_netactica_airMulti").css("display","none");
            $("input#DateTo_netactica_air").attr("disabled","disabled")
            $("input#DateTo_netactica_air").siblings(".icon-salida").attr("disabled","disabled")

        }
        else {
            $("#visibleidayregreso a").appendTo('#visibleMultidestino');
            $(this).attr('checked', true);
            $("#RT").removeClass('active');
            $("#OW").removeClass('active');
            $("#MD").addClass('active');
            $('#AirFlightsMT').show();
            $('#AirFlightRTOW').hide();
            // Ocultamos los demas campos
            $(".js-showBlock").hide("slow");
            $("#opcionesEspecialesShowMulti").hide("slow");
            $("input[name='opcionesEspeciales']").prop('checked', false);
            $("#opcionesEspecialesActionLabel").css("display","none");
            $("#opcionesEspecialesActionLabelMulti").css("display","block");
            $(this).parents(".tab-pane.active").find(".row.bd-contents").find(".encuentra-servicios-adicionales").css("display","none")
            $(".CabinType_netactica_air").css("display","none");
            $(".CabinType_netactica_airMulti").css("display","block");

        }
    });


    // Mantenemos en una linea todos los tabs

    // Vuelos
    $("#CityPredictiveFrom_netactica_air, #CityPredictiveFrom_netactica_air2").focus(function() {
      $(".js-showBlock").show("slow");
    });
    // Multidestino
    $("#CityPredictiveFrom_1_netactica_air").focus(function () {
        $(".js-showBlock").show("slow");
    });
    // Hoteles
    $("#CityPredictive_netactica_hotel").focus(function() {
        $(".js-showBlockHotel").show("slow");
    });
    // Paquetes
    $("#CityPredictiveFrom_netactica_airhotel").focus(function () {
        $(".js-showBlockPaquetes").show("slow");
    });
    // Autos
    $("#AirportPredictiveFrom_netactica_car").focus(function() {
      $(".js-showBlockautos").show("slow");
    });
    // vuelo + auto
    $("#CityPredictiveFrom_netactica_aircar").focus(function() {
        $(".js-showBlock").show("slow");
    });
    $("#CityPredictive_netactica_extras").focus(function() {
        $(".js-showBlockActividades").show("slow");
    });

    // Ocultamos todos los inputs desde los tabs desde la segunda fila
    $('a[aria-controls="netactica_air_tab_widget"] , a[aria-controls="netactica_hotel_tab_widget"] , a[aria-controls="netactica_air_hotel_tab_widget"], a[aria-controls="netactica_car_tab_widget"], a[aria-controls="netactica_air_car_tab_widget"], a[aria-controls="netactica_extras_tab_widget"]').click(function() {
      $(".js-showBlock").hide("slow");
      $(".js-showBlockHotel").hide("slow");
      $(".js-showBlockPaquetes").hide("slow");
      $(".js-showBlockautos").hide("slow");
      $(".js-showBlockActividades").hide("slow");
      // Ocultamos los popup de pasajeros cuando se salga del tab activo
      $("#habitacionesPop, #pasajerosvuelos, #habitacionesPopPaquetes, #habitacionesmultidestinos").css({"display":"none"});

    });





    //---------------------------------------------------------------------------------------------
    //-------------------------------------ABRIR POP UP-------------------------------------------
    //---------------------------------------------------------------------------------------------
    function scrollElemento(e, f){
        var alturaScroll = Math.round(jQuery(window).scrollTop());
        var alturaContenedor = Math.round(jQuery(f).offset().top) - 370;
        var popUp = jQuery(e).parents(".tab-pane.show.active").children(f)
        if(alturaScroll > alturaContenedor){
            jQuery(f).parents(".tab-pane.show.active").children(e).position({
              my: "left top",
              at: "left bottom",
              of: f
            });
        }
        else{
            jQuery(f).parents(".tab-pane.show.active").children(e).position({
              my: "left bottom",
              at: "left top",
              of: f
            });
        }
    }
    
    $('label[for="txtNumPassengers"], label[class="txtNumPassengers"], label[for="txtNumPassengersMD"], .habitacionesBox').click(function(e) {
        var morePop = "";
        var elementoItem = '';
        function posicionHorizontal(e,f){
            jQuery(f).parents(".tab-pane.show.active").children(e).css({"display":"block"});
            jQuery(f).parents(".tab-pane.show.active").children(e).position({
              my: "left top",
              at: "left bottom",
              of: f
            });
        }
        if(jQuery(this).hasClass("habitacionesBox")){
            morePop = "div.morePopHabitaciones";
            elementoItem= jQuery("div.morePopHabitaciones")
            posicionHorizontal(morePop, this);
        }
        else{
            morePop = "div.popUpPasajeros";
            elementoItem= jQuery("div.popUpPasajeros")
            posicionHorizontal(morePop, jQuery(this));
        }

        
        var elemento = jQuery(this).parent();
        jQuery(window).scroll(function(){
            scrollElemento(morePop, elemento);
        });
        bgAutofocus(true, jQuery(elementoItem))
    });

    //---------------------------------------------------------------------------------------------
    //-------------------------------------CERRAR POP UP-------------------------------------------
    //---------------------------------------------------------------------------------------------
    
    var numClose = 1
    jQuery(document).click(function(){
        if(jQuery('.tab-content>.active div.morePop').css('display') == 'block' && numClose == 2){
            //$('.close.closePop').trigger('click')
            numClose = 1
        }
        else{
            numClose = 2
        }
    })
    $('.morePop').bValidator();
    $('.close.closePop, .morePop button.btbClosePaxPopup').click(function(e) {
        e.preventDefault();
        if(jQuery(this).parents(".morePop").data('bValidator').validate()){
            $(".morePop").css("display","none");
            bgAutofocus(false)
        }
    }); 
    
    //---------------------------------------------------------------------------------------------
    //-----------------------------------cerrar opciones especiales--------------------------------
    //---------------------------------------------------------------------------------------------
    jQuery('div#netactica_booking_form div[role="tabpanel"] > .container.container--tab div.col-12.bd-right.btn-widgets ul.dropdown-menu li, #netactica_booking_form ul#myTab li a').click(function(){
        jQuery('div#netactica_booking_form div[role="tabpanel"] > .container.container--tab div.caracteristicas.opciones-especiales label.checkbox-inline i').removeClass("fa-angle-double-up");
        jQuery('div#netactica_booking_form div[role="tabpanel"] > .container.container--tab div.caracteristicas > .row.items-opciones-especiales').parent().css("display","none");
    });
    // Incremento y decremento para los pasajeros Hotel
    $('.btn-number, .btn-numberDos, .btn-numberTres, .btn-numberCuatro, .btn-numberPaquetes , .btn-numberPaquetesDos, .btn-numberPaquetesTres, .btn-numberPaquetesCuatro').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }
            } 
            else if (type == 'plus') {
                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        }
        else {
            input.val(0);
        }
    });

    $('.input-number, .input-numberDos, .input-numberTres, .input-numberCuatro, .input-numberPaquetes, .input-numberPaquetesDos, .input-numberPaquetesTres, .input-numberPaquetesCuatro').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });

    $(".input-number, .input-numberDos, .input-numberTres, .input-numberCuatro, .input-numberPaquetes, .input-numberPaquetesDos, .input-numberPaquetesTres, .input-numberPaquetesCuatro").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    // Hoteles

    // Habitacion 1
    $('.input-number').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });

    // Habitacion 2
    $('.input-numberDos').change(function () {
        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-numberDos[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-numberDos[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });

    // Habitacion 3
    $('.input-numberTres').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {

            $(".btn-numbertres[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-numberTres[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });

    // Habitacion 4
    $('.input-numberCuatro').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-numberCuatro[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-numberCuatro[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });





    // Paquetes

    // Habitacion 1
    $('.input-numberPaquetes').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-numberPaquetes[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-numberPaquetes[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });

    // Habitacion 2
    $('.input-numberPaquetesDos').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-numberPaquetesDos[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-numberPaquetesDos[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });

    // Habitacion 3
    $('.input-numberPaquetesTres').change(function () {
        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {

            $(".btn-numberPaquetestres[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-numberPaquetesTres[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });

    // Habitacion 4
    $('.input-numberPaquetesCuatro').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-numberPaquetesCuatro[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
           $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-numberPaquetesCuatro[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });



    // ---------------------------------------------------------------------------------------------------------

    //Mostrar las opciones avanzadas

    $('#opcionesEspecialesAction').click(function () {
        $(".fa-angle-double-down").toggleClass('fa-angle-double-up');
        $(".fa-angle-double-down").removeClass(this);
        $('#opcionesEspecialesShow').toggle("slow");
    });

    $('#opcionesEspecialesActionMulti').click(function () {
        $(".fa-angle-double-down").toggleClass('fa-angle-double-up');
        $(".fa-angle-double-down").removeClass(this);
        $('#opcionesEspecialesShowMulti').toggle("slow");
    });

    $('#opcionesEspecialesActionCar').click(function () {
        $(".fa-angle-double-down").toggleClass('fa-angle-double-up');
        $(".fa-angle-double-down").removeClass(this);
        $('#opcionesEspecialesShowCar').toggle("slow");
    });

    $('#opcionesEspecialesPaqAction').click(function () {
        $(".fa-angle-double-down").toggleClass('fa-angle-double-up');
        $(".fa-angle-double-down").removeClass(this);
        $('#opcionesEspecialesPaqShow').toggle("slow");
    });

    $('input[name=car_sucursal]').click(function (evento) {
        // evento.preventDefault();
            var valor = $(this).prop('checked');

            if (valor) {
                $("#sucursalDouble").addClass('col-md-6').addClass('pad-0')
                $("#sucursalDouble").siblings('.colWidget').addClass('col-md-6').addClass('pad-0')
                $("#sucursalDouble").show();
                

            }else {
                $("#sucursalDouble").removeClass('col-md-6').removeClass('pad-0')
                $("#sucursalDouble").siblings('.colWidget').removeClass('col-md-6').removeClass('pad-0')
                $("#sucursalDouble").hide();

            }
    });
    //------------------------------------------------------------------
    //-------------------------Activar el multidestino------------------
    //------------------------------------------------------------------




    jQuery("a.addNewTravel").click(function(){
        var addElement = jQuery(this).attr("data-add-travel");
        jQuery(`#${addElement}`).removeAttr("style");
        jQuery(this).parents(`[data-travel*="AirFlight"]`).css("display","none")
        validarCiudadMultidestino();
    })
    jQuery("a.deleteTravel").click(function(){
        var removeElement = jQuery(this).parents(`[data-travel*="AirFlight"]`).attr("data-travel")
        jQuery(`#${removeElement}`).css("display","none");

        var addElement =  jQuery(this).attr("data-remove-travel");
        jQuery(`#${addElement}, #${addElement} [data-travel*="${addElement}"]`).removeAttr("style");
    })






    $("label.radio").click(function(){
        $("label.radio").removeClass("active");
        $(this).addClass("active");
        $(".morePop").css("display","none");
    });
    $("label#airhotel").click(function(){
        $("div#aircar").addClass("d-none");
        $("div#airhotel").removeClass("d-none");
    });
    $("label#aircar").click(function(){
        $("div#airhotel").addClass("d-none");
        $("div#aircar").removeClass("d-none");
    });
    $("#aircar").click(function(){
        if($("#aircar").hasClass("active")){
            $("#mashotel").removeClass("d-md-flex");
            $("#mashotel").addClass("d-none");
            $("#masauto").removeClass("d-none");
            $("#masauto").addClass("d-md-flex");
        }
    });
    $("#airhotel").click(function(){
        if($("#airhotel").hasClass("active")){
            $("#mashotel").removeClass("d-none");
            $("#mashotel").addClass("d-md-flex");
            $("#masauto").addClass("d-none");
            $("#masauto").removeClass("d-md-flex");
        }
    });
    //-----------------------------------------------------------------------------
    //------------CUANDO SE LE DA CLICK A VIAJEROS O HABITACIONES------------------
    //-----------------------------------------------------------------------------

    jQuery(".habitacionesBox").click(function(){
        jQuery("div#habitacionesPop").show();
        jQuery("div#habitacionesPopPaquetes").show();
    });

    //-----------------------------------------------------------------------------
    //---------------------------QUITAR AUTOCOMPLETAR------------------------------
    //-----------------------------------------------------------------------------
    
    jQuery('div#netactica_booking_form div[role="tabpanel"] > .container.container--tab div.col-12.caracteristicas input').attr("autocomplete","ÑÖcompletes");
    


    //-----------------------------------------------------------
    //--------------------HABITACIONES HOTELES-------------------
    //------------------------------------------------------------

    $("#btbAddRoomtwo").click(function(e) {
        e.preventDefault();
        counthabitacionesHoteles = 2
        $(this).hide(); 
        $("#roomtwo, #btbAddRoomthree").show();

        var hab1 = parseInt($("[data-adultos='adultos']").val()) + parseInt($("[name=ddlHotelNumberChildrens]").val());
        var hab2 = parseInt($("#ddlHotelNumberAdultsDos").val()) + parseInt($("[name=ddlHotelNumberChildrensDos]").val());
        var detHab = parseInt(hab1) + parseInt(hab2);
        $("#txtNumPassengersHoteles").val(detHab);
        countFunhabitacionesHoteles(detHab, counthabitacionesHoteles);
        scrollContenedorHabitaciones("#roomtwo");

    });
    $("#eliminarhabitaciondos").click(function() {
        counthabitacionesHoteles = 1 
        $("#btbAddRoomtwo, #btbAddRoomthree, #roomtwo").hide();
        $("#btbAddRoomtwo").show();
        var detHab = parseInt($("[data-adultos='adultos']").val()) + parseInt($("[name=ddlHotelNumberChildrens]").val());
        $("#txtNumPassengersHoteles").val(detHab);
        countFunhabitacionesHoteles(detHab, counthabitacionesHoteles);
        scrollContenedorHabitaciones("#roomone");

    });
    $("#btbAddRoomthree").click(function(e) {
        e.preventDefault();
        counthabitacionesHoteles = 3
        $(this).hide();
        $("#eliminarhabitaciondos").hide();
        $("#roomthree, #btbAddRoomfour").show();

        var hab1 = parseInt($("[data-adultos='adultos']").val()) + parseInt($("[name=ddlHotelNumberChildrens]").val());
        var hab2 = parseInt($("#ddlHotelNumberAdultsDos").val()) + parseInt($("[name=ddlHotelNumberChildrensDos]").val());
        var hab3 = parseInt($("#ddlHotelNumberAdultsTres").val()) + parseInt($("[name=ddlHotelNumberChildrensTres]").val());
        var detHab = parseInt(hab1) + parseInt(hab2) + parseInt(hab3);

        $("#txtNumPassengersHoteles").val(detHab);
        countFunhabitacionesHoteles(detHab, counthabitacionesHoteles);
        scrollContenedorHabitaciones("#roomthree");
        
    });
    $("#eliminarhabitaciontres").click(function() {
        counthabitacionesHoteles = 2
        $("#roomthree, #btbAddRoomfour").hide();
        $("#eliminarhabitaciondos, #btbAddRoomthree").show();

        var hab1 = parseInt($("[data-adultos='adultos']").val()) + parseInt($("[name=ddlHotelNumberChildrens]").val());
        var hab2 = parseInt($("#ddlHotelNumberAdultsDos").val()) + parseInt($("[name=ddlHotelNumberChildrensDos]").val());
        var detHab = parseInt(hab1) + parseInt(hab2);

        $("#txtNumPassengersHoteles").val(detHab);
        countFunhabitacionesHoteles(detHab, counthabitacionesHoteles);
        scrollContenedorHabitaciones("#roomtwo");
        
    });
    $("#btbAddRoomfour").click(function(e) {
        e.preventDefault();
        counthabitacionesHoteles = 4
        $(this).hide();
        $("#roomfour").show();
        $("#eliminarhabitaciontres").hide();

        var hab1 = parseInt($("[data-adultos='adultos']").val()) + parseInt($("[name=ddlHotelNumberChildrens]").val());
        var hab2 = parseInt($("#ddlHotelNumberAdultsDos").val()) + parseInt($("[name=ddlHotelNumberChildrensDos]").val());
        var hab3 = parseInt($("#ddlHotelNumberAdultsTres").val()) + parseInt($("[name=ddlHotelNumberChildrensTres]").val());
        var hab4 = parseInt($("#ddlHotelNumberAdultsCuatro").val()) + parseInt($("[name=ddlHotelNumberChildrensCuatro]").val());
        var detHab = parseInt(hab1) + parseInt(hab2) + parseInt(hab3) + parseInt(hab4);

        $("#txtNumPassengersHoteles").val(detHab);
        countFunhabitacionesHoteles(detHab, counthabitacionesHoteles);

        scrollContenedorHabitaciones("#roomfour");
        
    });
    $("#eliminarhabitacioncuatro").click(function() {
        counthabitacionesHoteles = 3
        $("#roomfour").hide();
        $("#eliminarhabitaciontres, #btbAddRoomfour").show();

        var hab1 = parseInt($("[data-adultos='adultos']").val()) + parseInt($("[name=ddlHotelNumberChildrens]").val());
        var hab2 = parseInt($("#ddlHotelNumberAdultsDos").val()) + parseInt($("[name=ddlHotelNumberChildrensDos]").val());
        var hab3 = parseInt($("#ddlHotelNumberAdultsTres").val()) + parseInt($("[name=ddlHotelNumberChildrensTres]").val());
        var detHab = parseInt(hab1) + parseInt(hab2) + parseInt(hab3);

        $("#txtNumPassengersHoteles").val(detHab);
        countFunhabitacionesHoteles(detHab, counthabitacionesHoteles);

        scrollContenedorHabitaciones("#roomthree");
        
    });
    //-----------------------------------------------------------
    //------------------HABITACIONES PAQUETES--------------------
    //-----------------------------------------------------------
    $("#btbAddRoomtwopaquetes").click(function(e) {
        e.preventDefault();
        $(this).hide();
        counthabitacionesPaquetes = 2;
        $("#roomtwopaquetes, #btbAddRoomthreepaquetes").show();

        var habAirHot1 = parseInt($("#ddlAirHotelNumberAdults").val()) + parseInt($("#ddlAirHotelNumberChildrens").val());
        var habAirHot2 = parseInt($("#ddlAirHotelNumberAdultsDos").val()) + parseInt($("#ddlAirHotelNumberChildrensDos").val());
        var detHabAirHot = parseInt(habAirHot1) + parseInt(habAirHot2);

        $("#txtNumPassengersPaquetes").val(detHabAirHot);
        countFunhabitacionesPaquetes(detHabAirHot, counthabitacionesPaquetes);
        scrollContenedorHabitaciones("#roomtwopaquetes");
        
    });
    $("#eliminarhabitaciondospaquetes").click(function() {
        counthabitacionesPaquetes = 1;
        $("#btbAddRoomtwopaquetes, #btbAddRoomthreepaquetes, #roomtwopaquetes").hide();
        $("#btbAddRoomtwopaquetes").show();

        var habAirHot1 = parseInt($("#ddlAirHotelNumberAdults").val()) + parseInt($("#ddlAirHotelNumberChildrens").val());

        $("#txtNumPassengersPaquetes").val(habAirHot1);
        countFunhabitacionesPaquetes(habAirHot1, counthabitacionesPaquetes);
        scrollContenedorHabitaciones("#roomonepaquetes");
    });
    $("#btbAddRoomthreepaquetes").click(function(e) {
        e.preventDefault();
        $(this).hide();
        counthabitacionesPaquetes = 3;
        $("#eliminarhabitaciondospaquetes").hide();
        $("#roomthreepaquetes").show();
        $("#btbAddRoomfourpaquetes").show();

        var habAirHot1 = parseInt($("#ddlAirHotelNumberAdults").val()) + parseInt($("#ddlAirHotelNumberChildrens").val());
        var habAirHot2 = parseInt($("#ddlAirHotelNumberAdultsDos").val()) + parseInt($("#ddlAirHotelNumberChildrensDos").val());
        var habAirHot3 = parseInt($("#ddlAirHotelNumberAdultsTres").val()) + parseInt($("#ddlAirHotelNumberChildrensTres").val());
        var detHabAirHot = parseInt(habAirHot1) + parseInt(habAirHot2) + parseInt(habAirHot3);

        $("#txtNumPassengersPaquetes").val(detHabAirHot);
        countFunhabitacionesPaquetes(detHabAirHot, counthabitacionesPaquetes);
        scrollContenedorHabitaciones("#roomthreepaquetes");
    });
    $("#eliminarhabitaciontrespaquetes").click(function(e) {
        counthabitacionesPaquetes = 2;
        $("#roomthreepaquetes, #btbAddRoomfourpaquetes").hide();
        $("#eliminarhabitaciondospaquetes").show();
        $("#btbAddRoomthreepaquetes").show();

        var habAirHot1 = parseInt($("#ddlAirHotelNumberAdults").val()) + parseInt($("#ddlAirHotelNumberChildrens").val());
        var habAirHot2 = parseInt($("#ddlAirHotelNumberAdultsDos").val()) + parseInt($("#ddlAirHotelNumberChildrensDos").val());
        var detHabAirHot = parseInt(habAirHot1) + parseInt(habAirHot2);

        $("#txtNumPassengersPaquetes").val(detHabAirHot);
        countFunhabitacionesPaquetes(detHabAirHot, counthabitacionesPaquetes);
        scrollContenedorHabitaciones("#roomtwopaquetes");
    });
    $("#btbAddRoomfourpaquetes").click(function(e) {
        e.preventDefault();
        $(this).hide();
        counthabitacionesPaquetes = 4;
        $("#roomfourpaquetes").show();
        $("#eliminarhabitaciontrespaquetes").hide();

        var habAirHot1 = parseInt($("#ddlAirHotelNumberAdults").val()) + parseInt($("#ddlAirHotelNumberChildrens").val());
        var habAirHot2 = parseInt($("#ddlAirHotelNumberAdultsDos").val()) + parseInt($("#ddlAirHotelNumberChildrensDos").val());
        var habAirHot3 = parseInt($("#ddlAirHotelNumberAdultsTres").val()) + parseInt($("#ddlAirHotelNumberChildrensTres").val());
        var habAirHot4 = parseInt($("#ddlAirHotelNumberAdultsCuatro").val()) + parseInt($("#ddlAirHotelNumberChildrensCuatro").val());
        var detHabAirHot = parseInt(habAirHot1) + parseInt(habAirHot2) + parseInt(habAirHot3) + parseInt(habAirHot4);
        $("#txtNumPassengersPaquetes").val(detHabAirHot);
        countFunhabitacionesPaquetes(detHabAirHot, counthabitacionesPaquetes);
        scrollContenedorHabitaciones("#roomfourpaquetes");
    });
    $("#eliminarhabitacioncuatropaquetes").click(function() {
        counthabitacionesPaquetes = 3;
        $("#roomfourpaquetes").hide();
        $("#eliminarhabitaciontrespaquetes, #btbAddRoomfourpaquetes").show();

        var habAirHot1 = parseInt($("#ddlAirHotelNumberAdults").val()) + parseInt($("#ddlAirHotelNumberChildrens").val());
        var habAirHot2 = parseInt($("#ddlAirHotelNumberAdultsDos").val()) + parseInt($("#ddlAirHotelNumberChildrensDos").val());
        var habAirHot3 = parseInt($("#ddlAirHotelNumberAdultsTres").val()) + parseInt($("#ddlAirHotelNumberChildrensTres").val());
        var detHabAirHot = parseInt(habAirHot1) + parseInt(habAirHot2) + parseInt(habAirHot3);

        $("#txtNumPassengersPaquetes").val(detHabAirHot);
        countFunhabitacionesPaquetes(detHabAirHot, counthabitacionesPaquetes);
        scrollContenedorHabitaciones("#roomthreepaquetes");
    });
    

    
    

    jQuery("#revolve, div#revolve").click(function(e){
        //console.log(rotateRevolverVuelos)
        var idParent = jQuery(this).parents(".tab-pane.show.active").attr("id");
        if(idParent == "netactica_air_tab_widget"){
            rotateRevolverVuelos -= 180;
            jQuery(this).css("transform","rotate("+rotateRevolverVuelos+"deg)");   
        }
        if(idParent == "netactica_hotel_tab_widget"){
            rotateRevolverHoteles -= 180;
            jQuery(this).css("transform","rotate("+rotateRevolverHoteles+"deg)");   
        }
        if(idParent == "netactica_air_hotel_tab_widget"){
            rotateRevolverPaquetes -= 180;
            jQuery(this).css("transform","rotate("+rotateRevolverPaquetes+"deg)");   
        }
        if(idParent == "netactica_car_tab_widget"){
            rotateRevolverAutos -= 180;
            jQuery(this).css("transform","rotate("+rotateRevolverAutos+"deg)");   
        }
        if(idParent == "netactica_extras_tab_widget"){
            rotateRevolverActividades -= 180;
            jQuery(this).css("transform","rotate("+rotateRevolverActividades+"deg)");   
        }
        var city1 = $("#CityPredictiveFrom_netactica_air").val();
        var city2 = $("#CityPredictiveTo_netactica_air").val();
        if (!city1 == "" || !city2 == ""){
           $("#CityPredictiveFrom_netactica_air").val(city2);
           $("#CityPredictiveTo_netactica_air").val(city1);
        }

        var city3 = $("#CityPredictiveFrom_netactica_airhotel").val();
        var city4 = $("#CityPredictiveTo_netactica_airhotel").val();
        if (!city3 == "" || !city4 == ""){
           $("#CityPredictiveFrom_netactica_airhotel").val(city4);
           $("#CityPredictiveTo_netactica_airhotel").val(city3);
        }

        var city5 = $("#CityPredictiveFrom_netactica_aircar").val();
        var city6 = $("#CityPredictiveTo_netactica_aircar").val();
        if (!city5 == "" || !city6 == ""){
           $("#CityPredictiveFrom_netactica_aircar").val(city6);
           $("#CityPredictiveTo_netactica_aircar").val(city5);
        }
    });
    //-------------------------------------------------------------------------------------------------
    //------------------------------SABER LA ULTIMA BUSQUEDA DEL USUARIO-------------------------------
    //-------------------------------------------------------------------------------------------------
    /*var ciudadDeOrigen = "";
    var myHeaders = new Headers();
    var myInit = {method: 'GET',headers: myHeaders,mode: 'cors',cache: 'default'};
    var myRequestGEO = new Request('https://api.ipapi.com/check?access_key=d1c7e9c8cf8140848422210c88e2829d', myInit);
    fetch(myRequestGEO)
    .then(function (response) {
        // si existen datos de respuesta
        if (response) {
            // se obtienen los datos json
            response.json().then(function (data) {
                ciudadDeOrigen = data.location.capital;
                //console.log("ciudadDeOrigen: ",ciudadDeOrigen)
                cargarLocalStorage();
            });
        }
        // no se tienen datos de respuesta
        else {
            console.log("Oops no tuvimos respuesta")
        }
    })*/
    var ubicacionGEOciudad = "";
    var cantidadConsultas = 0;
    function ubicacionGEO(inputSelect, llamando) {
        
        function respuestaValidStaticContent(){
            if(ubicacionGEOciudad == ""){
                jQuery(inputSelect).autocomplete( "search", ciudadDeOrigen.split(' ')[0] );
                jQuery(".ui-menu.ui-widget.ui-widget-content.netsuiteautocomplete li.ui-menu-item:nth-child(1) a").trigger("click")
                jQuery(inputSelect).autocomplete("close"); 
                window.scrollTo( 0, 0 );
                bgAutofocus(false)
                if(llamando == 'vuelos' || llamando == 'hoteles' || llamando == 'vuelo+hotel' || llamando == 'vuelo+carro' || llamando == 'extras'){
                    if(json_settings.StaticContent == false){
                        ubicacionGEOciudad = jQuery(inputSelect).val();
                        cantidadConsultas += 1;
                    }
                }
            }  
            else{
                jQuery(inputSelect).val(ubicacionGEOciudad)
            }
        }
        
        if(llamando == 'vuelos' || llamando == 'hoteles' || llamando == 'vuelo+hotel' || llamando == 'vuelo+carro' || llamando == 'extras'){
            if(ubicacionGEOciudad == ""){
                respuestaValidStaticContent()
            }
            else{
                if(llamando == 'hoteles' && json_settings.StaticContent == true){
                    //respuestaValidStaticContent();
                }
                jQuery(inputSelect).val(ubicacionGEOciudad);
                cantidadConsultas += 1;
            }
        }

        else if(llamando == 'carro'){
            respuestaValidStaticContent() 
        }
        
        if(cantidadConsultas >= 5){
            cargarAutoSelectInput()
            
        }
        
                    
    }
    function cargarLocalStorage() {
        //-----------------------
        //--------VUELOS---------
        //-----------------------
        if(localStorage.getItem("vex_ciudadDeAirOrigen") != null && localStorage.getItem("vex_ciudadDeAirOrigen") != "undefined"){
            if(jQuery("#CityPredictiveFrom_netactica_air").val() == ''){
                jQuery("#CityPredictiveFrom_netactica_air").val(localStorage.getItem("vex_ciudadDeAirOrigen"))
            }
            
        }
        else{
            if(jQuery("#CityPredictiveFrom_netactica_air").val() == ''){
                ubicacionGEO("#CityPredictiveFrom_netactica_air", "vuelos")
            }
            
        }
        if(localStorage.getItem("vex_ciudadDeAirDestino") != null && localStorage.getItem("vex_ciudadDeAirDestino") != "undefined"){
            if(jQuery("#CityPredictiveTo_netactica_air").val() == ''){
                jQuery("#CityPredictiveTo_netactica_air").val(localStorage.getItem("vex_ciudadDeAirDestino"))
            }
        }
        //-----------------------
        //--------HOTELES---------
        //-----------------------
        /*if(localStorage.getItem("vex_ciudadDeHotelDestino") != null && localStorage.getItem("vex_ciudadDeHotelDestino") != "undefined"){
            if(jQuery("#CityPredictive_netactica_hotel").val() == ''){
                jQuery("#CityPredictive_netactica_hotel").val(localStorage.getItem("vex_ciudadDeHotelDestino"))
            }
        }
        else{
            if(jQuery("#CityPredictive_netactica_hotel").val() == ''){
                ubicacionGEO("#CityPredictive_netactica_hotel", "hoteles")
            }
        }*/
        //-----------------------
        //----VUELOS + HOTELES---
        //-----------------------
        if(localStorage.getItem("vex_ciudadDeAirHotelOrigen") != null && localStorage.getItem("vex_ciudadDeAirHotelOrigen") != "undefined"){
            if(jQuery("#CityPredictiveFrom_netactica_airhotel").val() == ''){
                jQuery("#CityPredictiveFrom_netactica_airhotel").val(localStorage.getItem("vex_ciudadDeAirHotelOrigen"))
            }
        }
        else{
            if(jQuery("#CityPredictiveFrom_netactica_airhotel").val() == ''){
                ubicacionGEO("#CityPredictiveFrom_netactica_airhotel", "vuelo+hotel")
            }
        }
        if(localStorage.getItem("vex_ciudadDeAirHotelDestino") != null && localStorage.getItem("vex_ciudadDeAirHotelDestino") != "undefined"){
            if(jQuery("#CityPredictiveTo_netactica_airhotel").val() == ''){
                jQuery("#CityPredictiveTo_netactica_airhotel").val(localStorage.getItem("vex_ciudadDeAirHotelDestino"))
            }
        }
        //-----------------------
        //----VUELOS + CARRO---
        //-----------------------
        if(localStorage.getItem("vex_ciudadDeAirCarOrigen") != null && localStorage.getItem("vex_ciudadDeAirCarOrigen") != "undefined"){
            if(jQuery("#CityPredictiveFrom_netactica_aircar").val() == ''){
                jQuery("#CityPredictiveFrom_netactica_aircar").val(localStorage.getItem("vex_ciudadDeAirCarOrigen"))
            }
        }
        else{
            if(jQuery("#CityPredictiveFrom_netactica_aircar").val() == ''){
                ubicacionGEO("#CityPredictiveFrom_netactica_aircar", "vuelo+carro")
            }
        }
        if(localStorage.getItem("vex_ciudadDeAirCarDestino") != null && localStorage.getItem("vex_ciudadDeAirCarDestino") != "undefined"){
            if(jQuery("#CityPredictiveTo_netactica_aircar").val() == ''){
                jQuery("#CityPredictiveTo_netactica_aircar").val(localStorage.getItem("vex_ciudadDeAirCarDestino"))
            }
        }
        //-----------------------
        //--------CARROS---------
        //-----------------------
        if(localStorage.getItem("vex_ciudadDeCarDestino") != null && localStorage.getItem("vex_ciudadDeCarDestino") != "undefined"){
            if(jQuery("#AirportPredictiveFrom_netactica_car").val() == ''){
                jQuery("#AirportPredictiveFrom_netactica_car").val(localStorage.getItem("vex_ciudadDeCarDestino"))
            }
        }
        else{
            if(jQuery("#AirportPredictiveFrom_netactica_car").val() == ''){
                ubicacionGEO("#AirportPredictiveFrom_netactica_car","carro")
            }
        }
        //-----------------------
        //--------EXTRAS---------
        //-----------------------
        if(localStorage.getItem("vex_ciudadDeExtrasDestino") != null && localStorage.getItem("vex_ciudadDeExtrasDestino") != "undefined"){
            if(jQuery("#CityPredictive_netactica_extras").val() == ''){
                jQuery("#CityPredictive_netactica_extras").val(localStorage.getItem("vex_ciudadDeExtrasDestino"))
            }
        }
        else{
            if(jQuery("#CityPredictive_netactica_extras").val() == ''){
                ubicacionGEO("#CityPredictive_netactica_extras", "extras")
            }
        }

    }
    //----------------------------------------------------------------------------------------------------
    //-------------------------AGREGAR EL DIA SIGUIENTE FIJO EN EL CALENDARIO-----------------------------
    //----------------------------------------------------------------------------------------------------
    var MyDate = new Date();
    MyDate.setDate(MyDate.getDate() + 1); 
    var MyDateString = (MyDate.getDate('dd') < 10 ? '0' + MyDate.getDate('dd') : MyDate.getDate('dd')) + '-' + ((MyDate.getMonth()+1) < 10 ? '0' + (MyDate.getMonth()+1) : (MyDate.getMonth()+1)) + '-' + MyDate.getFullYear(); 
    jQuery('#DateFrom_netactica_air, #DateFrom_1_netactica_air, #DateFrom_netactica_hotel, #DateFrom_netactica_airhotel, #DateFrom_netactica_aircar, #DateFrom_netactica_car, #DateFrom_netactica_extras').each(function(){
        var elemento = jQuery(this)
        if(jQuery(elemento).val() == ""){
            jQuery(elemento).val(MyDateString)
        }
    })
    //----------------------------------------------------------------------------------------------------
    //------------------------------SELECCIONAR COMPLETO EL CONTENIDO DEL INPUT---------------------------
    //----------------------------------------------------------------------------------------------------
    jQuery(".ui-autocomplete-input").click(function(){
        jQuery(this).select()
    })
    //----------------------------------------------------------------------------------------------------
    //--------------------------------DESTINOS SUGERIOS DE VUELOS-----------------------------------------
    //----------------------------------------------------------------------------------------------------

    
    var contenidoDestinosSugeridos = "";
    var validarInputSelect = true;
    var contenedorDestinosSugeridos = "div#destinosSugeridos"
    var selectoresDestinosSugeridos = "#CityPredictiveTo_netactica_air"

    jQuery(document).on("click",function(e){
        var container = jQuery(contenedorDestinosSugeridos);
        var padre = jQuery(selectoresDestinosSugeridos);
        if( !container.is(e.target) && container.has(e.target).length === 0 && !padre.is(e.target) && padre.has(e.target).length === 0 &&
            jQuery(contenedorDestinosSugeridos).css("display") == "block"){
            ocultarDestinosSugeridos()
        }
    })

    function ocultarDestinosSugeridos(){
        if(validarInputSelect == false && jQuery(contenedorDestinosSugeridos).hasClass("d-none") == false){
            jQuery(contenedorDestinosSugeridos).addClass("d-none") 
            jQuery(contenedorDestinosSugeridos).remove()
            validarInputSelect = true
        } 
    }
    /*if(destinosSugeridos.length > 0 && titleDestinosSugeridos.length > 0){
        //----------------------------------------------------------------------------------------------------
        //-------------------------------------ubicar en posicion---------------------------------------------
        //----------------------------------------------------------------------------------------------------
        function ubicacionDestinosSugeridos(ubicacion){
            destinosSugeridos.forEach((x) => {
                if(x.origen.replaceAll(" ","") == jQuery("#CityPredictiveFrom_netactica_air").val().replaceAll(" ","")){
                    contenidoDestinosSugeridos  +=  `<div class="container-fluid" data-destino="${x.destino}">` +
                                                        `<div class="row">`+
                                                            `<div class="col-2 col-md-2">`+
                                                                `<img src="https://www.viajesexito.com${x.imagen}" alt="${x.origen} a ${x.destino}">`+
                                                            `</div>`+
                                                            `<div class="col-10 col-md-10">`+
                                                                `<p class="destino" data-destino="${x.destino}">${x.destino}</p>`+
                                                                `<p class="origen"  data-origen="${x.origen}">Desde ${x.origen}</p>`+
                                                            `</div>`+
                                                        `</div>`+
                                                    `</div>`
                } 
            });
            if(contenidoDestinosSugeridos.length > 0){
                contenidoDestinosSugeridos = `<div class="container-fluid d-none" id="destinosSugeridos"><div class="row"><h5>${titleDestinosSugeridos}</h5>${contenidoDestinosSugeridos}</div></div>`;
                jQuery("body").append(contenidoDestinosSugeridos);  
                jQuery(contenedorDestinosSugeridos).removeClass("d-none")
                jQuery(contenedorDestinosSugeridos).position({
                    my:"left top",
                    at:"left bottom",
                    of:ubicacion
                })  
                validarInputSelect = false 
            }
            contenidoDestinosSugeridos = "";

        }
        $("#CityPredictiveFrom_netactica_air").on("autocompleteselect", function () {
            if($("#CityPredictiveFrom_netactica_air").parents('.tab-pane').hasClass('active') == true){
                setTimeout(()=>{
                    if (screen.width > 480){
                        ubicacionDestinosSugeridos($("#CityPredictiveTo_netactica_air")); 
                    }
                    
                },10)
            }
            
        });
        //----------------------------------------------------------------------------------------------------
        //-----------------------Abrir y cerrar ubicacion de destinos sugeridos-------------------------------
        //----------------------------------------------------------------------------------------------------
        jQuery(selectoresDestinosSugeridos).click(function(){
            if(validarInputSelect == true && jQuery("#CityPredictiveFrom_netactica_air").val() != ""){
                ubicacionDestinosSugeridos(jQuery(selectoresDestinosSugeridos));    
            }
            else{
                ocultarDestinosSugeridos();
            }
        })
        jQuery("input#CityPredictiveTo_netactica_air").keydown(function(){
            ocultarDestinosSugeridos()
        })
        jQuery('input#CityPredictiveTo_netactica_air').on("autocompleteopen", function () {
            validarInputSelect = false
        });
        jQuery('input#CityPredictiveTo_netactica_air').on("autocompleteselect", function () {
            validarInputSelect = true
        });
        jQuery('input#CityPredictiveTo_netactica_air').on("autocompleteclose", function () {
            validarInputSelect = true
        });
        $(document).on("click", "div#destinosSugeridos > .row > .container-fluid",function(){
            var parametroDestino = jQuery(this).attr("data-destino");
            jQuery(selectoresDestinosSugeridos).val(parametroDestino);
            ocultarDestinosSugeridos();
        })
    }*/







    //----------------------------------------------------------------------------------------------------
    //-------------------cuando estamos en movil bloquear scroll al abrir widget--------------------------
    //----------------------------------------------------------------------------------------------------
    jQuery("a#buscador").click(function(){
        jQuery("body").css("overflow","hidden");
        jQuery("article#widget a.cerrar.d-xl-none").show()
        $("#widget").toggleClass("active");
    });
    jQuery("a.cerrar").click(function(){
        jQuery("body").css("overflow","auto");
        jQuery("article#widget a.cerrar.d-xl-none").hide()
        $("#widget").toggleClass("active")
    });

    
    



    jQuery('div#netactica_booking_form div[role="tabpanel"] > .container.container--tab div.caracteristicas.encuentra-servicios-adicionales .d-flex label input').click(function(){
        if(jQuery(this).prop('checked')){
           jQuery('div#netactica_booking_form div[role="tabpanel"] > .container.container--tab div.caracteristicas.encuentra-servicios-adicionales .d-flex label input').prop('checked', false) 
           jQuery(this).prop('checked', true) 
           
        }
    })
});
