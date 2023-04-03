function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}
var token = getCookie("sessionTokenSSO");

var Netactica = {};
Netactica._construct = function () {

	var netactica_url_motor_air = '';
	var netactica_url_motor_hotel = '';
	var netactica_url_motor_air_hotel = '';
	var netactica_url_motor_car = '';
	var netactica_url_motor_airCar = '';
	var netactica_url_motor_extras = '';
	var netactica_url_motor_transfer = '';
	var netactica_url_motor_medical_assistance = '';

	var url;
	var ninos;
	var adultos;
	if (typeof json_settings.ProductAir.Url != 'undefined'){
		netactica_url_motor_air = json_settings.ProductAir.Url;
	}
	if (typeof json_settings.ProductHotel.Url != 'undefined'){
		netactica_url_motor_hotel = json_settings.ProductHotel.Url;
	}
	if (typeof json_settings.ProductAirHotel.Url != 'undefined'){
		netactica_url_motor_air_hotel = json_settings.ProductAirHotel.Url;
	}
	if (typeof json_settings.ProductCar.Url != 'undefined'){
		netactica_url_motor_car = json_settings.ProductCar.Url;
	}
	if (typeof json_settings.ProductAirCar.Url != 'undefined'){
		netactica_url_motor_airCar = json_settings.ProductAirCar.Url;
	}
	if (typeof json_settings.ProductExtra.Url != 'undefined'){
		netactica_url_motor_extras = json_settings.ProductExtra.Url;
	}
	if (typeof json_settings.ProductTransfer.Url != 'undefined'){
		netactica_url_motor_transfer = json_settings.ProductTransfer.Url;
	} 
	if (typeof json_settings.ProductMedicalAssistance.Url != 'undefined'){
		netactica_url_motor_medical_assistance = json_settings.ProductMedicalAssistance.Url;
	} 

	this.netactica_url_motor_air 				= netactica_url_motor_air;
	this.netactica_url_motor_hotel 				= netactica_url_motor_hotel;
	this.netactica_url_motor_air_hotel			= netactica_url_motor_air_hotel;
	this.netactica_url_motor_car 				= netactica_url_motor_car;
	this.netactica_url_motor_airCar 			= netactica_url_motor_airCar;
	this.netactica_url_motor_extras 			= netactica_url_motor_extras;
	this.netactica_url_motor_transfer 			= netactica_url_motor_transfer;
	this.netactica_url_motor_medical_assistance = netactica_url_motor_medical_assistance;

	this.netactica_user_service = json_settings.UserService;
	this.netactica_branch_code = json_settings.BranchCode;
	console.log("sucursal 2: "+ this.netactica_branch_code);

	this.netactica_culture = json_settings.CultureInfo;
	this.netactica_static_content = json_settings.StaticContent;
	this.netactica_context_app = "CMS";

	this.netactica_minDateFrom_air = 0;
	if (typeof json_settings.ProductAir.AdvancedPurchase != 'undefined') {
		this.netactica_minDateFrom_air 				= json_settings.ProductAir.AdvancedPurchase;
	}
	this.netactica_minDateFrom_hotel = 0;
	if (typeof json_settings.ProductHotel.AdvancedPurchase != 'undefined') {
		this.netactica_minDateFrom_hotel 			= json_settings.ProductHotel.AdvancedPurchase;
	}
	this.netactica_minDateFrom_airhotel = (this.netactica_minDateFrom_air > this.netactica_minDateFrom_hotel) ? this.netactica_minDateFrom_air : this.netactica_minDateFrom_hotel;
	this.netactica_minDateFrom_extra = 0;
	if (typeof json_settings.ProductExtra.AdvancedPurchase != 'undefined') {
		this.netactica_minDateFrom_extra 			= json_settings.ProductExtra.AdvancedPurchase;
	}
	this.netactica_maxDateTo_extra = 30;
	if (typeof json_settings.ProductExtra.MaxRange != 'undefined') {
		this.netactica_maxDateTo_extra				= json_settings.ProductExtra.MaxRange;
	}
	if (typeof json_settings.ProductTransfer.MaxRange != 'undefined') {
		this.netactica_maxDateTo_tansfer 			= json_settings.ProductTransfer.MaxRange;
	}
	if (typeof json_settings.ProductMedicalAssistance.MaxRange != 'undefined') {
		this.netactica_maxDateTo_medical_assistance = json_settings.ProductMedicalAssistance.MaxRange;
	}






	this.netactica_air_fare_type = "Both";

	function Air() {
		this.organizeData = function () {
			var qs_air;
			var knowTripType = $('input[name=TripType_netactica_air]:checked').val();


			if (knowTripType == "OW") {
				qs_air = this.getTripType(true) +
				this.getCityFrom(true) +
				this.getCityTo(true) +
				this.getDateFrom(true) +
				this.getNumberOfAdults(true) +
				this.getNumberOfChildren(true) +
				this.NumberOfInfants(true) +
				this.getFlexiDates(true) +
				this.getAirlineCode(true) +
				this.getAccountCode() +
				this.getCabinType(true) +
				this.getDepartureTime() +
				this.getEquipment() +
				this.getDirect() +
				this.getUserService(true) +
				"-show"+
				this.getBranchCode(true) +
				this.setSeparate() +
				token+"----"+
				this.getPromoCode()+
				"-true";
				
				return qs_air;
			}
			else if (knowTripType == "RT") {
				qs_air = this.getTripType(true) +
				this.getCityFrom(true) +
				this.getCityTo(true) +
				this.getDateFrom(true) +
				this.getDateTo(true) +
				this.getNumberOfAdults(true) +
				this.getNumberOfChildren(true) +
				this.NumberOfInfants(true) +
				this.getFlexiDates(true) +
				this.getAirlineCode(true) +
				this.getAccountCode() +
				this.getCabinType(true) +
				this.getDepartureTime() +
				this.getEquipment() +
				this.getDirect() +
				this.getUserService(true) +
				"-show"+
				this.getBranchCode(true) +
				this.setSeparate() +
				token+"----"+
				this.getPromoCode()+
				"-true";
				
				return qs_air;
			}
			else if (knowTripType == "MD") {
				qs_air = this.getTripType(true) +
				this.getCityFromMt(0, true) +
				this.getCityToMt(0, true) +
				this.getDateFromMt(0, true) +
				this.getNumberOfAdults(true) +
				this.getNumberOfChildren(true) +
				this.NumberOfInfants(true) +
				this.getEquipment() +
				this.getDirect() +
				this.getAirlineCodeMulti(true) +
				this.getCabinTypeMulti(true) +
				this.getAccountCode() + 
				this.getUserService(true) +
				"-show"+
				this.getBranchCode(true) +
				this.setSeparate() +
				token+"----"+
				this.getPromoCode()+
				"-true";
				
				return qs_air;
			}
		};
		this.getTripType = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $('input[name=TripType_netactica_air]:checked').val();
			} else {
				return '&TripType=' + $('input[name=TripType_netactica_air]:checked').val();
			}
		};
		this.getCityFrom = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $("#CityPredictiveFrom_netactica_air").netautocomplete('getCode');
			} else {
				return 'OriginCity1=' + $("#CityPredictiveFrom_netactica_air").netautocomplete('getCode');
			}
		};
		this.getCityTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $("#CityPredictiveTo_netactica_air").netautocomplete('getCode');
			} else {
				return '&DestinationCity1=' + $("#CityPredictiveTo_netactica_air").netautocomplete('getCode');
			}
		};
		this.getCityFrom0 = function () {
			return '&OriginCity2=' + $("#CityPredictiveTo_netactica_air").netautocomplete('getCode');
		};
		this.getCityTo0 = function () {
			return '&DestinationCity2=' + $("#CityPredictiveFrom_netactica_air").netautocomplete('getCode');
		};
		var n = 0;
		this.getCityFromMt = function (n, searchInCatmanduParam) {

			var qs;
			if (searchInCatmanduParam) {
				for (i = 1; i <= 6; i++) {
					if (i == 1)
						qs = '/' + $("#CityPredictiveFrom_" + i + "_netactica_air").netautocomplete('getCode');
					else {
						if ($("#CityPredictiveFrom_" + i + "_netactica_air").val() !== '')
							qs += ',' + $("#CityPredictiveFrom_" + i + "_netactica_air").netautocomplete('getCode');
					}
				}
				return qs;
			} else {
				return '&OriginCity' + n + '=' + $("#CityPredictiveFrom_" + n + "_netactica_air").netautocomplete('getCode');
			}
		};
		this.getCityToMt = function (n, searchInCatmanduParam) {
			var qs;
			if (searchInCatmanduParam) {
				for (i = 1; i <= 6; i++) {
					if (i == 1)
						qs = '/' + $("#CityPredictiveTo_" + i + "_netactica_air").netautocomplete('getCode');
					else {
						if ($("#CityPredictiveTo_" + i + "_netactica_air").val() !== '')
							qs += ',' + $("#CityPredictiveTo_" + i + "_netactica_air").netautocomplete('getCode');
					}
				}
				return qs;
			} else {
				return '&DestinationCity' + n + '=' + $("#CityPredictiveTo_" + n + "_netactica_air").netautocomplete('getCode');
			}
		};
		this.getDateFrom = function (searchInCatmanduParam) {

			if (searchInCatmanduParam) {

				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_air').datepicker('getDate'));
			} else {
				return '&DepartureDate1=' + $.datepicker.formatDate('dd-mm-yy', $('#DateFrom_netactica_air').datepicker('getDate')) + " " + $('[name=DepartureTime_netactica_air]').val();
			}
		};
		this.getDateTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_air').datepicker('getDate'));
			} else {
				return (($('input[name=TripType_netactica_air]:checked').val() == 'RT') ? '&DepartureDate2=' + $.datepicker.formatDate('dd-mm-yy', $('#DateTo_netactica_air').datepicker('getDate')) + " " + $('[name=ReturnTime_netactica_air]').val() : '');
			}
		};
		var dt = 0;
		this.getDateFromMt = function (dt, searchInCatmanduParam) {
			var qs;
			if (searchInCatmanduParam) {
				for (i = 1; i <= 6; i++) {
					if (i == 1)
						qs = '/' + $.datepicker.formatDate('yy-mm-dd', $("#DateFrom_" + i + "_netactica_air").datepicker('getDate'));
					else {
						if ($("#DateFrom_" + i + "_netactica_air").val() !== '')
							qs += ',' + $.datepicker.formatDate('yy-mm-dd', $("#DateFrom_" + i + "_netactica_air").datepicker('getDate'));
					}
				}
				return qs;
			} else {
				return '&DepartureDate' + dt + '=' + $.datepicker.formatDate('dd-mm-yy', $('#DateFrom_' + dt + '_netactica_air').datepicker('getDate')) + $('[name=DepartureTime_netactica_air]').val();
			}
		};
		this.getAirlineCode = function (searchInCatmanduParam) {
			


			if (searchInCatmanduParam) {
				if ($('[name=AirlineCode_netactica_air]').val() !== '')
					return "/" + $('[name=AirlineCode_netactica_air]').netautocomplete('getCode');
				else
					return "/NA";
			} else {
				return ($('[name=AirlineCode_netactica_air]').netautocomplete('getCode') !== '' ? '&AirlineCode=' + $('[name=AirlineCode_netactica_air]').netautocomplete('getCode') : '');
			}
		};
		this.getAirlineCodeMulti = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				if ($('[name=AirlineCode_netactica_airMulti]').val() !== '')
					return "/" + $('[name=AirlineCode_netactica_airMulti]').netautocomplete('getCode');
				else
					return "/NA";
			} else {
				return ($('[name=AirlineCode_netactica_airMulti]').netautocomplete('getCode') !== '' ? '&AirlineCode=' + $('[name=AirlineCode_netactica_airMulti]').netautocomplete('getCode') : '');
			}
		};
		this.getAccountCode = function () {
			return "/NA";
		};
		this.getNumberOfAdults = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $('[name=NumberOfAdults_netactica_air]').val();
			} else {
				return '&NumberOfAdults=' + $('[name=NumberOfAdults_netactica_air]').val();
			}
		};
		this.getNumberOfChildren = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $('[name=NumberOfChildren_netactica_air]').val();
			} else {
				return '&NumberOfChildren=' + $('[name=NumberOfChildren_netactica_air]').val();
			}
		};
		this.NumberOfInfants = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $('[name=NumberOfInfants_netactica_air]').val();
			} else {
				return '&NumberOfInfants=' + $('[name=NumberOfInfants_netactica_air]').val();
			}
		};
		this.getCabinType = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {

				if ($('[name=CabinType_netactica_air]').val() !== '')
					return "/" + $('[name=CabinType_netactica_air]').val();
				else
					return "/Economy";
			} else {
				return ($('[name=CabinType_netactica_air]').val() !== '' ? '&CabinType=' + $('[name=CabinType_netactica_air]').val() : '&CabinType=Economy');
			}
		};
		this.getCabinTypeMulti = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {

				if ($('[name=CabinType_netactica_airMulti]').val() !== '')
					return "/" + $('[name=CabinType_netactica_airMulti]').val();
				else
					return "/Economy";
			} else {
				return ($('[name=CabinType_netactica_airMulti]').val() !== '' ? '&CabinType=' + $('[name=CabinType_netactica_airMulti]').val() : '&CabinType=Economy');
			}
		};
		this.getFareType = function () {
			return "&FareType=" + Netactica.netactica_air_fare_type;
		};
		this.getContextApp = function () {
			return "&ContextApp=" + Netactica.netactica_context_app;
		};
		this.GetCulture = function () {
			if (Netactica.netactica_culture !== '')
				return "&Culture=" + Netactica.netactica_culture;
			else
				return "";
		};
		this.getDepartureTime = function () {
			var departureTime = ($('[name=DepartureTime_netactica_air]').val() != '') ? $('[name=DepartureTime_netactica_air]').val().split(':')[0] : 'NA';
			var returnTime = ($('[name=ReturnTime_netactica_air]').val() != '') ? $('[name=ReturnTime_netactica_air]').val().split(':')[0] : 'NA';

			if ($('input[name=TripType_netactica_air]:checked').val() == 'OW')
				return "/" + departureTime;

			if ($('input[name=TripType_netactica_air]:checked').val() == 'RT') {
				if (departureTime !== 'NA' || returnTime !== 'NA')
					return "/" + departureTime + ',' + returnTime;
				else
					return "/NA";
			}
		};
		this.getFlexiDates = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				if ($('input[name=FlexiDates_netactica_air]:checked').val() == "on")
					return "/3";
				else
					return "/NA";
			} else {
				if ($('input[name=FlexiDates_netactica_air]:checked').val() == "on")
					return "&FlexDepMinus=3&FlexDepPlus=3&FlexArrMinus=3&FlexArrPlus=3";
				else
					return "";
			}
		};
		this.getUserService = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return "/" + Netactica.netactica_user_service;
			} else {
				return "&UserService=" + Netactica.netactica_user_service;
			}
		};
		this.getBranchCode = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
			} else {
				if (Netactica.netactica_branch_code !== '')
					return "&BranchCode=" + Netactica.netactica_branch_code;
				else
					return '';
			}
		};
		this.setSeparate = function () {
			return "-----";
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_air").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_air]').val();
		};
		this.getEquipment = function () {
			var equipmentAir = $("input[name=equipmentAir]:checked").val();
			if (equipmentAir == "true") {
				return "/true";
			} else {
				return "/false";
			}
		}
		this.getDirect = function () {
			var directAir = $("input[name=directAir]:checked").val();
			if (directAir == "true") {
				return "/true";
				
			} else {
				return "/false";
				
			}
		}
	}

	function Hotel() {
		this.updateChilds = function () {

			var div = $('#ddlHotelNumberChildrens').val(),
				numeroNinos = $('#ddlHotelNumberChildrens'),
				arrayNinos = [];

			$.each($("#txtHotelNumPassengers select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtHotelNumPassengers").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtHotelNumPassengers").append(titulo);
			});

			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlHotelChildrensAges form-control mr-1 ');
					$(newselect).attr('name', 'ddlHotelChildrensAges');
					$(newselect).append("<option value selected='selected'>Edad</option>");
					$(newselect).attr('data-bvalidator-msg', 'Ingrese la edad del menor');
					$(newselect).attr('data-bvalidator', 'required');
					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}
					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtHotelNumPassengers").append(titulo);
				}
			} else {

				$("#txtHotelNumPassengers").empty();
			}
		};
		this.updateChildsDos = function () {

			var div = $('#ddlHotelNumberChildrensDos').val(),
				numeroNinos = $('#ddlHotelNumberChildrensDos'),
				arrayNinos = [];

			$.each($("#txtHotelNumPassengersDos select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtHotelNumPassengersDos").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtHotelNumPassengersDos").append(titulo);
			});
			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlHotelChildrensAges form-control mr-1');
					$(newselect).attr('name', 'ddlHotelChildrensAges');
					$(newselect).append("<option value selected='selected'>Edad</option>");
					$(newselect).attr('data-bvalidator-msg', 'Ingrese la edad del menor');
					$(newselect).attr('data-bvalidator', 'required');
					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}
					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtHotelNumPassengersDos").append(titulo);
				}
			} else {

				$("#txtHotelNumPassengersDos").empty();
			}
		};
		this.updateChildsTres = function () {

			var div = $('#ddlHotelNumberChildrensTres').val(),
				numeroNinos = $('#ddlHotelNumberChildrensTres'),
				arrayNinos = [];

			$.each($("#txtHotelNumPassengersTres select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtHotelNumPassengersTres").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtHotelNumPassengersTres").append(titulo);
			});
			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlHotelChildrensAges form-control mr-1');
					$(newselect).attr('name', 'ddlHotelChildrensAges');
					$(newselect).append("<option value selected='selected'>Edad</option>");
					$(newselect).attr('data-bvalidator-msg', 'Ingrese la edad del menor');
					$(newselect).attr('data-bvalidator', 'required');

					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}

					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtHotelNumPassengersTres").append(titulo);
				}
			} else {

				$("#txtHotelNumPassengersTres").empty();
			}
		};
		this.updateChildsCuatro = function () {

			var div = $('#ddlHotelNumberChildrensCuatro').val(),
				numeroNinos = $('#ddlHotelNumberChildrensCuatro'),
				arrayNinos = [];

			$.each($("#txtHotelNumPassengersCuatro select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtHotelNumPassengersCuatro").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtHotelNumPassengersCuatro").append(titulo);
			});
			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlHotelChildrensAges form-control mr-1');
					$(newselect).attr('name', 'ddlHotelChildrensAges');
					$(newselect).append("<option value selected='selected'>Edad</option>");
					$(newselect).attr('data-bvalidator-msg', 'Ingrese la edad del menor');
					$(newselect).attr('data-bvalidator', 'required');
					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}
					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtHotelNumPassengersCuatro").append(titulo);
				}
			} else {

				$("#txtHotelNumPassengersCuatro").empty();
			}
		};
		this.organizeData = function () {
			var qs_hotel = '';

			if (json_settings.ProductHotel.SearchInCatmandu) {
				if (json_settings.ProductHotel.Enabled == 1) {

					if(json_settings.NewFront){
						qs_hotel = 	"/"+
									json_settings.UserService+
									this.getCityDestination(true)+
									this.getDateFrom(true) +
									this.getDateTo(true) +
									this.getDistRooms() +
									"?noHeaders=false&branchCode="+
									this.getBranchCode(true);
						
					}
					else{
						qs_hotel = 	this.getCityDestination(true) +
									this.getDateFrom(true) +
									this.getDateTo(true) +
									this.getDistRooms() +
									"/NA"+
									this.getUserService(true) +
									"-show"+
									this.getBranchCode(true) +
									this.setSeparate() +
									token+"----"+
									this.getPromoCode()+
									"-true";
					}


					
				}
			}
			return qs_hotel;
		};
		this.getCityDestination = function (searchInCatmanduParam) {

			if(json_settings.NewFront){
				return '/' + $("#CityPredictive_netactica_hotel").attr("destinationtype").trim().slice(0,1) + $("#CityPredictive_netactica_hotel").attr("destinationid");
			}
			else{
				if(jQuery("input#CityPredictive_netactica_hotel").attr("destinationtype") != undefined){
					return '/' + $("#CityPredictive_netactica_hotel").attr("destinationtype")+'/' + $("#CityPredictive_netactica_hotel").attr("destinationid");
				}
				else{
					if (searchInCatmanduParam) {
						return '/' + $("#CityPredictive_netactica_hotel").netautocomplete('getCode');
					} else {
						return 'CityDestination=' + $("#CityPredictive_netactica_hotel").netautocomplete('getCode');
					}	
				}
			}

			
			
		};
		this.getDateFrom = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_hotel').datepicker('getDate'));
			} else {
				return '&DateFrom=' + $.datepicker.formatDate('dd-mm-yy', $('#DateFrom_netactica_hotel').datepicker('getDate'));
			}
		};
		this.getDateTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_hotel').datepicker('getDate'));
			} else {
				return '&DateTo=' + $.datepicker.formatDate('dd-mm-yy', $('#DateTo_netactica_hotel').datepicker('getDate'));
			}
		};
		this.getRooms = function () {
			return '&Rooms=' + $('#rooms_netactica_hotel').val();
		};
		this.GetCulture = function () {
			if (Netactica.netactica_culture !== '')
				return "&Culture=" + Netactica.netactica_culture;
			else
				return "";
		};
		this.getContextApp = function () {
			return "&ContextApp=" + Netactica.netactica_context_app;
		};
		this.getDistRooms = function calcularUrl() {
			url = '';
			$.each($('#habitacionesPop div.contenedor-habitaciones').children(), function (index, el) {
				var agregaNinos = false;

				adultos = 0;
				ninos = 0;


				if (index > 0) {

						if ($(el).attr('id') &&
							$(el).attr('id').indexOf('room') !== -1 &&
							$(el).css("display") === 'block') {

						if (index > 1) {
							url += '!';
						}

						if (index === 1) {
							adultos = $(el).find($('#ddlHotelNumberAdults')).val();
						} else if (index === 2) {
							adultos = $(el).find($('#ddlHotelNumberAdultsDos')).val();
						} else if (index === 3) {
							adultos = $(el).find($('#ddlHotelNumberAdultsTres')).val();
						} else if (index === 4) {
							adultos = $(el).find($('#ddlHotelNumberAdultsCuatro')).val();
						}

						//console.log($(el));
						// Habitaciones
						$.each($(el).find($('[atribute=select_ninos]').find("select")), function (indexselect, elninos) {

							if (indexselect === 0 && Number($(el).find('[data-ninos=ninos]').val()) > 0) {
								agregaNinos = true;
								ninos = $(elninos).val();
							} else if (Number($(el).find('[data-ninos=ninos]').val()) > 0) {
								agregaNinos = true;
								ninos += '-' + $(elninos).val();
							}
						})
						console.log($(el).find('[data-ninos=ninos]').val());

						if (agregaNinos) {
							url += adultos + '-' + ninos;
						} else {
							url += adultos;
						}

					}
				}
			})
			// console.log(url)
			return "/" + url ;
		}
		this.getUserService = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return "/" + Netactica.netactica_user_service;
			} else {
				return "&UserService=" + Netactica.netactica_user_service;
			}
		};
		this.getBranchCode = function (searchInCatmanduParam) {

			if(json_settings.NewFront){
				if (searchInCatmanduParam) {
					return (Netactica.netactica_branch_code != '') ? Netactica.netactica_branch_code : "";
				} else {
					if (Netactica.netactica_branch_code !== '')
						return "&BranchCode=" + Netactica.netactica_branch_code;
					else
						return '';
				}
			}
			else{
				if (searchInCatmanduParam) {
					return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
				} else {
					if (Netactica.netactica_branch_code !== '')
						return "&BranchCode=" + Netactica.netactica_branch_code;
					else
						return '';
				}
			}




			
		};
		this.getAdults = function () {
			var adt_st = '&ADT=';
			$('[name=ddlHotelNumberAdults]').each(function () {
				adt_st += $(this).val() + ',';
			});
			return adt_st.slice(0, -1);
		};
		this.getChilds = function () {
			var adt_st = '&CHD=';
			$('[name=ddlHotelNumberChildrens]').each(function () {
				adt_st += $(this).val() + ',';
			});
			return adt_st.slice(0, -1);
		};
		this.getChildAges = function () {
			var ch_st = '&AGE=';
			var num_childs = 0;
			$('[name=ddlHotelChildrensAges]').each(function () {
				ch_st += $(this).val() + ',';
				num_childs++;
			});

			ch_st = (num_childs > 0) ? ch_st.slice(0, -1) : "";
			return ch_st;
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_hotels").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_hotels]').val();
		};
		this.setSeparate = function () {
			return "-----";
		};
	}

	function Air_Hotel() {
		this.updateChilds = function () {
			var div = $('#ddlAirHotelNumberChildrens').val(),
				numeroNinos = $('#ddlAirHotelNumberChildrens'),
				arrayNinos = [];
			$.each($("#txtAirHotelNumPassengers select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtAirHotelNumPassengers").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtAirHotelNumPassengers").append(titulo);
			});

			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlAirHotelChildrensAges form-control mr-1 col-12 col-sm-12');
					$(newselect).attr('name', 'ddlAirHotelNumberChildrens');
					$(newselect).append("<option value selected='selected'>Edad</option>");
					$(newselect).attr('data-bvalidator-msg', 'Ingrese la edad del menor');
					$(newselect).attr('data-bvalidator', 'required');


					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}

					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtAirHotelNumPassengers").append(titulo);
				}
			} else {

				$("#txtAirHotelNumPassengers").empty();
			}
		};

		this.updateChildsDos = function () {

			var div = $('#ddlAirHotelNumberChildrensDos').val(),
				numeroNinos = $('#ddlHotelNumberChildrensDos'),
				arrayNinos = [];

			$.each($("#txtAirHotelNumPassengersDos select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtAirHotelNumPassengersDos").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtAirHotelNumPassengersDos").append(titulo);
			});
			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlAirHotelChildrensAges form-control mr-1');
					$(newselect).attr('name', 'ddlAirHotelChildrensAges');
					$(newselect).append("<option value selected='selected'>Edad</option>");
					$(newselect).attr('data-bvalidator-msg', 'Ingrese la edad del menor');
					$(newselect).attr('data-bvalidator', 'required');
					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}
					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtAirHotelNumPassengersDos").append(titulo);
				}
			} else {

				$("#txtAirHotelNumPassengersDos").empty();
			}
		};

		this.updateChildsTres = function () {

			var div = $('#ddlAirHotelNumberChildrensTres').val(),
				numeroNinos = $('#ddlAirHotelNumberChildrensTres'),
				arrayNinos = [];

			$.each($("#txtAirHotelNumPassengersTres select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtAirHotelNumPassengersTres").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtAirHotelNumPassengersTres").append(titulo);
			});
			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlAirHotelChildrensAges form-control mr-1');
					$(newselect).attr('name', 'ddlAirHotelChildrensAges');
					$(newselect).append("<option value='1' selected='selected'>-</option>");
					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}
					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtAirHotelNumPassengersTres").append(titulo);
				}
			} else {

				$("#txtAirHotelNumPassengersTres").empty();
			}
		};

		this.updateChildsCuatro = function () {

			var div = $('#ddlAirHotelNumberChildrensCuatro').val(),
				numeroNinos = $('#ddlAirHotelNumberChildrensCuatro'),
				arrayNinos = [];

			$.each($("#txtAirHotelNumPassengersCuatro select"), function (key, value) {
				if ($(value).find('option:selected').val() != '0') {
					arrayNinos.push(value);
				}
			});

			if (arrayNinos.length > Number(div)) {
				var tamano = arrayNinos.length - Number(div);
				arrayNinos.splice(Number(div), tamano);
			}

			$("#txtAirHotelNumPassengersCuatro").empty();

			$.each(arrayNinos, function (index, el) {
				var titulo = document.createElement("div")
				$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
				$(titulo).html('<strong class="d-block">Edad menor '+(index+1)+'</strong>');
				$(titulo).append(el)
				$("#txtAirHotelNumPassengersCuatro").append(titulo);
			});
			if (div > 0) {
				for (var i = arrayNinos.length; i < div; i++) {
					var newselect = document.createElement('select');
					$(newselect).attr('class', 'ddlAirHotelChildrensAges form-control mr-1');
					$(newselect).attr('name', 'ddlAirHotelChildrensAges');
					$(newselect).append("<option value selected='selected'>Edad</option>");
					$(newselect).attr('data-bvalidator-msg', 'Ingrese la edad del menor');
					$(newselect).attr('data-bvalidator', 'required');
					
					for (j = 0; j <= json_settings.ProductHotel.HotelsMaxAgeChild; j++) {
						$(newselect).append("<option value='" + j + "'>" + edadUpdateChilds(j) + "</option>");
					}
					var titulo = document.createElement("div")
					$(titulo).attr('class', 'col-12 col-sm-12 pad-0')
					$(titulo).html('<strong class="d-block">Edad menor '+(i+1)+'</strong>');
					$(titulo).append(newselect)
					$("#txtAirHotelNumPassengersCuatro").append(titulo);
				}
			} else {

				$("#txtAirHotelNumPassengersCuatro").empty();
			}
		};

		this.organizeData = function () {
			var qs_air_hotel = this.getCityFrom() +
				this.getCityTo() +
				this.getDateFrom() +
				this.getDateTo() +
				this.getAdultsCount() +
				this.getChildsCount() +
				this.getInfantsCount() +
				this.getDateFrom() +
				this.getDateTo() +
				this.getDistRooms() +
				this.getEquipment() +
				this.getDirect() +
				this.getAirlineCodeHot(true) +
				this.getCabinTypeAirHotel(true) +
				this.getDepartureTimeAirHotel() +
				this.getUserService() +
				"-show"+
				this.getBranchCode() +
				this.setSeparate() +
				token+"----"+
				this.getPromoCode()+
				"-true";
			return qs_air_hotel;
		};
		this.getCityFrom = function () {
			return '/' + $("#CityPredictiveFrom_netactica_airhotel").netautocomplete('getCode');
		};
		this.getCityTo = function () {
			return '/' + $("#CityPredictiveTo_netactica_airhotel").netautocomplete('getCode');
		};
		this.getDateFrom = function () {
			return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_airhotel').datepicker('getDate'));
		};
		this.getDateTo = function () {
			return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_airhotel').datepicker('getDate'));
		};
		this.getAdultsCount = function () {
			var rooms = parseInt($('#rooms_netactica_airhotel').val());
			var count = 0;
			for (var i = 0; i < rooms; i += 1)
				count += parseInt($('[name=ddlAirHotelNumberAdults]')[i].value);

			return '/' + count;
		};
		this.getChildsCount = function () {
			var rooms = parseInt($('#rooms_netactica_airhotel').val());
			var count = 0;
			for (var i = 0; i < rooms; i += 1)
				for (var j = 0; j < parseInt($('[name=ddlAirHotelNumberChildrens]')[i].value); j += 1)
					count += parseInt($('[name=ddlAirHotelChildrensAges]')[j].value) >= 2 ? 1 : 0;

			return '/' + count;
		};
		this.getInfantsCount = function () {
			var rooms = parseInt($('#rooms_netactica_airhotel').val());
			var count = 0;
			for (var i = 0; i < rooms; i += 1)
				for (var j = 0; j < parseInt($('[name=ddlAirHotelNumberChildrens]')[i].value); j += 1)
					count += parseInt($('[name=ddlAirHotelChildrensAges]')[j].value) < 2 ? 1 : 0;

			return '/' + count;
		};
		this.getDistRooms = function calcularUrlPaquetes() {
			url = '';
			$.each($('#habitacionesPopPaquetes > div.contenedor-habitaciones').children(), function (index, el) {

				var agregaNinos = false;

				adultos = 0;
				ninos = 0;

				if (index > 0) {

					if ($(el).attr('id') &&
						$(el).attr('id').indexOf('room') !== -1 &&
						$(el).css("display") === 'block') {

						if (index > 1) {
							url += '!';
						}

						console.log()
						if (index === 1) {
							adultos = $(el).find($('#ddlAirHotelNumberAdults')).val();
						} else if (index === 2) {
							adultos = $(el).find($('#ddlAirHotelNumberAdultsDos')).val();
						} else if (index === 3) {
							adultos = $(el).find($('#ddlAirHotelNumberAdultsTres')).val();
						} else if (index === 4) {
							adultos = $(el).find($('#ddlAirHotelNumberAdultsCuatro')).val();
						}

						console.log("adultos", adultos);

						// Habitaciones

						$.each($(el).find($('[atribute=select_ninosPaquetes]').find("select")), function (indexselect, elninos) {

							if (indexselect === 0 && Number($(el).find('[data-ninos=ninosPaquetes]').val()) > 0) {
								agregaNinos = true;
								ninos = $(elninos).val();
							} else if (Number($(el).find('[data-ninos=ninosPaquetes]').val()) > 0) {
								agregaNinos = true;
								ninos += '-' + $(elninos).val();
							}
						})
						// console.log($(el).find('[data-ninos=ninos]').val());

						if (agregaNinos) {
							url += adultos + '-' + ninos;
						} else {
							url += adultos;
						}

					}
				}
			})

			return "/" + url + '';
		}
		this.getEquipment = function () {
			var equipmentAirHotel = $("input[name=equipmentAirHotel]:checked").val();
			console.log
			if (equipmentAirHotel == "true") {
				return "/true";
			} else {
				return "/false";
			}
		}
		this.getDirect = function () {
			var directAirHotel = $("input[name=directAirHotel]:checked").val();
			if (directAirHotel == "true") {
				return "/true";
				
			} else {
				return "/false";
				
			}
		}
		this.getAirlineCodeHot = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				if ($('[name=AirlineCode_netactica_air_hotel]').val() !== '')
					return "/" + $('[name=AirlineCode_netactica_air_hotel]').netautocomplete('getCode');
				else
					return "/NA";
			} else {
				return ($('[name=AirlineCode_netactica_air_hotel]').netautocomplete('getCode') !== '' ? '&AirlineCode=' + $('[name=AirlineCode_netactica_air_hotel]').netautocomplete('getCode') : '');
			}
		};
		this.getCabinTypeAirHotel = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				if ($('[name=CabinType_netactica_airHotel]').val() !== '')
					return "/" + $('[name=CabinType_netactica_airHotel]').val();
				else
					return "/Economy";
			} 
			else {
				return ($('[name=CabinType_netactica_airHotel]').val() !== '' ? '&CabinType=' + $('[name=CabinType_netactica_airHotel]').val() : '&CabinType=Economy');
			}
		};
		this.getDepartureTimeAirHotel = function () {
			var departureTime = ($('[name=DepartureTime_netactica_airHotel]').val() != '') ? $('[name=DepartureTime_netactica_airHotel]').val().split(':')[0] : 'NA';
			var returnTime = ($('[name=ReturnTime_netactica_airHotel]').val() != '') ? $('[name=ReturnTime_netactica_airHotel]').val().split(':')[0] : 'NA';

			if ($('input[name=TripType_netactica_air]:checked').val() == 'OW')
				return "/" + departureTime;

			if ($('input[name=TripType_netactica_air]:checked').val() == 'RT') {
				if (departureTime !== 'NA' || returnTime !== 'NA')
					return "/" + departureTime + ',' + returnTime;
				else
					return "/NA";
			}
		};
		this.getUserService = function () {
			return "/" + Netactica.netactica_user_service;
		};
		this.getBranchCode = function () {
			return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_packages").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_packages]').val();
		};
		this.setSeparate = function () {
			return "-----";
		};
		
	}

	function AirCar() {
		this.organizeData = function () {
				qs_aircar = this.getCityFrom(true) +
					this.getCityTo(true) +
					this.getDateFrom(true) +
					this.getDateTo(true) +
					this.getNumberOfAdults(true) +
					this.getNumberOfChildren(true) +
					this.NumberOfInfants(true) +
					this.getFlexiDates(true) +
					this.getAirlineCode(true) +
					this.getAccountCode() +
					this.getCabinType(true) +
					this.getDepartureTime() +
					this.getEquipment() +
					this.getDirect() +
					this.getUserService(true) +
					"-show"+
					this.getBranchCode(true) +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
					"-true";
				return qs_aircar;
		};
		this.getCityFrom = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $("#CityPredictiveFrom_netactica_aircar").netautocomplete('getCode');
			} else {
				return 'OriginCity1=' + $("#CityPredictiveFrom_netactica_aircar").netautocomplete('getCode');
			}
		};
		this.getCityTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $("#CityPredictiveTo_netactica_aircar").netautocomplete('getCode');
			} else {
				return '&DestinationCity1=' + $("#CityPredictiveTo_netactica_aircar").netautocomplete('getCode');
			}
		};
		this.getDateFrom = function (searchInCatmanduParam) {

			if (searchInCatmanduParam) {

				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_aircar').datepicker('getDate'));
			} else {
				return '&DepartureDate1=' + $.datepicker.formatDate('dd-mm-yy', $('#DateFrom_netactica_aircar').datepicker('getDate')) + " " + $('[name=DepartureTime_netactica_aircar]').val();
			}
		};
		this.getDateTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_aircar').datepicker('getDate'));
			} else {
				return '&DepartureDate2=' + $.datepicker.formatDate('dd-mm-yy', $('#DateTo_netactica_aircar').datepicker('getDate')) + " " + $('[name=ReturnTime_netactica_aircar]').val();
			}
		};
		this.getAirlineCode = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				if ($('[name=AirlineCode_netactica_aircar]').val() !== '')
					return "/" + $('[name=AirlineCode_netactica_aircar]').netautocomplete('getCode');
				else
					return "/NA";
			} else {
				return ($('[name=AirlineCode_netactica_aircar]').netautocomplete('getCode') !== '' ? '&AirlineCode=' + $('[name=AirlineCode_netactica_aircar]').netautocomplete('getCode') : '');
			}
		};
		this.getAccountCode = function () {
			return "/NA";
		};
		this.getNumberOfAdults = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $('[name=NumberOfAdults_netactica_aircar]').val();
			} else {
				return '&NumberOfAdults=' + $('[name=NumberOfAdults_netactica_aircar]').val();
			}
		};
		this.getNumberOfChildren = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $('[name=NumberOfChildren_netactica_aircar]').val();
			} else {
				return '&NumberOfChildren=' + $('[name=NumberOfChildren_netactica_aircar]').val();
			}
		};
		this.NumberOfInfants = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $('[name=NumberOfInfants_netactica_aircar]').val();
			} else {
				return '&NumberOfInfants=' + $('[name=NumberOfInfants_netactica_aircar]').val();
			}
		};
		this.getCabinType = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				if ($('[name=CabinType_netactica_aircar]').val() !== '')
					return "/" + $('[name=CabinType_netactica_aircar]').val();
				else
					return "/Economy";
			} 
			else {
				return ($('[name=CabinType_netactica_aircar]').val() !== '' ? '&CabinType=' + $('[name=CabinType_netactica_aircar]').val() : '&CabinType=Economy');
			}
		};
		this.getDepartureTime = function () {
			var departureTime = ($('[name=DepartureTime_netactica_aircar]').val() != '') ? $('[name=DepartureTime_netactica_aircar]').val().split(':')[0] : 'NA';
			var returnTime = ($('[name=ReturnTime_netactica_aircar]').val() != '') ? $('[name=ReturnTime_netactica_aircar]').val().split(':')[0] : 'NA';

			if (departureTime !== 'NA' || returnTime !== 'NA')
				return "/" + departureTime + ',' + returnTime;
			else
				return "/NA";
		};
		this.getFlexiDates = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				if ($('input[name=FlexiDates_netactica_aircar]:checked').val() == "on")
					return "/3";
				else
					return "/NA";
			} else {
				if ($('input[name=FlexiDates_netactica_aircar]:checked').val() == "on")
					return "&FlexDepMinus=3&FlexDepPlus=3&FlexArrMinus=3&FlexArrPlus=3";
				else
					return "";
			}
		};
		this.getUserService = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return "/" + Netactica.netactica_user_service;
			} else {
				return "&UserService=" + Netactica.netactica_user_service;
			}
		};
		this.getBranchCode = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
			} else {
				if (Netactica.netactica_branch_code !== '')
					return "&BranchCode=" + Netactica.netactica_branch_code;
				else
					return '';
			}
		};
		this.setSeparate = function () {
			return "-----";
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_aircar").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_aircar]').val();
		};
		this.getEquipment = function () {
			var equipmentAirCar = $("input[name=equipmentAirCar]:checked").val();
			console.log
			if (equipmentAirCar == "true") {
				return "/true";
			} else {
				return "/false";
			}
		}
		this.getDirect = function () {
			var directAirCar = $("input[name=directAirCar]:checked").val();
			if (directAirCar == "true") {
				return "/true";
				
			} else {
				return "/false";
				
			}
		}
	}

	function Car() {
		this.getCountrys = function () {
			return external_file_Countries;
		};
		this.organizeData = function () {
			var qs_car = '';

			if (json_settings.ProductCar.Enabled == 1) {
				qs_car = this.getPickupLocationCode() +
					this.getPickupDate() +
					this.getPickupTime() +
					this.getReturnLocationCode() +
					this.getReturnDate() +
					this.getReturnTime() +
					"/NA" +
					"/NA" +
					this.getDriverAge() +
					this.getUserService() +
					"-show"+
					this.getBranchCode() +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
					"-true";
			}

			return qs_car;
		};

		this.getPickupLocationCode = function () {
			if($("#AirportPredictiveFrom_netactica_car").netautocomplete('getType') == "Neighborhood"){

				return "/Neighborhood/" + $("#AirportPredictiveFrom_netactica_car").netautocomplete('getId');
			}
			else{
				return "/"+$("#AirportPredictiveFrom_netactica_car").netautocomplete('getType') + "/"+ $("#AirportPredictiveFrom_netactica_car").netautocomplete('getCode');
			}
		};
		this.getPickupDate = function () {
			return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_car').datepicker('getDate'));
		};
		this.getPickupTime = function () {
			return '/' + $('[name=DepartureTime_netactica_car]').val().replace(":", "");
		};
		this.getReturnLocationCode = function () {


			if($("#AirportPredictiveTo_netactica_car").val() == ""){
				if($("#AirportPredictiveFrom_netactica_car").netautocomplete('getType') == "Neighborhood"){
					return "/Neighborhood/" + $("#AirportPredictiveFrom_netactica_car").netautocomplete('getId');
				}
				else{
					return "/"+$("#AirportPredictiveFrom_netactica_car").netautocomplete('getType') + "/"+ $("#AirportPredictiveFrom_netactica_car").netautocomplete('getCode');
				}
			}
			else{
				if($("#AirportPredictiveTo_netactica_car").netautocomplete('getType') == "Neighborhood"){
					return "/Neighborhood/"   + $("#AirportPredictiveTo_netactica_car").netautocomplete('getId');
				}
				else{
					return "/"+$("#AirportPredictiveTo_netactica_car").netautocomplete('getType')+"/" + $("#AirportPredictiveTo_netactica_car").netautocomplete('getCode');
				}	
			}
			
			
				
		};
		this.getReturnDate = function () {
			return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_car').datepicker('getDate'));
		};
		this.getReturnTime = function () {
			return '/' + $('[name=ReturnTime_netactica_car]').val().replace(":", "");
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_car").val() === '')
				return '/NA';
			else
				return '/' + $('[name=PromoCode_netactica_car]').val();
		};
		this.getDriverAge = function () {
			if ($("#DriverAge_netactica_car").val() === '')
				return '/NA';
			else
				return '/NA';
			// return '/NA' + $('[name=DriverAge_netactica_car]').val();
		};
		this.getUserService = function () {
			return "/" + Netactica.netactica_user_service;
		};
		this.getBranchCode = function () {
			return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_car").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_car]').val();
		};
		this.setSeparate = function () {
			return "-----";
		};
	}

	function Extras() {
		this.organizeData = function () {
			if (json_settings.ProductExtra.SearchInCatmandu) {
				var qs_extras = this.getDestinationCity(true) +
					'/9' +
					this.getDateFrom(true) +
					this.getDateTo(true) +
					this.getUserService(true) +
					"-show"+
					this.getBranchCode(true) +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
						"-true";

				return qs_extras;
			} else {
				var qs_extras = this.getDestinationCity(false) +
					this.getDateFrom(false) +
					this.getDateTo(false) +
					this.getSalesChannelCode() +
					this.getBusinessUnitCode() +
					this.getSupplier() +
					this.getTravelExtraCode() +
					this.getTravelExtraTypes(false) +
					this.getUserService(false) +
					this.getContextApp() +
					"-show"+
					this.getBranchCode(false) +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
					"-true";
				return qs_extras;
			}
		};
		this.getDestinationCity = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $("#CityPredictive_netactica_extras").netautocomplete('getCode');
			} else {
				return 'DestinationCity=' + $("#CityPredictive_netactica_extras").netautocomplete('getCode');
			}
		};
		// Esta funcion no tiene cabida en el proyecto ya que no existe el input name = chklExtraTypes
		this.getTravelExtraTypes = function (searchInCatmanduParam) {
			var tipos_extras_ids = [];
			var tipos_extras_names = [];

			if (searchInCatmanduParam) {
				$('input[name=chklExtraTypes]:checked').each(function (index) {
					tipos_extras_ids.push($(this).val());
					tipos_extras_names.push(tipos_travel_extra[$(this).val()]);
				});
				$("#ExtrasType_netactica_extras_chosen").val(tipos_extras_ids.join(','));
				return ($("#ExtrasType_netactica_extras_chosen").val() !== "") ? "/" + $("#ExtrasType_netactica_extras_chosen").val() : "/NA";
			} else {
				$('input[name=chklExtraTypes]:checked').each(function (index) {
					tipos_extras_ids.push($(this).val());
					tipos_extras_names.push(tipos_travel_extra[$(this).val()]);
				});
				$("#ExtrasType_netactica_extras_chosen").val(tipos_extras_ids.join('|'));
				return ($("#ExtrasType_netactica_extras_chosen").val() !== "") ? "&TravelExtraTypes=" + $("#ExtrasType_netactica_extras_chosen").val() : "";
			}
		};
		this.getDateFrom = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_extras').datepicker('getDate'));
			} else {
				return '&DateFrom=' + $.datepicker.formatDate('dd-mm-yy', $('#DateFrom_netactica_extras').datepicker('getDate'));
			}
		};
		this.getDateTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_extras').datepicker('getDate'));
			} else {
				return '&DepartureDate2=' + $.datepicker.formatDate('dd-mm-yy', $('#DateTo_netactica_extras').datepicker('getDate'));
			}
		};
		this.getUserService = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return "/" + Netactica.netactica_user_service;
			} else {
				return "&UserService=" + Netactica.netactica_user_service;
			}
		};
		this.getBranchCode = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
			} else {
				if (Netactica.netactica_branch_code !== '')
					return "&BranchCode=" + Netactica.netactica_branch_code;
				else
					return '';
			}
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_activities").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_activities]').val();
		};
		this.setSeparate = function () {
			return "-----";
		};

		// Obsoletos
		this.getProviders = function () {
			if (typeof external_file_providers != 'undefined')
				return external_file_providers;
		};
		this.getSalesChannelCode = function () {
			return "";
		};
		this.getBusinessUnitCode = function () {
			return "";
		};
		this.getSupplier = function () {
			if (typeof netactica_cliente_b2b != 'undefined' && netactica_cliente_b2b == 1)
				return ($("#ExtrasProvider_netactica_extras").val() !== "") ? "&Supplier=" + $("#ExtrasProvider_netactica_extras").val() : "";
			else
				return "";
		};
		this.getTravelExtraCode = function () {
			if (typeof netactica_cliente_b2b != 'undefined' && netactica_cliente_b2b == 1)
				return ($("#ExtrasCode_netactica_extras").val() !== "") ? "&TravelExtraCode=" + $("#ExtrasCode_netactica_extras").val() : "";
			else
				return "";
		};
		this.getContextApp = function () {
			return "&ContextApp=" + Netactica.netactica_context_app;
		};
		this.GetCulture = function () {
			if (Netactica.netactica_culture !== '')
				return "&Culture=" + Netactica.netactica_culture;
			else
				return "";
		};
	}
	
	function Transfer() {
		this.organizeData = function () {
			if (json_settings.ProductTransfer.SearchInCatmandu) {
				var qs_transfer = this.getDestinationCity(true) +
					'/5' +
					this.getDateFrom(true) +
					this.getDateTo(true) +
					this.getUserService(true) +
					"-show"+
					this.getBranchCode(true) +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
						"-true";
	
				return qs_transfer;
			} else {
				var qs_transfer = this.getDestinationCity(false) +
					this.getDateFrom(false) +
					this.getDateTo(false) +
					this.getSalesChannelCode() +
					this.getBusinessUnitCode() +
					this.getSupplier() +
					this.getTravelTransferCode() +
					this.getTraveTransferTypes(false) +
					this.getUserService(false) +
					this.getContextApp() +
					"-show"+
					this.getBranchCode(false) +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
					"-true";
				return qs_transfer;
			}
		};
		this.getDestinationCity = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $("#CityPredictive_netactica_transfer").netautocomplete('getCode');
			} else {
				return 'DestinationCity=' + $("#CityPredictive_netactica_transfer").netautocomplete('getCode');
			}
		};
		// Esta funcion no tiene cabida en el proyecto ya que no existe el input name = chklExtraTypes
		this.getTraveTransferTypes = function (searchInCatmanduParam) {
			var tipos_transfer_ids = [];
			var tipos_transfer_names = [];
	
			if (searchInCatmanduParam) {
				$('input[name=chklExtraTypes]:checked').each(function (index) {
					tipos_transfer_ids.push($(this).val());
					tipos_transfer_names.push(tipos_travel_transfer[$(this).val()]);
				});
				$("#ExtrasType_netactica_transfer_chosen").val(tipos_transfer_ids.join(','));
				return ($("#ExtrasType_netactica_transfer_chosen").val() !== "") ? "/" + $("#ExtrasType_netactica_transfer_chosen").val() : "/NA";
			} else {
				$('input[name=chklExtraTypes]:checked').each(function (index) {
					tipos_transfer_ids.push($(this).val());
					tipos_transfer_names.push(tipos_travel_transfer[$(this).val()]);
				});
				$("#ExtrasType_netactica_transfer_chosen").val(tipos_transfer_ids.join('|'));
				return ($("#ExtrasType_netactica_transfer_chosen").val() !== "") ? "&TravelExtraTypes=" + $("#ExtrasType_netactica_transfer_chosen").val() : "";
			}
		};
		this.getDateFrom = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_transfer').datepicker('getDate'));
			} else {
				return '&DateFrom=' + $.datepicker.formatDate('dd-mm-yy', $('#DateFrom_netactica_transfer').datepicker('getDate'));
			}
		};
		this.getDateTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_transfer').datepicker('getDate'));
			} else {
				return '&DepartureDate2=' + $.datepicker.formatDate('dd-mm-yy', $('#DateTo_netactica_transfer').datepicker('getDate'));
			}
		};
		this.getUserService = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return "/" + Netactica.netactica_user_service;
			} else {
				return "&UserService=" + Netactica.netactica_user_service;
			}
		};
		this.getBranchCode = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
			} else {
				if (Netactica.netactica_branch_code !== '')
					return "&BranchCode=" + Netactica.netactica_branch_code;
				else
					return '';
			}
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_transfer").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_transfer]').val();
		};
		this.setSeparate = function () {
			return "-----";
		};
	
		// Obsoletos
		this.getProviders = function () {
			if (typeof external_file_providers != 'undefined')
				return external_file_providers;
		};
		this.getSalesChannelCode = function () {
			return "";
		};
		this.getBusinessUnitCode = function () {
			return "";
		};
		this.getSupplier = function () {
			if (typeof netactica_cliente_b2b != 'undefined' && netactica_cliente_b2b == 1)
				return ($("#ExtrasProvider_netactica_transfer").val() !== "") ? "&Supplier=" + $("#ExtrasProvider_netactica_transfer").val() : "";
			else
				return "";
		};
		this.getTravelTransferCode = function () {
			if (typeof netactica_cliente_b2b != 'undefined' && netactica_cliente_b2b == 1)
				return ($("#ExtrasCode_netactica_transfer").val() !== "") ? "&TravelExtraCode=" + $("#ExtrasCode_netactica_transfer").val() : "";
			else
				return "";
		};
		this.getContextApp = function () {
			return "&ContextApp=" + Netactica.netactica_context_app;
		};
		this.GetCulture = function () {
			if (Netactica.netactica_culture !== '')
				return "&Culture=" + Netactica.netactica_culture;
			else
				return "";
		};
	}

	function MedicalAssistance() {
		this.organizeData = function () {
			if (json_settings.ProductMedicalAssistance.SearchInCatmandu) {
				var qs_medical_assistance = this.getDestinationCity(true) +
					'/18' +
					this.getDateFrom(true) +
					this.getDateTo(true) +
					this.getUserService(true) +
					"-show"+
					this.getBranchCode(true) +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
						"-true";

				return qs_medical_assistance;
			} else {
				var qs_medical_assistance = this.getDestinationCity(false) +
					this.getDateFrom(false) +
					this.getDateTo(false) +
					this.getSalesChannelCode() +
					this.getBusinessUnitCode() +
					this.getSupplier() +
					this.getTravelExtraCode() +
					this.getTravelExtraTypes(false) +
					this.getUserService(false) +
					this.getContextApp() +
					"-show"+
					this.getBranchCode(false) +
					this.setSeparate() +
					token+"----"+
					this.getPromoCode()+
					"-true";
				return qs_medical_assistance;
			}
		};
		this.getDestinationCity = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $("#CityPredictive_netactica_medical_assistance").netautocomplete('getCode');
			} else {
				return 'DestinationCity=' + $("#CityPredictive_netactica_medical_assistance").netautocomplete('getCode');
			}
		};
		// Esta funcion no tiene cabida en el proyecto ya que no existe el input name = chklExtraTypes
		this.getTravelExtraTypes = function (searchInCatmanduParam) {
			var tipos_medical_assistance_ids = [];
			var tipos_medical_assistance_names = [];

			if (searchInCatmanduParam) {
				$('input[name=chklExtraTypes]:checked').each(function (index) {
					tipos_medical_assistance_ids.push($(this).val());
					tipos_medical_assistance_names.push(tipos_travel_extra[$(this).val()]);
				});
				$("#ExtrasType_netactica_medical_assistance_chosen").val(tipos_medical_assistance_ids.join(','));
				return ($("#ExtrasType_netactica_medical_assistance_chosen").val() !== "") ? "/" + $("#ExtrasType_netactica_medical_assistance_chosen").val() : "/NA";
			} else {
				$('input[name=chklExtraTypes]:checked').each(function (index) {
					tipos_medical_assistance_ids.push($(this).val());
					tipos_medical_assistance_names.push(tipos_travel_extra[$(this).val()]);
				});
				$("#ExtrasType_netactica_medical_assistance_chosen").val(tipos_medical_assistance_ids.join('|'));
				return ($("#ExtrasType_netactica_medical_assistance_chosen").val() !== "") ? "&TravelExtraTypes=" + $("#ExtrasType_netactica_medical_assistance_chosen").val() : "";
			}
		};
		this.getDateFrom = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateFrom_netactica_medical_assistance').datepicker('getDate'));
			} else {
				return '&DateFrom=' + $.datepicker.formatDate('dd-mm-yy', $('#DateFrom_netactica_medical_assistance').datepicker('getDate'));
			}
		};
		this.getDateTo = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return '/' + $.datepicker.formatDate('yy-mm-dd', $('#DateTo_netactica_medical_assistance').datepicker('getDate'));
			} else {
				return '&DepartureDate2=' + $.datepicker.formatDate('dd-mm-yy', $('#DateTo_netactica_medical_assistance').datepicker('getDate'));
			}
		};
		this.getUserService = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return "/" + Netactica.netactica_user_service;
			} else {
				return "&UserService=" + Netactica.netactica_user_service;
			}
		};
		this.getBranchCode = function (searchInCatmanduParam) {
			if (searchInCatmanduParam) {
				return (Netactica.netactica_branch_code != '') ? "-" + Netactica.netactica_branch_code : "";
			} else {
				if (Netactica.netactica_branch_code !== '')
					return "&BranchCode=" + Netactica.netactica_branch_code;
				else
					return '';
			}
		};
		this.getPromoCode = function () {
			if ($("#PromoCode_netactica_activities").val() === '')
				return '';
			else
				return $('[name=PromoCode_netactica_activities]').val();
		};
		this.setSeparate = function () {
			return "-----";
		};

		// Obsoletos
		this.getProviders = function () {
			if (typeof external_file_providers != 'undefined')
				return external_file_providers;
		};
		this.getSalesChannelCode = function () {
			return "";
		};
		this.getBusinessUnitCode = function () {
			return "";
		};
		this.getSupplier = function () {
			if (typeof netactica_cliente_b2b != 'undefined' && netactica_cliente_b2b == 1)
				return ($("#ExtrasProvider_netactica_medical_assistance").val() !== "") ? "&Supplier=" + $("#ExtrasProvider_netactica_medical_assistance").val() : "";
			else
				return "";
		};
		this.getTravelExtraCode = function () {
			if (typeof netactica_cliente_b2b != 'undefined' && netactica_cliente_b2b == 1)
				return ($("#ExtrasCode_netactica_medical_assistance").val() !== "") ? "&TravelExtraCode=" + $("#ExtrasCode_netactica_medical_assistance").val() : "";
			else
				return "";
		};
		this.getContextApp = function () {
			return "&ContextApp=" + Netactica.netactica_context_app;
		};
		this.GetCulture = function () {
			if (Netactica.netactica_culture !== '')
				return "&Culture=" + Netactica.netactica_culture;
			else
				return "";
		};
	}		


	
	//List of things to place publically
	this.Air 				= Air;
	this.Hotel 				= Hotel;
	this.Air_Hotel 			= Air_Hotel;
	this.Car 				= Car;
	this.AirCar 			= AirCar;
	this.Extras 			= Extras;
	this.Transfer 			= Transfer;
	this.MedicalAssistance 	= MedicalAssistance;
	
};

