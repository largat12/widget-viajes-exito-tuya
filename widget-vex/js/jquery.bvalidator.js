﻿/*
 * jQuery bValidator plugin
 *
 * http://code.google.com/p/bvalidator/
 *
 * Copyright (c) 2011 Bojan Mauser
 *
 * $Id: jquery.bvalidator.js 38 2011-01-14 00:48:14Z bmauser $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Ultima modificación: Diego Mantelli - Netactica 25/11/2015
 *
 * Change Log:
 * 25/11/2015: Se cambiaron los estilos para que sean similares a CATMANDU. Hace scroll vertical el primer mensaje de error encontrado. Funcionando 100% en NFF.
 * 20/02/2015: Permite validar un autocomplete cuando no se le setea el atributo "required". Si esta vacio no valida nada. Si tiene contenido valida el autocomplete.
 * 17/11/2014: Se modificó la lógica en como recibe parametros una función. Antes era con un solo corchete. Ahora es con doble corchete
 * ----------- Ejemplo: Antes: min[2] | Ahora: min[[2]] 
 *
 */

(function ($) {
	
	// constructor
    $.fn.bValidator = function (overrideOptions) {
		return new bValidator(this, overrideOptions);
	};
	
	// bValidator class
    bValidator = function (mainElement, overrideOptions) {
		
        // default options
        var options = {
			
            singleError: false,		// validate all inputs at once
            offset: { x: 0, y: -3 },	// offset position for error message tooltip
            position: { x: 'left', y: 'bottom' }, // error message placement x:left|center|right  y:top|center|bottom
            template: '<div class="{errMsgClass}">{message}</div>', // template for error message
            showCloseIcon: true,	// put close icon on error message
			
            showErrMsgSpeed: 'normal',	// message's fade-in speed 'fast', 'normal', 'slow' or number of miliseconds
            scrollToError: true,	// scroll to first error
            // css class names
            closeIconClass: 'bvalidator_close_icon',	// close error message icon class
            errMsgClass: 'bvalidator_errmsg',	// error message class
            errorClass: 'bvalidator_invalid',	// input field class name in case of validation error
            validClass: '',			// input field class name in case of valid value
			
            lang: 'en', 				// default language for error messages 
            errorMessageAttr: 'data-bvalidator-msg',// name of the attribute for overridden error message
            validateActionsAttr: 'data-bvalidator', // name of the attribute which stores info what validation actions to do
            paramsDelimiter: ':',		// delimiter for validator options inside []
            validatorsDelimiter: ',',		// delimiter for validators
			
            // when to validate
            validateOn: null,		// null, 'change', 'blur', 'keyup'
            errorValidateOn: 'change',		// null, 'change', 'blur', 'keyup'
			
            // callback functions
            onBeforeValidate: null,
            onAfterValidate: null,
            onValidateFail: null,
            onValidateSuccess: null,
            onAfterAllValidations: null,
			// default error messages
			errorMessages: {
				en: {
                    'default': 'Please correct this value.',
                    'equalto': 'Please enter the same value again.',
                    'differs': 'Please enter a different value.',
                    'equallength': 'The length must be equal to {0} characters',
                    'minlength': 'The length must be at least {0} characters',
                    'maxlength': 'The length must be at max {0} characters',
					'rangelength': 'The length must be between {0} and {1}',
					'betweenintnull': 'The range must be between {0} and {1}',
                    'min': 'Please enter a number greater than or equal to {0}.',
                    'max': 'Please enter a number less than or equal to {0}.',
                    'between': 'Please enter a number between {0} and {1}.',
                    'required': 'This field is required.',
                    'alpha': 'Please enter alphabetic characters only.',
                    'alphanum': 'Please enter alphanumeric characters only.',
                    'digit': 'Please enter only digits.',
                    'number': 'Please enter a valid number.',
                    'email': 'Please enter a valid email address.',
                    'image': 'This field should only contain image types',
                    'url': 'Please enter a valid URL.',
                    'ip4': 'Please enter a valid IP address.',
                    'date': 'Please enter a valid date in format {0}.',
                    'mindate': 'Please enter a date greater than or equal to {0}.',
                    'mindatefield': 'Please enter a date greater than or equal to field.',
                    'mindatefield2': 'Please enter a date greater than to field',
                    'maxdate': 'Please enter a date less than or equal to {0}.',
                    'maxdatefield': 'Please enter a date less than or equal to field.',
                    'autocomplete': 'Please correct value.'
				}
			},
			
			// regular expressions used by validator methods
			regex: {
                alpha: /^[a-z ._-]+$/i,
				alphanum: /^[a-z0-9 ._-]+$/i,
                digit: /^\d+$/,
                number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
                email: /^([a-zA-Z0-9_\.\-\+%])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                image: /\.(jpg|jpeg|png|gif|bmp)$/i,
                url: /^(http|https|ftp)\:\/\/[a-z0-9\-\.]+\.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*$/i,
                address: /^([\w\s]{1,100}\,\s[0-9]{1,10}\,\s[\w\s]{1,100}\,\s[\w\s]{1,100}\,\s[\w\s]{1,100})$/,
				autocomplete: /.*\(.*\)$/i
			}
		};
		
		// validator instance
        var instance = this, scroll_to;
		
		// global options
        if (window['bValidatorOptions']) {
			$.extend(true, options, window['bValidatorOptions']);
		}
		
		// passed options
        if (overrideOptions)
			$.extend(true, options, overrideOptions);
		
		// return existing instance
        if (mainElement.data("bValidator"))
			return mainElement.data("bValidator");
		
		mainElement.data("bValidator", this);
		
		// if selector is a form
		if (mainElement.is('form')) {
			// bind validation on form submit
            mainElement.bind('submit.bV', function (event) {
                if (instance.validate())
					return true;
                else {
					event.stopImmediatePropagation();
					return false;
				}
			});
			
			// bind reset on form reset
            mainElement.bind("reset.bV", function () {
				instance.reset();			
			});
		}
		
		// returns all inputs
        var _getElementsForValidation = function (element) {
		
            if (element.is(':input'))
				var elements = element;
            else {
				//skip hidden and input fields witch we do not want to validate
                var elements = element.find(':input').not(":button, :image, :reset, :submit, :hidden, :disabled");

                //agrego los hiddens que tengan el atributo de bValidator
                $.each($("[type=hidden][data-bvalidator]", element), function (index, elem) {

                    if($(elem).parent().is(":visible")){
                        elements.push(elem);
                    }

                });
			}
			return elements;
		}
		
		// binds validateOn event
        var _bindValidateOn = function (elements) {
            elements.bind(options.validateOn + '.bV', { 'bValidatorInstance': instance }, function (event) {
				event.data.bValidatorInstance.validate(false, $(this));
			});
		}
		
		// displays error message
        var _showErrMsg = function (element, messages) {
			
			// if error msg already exists remove it from DOM
			_removeErrMsg(element);
			
            msg_container = $('<div class="bVErrMsgContainer"></div>').css('position', 'absolute');
			element.data("errMsg.bV", msg_container);
			msg_container.insertAfter(element);
			
			var messagesHtml = '';
			
            for (var i in messages) {
                messagesHtml = '<span title="' + messages[0] + '">' + messages[0] + '</span>\n';
			}
			
            if (options.showCloseIcon) {
                var closeiconTpl = '<div style="display:flex"><div class="close-message"><div class="' + options.closeIconClass + '" onclick="$(this).closest(\'.' + options.errMsgClass + '\').css(\'visibility\', \'hidden\');"><span class="icon-alerta"></span></div></div><div class="message">{message}</div></div>';
				messagesHtml = closeiconTpl.replace('{message}', messagesHtml);
			}
			
			var template = options.template.replace('{errMsgClass}', options.errMsgClass).replace('{message}', messagesHtml);
			
			var errmsg = $(template);
			errmsg.appendTo(msg_container);
			
			var pos = _getErrMsgPosition(element, errmsg);
			
			errmsg.css({ visibility: 'visible', position: 'absolute', top: pos.top, left: pos.left }).fadeIn(options.showErrMsgSpeed);

			if (options.scrollToError) {
			    // get most top tolltip
			    var tot = errmsg.offset().top - 70;
			    if (scroll_to === null || tot < scroll_to)
			        scroll_to = tot;
			}

		}
		
		// removes error message from DOM
        var _removeErrMsg = function (element) {
			var existingMsg = element.data("errMsg.bV")
            if (existingMsg) {
				existingMsg.remove();
			}
		}
		
		// calculates error message position
        var _getErrMsgPosition = function (input, tooltip) {
		        
		    var tooltipContainer = input.data("errMsg.bV");

		    var top, left;

            //si se valida un elemento oculto, se obtienen las medidas de su contenedor.
		    if ($(input).is(":hidden")) {
		        
		        top = -((tooltipContainer.offset().top - input.parent().offset().top) + tooltip.outerHeight() + options.offset.y) / 2;
		        left = (input.offset().left + input.parent().outerWidth()) + options.offset.x;

		    } else {

		        top = -((tooltipContainer.offset().top - input.offset().top) + tooltip.outerHeight() - options.offset.y);
		        left = (input.offset().left + input.outerWidth()) - tooltipContainer.offset().left + options.offset.x;

		    }

		    
			
			var x = options.position.x;
			var y = options.position.y;
			
			// adjust Y
            if (y == 'center' || y == 'bottom') {
				var height = tooltip.outerHeight() + input.outerHeight();
                if (y == 'center') { top += height / 2; }
                if (y == 'bottom') { top += height; }
			}
			
			// adjust X
            if (x == 'center' || x == 'left') {
				var width = input.outerWidth();
                if (x == 'center') { left -= width / 2; }
                if (x == 'left') { left -= width; }
			}

			return { top: top, left: left };
		}
		
		// calls callback functions
        var _callBack = function (type, param1, param2, param3) {
            if ($.isFunction(options[type])) {
		        	return options[type](param1, param2, param3);
		        }
		}
		
		// gets element value	
        var _getValue = function (element) {
			
			var ret = {};
	
			// checkbox
            if (element.is('input:checkbox')) {
                if (element.attr('name'))
					ret['selectedInGroup'] = $('input:checkbox[name=' + element.attr('name') + ']:checked').length;
                ret['value'] = element.is(":checked");
			}
            else if (element.is('input:radio')) {
                if (element.attr('name'))
					ret['value'] = $('input:radio[name=' + element.attr('name') + ']:checked').length;
				else
					ret['value'] = element.val();
			}
            else if (element.is('select')) {
                ret['selectedInGroup'] = $("option:selected", element).length;
				ret['value'] = element.val();
			}
            else if (element.is(':input')) {
				ret['value'] = element.val();
			}
			
			return ret;
		}
	
		// object with validator functions
		var validator = {
		
            equalto: function (v, elementId) {
				return v.value == $('#' + elementId).val();
			},
			
            differs: function (v, elementId) {
				return v.value != $('#' + elementId).val();
            },

            equallength: function (v, equallength) {
                return (v.value.length == equallength);
            },
			
            minlength: function (v, minlength) {
                return (v.value.length >= minlength);
			},
			
            maxlength: function (v, maxlength) {
                return (v.value.length <= maxlength);
			},
			
            rangelength: function (v, minlength, maxlength) {
                return (v.value.length >= minlength && v.value.length <= maxlength);
			},

			betweenintnull: function (v, min, max) {
				if (!v.value || !$.trim(v.value))
					return true;

				if (!this.regex(v, options.regex.number)) {
					return false;
                }

				return (v.value >= parseInt(min) && v.value <= parseInt(max));
			},

            min: function (v, min) {
                if (v.selectedInGroup)
                    return v.selectedInGroup >= min;
                else {

				    if (typeof (min) == "string")
				        min = eval(min);

				    if (!this.number(v))
					    return false;

                    return (parseFloat(v.value) >= parseFloat(min));
				}
			},
			
            max: function (v, max) {
                if (v.selectedInGroup)
                    return v.selectedInGroup <= max;
                else {
                    if (!this.number(v))
			 			return false;
                    return (parseFloat(v.value) <= parseFloat(min));
				}
			},
			
            between: function (v, min, max) {
                if (!this.number(v))
			 		return false;
				var va = parseFloat(v.value);
                return (va >= parseFloat(min) && va <= parseFloat(max));
			},
			
            required: function (v) {
                if (!v.value || !$.trim(v.value))
                    return false;
                return true;
			},
			

            alpha: function (v) {
				return this.regex(v, options.regex.alpha);
			},

            autocomplete: function (v, type, checkEmpty) {
                
                if (checkEmpty == "false" && checkEmpty != undefined)
                    return true;

				if (type === 'neighborhood') {
					//Airports
					if (($.inArray(v.value, external_file_Airports) >= 0) ||
						($.inArray(v.value + "|E", external_file_Airports) >= 0)) {
						return true;
					}

					//Cities
					if (($.inArray(v.value, external_file_AllCities) >= 0) ||
						($.inArray(v.value + "|E", external_file_AllCities) >= 0)) {
						return true;
					}

					//Neighborhood
					var foundNeighborhood = Enumerable.from(external_file_Neighborhood).firstOrDefault(function (n) { return n.Desc === v.value });
					if (foundNeighborhood) {
						return true;
					}

					return false;
                }

			    if (this.regex(v, options.regex.autocomplete)) {
					//console.log(type)
					switch (type) {
			            case 'city':
                            if (($.inArray(v.value, external_file_Cities) >= 0) ||
                                ($.inArray(v.value + "|E", external_file_Cities) >= 0))
			                return true;
                            break;
                        case 'airportscities':
                            var arr = external_file_AirportsCities;
                            arr.forEach(function (part, index) {
                                if (arr[index].substring(arr[index].indexOf('(') + 1, arr[index].indexOf(')') + 1).indexOf('-') < 0) {
                                    arr[index] = arr[index].substring(arr[index].indexOf("|") + 1, arr[index].length);
                                }
                                else {
                                    arr[index] = arr[index].substring(arr[index].indexOf("|") + 1, arr[index].length);
                                    arr[index] = arr[index].substring(0, arr[index].indexOf("(") + 1) + arr[index].substring(arr[index].indexOf("-") + 1, arr[index].length);
                                }
                            });
							
							//console.log(v.value, external_file_AirportsCities.includes(v.value) )
							//console.log($.inArray(v.value, external_file_AirportsCities));
                            if (($.inArray(v.value, arr) >= 0) ||
                                ($.inArray(v.value+ "|E", arr) >= 0))
                                return true;
                            break;
			            case 'country':
                            if (($.inArray(v.value, external_file_Countries) >= 0) ||
                                ($.inArray(v.value + "|E", external_file_Countries) >= 0))
			                    return true;
			                break;
			            case 'airport':
                            if (($.inArray(v.value, external_file_Airports) >= 0) ||
                                ($.inArray(v.value + "|E", external_file_Airports) >= 0))
			                    return true;
			                break;
			            case 'airline':
                            if (($.inArray(v.value, external_file_Airlines) >= 0) ||
                                ($.inArray(v.value + "|E", external_file_Airlines) >= 0))
                                return true;
                            break;
                        case 'busTerminal':
                            if (($.inArray(v.value, external_file_BusTerminals) >= 0) ||
                                ($.inArray(v.value + "|E", external_file_BusTerminals) >= 0))
                                return true;
                            break;
                        case 'busCompanie':
                            if (($.inArray(v.value, external_file_BusCompanies) >= 0) ||
                                ($.inArray(v.value + "|E", external_file_BusCompanies) >= 0))
			                    return true;
			                break;
			            default:
			                return true;
			        }
                } else if (type == 'expedia') {
                    if (external_file_expedia_cities.filter(function (item) { return item.label == v.value }).length >= 0)
                        return true;
			    }

			    return false;
			},
			
            alphanum: function (v) {
				return this.regex(v, options.regex.alphanum);
			},
			
            digit: function (v) {
				return this.regex(v, options.regex.digit);
			},
			
            number: function (v) {
				return this.regex(v, options.regex.number);
			},
			
            email: function (v, checkEmpty) {
                if (checkEmpty == "false" && checkEmpty != undefined)
                    return true;

				return this.regex(v, options.regex.email);
			},
			
            image: function (v) {
				return this.regex(v, options.regex.image);
			},
			
            url: function (v, checkEmpty) {
                if (checkEmpty == "false" && checkEmpty != undefined)
                    return true;

				return this.regex(v, options.regex.url);
			},
			
            regex: function (v, regex, mod) {
                if (typeof regex === "string")
					regex = new RegExp(regex, mod);
				
				return regex.test(v.value);
			},
			
            ip4: function (v) {
				var r = /^(([01]?\d\d?|2[0-4]\d|25[0-5])\.){3}([01]?\d\d?|25[0-5]|2[0-4]\d)$/;
				if (!r.test(v.value) || v.value == "0.0.0.0" || v.value == "255.255.255.255")
                    return false;
				return true;
			},
			
            date: function (v, format) { // format can be any combination of mm,dd,yyyy with separator between. Example: 'mm.dd.yyyy' or 'yyyy-mm-dd'
                if (v.value.length == 0) return true;

                if (v.value.length == 10 && format.length == 10) {
					var s = format.match(/[^mdy]+/g);
                    if (s.length == 2 && s[0].length == 1 && s[0] == s[1]) {
						
						var d = v.value.split(s[0]);
						var f = format.split(s[0]);
						
                        for (var i = 0; i < 3; i++) {
                            if (f[i] == 'dd') var day = d[i];
                            else if (f[i] == 'mm') var month = d[i];
                            else if (f[i] == 'yyyy') var year = d[i];
						}
						
                        var dobj = new Date(year, month - 1, day);
                        if ((dobj.getMonth() + 1 != month) || (dobj.getDate() != day) || (dobj.getFullYear() != year))
                            return false;
						
                        return true;
					}
				}
				return false;
			},
			
            mindate: function (v, min, format) {
                if (v.value == "" || min == "" || format == "")
                    return true;

                return (GetFormatedDate(v.value, format) >= GetFormatedDate(min, format));
            },

            mindatefield: function (v, elementId, format) {
                if (v.value == "" || $('#' + elementId).val() == "" || format == "")
                    return true;

                return (GetFormatedDate(v.value, format) >= GetFormatedDate($('#' + elementId).val(), format));
            },

            mindatefield2: function (v, elementId, format) {
                if (v.value == "" || $('#' + elementId).val() == "" || format == "")
                    return true;

                return (GetFormatedDate(v.value, format) > GetFormatedDate($('#' + elementId).val(), format));
            },

            maxdate: function (v, max, format) {
                if (v.value == "" || max == "" || format == "")
                    return true;

                return (GetFormatedDate(v.value, format) <= GetFormatedDate(max, format));
            },

            maxdatefield: function (v, elementId, format) {
                if (v.value == "" || $('#' + elementId).val() == "" || format == "")
                    return true;

                return (GetFormatedDate(v.value, format) >= GetFormatedDate($('#' + elementId).val(), format));
            },

            extension: function () {
				var v = arguments[0];
				var r = '';
                if (!arguments[1])
					return false
                for (var i = 1; i < arguments.length; i++) {
					r += arguments[i];
                    if (i != arguments.length - 1)
						r += '|';
				}
                return this.regex(v, '\\.(' + r + ')$', 'i');
			}
		};
		
		// bind validateOn event
        if (options.validateOn)
			_bindValidateOn(_getElementsForValidation(mainElement));
		
		
		// API functinon:
		
		
		// validation function
        this.validate = function (doNotshowMessages, elementsOverride) {
            // return value, elements to validate
            var ret = true, elementsl;

            if (elementsOverride)
				var elementsl = elementsOverride;
			else
				var elementsl = _getElementsForValidation(mainElement);
			
            scroll_to = null;

			var validationMethod = function () {
				// value of validateActionsAttr input attribute
				var actionsStr = $.trim($(this).attr(options.validateActionsAttr));
				var is_valid = 0;

				if (!actionsStr)
					return true;

				// get all validation actions
				var actions = actionsStr.split(options.validatorsDelimiter);

				// value of input field for validation
				var inputValue = _getValue($(this));

				// if value is not required and is empty
				if (jQuery.inArray('required', actions) == -1 && actions.some(function (elem) { return elem.indexOf("autocomplete") != -1 }) && !validator.required(inputValue)) {
					is_valid = 1;
				}

				var errorMessages = [];

				if (!is_valid) {

					// get error messsage from attribute
					var errMsg = $(this).attr(options.errorMessageAttr);

					var skip_messages = 0;

					// for each validation action
					for (var i in actions) {

						actions[i] = $.trim(actions[i]);

						if (!actions[i])
							continue;

						if (_callBack('onBeforeValidate', $(this), actions[i]) === false)
							continue;

						// check if we have some parameters for validator
						var validatorParams = actions[i].match(/^(.*?)\[\[(.*?)]]/);

						if (validatorParams && validatorParams.length == 3) {
							var validatorName = $.trim(validatorParams[1]);
							validatorParams = validatorParams[2].split(options.paramsDelimiter);
						}
						else {
							validatorParams = [];
							var validatorName = actions[i];
						}

						// if validator exists
						if (typeof validator[validatorName] == 'function') {
							validatorParams.unshift(inputValue); // add input value to beginning of validatorParams
							var validationResult = validator[validatorName].apply(validator, validatorParams); // call validator function
						}
						// call custom user dafined function
						else if (typeof window[validatorName] == 'function') {
							validatorParams.unshift(inputValue.value);
							var validationResult = window[validatorName].apply(validator, validatorParams);
						}

						if (_callBack('onAfterValidate', $(this), actions[i], validationResult) === false)
							continue;

						if (!validationResult) {

							if (!doNotshowMessages) {

								if (!skip_messages) {

									var customMsg = $(this).attr(options.errorMessageAttr + "-" + validatorName);

									if (customMsg != null)
										errMsg = customMsg;

									if (!errMsg) {

										if (options.errorMessages[options.lang] && options.errorMessages[options.lang][validatorName])
											errMsg = options.errorMessages[options.lang][validatorName];
										else if (options.errorMessages.en[validatorName])
											errMsg = options.errorMessages.en[validatorName];
										else if (options.errorMessages[options.lang] && options.errorMessages[options.lang]['default'])
											errMsg = options.errorMessages[options.lang]['default'];
										else
											errMsg = options.errorMessages.en['default'];
									}
									else {
										skip_messages = 1;
									}



									// replace values in braces
									if (errMsg.indexOf('{')) {
										for (var i = 0; i < validatorParams.length - 1; i++)
											errMsg = errMsg.replace(new RegExp("\\{" + i + "\\}", "g"), validatorParams[i + 1]);
									}

									if (!(errorMessages.length && validatorName == 'required'))
										errorMessages[errorMessages.length] = errMsg;

									errMsg = null;
								}
							}
							else
								errorMessages[errorMessages.length] = '';

							ret = false;

							if (_callBack('onValidateFail', $(this), actions[i], errorMessages) === false)
								continue;
						}
						else {
							if (_callBack('onValidateSuccess', $(this), actions[i]) === false)
								continue;
						}
					}
				}

				if (!doNotshowMessages) {
					// if validation failed
					if (errorMessages.length) {

						_showErrMsg($(this), errorMessages)

						if (!$(this).is('input:checkbox,input:radio')) {
							$(this).removeClass(options.validClass);
							if (options.errorClass)
								$(this).addClass(options.errorClass);
						}

						// input validation event             
						if (options.errorValidateOn) {
							if (options.validateOn)
								$(this).unbind(options.validateOn + '.bV');

							var evt = options.errorValidateOn;
							//si es un autocomplete entonces validamos con el evento blur

							if ($(this).hasClass("ui-autocomplete-input")) {
								evt = 'blur';
							}
							else if ($(this).is('input:checkbox,input:radio,select,input:file')) {
								evt = 'change';
							}

							$(this).unbind(evt + '.bVerror');
							$(this).bind(evt + '.bVerror', { 'bValidatorInstance': instance }, function (event) {
								event.data.bValidatorInstance.validate(false, $(this));
							});
						}

						if (options.singleError)
							return false;
					}
					else {
						_removeErrMsg($(this));

						if (!$(this).is('input:checkbox,input:radio')) {
							$(this).removeClass(options.errorClass);
							if (options.validClass)
								$(this).addClass(options.validClass);
						}

						//if (options.errorValidateOn)
						//	$(this).unbind('.bVerror');
						if (options.validateOn) {
							$(this).unbind(options.validateOn + '.bV');
							_bindValidateOn($(this));
						}
					}
				}
			};

			// validate each element
			var isArray = Array.isArray(elementsl);
			if (isArray) {
				$.each(elementsl, validationMethod);
			}
			else {
				elementsl.each(validationMethod);
            }
			
            _callBack('onAfterAllValidations', elementsl, ret);

            // scroll to message
            if (scroll_to && !elementsOverride && ($(window).scrollTop() > scroll_to || $(window).scrollTop() + $(window).height() < scroll_to)) {
                var ua = navigator.userAgent.toLowerCase();
                $("html, body").animate({ scrollTop: scroll_to - 10 }, 1000);
                //$(ua.indexOf('chrome') > -1 || ua.indexOf('safari') > -1 ? 'body' : 'html').animate({ scrollTop: scroll_to - 10 }, { duration: 'slow' });
            }

            return ret;
		}
		
		// returns options object
        this.getOptions = function () {
			return options;
		}
		
		// chechs validity
        this.isValid = function () {
			return this.validate(true);
		}
		
		// deletes error message
        this.removeErrMsg = function (element) {
            $(element).removeClass(options.errorClass);
			_removeErrMsg(element);
		}
		
		// returns all inputs
        this.getInputs = function () {
			return _getElementsForValidation(mainElement);
		}
		
		// binds validateOn event
        this.bindValidateOn = function (element) {
			_bindValidateOn(element);
		}
		
		// resets validation
        this.reset = function () {
			elements = _getElementsForValidation(mainElement);
			if (options.validateOn)
				_bindValidateOn(elements);
            elements.each(function () {
				_removeErrMsg($(this));
				$(this).unbind('.bVerror');
				$(this).removeClass(options.errorClass);
				$(this).removeClass(options.validClass);
			});
		}
		
        this.destroy = function () {
			if (mainElement.is('form'))
				mainElement.unbind('.bV');
			
			this.reset();
			
			mainElement.removeData("bValidator");
        }

        this.CustomValidateOneElement = function (element, message) {
            var messages = [];

            messages.push(message);
            $(element).addClass(options.errorClass);
            _showErrMsg(element, messages);
        }
		
	}
	
})(jQuery);