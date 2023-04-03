/* Inicialización en español para la extensión 'UI date picker' para jQuery. */
/* Traducido por Vester (xvester@gmail.com). */
jQuery(function($){
    $.datepicker.regional['es'] = {
        currentText: 'Ahora',
        closeText: 'Aceptar',
		prevText: '&#x3c;Ant',
		nextText: 'Sig&#x3e;',
		currentText: 'Hoy',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
		weekHeader: 'Sm',
		dateFormat: 'dd-mm-yy',
        shortDateFormat: 'dd-MM',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
    };

    $.timepicker.regional['es'] = {
        currentText: 'Ahora',
        closeText: 'Listo',
        timeOnlyTitle: 'Horario',
        timeText: 'Hora',
        hourText: 'Hora',
        minuteText: 'Minuto',
        secondText: 'Segundo',
        millisecText: 'Milisegundo',
        microsecText: 'Microsegundo',
        timezoneText: 'Zona Horaria',
    };

    $.timepicker.setDefaults($.timepicker.regional['es']);
	$.datepicker.setDefaults($.datepicker.regional['es']);
});