Netactica._construct();

//Instances init
var motor_air 					= new Netactica.Air();
var motor_hotel 				= new Netactica.Hotel();
var motor_air_hotel 			= new Netactica.Air_Hotel();
var motor_car 					= new Netactica.Car();
var motor_aircar 				= new Netactica.AirCar();
var motor_extras 				= new Netactica.Extras();
var motor_transfer 				= new Netactica.Transfer();
var motor_medical_assistance 	= new Netactica.MedicalAssistance();

//-----------------------------------------------------------------------------------------------
//----------------valida el tamaño de pantalla para saber que meses del calendario mostrar-------
//-----------------------------------------------------------------------------------------------
function numberOfMonths(){
	var varnumberOfMonths;
	if ($(window).width() < 768) {
		varnumberOfMonths = 1
	}
	else{
		varnumberOfMonths = 2;
	}
	return varnumberOfMonths;
}
//-----------------------------------------------------------------------------------------------
//----------------------añade la cantidad de dias enviados a el calendario-----------------------
//-----------------------------------------------------------------------------------------------
function addDaysDate(date, days) {
	var dat = date;
	dat.setDate(dat.getDate() + days);
	return dat;
}

jQuery().ready(function () {
	
	
	var fileName = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/" + json_settings.TabStyle + "/jquery-ui.css";
	loadJsCssFile(fileName, "css");
	function scrollDatepicker(varnumberOfMonths){
		if(varnumberOfMonths == 13){
			jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
		}
	}

	//-------------------------------------------------------------------
	//-------------------------VUELO INICIACIÓN--------------------------
	//-------------------------------------------------------------------
	var dateFromPrevAir = ''
	var dateFromPrevAirMultidestino = ''
	if (json_settings.ProductAir.Enabled == 1) {

		$("#CityPredictiveFrom_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });

		// tramo 1
		$("#CityPredictiveFrom_1_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_1_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });

		// tramo 2
		$("#CityPredictiveFrom_2_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_2_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });

		// tramo 3
		$("#CityPredictiveFrom_3_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_3_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });

		// tramo 4
		$("#CityPredictiveFrom_4_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_4_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });

		// tramo 5
		$("#CityPredictiveFrom_5_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_5_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });

		// tramo 6
		$("#CityPredictiveFrom_6_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_6_netactica_air").netautocomplete('init', { type: "AirportsCities", showExcluded: false });

		//Listado de Airline
		var file_Airlines = external_file_Airlines.length;
		$("#AirlineCode_netactica_air").netautocomplete('init', { type: "Airlines", showExcluded: false });
		$("#AirlineCode_netactica_airMulti").netautocomplete('init', { type: "Airlines", showExcluded: false });
		//----------------------------------------------------------------------------------------
		//----------------------CALENDARIO IDA Y REGRESO Y/O SOLO IDA-----------------------------
		//----------------------------------------------------------------------------------------
		$('#DateFrom_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if(jQuery("label#RT").hasClass("active") &&
				   jQuery("#DateFrom_netactica_air").datepicker("getDate") != null && 
				   jQuery("#DateFrom_netactica_air").val() != dateFromPrevAir && 
				   jQuery("#DateTo_netactica_air").datepicker("getDate") == null ){
						dateFromPrevAir = $('#DateFrom_netactica_air').val();	
						jQuery('#DateTo_netactica_air').datepicker("show");
						jQuery("#ui-datepicker-div").attr("data-parent","DateTo_netactica_air");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					dateFromPrevAir = $('#DateFrom_netactica_air').val();
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_air").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])

				if($("#DateFrom_netactica_air").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateFrom_netactica_air").datepicker("getDate") != null && $("#DateTo_netactica_air").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-from ui-state-active-to'];
					}
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				if ($("#DateFrom_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				if ($("#DateTo_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}
				return [true, ''];
			},
			
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_air").val() != dateFromPrevAir){
					jQuery("#DateTo_netactica_air").datepicker('setDate', null);
				}
				
				$("#DateFrom_netactica_air").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_air").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_air').datepicker('option', 'minDate', selectedDate);
				}
				bgAutofocus(false)
				
			}
		});


		$('#DateTo_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				/*if($("#DateTo_netactica_air").datepicker("getDate") != null){
					jQuery(".tab-content>.active input#txtNumPassengers").trigger("click");	
				}*/
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de regreso");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
				

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_air").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])


				if($("#DateFrom_netactica_air").datepicker("getDate") == null){
					//console.log(dayToday);
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateFrom_netactica_air").datepicker("getDate") != null && $("#DateTo_netactica_air").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-from ui-state-active-to'];
					}
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				if ($("#DateFrom_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				if ($("#DateTo_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_air").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});	
		//----------------------------------------------------------------------------------------
		//-------------------------------CALENDARIO MULTIDESTINO----------------------------------
		//----------------------------------------------------------------------------------------
		$('#DateFrom_1_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
				

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_1_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])

				if($("#DateFrom_1_netactica_air").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_1_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {

				$("#DateFrom_1_netactica_air").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_1_netactica_air").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateFrom_2_netactica_air').datepicker('option', 'minDate', selectedDate);
				}
				bgAutofocus(false)
			}
		});
		$('#DateFrom_2_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {

				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_2_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])

				if($("#DateFrom_2_netactica_air").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_2_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {

				$("#DateFrom_2_netactica_air").siblings(".bVErrMsgContainer").remove();

				var selectedDate = $("#DateFrom_2_netactica_air").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateFrom_3_netactica_air').datepicker('option', 'minDate', selectedDate);
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateFrom_3_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_3_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])

				if($("#DateFrom_3_netactica_air").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_3_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {

				$("#DateFrom_3_netactica_air").siblings(".bVErrMsgContainer").remove();

				var selectedDate = $("#DateFrom_3_netactica_air").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateFrom_4_netactica_air').datepicker('option', 'minDate', selectedDate);
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateFrom_4_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_4_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])

				if($("#DateFrom_4_netactica_air").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_4_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateFrom_4_netactica_air").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_4_netactica_air").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateFrom_5_netactica_air').datepicker('option', 'minDate', selectedDate);
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateFrom_5_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_5_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])

				if($("#DateFrom_5_netactica_air").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_5_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				
				$("#DateFrom_5_netactica_air").siblings(".bVErrMsgContainer").remove();

				var selectedDate = $("#DateFrom_5_netactica_air").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateFrom_6_netactica_air').datepicker('option', 'minDate', selectedDate);
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateFrom_6_netactica_air').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_6_netactica_air").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])

				if($("#DateFrom_6_netactica_air").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_6_netactica_air").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateFrom_6_netactica_air").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});

		
	}
	//-------------------------------------------------------------------
	//-------------------------HOTEL INICIACIÓN--------------------------
	//-------------------------------------------------------------------
	var dateFromPrevHotel = ''
	if (json_settings.ProductHotel.Enabled == 1) {
		

		if(json_settings.StaticContent){
			staticContentAutocomplete.LoadNetsuiteAutocomplete('init',"CityPredictive_netactica_hotel", "", json_settings.UserService, '', '', "es")
		}
		else{
			$("#CityPredictive_netactica_hotel").netautocomplete('init', { type: "Cities", showExcluded: false });
		}
		//----------------------------------------------------------------------------------------
		//-------------------------------CALENDARIO HOTELES---------------------------------------
		//----------------------------------------------------------------------------------------
		var hotelDaysAvailableOnCalendarToSearch = 548;
		$('#DateFrom_netactica_hotel').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: hotelDaysAvailableOnCalendarToSearch,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateFrom_netactica_hotel").datepicker("getDate") != null && jQuery("#DateFrom_netactica_hotel").val() != dateFromPrevHotel 
					&& $("#DateTo_netactica_hotel").datepicker("getDate") == null ){

					dateFromPrevHotel = $('#DateFrom_netactica_hotel').val();	
					jQuery('#DateTo_netactica_hotel').datepicker("show");
					$("#ui-datepicker-div").attr("data-parent","DateTo_netactica_hotel");	

				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					dateFromPrevHotel = $('#DateFrom_netactica_hotel').val();	
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de ingreso");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_hotel").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_hotel").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0]);



				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}

				if($("#DateFrom_netactica_hotel").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_netactica_hotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}

				if($("#DateFrom_netactica_hotel").datepicker("getDate") != null && $("#DateTo_netactica_hotel").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				
				if ($("#DateTo_netactica_hotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_hotel").val() != dateFromPrevHotel){
					jQuery("#DateTo_netactica_hotel").datepicker('setDate', null);
				}
				
				$("#DateFrom_netactica_hotel").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_hotel").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_hotel').datepicker('option', 'minDate', addDaysDate(new Date(selectedDate), 1));
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateTo_netactica_hotel').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: hotelDaysAvailableOnCalendarToSearch,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateTo_netactica_hotel").datepicker("getDate") != null){
					//jQuery(".tab-content>.active input#txtNumPassengersHoteles").trigger("click");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth(),dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_hotel").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_hotel").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])

				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}


				if ($("#DateFrom_netactica_hotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
				}

				if($("#DateTo_netactica_hotel").datepicker("getDate") == null){
					if(d.getTime() == addDaysDate(new Date(fechaFrom), 1).getTime()){
						return [true,'ui-state-active-day'];
					}
					else if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateTo_netactica_hotel").datepicker("getDate") != null && $("#DateFrom_netactica_hotel").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				
				if ($("#DateTo_netactica_hotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_hotel").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});
		$('#DateFrom_netactica_hotel').change(function () {
			var _selectedDate = $('#DateFrom_netactica_hotel').datepicker('getDate');
			var _maxDaysAllowedSearch = 30;
			var today = new Date();
			var diff = Math.floor((_selectedDate - today) / (1000 * 60 * 60 * 24));
			if (diff >= ((hotelDaysAvailableOnCalendarToSearch) - _maxDaysAllowedSearch)) {
				_maxDaysAllowedSearch = _maxDaysAllowedSearch - (diff - ((hotelDaysAvailableOnCalendarToSearch) - _maxDaysAllowedSearch - 1));
			}
			$('#DateTo_netactica_hotel').datepicker("option", "minDate", new Date(
				$.datepicker.formatDate('yy', $('#DateFrom_netactica_hotel').datepicker('getDate')),
				$.datepicker.formatDate('mm', $('#DateFrom_netactica_hotel').datepicker('getDate')) * 1 - 1,
				$.datepicker.formatDate('dd', $('#DateFrom_netactica_hotel').datepicker('getDate')) * 1 + 1
			));

			$('#DateTo_netactica_hotel').datepicker("option", "maxDate", addDays(_selectedDate, _maxDaysAllowedSearch));
		});


		//----------------------------------------------------------------------------------------
		//-------------------Listas dinamicas de chicos por habitacion - Hoteles------------------
		//----------------------------------------------------------------------------------------
		var inival = $("#ddlHotelNumberChildrens").val();
		$("#ddlHotelNumberChildrens").change(function () {
			motor_hotel.updateChilds($(this));
		});
		var inival = $("#ddlHotelNumberChildrensDos").val();
		$("#ddlHotelNumberChildrensDos").change(function () {
			motor_hotel.updateChildsDos($(this));
		});
		var inival = $("#ddlHotelNumberChildrensTres").val();
		$("#ddlHotelNumberChildrensTres").change(function () {
			motor_hotel.updateChildsTres($(this));
		});
		var inival = $("#ddlHotelNumberChildrensCuatro").val();
		$("#ddlHotelNumberChildrensCuatro").change(function () {
			motor_hotel.updateChildsCuatro($(this));
		});
	}
	//-------------------------------------------------------------------
	//---------------------VUELO + HOTEL INICIACIÓN----------------------
	//-------------------------------------------------------------------
	var dateFromPrevAirHotel = ''
	if (json_settings.ProductAirHotel.Enabled == 1) {
		$("#CityPredictiveFrom_netactica_airhotel").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_netactica_airhotel").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		

		$("#AirlineCode_netactica_air_hotel").netautocomplete('init', { type: "Airlines", showExcluded: false });
		//----------------------------------------------------------------------------------------
		//-------------------------------CALENDARIO VUELO + HOTEL---------------------------------------
		//----------------------------------------------------------------------------------------
		var daysAvailableOnCalendarToSearch = 355;
		$('#DateFrom_netactica_airhotel').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: daysAvailableOnCalendarToSearch,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			currentText: "Now",
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------

			onClose: function(){
				if($("#DateFrom_netactica_airhotel").datepicker("getDate") != null && jQuery("#DateFrom_netactica_airhotel").val() != dateFromPrevAirHotel
					&& $("#DateTo_netactica_airhotel").datepicker("getDate") == null){
						dateFromPrevAirHotel = $('#DateFrom_netactica_airhotel').val();	
					jQuery('#DateTo_netactica_airhotel').datepicker("show");	
					$("#ui-datepicker-div").attr("data-parent","DateTo_netactica_airhotel");	
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					dateFromPrevAirHotel = $('#DateFrom_netactica_airhotel').val();	
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_airhotel").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_airhotel").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])
				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
				if($("#DateFrom_netactica_airhotel").datepicker("getDate") == null){
					//console.log(dayToday);
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateFrom_netactica_airhotel").datepicker("getDate") != null && $("#DateTo_netactica_airhotel").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				if ($("#DateFrom_netactica_airhotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				if ($("#DateTo_netactica_airhotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_airhotel").val() != dateFromPrevAirHotel){
					jQuery("#DateTo_netactica_airhotel").datepicker('setDate', null);
				}
				
				$("#DateFrom_netactica_airhotel").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_airhotel").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_airhotel').datepicker('option', 'minDate', addDaysDate(new Date(selectedDate), 1));
					
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateTo_netactica_airhotel').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: daysAvailableOnCalendarToSearch,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateTo_netactica_airhotel").datepicker("getDate") != null){
					//jQuery(".tab-content>.active input#txtNumPassengersPaquetes").trigger("click");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de regreso");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth(),dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_airhotel").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_airhotel").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])

				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
				if ($("#DateFrom_netactica_airhotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
				}
				if($("#DateTo_netactica_airhotel").datepicker("getDate") == null){
					if(d.getTime() == addDaysDate(new Date(fechaFrom), 1).getTime()){
						return [true,'ui-state-active-day'];
					}
					else if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateTo_netactica_airhotel").datepicker("getDate") != null && $("#DateFrom_netactica_airhotel").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				
				if ($("#DateTo_netactica_airhotel").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_airhotel").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});

		$('#DateFrom_netactica_airhotel').change(function () {
			$('#DateTo_netactica_airhotel').datepicker("option", "minDate", new Date(
				$.datepicker.formatDate('yy', $('#DateFrom_netactica_airhotel').datepicker('getDate')),
				$.datepicker.formatDate('mm', $('#DateFrom_netactica_airhotel').datepicker('getDate')) * 1 - 1,
				$.datepicker.formatDate('dd', $('#DateFrom_netactica_airhotel').datepicker('getDate')) * 1
			));
			var _selectedDate = $('#DateFrom_netactica_airhotel').datepicker('getDate');
			var _maxDaysAllowedSearch = 30;
			var today = new Date();
			var diff = Math.floor((_selectedDate - today) / (1000 * 60 * 60 * 24));
			if (diff >= ((daysAvailableOnCalendarToSearch) - _maxDaysAllowedSearch)) {
				_maxDaysAllowedSearch = _maxDaysAllowedSearch - (diff - ((daysAvailableOnCalendarToSearch) - _maxDaysAllowedSearch - 1));
			}
			$('#DateTo_netactica_airhotel').datepicker("option", "maxDate", addDays(_selectedDate, _maxDaysAllowedSearch));
		});

		//----------------------------------------------------------------------------------------
		//--------------Listas dinamicas de chicos por habitacion - Paquetes y Hoteles------------
		//----------------------------------------------------------------------------------------
		var inival = $("#ddlAirHotelNumberChildrens").val();
		$("#ddlAirHotelNumberChildrens").change(function () {
			motor_air_hotel.updateChilds($(this));
		});
		// Habitacion 2
		var inival = $("#ddlAirHotelNumberChildrensDos").val();
		$("#ddlAirHotelNumberChildrensDos").change(function () {
			motor_air_hotel.updateChildsDos($(this));
		});

		// Habitacion 3
		var inival = $("#ddlAirHotelNumberChildrensTres").val();
		$("#ddlAirHotelNumberChildrensTres").change(function () {
			motor_air_hotel.updateChildsTres($(this));
		});

		// Habitacion 4
		var inival = $("#ddlAirHotelNumberChildrensCuatro").val();
		$("#ddlAirHotelNumberChildrensCuatro").change(function () {
			motor_air_hotel.updateChildsCuatro($(this));
		});
	}
	//-------------------------------------------------------------------
	//---------------------VUELO + CARRO INICIACIÓN----------------------
	//-------------------------------------------------------------------
	var dateFromPrevAirCar = ''
	if (json_settings.ProductAir.Enabled == 1) {

		$("#CityPredictiveFrom_netactica_aircar").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		$("#CityPredictiveTo_netactica_aircar").netautocomplete('init', { type: "AirportsCities", showExcluded: false });
		//----------------------------------------------------------------------------------------
		//-------------------------------CALENDARIO VUELO + CARRO---------------------------------
		//----------------------------------------------------------------------------------------
		$('#DateFrom_netactica_aircar').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateFrom_netactica_aircar").datepicker("getDate") != null && jQuery("#DateFrom_netactica_aircar").val() != dateFromPrevAirCar 
					&& $("#DateTo_netactica_aircar").datepicker("getDate") == null){
					dateFromPrevAirCar = $('#DateFrom_netactica_aircar').val();	
					jQuery('#DateTo_netactica_aircar').datepicker("show");	
					$("#ui-datepicker-div").attr("data-parent","DateTo_netactica_aircar");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					dateFromPrevAirCar = $('#DateFrom_netactica_aircar').val();	
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_aircar").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_aircar").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])
				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
				if($("#DateFrom_netactica_aircar").datepicker("getDate") == null){
					//console.log(dayToday);
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateFrom_netactica_aircar").datepicker("getDate") != null && $("#DateTo_netactica_aircar").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				if ($("#DateFrom_netactica_aircar").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				if ($("#DateTo_netactica_aircar").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_aircar").val() != dateFromPrevAirCar){
					jQuery("#DateTo_netactica_aircar").datepicker('setDate', null);
				}
				
				$("#DateFrom_netactica_aircar").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_aircar").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_aircar').datepicker('option', 'minDate', addDaysDate(new Date(selectedDate), 1));
					
				}
				bgAutofocus(false)
			}
		});
		$('#DateTo_netactica_aircar').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateTo_netactica_airhotel").datepicker("getDate") != null){
					//jQuery(".tab-content>.active input#txtNumPassengers").trigger("click");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de regreso");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth(),dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_aircar").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_aircar").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])

				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}

				if ($("#DateFrom_netactica_aircar").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
				}
				if($("#DateTo_netactica_aircar").datepicker("getDate") == null){
					if(d.getTime() == addDaysDate(new Date(fechaFrom), 1).getTime()){
						return [true,'ui-state-active-day'];
					}
					else if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateTo_netactica_aircar").datepicker("getDate") != null && $("#DateFrom_netactica_aircar").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				
				if ($("#DateTo_netactica_aircar").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_aircar").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});


		$("#AirlineCode_netactica_aircar").netautocomplete('init', { type: "Airlines", showExcluded: false });
	}
	//-------------------------------------------------------------------
	///------------------------CARRO INICIACIÓN--------------------------
	//-------------------------------------------------------------------
	var dateFromPrevCar = ''
	if (json_settings.ProductCar.Enabled == 1) {
		$("#AirportPredictiveFrom_netactica_car").netautocomplete('init', { type: "Neighborhood", showExcluded: false });
		$("#AirportPredictiveTo_netactica_car").netautocomplete('init', { type: "Neighborhood", showExcluded: false });
		$('#DateFrom_netactica_car').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			onClose: function(){
				if($("#DateFrom_netactica_car").datepicker("getDate") != null && jQuery("#DateFrom_netactica_car").val() != dateFromPrevCar
					&& $("#DateTo_netactica_car").datepicker("getDate") == null){
					dateFromPrevCar = $('#DateFrom_netactica_car').val();
					$("#ui-datepicker-div").attr("data-parent","DateTo_netactica_car");
					jQuery('#DateTo_netactica_car').datepicker("show");	
					
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					dateFromPrevCar = $('#DateFrom_netactica_car').val();
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de retiro");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_car").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_car").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])
				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
				if($("#DateFrom_netactica_car").datepicker("getDate") == null){
					//console.log(dayToday);
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateFrom_netactica_car").datepicker("getDate") != null && $("#DateTo_netactica_car").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				if ($("#DateFrom_netactica_car").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				if ($("#DateTo_netactica_car").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_car").val() != dateFromPrevCar){
					jQuery("#DateTo_netactica_car").datepicker('setDate', null);
				}
				$("#DateFrom_netactica_car").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_car").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_car').datepicker('option', 'minDate', selectedDate);
				}
				bgAutofocus(false)
			}
		});
		$('#DateTo_netactica_car').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de devolución");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_car").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_car").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])

				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
				if($("#DateFrom_netactica_car").datepicker("getDate") == null){
					//console.log(dayToday);
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateFrom_netactica_car").datepicker("getDate") != null && $("#DateTo_netactica_car").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				if ($("#DateFrom_netactica_car").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
				if ($("#DateTo_netactica_car").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_car").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});
	}
	//-------------------------------------------------------------------
	///----------------------ACTIVIDADES INICIACIÓN----------------------
	//-------------------------------------------------------------------
	var dateFromPrevExtras = ''
	if (json_settings.ProductExtra.Enabled == 1) {
		var dateFromPrevExtras = $('#DateFrom_netactica_extras').val()
		$("#CityPredictive_netactica_extras").netautocomplete('init', { type: "Cities", showExcluded: false });
		$('#DateFrom_netactica_extras').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateTo_netactica_extras").datepicker("getDate") == null && jQuery("#DateFrom_netactica_extras").val() != dateFromPrevExtras &&
				   $("#DateFrom_netactica_extras").datepicker("getDate") != null){
					dateFromPrevExtras = $('#DateFrom_netactica_extras').val();
					$("#ui-datepicker-div").attr("data-parent","DateTo_netactica_extras");
					jQuery('#DateTo_netactica_extras').datepicker("show");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				dateFromPrevExtras = $('#DateFrom_netactica_extras').val()
				setTimeout(()=>{
					dateFromPrevExtras = $('#DateFrom_netactica_extras').val();
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_extras").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_extras").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0]);



				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}

				if($("#DateFrom_netactica_extras").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_netactica_extras").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
				}

				if($("#DateFrom_netactica_extras").datepicker("getDate") != null && $("#DateTo_netactica_extras").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}

				
				if ($("#DateTo_netactica_extras").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}

				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_extras").val() != dateFromPrevExtras){
					jQuery("#DateTo_netactica_extras").datepicker('setDate', null);
				}

				$("#DateFrom_netactica_extras").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_extras").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_extras').datepicker('option','minDate',selectedDate);
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateTo_netactica_extras').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de regreso");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)

			},
			beforeShowDay: function (in_date) {
				
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth(),dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_extras").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_extras").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])

				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}

				if ($("#DateFrom_netactica_extras").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}

				if($("#DateTo_netactica_extras").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateTo_netactica_extras").datepicker("getDate") != null && $("#DateFrom_netactica_extras").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}
				if ($("#DateTo_netactica_extras").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}
				return [true, ''];
				

			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_extras").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});	

		if (typeof json_settings.ProductExtra.Types != 'undefined') {

			if ($(json_settings.ProductExtra.Types).length > 0) {
				$("#divInnerExtrasTypes").append("<ol id='lstExtraTypes'>");
				$(json_settings.ProductExtra.Types).each(function (index) {
					$("#lstExtraTypes").append("<li><input type='checkbox' name='chklExtraTypes' value=" + json_settings.ProductExtra.Types[index] + ">" + tipos_travel_extra[json_settings.ProductExtra.Types[index]] + "</li>");
				});
			}
		}
	}
	//-------------------------------------------------------------------
	///------------------------TRANSFER INICIACIÓN-----------------------
	//-------------------------------------------------------------------
	var dateFromPrevTransfer = '';
	if (json_settings.ProductTransfer.Enabled == 1) {
		
		var dateFromPrevTransfer = $('#DateFrom_netactica_transfer').val()
		$("#CityPredictive_netactica_transfer").netautocomplete('init', { type: "Cities", showExcluded: false });
		$('#DateFrom_netactica_transfer').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateTo_netactica_transfer").datepicker("getDate") == null && jQuery("#DateFrom_netactica_transfer").val() != dateFromPrevTransfer &&
				   $("#DateFrom_netactica_transfer").datepicker("getDate") != null){
					dateFromPrevTransfer = $('#DateFrom_netactica_transfer').val();
					$("#ui-datepicker-div").attr("data-parent","DateTo_netactica_transfer");
					jQuery('#DateTo_netactica_transfer').datepicker("show");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				dateFromPrevTransfer = $('#DateFrom_netactica_transfer').val()
				setTimeout(()=>{
					dateFromPrevTransfer = $('#DateFrom_netactica_transfer').val();
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
	
			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_transfer").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_transfer").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0]);
	
	
	
				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
	
				if($("#DateFrom_netactica_transfer").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_netactica_transfer").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
	
				if($("#DateFrom_netactica_transfer").datepicker("getDate") != null && $("#DateTo_netactica_transfer").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}
	
				
				if ($("#DateTo_netactica_transfer").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}
	
				return [true, ''];
				
	
			},
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_transfer").val() != dateFromPrevTransfer){
					jQuery("#DateTo_netactica_transfer").datepicker('setDate', null);
				}
	
				$("#DateFrom_netactica_transfer").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_transfer").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_transfer').datepicker('option','minDate',selectedDate);
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateTo_netactica_transfer').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de regreso");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
	
			},
			beforeShowDay: function (in_date) {
				
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth(),dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_transfer").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_transfer").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])
	
				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
	
				if ($("#DateFrom_netactica_transfer").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
	
				if($("#DateTo_netactica_transfer").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateTo_netactica_transfer").datepicker("getDate") != null && $("#DateFrom_netactica_transfer").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}
				if ($("#DateTo_netactica_transfer").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}
				return [true, ''];
				
	
			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_transfer").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});	
	
		if (typeof json_settings.ProductTransfer.Types != 'undefined') {
			if ($(json_settings.ProductTransfer.Types).length > 0) {
				$("#divInnerTransferTypes").append("<ol id='lstTransferTypes'>");
				$(json_settings.ProductTransfer.Types).each(function (index) {
					$("#lstTransferTypes").append("<li><input type='checkbox' name='chklTransferTypes' value=" + json_settings.ProductTransfer.Types[index] + ">" + tipos_travel_extra[json_settings.ProductTransfer.Types[index]] + "</li>");
				});
			}
		}
	}
	//-------------------------------------------------------------------
	///------------------------MEDICAL ASSISTANCE INICIACIÓN-----------------------
	//-------------------------------------------------------------------
	var dateFromPrevMedicalAssistance = '';
	if (json_settings.ProductMedicalAssistance.Enabled == 1) {
		var dateFromPrevMedicalAssistance = $('#DateFrom_netactica_medical_assistance').val()
		$("#CityPredictive_netactica_medical_assistance").netautocomplete('init', { type: "Cities", showExcluded: false });
		$('#DateFrom_netactica_medical_assistance').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				if($("#DateTo_netactica_medical_assistance").datepicker("getDate") == null && jQuery("#DateFrom_netactica_medical_assistance").val() != dateFromPrevMedicalAssistance &&
				   $("#DateFrom_netactica_medical_assistance").datepicker("getDate") != null){
					dateFromPrevMedicalAssistance = $('#DateFrom_netactica_medical_assistance').val();
					$("#ui-datepicker-div").attr("data-parent","DateTo_netactica_medical_assistance");
					jQuery('#DateTo_netactica_medical_assistance').datepicker("show");
				}
				bgAutofocus(false)
			},
			beforeShow: function () {
				dateFromPrevMedicalAssistance = $('#DateFrom_netactica_medical_assistance').val()
				setTimeout(()=>{
					dateFromPrevMedicalAssistance = $('#DateFrom_netactica_medical_assistance').val();
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de salida");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
	
			},
			beforeShowDay: function (in_date) {
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth() ,dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_medical_assistance").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_medical_assistance").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0]);
	
	
	
				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
	
				if($("#DateFrom_netactica_medical_assistance").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if ($("#DateFrom_netactica_medical_assistance").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
	
				if($("#DateFrom_netactica_medical_assistance").datepicker("getDate") != null && $("#DateTo_netactica_medical_assistance").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}
	
				
				if ($("#DateTo_netactica_medical_assistance").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}
	
				return [true, ''];
				
	
			},
			onSelect: function (selectedDate) {
				if(jQuery("#DateFrom_netactica_medical_assistance").val() != dateFromPrevMedicalAssistance){
					jQuery("#DateTo_netactica_medical_assistance").datepicker('setDate', null);
				}
	
				$("#DateFrom_netactica_medical_assistance").siblings(".bVErrMsgContainer").remove();
				var selectedDate = $("#DateFrom_netactica_medical_assistance").datepicker("getDate");
				if (selectedDate != null) {
					$('#DateTo_netactica_medical_assistance').datepicker('option','minDate',selectedDate);
				}
				jQuery("div#ui-datepicker-div").animate({scrollTop: 0}, 1);
				bgAutofocus(false)
			}
		});
		$('#DateTo_netactica_medical_assistance').datepicker({
			beforeShowDay: 0,
			minDate: +1,
			maxDate: 355,
			closeText: '&times;',
			numberOfMonths: numberOfMonths(),
			showButtonPanel: true,
			//----- cuando se cierre el primer calendario se abre el segundo ------
			onClose: function(){
				bgAutofocus(false)
			},
			beforeShow: function () {
				
				setTimeout(()=>{
					bgAutofocus(true, jQuery("div#ui-datepicker-div"))
					var elemento = jQuery("div#ui-datepicker-div .title-datapicker").length;
					if(elemento == 0 && screen.width < 992){
						jQuery("div#ui-datepicker-div > div:nth-child(1)").before('<div class="title-datapicker"></div>');
					}
					jQuery("div#ui-datepicker-div .title-datapicker").html("Fecha de regreso");
					//volver la posicion del scroll al comienzo
					scrollDatepicker(numberOfMonths())
				},10)
	
			},
			beforeShowDay: function (in_date) {
				
				var d = in_date;
				var dayToday = new Date();
				dayToday = new Date(dayToday.getFullYear(), dayToday.getMonth(),dayToday.getDate()+1)
				var fechaFrom = $("#DateFrom_netactica_medical_assistance").val().split("-");
				fechaFrom = new Date(fechaFrom[2],fechaFrom[1] - 1, fechaFrom[0])
				var fechaTo = $("#DateTo_netactica_medical_assistance").val().split("-");
				fechaTo = new Date(fechaTo[2], fechaTo[1] - 1, fechaTo[0])
	
				if(d.getTime() == fechaFrom.getTime() && d.getTime() == fechaTo.getTime()){
					return [true,'ui-state-active-from ui-state-active-to'];
				}
	
				if ($("#DateFrom_netactica_medical_assistance").datepicker("getDate") != null) {
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from'];
					}
				}
	
				if($("#DateTo_netactica_medical_assistance").datepicker("getDate") == null){
					if(d.getTime() == dayToday.getTime()){
						return [true,'ui-state-active-day'];
					}
				}
				if($("#DateTo_netactica_medical_assistance").datepicker("getDate") != null && $("#DateFrom_netactica_medical_assistance").datepicker("getDate") != null){
					if(d.getTime() == fechaFrom.getTime()){
						return [true,'ui-state-active-from border-right'];
					}
					if(d.getTime() > fechaFrom.getTime() &&
					   d.getTime() < fechaTo.getTime()){
						return [true,'ui-state-active-from-to'];
					}
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to border-left'];
					}
				}
				if ($("#DateTo_netactica_medical_assistance").datepicker("getDate") != null) {
					if(d.getTime() == fechaTo.getTime()){
						return [true,'ui-state-active-to'];
					}
				}
				return [true, ''];
				
	
			},
			onSelect: function (selectedDate) {
				$("#DateTo_netactica_medical_assistance").siblings(".bVErrMsgContainer").remove();
				bgAutofocus(false)
			}
		});	
	
		if (typeof json_settings.ProductMedicalAssistance.Types != 'undefined') {
	
			if ($(json_settings.ProductMedicalAssistance.Types).length > 0) {
				$("#divInnerMedicalAssistanceTypes").append("<ol id='lstMedicalAssistanceTypes'>");
				$(json_settings.ProductMedicalAssistance.Types).each(function (index) {
					$("#lstMedicalAssistanceTypes").append("<li><input type='checkbox' name='chklMedicalAssistanceTypes' value=" + json_settings.ProductMedicalAssistance.Types[index] + ">" + tipos_travel_extra[json_settings.ProductMedicalAssistance.Types[index]] + "</li>");
				});
			}
		}
	}





	
	$(document).on("mouseenter", "#ui-datepicker-div td", function (e) {
		jQuery(this).removeClass("ui-state-active-from-to-hover");
		if(($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_air" 					&& jQuery("input#DateFrom_netactica_air").val() != "" 					&& jQuery("input#DateTo_netactica_air").val() 					== "" )  ||
		   ($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_hotel" 				&& jQuery("input#DateFrom_netactica_hotel").val() != "" 				&& jQuery("input#DateTo_netactica_hotel").val() 				== "" )  ||
		   ($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_airhotel" 				&& jQuery("input#DateFrom_netactica_airhotel").val() != "" 				&& jQuery("input#DateTo_netactica_airhotel").val() 				== "" )  ||
		   ($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_aircar" 				&& jQuery("input#DateFrom_netactica_aircar").val() != ""				&& jQuery("input#DateTo_netactica_aircar").val() 				== "" )  ||
		   ($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_car" 					&& jQuery("input#DateFrom_netactica_car").val() != ""					&& jQuery("input#DateTo_netactica_car").val() 					== "" )  ||
		   ($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_extras"				&& jQuery("input#DateFrom_netactica_extras").val() != "" 				&& jQuery("input#DateTo_netactica_extras").val() 				== "" )  ||
		   ($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_transfer"				&& jQuery("input#DateFrom_netactica_transfer").val() != "" 				&& jQuery("input#DateTo_netactica_transfer").val() 				== "" )  ||
		   ($("#ui-datepicker-div").attr("data-parent") == "DateTo_netactica_medical_assistance"	&& jQuery("input#DateFrom_netactica_medical_assistance").val() != "" 	&& jQuery("input#DateTo_netactica_medical_assistance").val() 	== "" ) 
		   ){
			
			var elementInicial = jQuery("#ui-datepicker-div").attr("data-parent");
			elementInicial = elementInicial.replaceAll("To","From");
			var fechaInicio = new Date(jQuery("#"+elementInicial).datepicker("getDate"));		
			var fechaHover = new Date(jQuery(this).attr("data-year"), jQuery(this).attr("data-month"), jQuery(this).find("a").text());
			jQuery(this).parents(".ui-datepicker.ui-widget").find("table.ui-datepicker-calendar").each(function(){
				var tabla = jQuery(this);
				jQuery(tabla).find("tr").each(function(){
					var tablaColumna = jQuery(this);
					jQuery(tablaColumna).find("td").each(function(){
						var fechaElemento = new Date(jQuery(this).attr("data-year"), jQuery(this).attr("data-month"), jQuery(this).find("a").text());
						if(fechaElemento.getTime() == fechaInicio.getTime()){
							jQuery(this).addClass("border-right")
						}
						if(fechaElemento.getTime() > fechaInicio.getTime()   &&  fechaElemento.getTime() < fechaHover.getTime()){
							jQuery(this).addClass("ui-state-active-from-to-hover")
						}
						else{
							jQuery(this).removeClass("ui-state-active-from-to-hover")	
						}
					})
				})
			})
		}
	});




	$("#netactica_booking_form").bValidator();
	//----------- VALIDADOR - GENERADOR URL VUELOS ---------------------------------
	$('#sbm_netactica_air').on('click', function () {
		jQuery("div#netactica_booking_form .tab-content>.active #txtNumPassengers").trigger("click");
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			jQuery("div#netactica_booking_form .tab-content>.active .morePop").css("display","none");
			if(jQuery("#sbm_netactica_air_from_air_hotel").prop('checked')){
				var valor = "";
				jQuery("#CityPredictiveFrom_netactica_airhotel").val(jQuery("#CityPredictiveFrom_netactica_air").val())
				jQuery("#CityPredictiveTo_netactica_airhotel").val(jQuery("#CityPredictiveTo_netactica_air").val())
				jQuery("#DateFrom_netactica_airhotel").val(jQuery("#DateFrom_netactica_air").val());

				valLocalStorageCiudadAirOrigen(jQuery("#CityPredictiveFrom_netactica_air").val());
				valLocalStorageCiudadAirDestino(jQuery("#CityPredictiveTo_netactica_air").val());

				if($('input[name=TripType_netactica_air]').val() == "RT"){
					valor = jQuery("#DateTo_netactica_air").val()
				}
				else if($('input[name=TripType_netactica_air]').val() == "OW"){
					valor = jQuery("#DateFrom_netactica_air").val().split("-")
					valor = (valor[0]+5)+"-"+valor[1]+"-"+valor[2]
				}
				
				jQuery("#DateTo_netactica_airhotel").val(valor);
				jQuery("#ddlAirHotelNumberAdults").val(2);
				jQuery("#ddlAirHotelNumberChildrens").val(1);
				jQuery("#sbm_netactica_airhotel").trigger("click");	
			}
	
			else if(jQuery("#sbm_netactica_air_from_air_car").prop('checked')){
				var valor = "";
				jQuery("#CityPredictiveFrom_netactica_aircar").val(jQuery("#CityPredictiveFrom_netactica_air").val())
				jQuery("#CityPredictiveTo_netactica_aircar").val(jQuery("#CityPredictiveTo_netactica_air").val())
	
				jQuery("#DateFrom_netactica_aircar").val(jQuery("#DateFrom_netactica_air").val());
				
				valLocalStorageCiudadAirOrigen(jQuery("#CityPredictiveFrom_netactica_air").val());
				valLocalStorageCiudadAirDestino(jQuery("#CityPredictiveTo_netactica_air").val());
				if($('input[name=TripType_netactica_air]').val() == "RT"){
					valor = jQuery("#DateTo_netactica_air").val()
				}
	
				else if($('input[name=TripType_netactica_air]').val() == "OW"){
					valor = jQuery("#DateFrom_netactica_air").val().split("-")
					valor = (valor[0]+5)+"-"+valor[1]+"-"+valor[2]
				}	

				jQuery("#DateTo_netactica_aircar").val(valor);
				jQuery("#sbm_netactica_aircar").trigger("click");	
	


				
			}
			else{
				if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
					bValidatorDataLayer( "netactica_url_motor_air", motor_air.organizeData() );
				}
				valLocalStorageCiudadAirOrigen(jQuery("#CityPredictiveFrom_netactica_air").val());
				valLocalStorageCiudadAirDestino(jQuery("#CityPredictiveTo_netactica_air").val());
				//console.log("Token: /"+token+"/");
				console.log("motor_air.organizeData()", Netactica.netactica_url_motor_air + (json_settings.ProductAir.SearchInCatmandu == true ? '' : '?') + motor_air.organizeData());
				debugger;
				$(".validateBg").addClass('bg_validate');
	
				window.open(Netactica.netactica_url_motor_air + (json_settings.ProductAir.SearchInCatmandu == true ? '' : '?') + motor_air.organizeData() );
				
				
			}

		}
		else{
			if(jQuery("div#netactica_booking_form .tab-content>.active .morePop .bvalidator_errmsg").length == 0){
				jQuery("div#netactica_booking_form .tab-content>.active .morePop").css("display","none");
			}	
			else{
				jQuery("div#netactica_booking_form .tab-content>.active .morePop").css("display","block");
			}	
		}


	});
	//----------- VALIDADOR - GENERADOR URL HOTELES --------------------------------
	$('#sbm_netactica_hotel').on('click', function () {

		jQuery("div#netactica_booking_form .tab-content>.active .habitacionesBox .input-group").trigger("click");
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			jQuery("div#netactica_booking_form .tab-content>.active .morePop").css("display","none");
			if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
			    bValidatorDataLayer( "netactica_url_motor_hotel", motor_hotel.organizeData() );
			}
			valLocalStorageCiudadHotelDestino(jQuery("#CityPredictive_netactica_hotel").val());
			//console.log("Token: /"+token+"");
			console.log("motor_hotel.organizeData()", Netactica.netactica_url_motor_hotel+(json_settings.ProductHotel.SearchInCatmandu == true ? '' : '?')+motor_hotel.organizeData());
			debugger;
			$(".validateBg").addClass('bg_validate');
			window.open(Netactica.netactica_url_motor_hotel + (json_settings.ProductHotel.SearchInCatmandu == true ? '' : '?') + motor_hotel.organizeData() );

			
			
		}
		else{
			if(jQuery("div#netactica_booking_form .tab-content>.active .morePop .bvalidator_errmsg").length == 0){
				jQuery("div#netactica_booking_form .tab-content>.active .morePop").css("display","none");
			}	
			else{
				jQuery("div#netactica_booking_form .tab-content>.active .morePop").css("display","block");
			}
		}
	});
	//----------- VALIDADOR - GENERADOR URL PAQUETES - VUELO + HOTEL ---------------
	$('#sbm_netactica_airhotel').on('click', function () {
		jQuery("div#netactica_booking_form .tab-content>.active div#airhotel .habitacionesBox .input-group").trigger("click");
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			jQuery("div#netactica_booking_form .tab-content>.active .morePopHabitaciones.morePop").css("display","none");
			if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
			    bValidatorDataLayer( "netactica_url_motor_air_hotel", motor_air_hotel.organizeData() );
			}

			valLocalStorageCiudadAirHotelOrigen(jQuery("#CityPredictiveFrom_netactica_airhotel").val());
			valLocalStorageCiudadAirHotelDestino(jQuery("#CityPredictiveTo_netactica_airhotel").val());
			//console.log("Token: /"+token+"/");
			console.log("motor_air_hotel.organizeData()", Netactica.netactica_url_motor_air_hotel  + motor_air_hotel.organizeData());
			debugger;
			$(".validateBg").addClass('bg_validate');

			window.open( Netactica.netactica_url_motor_air_hotel + motor_air_hotel.organizeData() );
			
			
		}
		else{
			if(jQuery("div#netactica_booking_form .tab-content>.active .morePop.morePopHabitaciones .bvalidator_errmsg").length == 0){
				jQuery("div#netactica_booking_form .tab-content>.active .morePop.morePopHabitaciones").css("display","none");
			}	
			else{
				jQuery("div#netactica_booking_form .tab-content>.active .morePop.morePopHabitaciones").css("display","block");
			}
		}
	});
	//----------- VALIDADOR - GENERADOR URL PAQUETES - VUELO + CARRO ---------------
	$('#sbm_netactica_aircar').on('click', function () {

		jQuery("div#netactica_booking_form .tab-content>.active div#aircar #txtNumPassengers").trigger("click");
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			jQuery("div#netactica_booking_form .tab-content>.active .popUpPasajeros.morePop").css("display","none");
			if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
			    bValidatorDataLayer( "netactica_url_motor_airCar", motor_aircar.organizeData() );
			}
			valLocalStorageCiudadAirCarOrigen(jQuery("#CityPredictiveFrom_netactica_aircar").val());
			valLocalStorageCiudadAirCarDestino(jQuery("#CityPredictiveTo_netactica_aircar").val());
			//console.log("Token: /"+token+"/");
			console.log("motor_aircar.organizeData()", Netactica.netactica_url_motor_airCar + (json_settings.ProductAirCar.SearchInCatmandu == true ? '' : '') + motor_aircar.organizeData());
			debugger;
			$(".validateBg").addClass('bg_validate');
			window.open( Netactica.netactica_url_motor_airCar + (json_settings.ProductAirCar.SearchInCatmandu == true ? '' : '') + motor_aircar.organizeData() );
			
			
		}
		else{
			if(jQuery("div#netactica_booking_form .tab-content>.active .popUpPasajeros.morePop .bvalidator_errmsg").length == 0){
				jQuery("div#netactica_booking_form .tab-content>.active .popUpPasajeros.morePop").css("display","none");
			}	
			else{
				jQuery("div#netactica_booking_form .tab-content>.active .popUpPasajeros.morePop").css("display","block");
			}
		}
	});
    //----------- VALIDADOR - GENERADOR URL CARRO  ---------------------------------
	$('#sbm_netactica_car').on('click', function () {
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
			    bValidatorDataLayer( "netactica_url_motor_car", motor_car.organizeData() );
			}
			valLocalStorageCiudadCarDestino(jQuery("#AirportPredictiveFrom_netactica_car").val());
			//console.log("Token: /"+token+"/");
			console.log("motor_car.organizeData()", Netactica.netactica_url_motor_car + motor_car.organizeData());
			debugger;
			$(".validateBg").addClass('bg_validate');
			window.open( Netactica.netactica_url_motor_car + motor_car.organizeData() );
		}
	});
	//----------- VALIDADOR - GENERADOR URL ACTIVIDADES ----------------------------
	$('#sbm_netactica_extras').on('click', function () {
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
			    bValidatorDataLayer( "netactica_url_motor_extras", motor_extras.organizeData() );
			}	
			valLocalStorageCiudadExtrasDestino(jQuery("#CityPredictive_netactica_extras").val());
			console.log("motor_extras.organizeData()", Netactica.netactica_url_motor_extras + (json_settings.ProductExtra.SearchInCatmandu == true ? '' : '?') + motor_extras.organizeData());
			debugger;
			$(".validateBg").addClass('bg_validate');
			window.open( Netactica.netactica_url_motor_extras + (json_settings.ProductExtra.SearchInCatmandu == true ? '' : '?') + motor_extras.organizeData() );
			
		}
	});
	//----------- VALIDADOR - GENERADOR URL TRANSFER ----------------------------
	$('#sbm_netactica_transfer').on('click', function () {
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
				bValidatorDataLayer( "netactica_url_motor_transfer", motor_transfer.organizeData() );
			}	
			valLocalStorageCiudadExtrasDestino(jQuery("#CityPredictive_netactica_transfer").val());
			console.log("motor_transfer.organizeData()", Netactica.netactica_url_motor_transfer + (json_settings.ProductTransfer.SearchInCatmandu == true ? '' : '?') + motor_transfer.organizeData());
			debugger;
			$(".validateBg").addClass('bg_validate');
			window.open( Netactica.netactica_url_motor_transfer + (json_settings.ProductTransfer.SearchInCatmandu == true ? '' : '?') + motor_transfer.organizeData() );
			
		}
	});
	//----------- VALIDADOR - GENERADOR URL MEDICAL ASSISTANCE ----------------------------
	$('#sbm_netactica_medical_assistance ').on('click', function () {
		if ($("#netactica_booking_form").data('bValidator').validate()) {
			if( typeof bValidatorDataLayer !== 'undefined' && jQuery.isFunction( bValidatorDataLayer ) ) {
				bValidatorDataLayer( "netactica_url_motor_medical_assistance ", motor_medical_assistance .organizeData() );
			}	
			valLocalStorageCiudadExtrasDestino(jQuery("#CityPredictive_netactica_medical_assistance ").val());
			console.log("motor_medical_assistance .organizeData()", Netactica.netactica_url_motor_medical_assistance  + (json_settings.ProductMedicalAssistance.SearchInCatmandu == true ? '' : '?') + motor_medical_assistance .organizeData());
			debugger;
			$(".validateBg").addClass('bg_validate');
			window.open( Netactica.netactica_url_motor_medical_assistance  + (json_settings.ProductMedicalAssistance.SearchInCatmandu == true ? '' : '?') + motor_medical_assistance .organizeData() );
			
		}
	});
});

//----------------------------------------------------------------------------------------------------------------
//---------------------------------------GUARDAR BUSQUEDA DEL USUARIO---------------------------------------------
//----------------------------------------------------------------------------------------------------------------

//--------------- busqueda de vuelos -----------------
function valLocalStorageCiudadAirOrigen(e){
	localStorage.setItem("vex_ciudadDeAirOrigen", e)
}
function valLocalStorageCiudadAirDestino(e){
	localStorage.setItem("vex_ciudadDeAirDestino", e)
}
//--------------- busqueda de hoteles -----------------
function valLocalStorageCiudadHotelDestino(e){
	localStorage.setItem("vex_ciudadDeHotelDestino", e)
}
//--------------- busqueda de vuelos+hoteles -----------------
function valLocalStorageCiudadAirHotelOrigen(e){
	localStorage.setItem("vex_ciudadDeAirHotelOrigen", e)
}
function valLocalStorageCiudadAirHotelDestino(e){
	localStorage.setItem("vex_ciudadDeAirHotelDestino", e)
}
//--------------- busqueda de vuelos+carro -----------------
function valLocalStorageCiudadAirCarOrigen(e){
	localStorage.setItem("vex_ciudadDeAirCarOrigen", e)
}
function valLocalStorageCiudadAirCarDestino(e){
	localStorage.setItem("vex_ciudadDeAirCarDestino", e)
}
//--------------- busqueda de carro -----------------
function valLocalStorageCiudadCarDestino(e){
	localStorage.setItem("vex_ciudadDeCarDestino", e)
}
//--------------- busqueda de extras -----------------
function valLocalStorageCiudadExtrasDestino(e){
	localStorage.setItem("vex_ciudadDeExtrasDestino", e)
}

//-------------------------------------------------------------------------------------------------
//------------------------------QUITAR ERRORES DE QUE SE QUEDAN FIJOS-------------------------------
//-------------------------------------------------------------------------------------------------


jQuery(".ui-autocomplete-input").keyup(function(){
	jQuery("")
	//console.log(".ui-autocomplete-input keyup")
	var error = jQuery(this).siblings(".bVErrMsgContainer").length
	if(error == 1){
		jQuery(this).siblings(".bVErrMsgContainer").remove()
		jQuery(this).removeClass("bvalidator_invalid")
	}
	
})
jQuery(".ui-autocomplete-input").change(function(){
		var elemento = jQuery(this);
		var error = jQuery(elemento).siblings(".bVErrMsgContainer").length
		//console.log(".ui-autocomplete-input change", error)
		if(error == 1 && jQuery(elemento).val() != ""){
			setTimeout(function(){
				jQuery(elemento).siblings(".bVErrMsgContainer").remove()
				jQuery(elemento).removeClass("bvalidator_invalid")
			},1)
		}
		
})

$('input[name=TripType_netactica_air]').click(function(){
	$("#netactica_booking_form").bValidator().reset();

});
function removerErrorNumPassenger(numPass){
	if(numPass <= 32){
		$('#txtNumPassengers, #txtNumPassengersMD, #txtNumPassengersHoteles, #txtNumPassengersPaquetes').siblings(".bVErrMsgContainer").remove()
		$('#txtNumPassengers, #txtNumPassengersMD, #txtNumPassengersHoteles, #txtNumPassengersPaquetes').removeClass("bvalidator_invalid")
	}
	else{
		$('.morePop').data('bValidator').validate()
	}
}






function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
}
function loadJsCssFile(filename, filetype) {
	if (filetype == "js") { //if filename is a external JavaScript file
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", filename);
	}
	else if (filetype == "css") { //if filename is an external CSS file
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}

	if (typeof fileref != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
}
function onlyNumbers(evt) {
	var isNav = (navigator.appName.indexOf("Netscape") != -1)
	var isIE = (navigator.appName.indexOf("Microsoft") != -1)

	if (isNav) {
		var key = evt.which;
	}
	else if (isIE) {
		var key = evt.keyCode;
	}

	return (key >= 48 && key <= 57);
}
function setDates(senderid) {
	var checkin = $('input[id$="DateFrom_netactica_hotel"]');
	var checkout = $('input[id$="DateTo_netactica_hotel"]');
	var nights = $('input[id$="Nights_netactica_hotel"]');

	if (checkin.val() != '' && nights.val() != '' && checkout.val() != '') {
		if (senderid == checkin.attr("id")) {
			setNights(checkin.val(), checkout.val(), nights);
		}

		if (senderid == checkout.attr("id")) {
			setNights(checkin.val(), checkout.val(), nights);
		}

		if (senderid == nights.attr("id")) {
			setCheckout(checkin.val(), nights.val(), checkout);
		}
	} else if (checkin.val() != '' && nights.val() != '') {
		setCheckout(checkin.val(), nights.val(), checkout);
	} else if (checkin.val() != '' && checkout.val() != '') {
		setNights(checkin.val(), checkout.val(), nights);
	} else if (checkout.val() != '' && nights.val() != '') {
		var checkoutdate = convertDate(checkout.val());
		checkoutdate.setTime(checkoutdate.getTime() - (parseInt(nights.val(), 10) * 86400000));
		var checkinstr = checkoutdate.getDate() + '-' + (checkoutdate.getMonth() + 1) + '-' + checkoutdate.getFullYear();

		$(checkin).val(checkinstr);
	}
}
function setNights(checkinstr, checkoutstr, nights) {
	var checkindate = convertDate(checkinstr);
	var checkoutdate = convertDate(checkoutstr);
	var days = Math.round((checkoutdate - checkindate) / 86400000);

	$(nights).val((days > 0) ? days : '');
}
function validateRangeDays() {
	night = $('#Nights_netactica_hotel')[0];
	if ((parseInt(night.value) < 1) || (parseInt(night.value) > 30)) {
		night.value = 1;
		setDates(night.id);
	}
}
function addDays(myDate, days) {
	var today = new Date();

	if (myDate != null)
		return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000);

	return new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
}
function setCheckout(checkinstr, nightsstr, checkout) {
	var checkindate = convertDate(checkinstr);
	checkindate.setTime(parseInt(checkindate.getTime()) + (parseInt(nightsstr) * 86400000));
	var checkoutstr = checkindate.getDate() + '-' + (checkindate.getMonth() + 1) + '-' + checkindate.getFullYear();

	$(checkout).val(checkoutstr);
}
function convertDate(stringdate) {
	// Internet Explorer does not like dashes in dates when converting,
	// so lets use a regular expression to get the year, month, and day
	var DateRegex = /([^-]*)-([^-]*)-([^-]*)/;
	var DateRegexResult = stringdate.match(DateRegex);
	var DateResult;

	try {
		// try creating a new date in a format that both Firefox and Internet Explorer understand
		DateResult = new Date(DateRegexResult[3] + "/" + DateRegexResult[2] + "/" + DateRegexResult[1]);
	}
	catch (err) {
		// if there is an error, catch it and try to set the date result using a simple conversion
		DateResult = new Date(stringdate);
	}

	return DateResult;
}
function addDays(myDate, days) {
	var today = new Date();

	if (myDate != null)
		return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000);

	return new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
}
function getbvalidatorDate(days) {
	return formatDate(addDays(new Date(), days),
		$.datepicker._defaults.dateFormat.replace("mm", "MM").replace("yy", "yyyy"));
}
function setNumPassenger() {
	//------- vuelos
	var numAdults = $('#NumberOfAdults_netactica_air').val();
	var numChilds = $('#NumberOfChildren_netactica_air').val();
	var numInfants = $('#NumberOfInfants_netactica_air').val();
	var numPass = parseInt(numAdults) + parseInt(numChilds) + parseInt(numInfants);

	$("#textNumberOfAdults_netactica_air").text($('#NumberOfAdults_netactica_air').val())
	$("#textNumberOfChildren_netactica_air").text($('#NumberOfChildren_netactica_air').val())
	$("#textNumberOfInfants_netactica_air").text($('#NumberOfInfants_netactica_air').val())


	//----cabina de pasajeros en ida y regreso, solo ida
	var cabinTypePasseger = $("#CabinType_netactica_air").val();
	cabinTypePasseger = cabinTypePasseger != "" ? jQuery('#CabinType_netactica_air option[value*="'+cabinTypePasseger+'"]').text() : jQuery('#CabinType_netactica_air option:nth-child(1)').text();
	//----cabina de pasajeros en multidestino
	var cabinTypePassegerMD = $("#CabinType_netactica_airMulti").val();
	cabinTypePassegerMD = cabinTypePassegerMD != "" ? jQuery('#CabinType_netactica_airMulti option[value*="'+cabinTypePassegerMD+'"]').text() : jQuery('#CabinType_netactica_airMulti option:nth-child(1)').text();
	
	
	//input para validar la candidad de pasajeros
	$('#txtNumPassengers').val(numPass);
	if(numPass == 1){
		$("#txtNumPassengersComplete").html(`${numPass} persona, ${cabinTypePasseger}`)
		$("#txtNumPassengersCompleteMD").html(`${numPass} persona, ${cabinTypePassegerMD}`)
	}
	else{
		$("#txtNumPassengersComplete").html(`${numPass} personas, ${cabinTypePasseger}`)
		$("#txtNumPassengersCompleteMD").html(`${numPass} personas, ${cabinTypePassegerMD}`)
	}

	//valida si la cantidad de aldultos es mayor a los infantes y quita la alerta
	if(parseInt(numAdults) >= parseInt(numInfants)){
		$('#NumberOfInfants_netactica_air').siblings(".bVErrMsgContainer").remove();
		$('#NumberOfInfants_netactica_air').removeClass("bvalidator_invalid")

	}


	removerErrorNumPassenger(numPass);
	//---------vuelos + carro
	var numAdults1 = $('#NumberOfAdults_netactica_aircar').val();
	var numChilds1 = $('#NumberOfChildren_netactica_aircar').val();
	var numInfants1 = $('#NumberOfInfants_netactica_aircar').val();
	var numPass1 = parseInt(numAdults1) + parseInt(numChilds1) + parseInt(numInfants1);




	$("#textNumberOfAdults_netactica_aircar").text($('#NumberOfAdults_netactica_aircar').val())
	$("#textNumberOfChildren_netactica_aircar").text($('#NumberOfChildren_netactica_aircar').val())
	$("#textNumberOfInfants_netactica_aircar").text($('#NumberOfInfants_netactica_aircar').val())

	//----cabina de pasajeros en ida y regreso, solo ida
	var cabinTypePassegerAirCar = $("#CabinType_netactica_aircar").val();
	cabinTypePassegerAirCar = cabinTypePassegerAirCar != "" ? jQuery('#CabinType_netactica_aircar option[value*="'+cabinTypePassegerAirCar+'"]').text() : jQuery('#CabinType_netactica_aircar option:nth-child(1)').text();

	//input para validar la candidad de pasajeros
	$('#aircar #txtNumPassengers').val(numPass1);

	if(numPass1 == 1){
		$("#txtNumPassengersAirCarComplete").html(`${numPass1} persona, ${cabinTypePassegerAirCar}`)
	}
	else{
		$("#txtNumPassengersAirCarComplete").html(`${numPass1} personas, ${cabinTypePassegerAirCar}`)
	}

	//valida si la cantidad de aldultos es mayor a los infantes y quita la alerta
	if(parseInt(numAdults1) >= parseInt(numInfants1)){
		$('#NumberOfInfants_netactica_aircar').siblings(".bVErrMsgContainer").remove();
		$('#NumberOfInfants_netactica_aircar').removeClass("bvalidator_invalid")

	}


	removerErrorNumPassenger(numPass1);

	
}
function setHotelNumPassenger() {
	var sumaPajaseros = 0;
	$.each($("[data-adultos='adultos']"), function (index, el) {
		if ($(this).parent().parent().parent().parent().css('display') != 'none') {
			sumaPajaseros += parseInt($(el).val());
		}
	});

	$('#txtNumPassengersHoteles').val(sumaPajaseros);
	removerErrorNumPassenger(sumaPajaseros);

}
function setAirHotelNumPassenger() {
	var numPass = 0;
	$.each($("[data-adultos='adultosPaquetes']"), function (index, el) {
		if ($(this).parent().parent().parent().parent().css('display') != 'none') {
			numPass += parseInt($(el).val());
		}
	});

	$('#txtNumPassengersPaquetes').val(numPass);
	removerErrorNumPassenger(numPass);
}
function valNumberInfants(v, ddlAdlId) {
	var numAdl = parseInt($('#' + ddlAdlId).val());
	return (numAdl >= parseInt(v));
}
function validateAirMaxPassenger(v, txtNumPassId) {
	var numPass = parseInt($('#' + txtNumPassId).val());
	//console.log("Hola " + numPass);
	return (numPass <= 9);
}
function validateHotelMaxPassenger(v, txtNumPassId) {
	var numPass = parseInt($('#' + txtNumPassId).val())
	return (numPass <= 32);
}
function validateAirHotelMaxPassenger(v, txtNumPassId) {
	//console.log("Hola validateAirHotelMaxPassenger");
	var numPass = parseInt($('#' + txtNumPassId).val())
	return (numPass <= 9);
}
function validateMaxHotelDateTo(v, dateFromId, format) {
	var format = format.replace(/\//g, '-');
	if (format.length == 8)
		format = format.charAt(0) + format.substring(0, 3) + format.charAt(2) + format.substring(3, 8);

	var checkinstr = $('#' + dateFromId).val();
	var checkoutstr = v;

	if ((checkinstr != "") && (checkoutstr != "")) {
		var checkindate = GetFormatedDate(checkinstr, format);
		var checkoutdate = GetFormatedDate(checkoutstr, format);

		var days = (checkoutdate - checkindate) / 86400000;

		return !(parseInt(days) > 30);
	} else {
		return true;
	}
}
function validateMaxAirHotelDateTo(v, dateFromId, format) {
	var format = format.replace(/\//g, '-');
	if (format.length == 8)
		format = format.charAt(0) + format.substring(0, 3) + format.charAt(2) + format.substring(3, 8);

	var checkinstr = $('#' + dateFromId).val();
	var checkoutstr = v;

	if ((checkinstr != "") && (checkoutstr != "")) {
		var checkindate = GetFormatedDate(checkinstr, format);
		var checkoutdate = GetFormatedDate(checkoutstr, format);

		var days = (checkoutdate - checkindate) / 86400000;

		return !(parseInt(days) > 30);
	} else {
		return true;
	}
}
function getCodeAutocomplete(v) {
	return v.substr(v.indexOf('(') + 1).replace(")", "");
}
function getNameAutocomplete(v) {
	return v.substr(0, v.indexOf('('))
}
function GetFormatedDate(dateValue, format) {
	var date;
	var replaced = dateValue.replace(/-/g, '/');
	var parts = replaced.split('/');
	if (format.substring(0, 2) == 'dd' && format.substring(3, 5) == 'MM') {
		date = new Date(parts[2], parts[1] - 1, parts[0]);
	}
	else if (format.substring(0, 2) == 'MM' && format.substring(3, 5) == 'dd') {
		date = new Date(parts[2], parts[0] - 1, parts[1]);
	}
	return date;
}
function formatDate(date, format) {
	format = format + "";
	var result = "";
	var i_format = 0;
	var c = "";
	var token = "";
	var y = date.getYear() + "";
	var M = date.getMonth() + 1;
	var d = date.getDate();
	var E = date.getDay();
	var H = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
	// Convert real date parts into formatted versions
	var value = new Object();

	if (y.length < 4) {
		y = "" + (y - 0 + 1900);
	}

	value["y"] = "" + y;
	value["yyyy"] = y;
	value["yy"] = y.substring(2, 4);
	value["M"] = M;
	value["MM"] = LZ(M);
	value["MMM"] = MONTH_NAMES[M - 1];
	value["NNN"] = MONTH_NAMES[M + 11];
	value["d"] = d;
	value["dd"] = LZ(d);
	value["E"] = DAY_NAMES[E + 7];
	value["EE"] = DAY_NAMES[E];
	value["H"] = H;
	value["HH"] = LZ(H);

	if (H == 0) {
		value["h"] = 12;
	}
	else if (H > 12) {
		value["h"] = H - 12;
	}
	else {
		value["h"] = H;
	}

	value["hh"] = LZ(value["h"]);

	if (H > 11) {
		value["K"] = H - 12;
	}
	else {
		value["K"] = H;
	}

	value["k"] = H + 1;
	value["KK"] = LZ(value["K"]);
	value["kk"] = LZ(value["k"]);

	if (H > 11) {
		value["a"] = "PM";
	}
	else {
		value["a"] = "AM";
	}

	value["m"] = m;
	value["mm"] = LZ(m);
	value["s"] = s;
	value["ss"] = LZ(s);

	while (i_format < format.length) {
		c = format.charAt(i_format);
		token = "";

		while ((format.charAt(i_format) == c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}

		if (value[token] != null) {
			result = result + value[token];
		}
		else {
			result = result + token;
		}
	}

	return result;
}
function LZ(x) {
	return (x < 0 || x > 9 ? "" : "0") + x
}
function edadUpdateChilds(edad){
	if(edad == 0){
		return "Hasta 1 año";
	}
	else if(edad == 1){
		return "1 año"
	}
	else{
		return edad+" años"
	}
} 
var MONTH_NAMES = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic');
var DAY_NAMES = new Array('Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab');


