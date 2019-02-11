(function (window, document) {
    'use strict';
    let main = function () {
        'use strict';
        let interactivo = {
            ID: function (id) {
                'use strict';
                return document.getElementById(id);
            },
            CL: function (clase) {
                'use strict';
                return document.getElementsByClassName(clase);
            },
            padreID: function (hijo) {
                'use strict';
                return this.ID(hijo).parentNode;
            },
            padre: function (hijo) {
                'use strict';
                return hijo.parentNode;
            },
            menuToggle: function () {
                'use strict';
                document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
                document.getElementById('toggle').classList.toggle('x');
                return this;
            },
            razonSocial: function (elemento) {
                'use strict';
                let formulario = elemento.form,
                    resultado,
                    nombre = (formulario.DenominacioOrganizacion) ? formulario.DenominacioOrganizacion.value : "" || (formulario.DenominacioCliente) ? formulario.DenominacioCliente.value : "",
                    sociedad = (formulario.tipoDeSociedadCliente) ? formulario.tipoDeSociedadCliente.value : "" || (formulario.tipoDeSociedadOrganizacion) ? formulario.tipoDeSociedadOrganizacion.value : "";

                resultado = `${(sociedad)?nombre:""} ${(nombre)?sociedad:""}`;
                (formulario.razonSocialOrganizacion) ? formulario.razonSocialOrganizacion.value = resultado: formulario.razonSocialCliente.value = resultado;
            },
            numeroMaxFactura: function (elemento) {
                'use strict';
                let formulario = elemento.form,
                    del = parseInt(formulario.autorizacionDeFacturaOrganizacionDel.value, 10),
                    al = parseInt(formulario.autorizacionDeFacturaOrganizacionAl.value, 10);
                formulario.autorizacionDeFacturaOrganizacionAl.value = (formulario.autorizacionDeFacturaOrganizacionAl.value) ? ((al < del)) ? del : al:"";
            },
            numeroALetras: function(numeroAConvertir){
                let unidades = function (num){

                    switch(num)
                    {
                        case 1: return "UN";
                        case 2: return "DOS";
                        case 3: return "TRES";
                        case 4: return "CUATRO";
                        case 5: return "CINCO";
                        case 6: return "SEIS";
                        case 7: return "SIETE";
                        case 8: return "OCHO";
                        case 9: return "NUEVE";
                    }

                    return "";
                }//unidades()

                , decenas = function (num){

                    let decena = Math.floor(num/10),
                        unidad = num - (decena * 10);

                    switch(decena)
                    {
                        case 1:
                            switch(unidad)
                            {
                                case 0: return "DIEZ";
                                case 1: return "ONCE";
                                case 2: return "DOCE";
                                case 3: return "TRECE";
                                case 4: return "CATORCE";
                                case 5: return "QUINCE";
                                default: return "DIECI" + unidades(unidad);
                            }
                        case 2:
                            switch(unidad)
                            {
                                case 0: return "VEINTE";
                                default: return "VEINTI" + unidades(unidad);
                            }
                        case 3: return decenasY("TREINTA", unidad);
                        case 4: return decenasY("CUARENTA", unidad);
                        case 5: return decenasY("CINCUENTA", unidad);
                        case 6: return decenasY("SESENTA", unidad);
                        case 7: return decenasY("SETENTA", unidad);
                        case 8: return decenasY("OCHENTA", unidad);
                        case 9: return decenasY("NOVENTA", unidad);
                        case 0: return unidades(unidad);
                    }
                }//unidades()

                , decenasY = function (strSin, numUnidades) {
                    if (numUnidades > 0)
                    return strSin + " Y " + unidades(numUnidades)

                    return strSin;
                }//decenasY()

                , centenas = function (num) {
                    let centena = Math.floor(num / 100),
                        decena = num - (centena * 100);

                    switch(centena)
                    {
                        case 1:
                            if (decena > 0)
                                return "CIENTO " + decenas(decena);
                            return "CIEN";
                        case 2: return "DOSCIENTOS " + decenas(decena);
                        case 3: return "TRESCIENTOS " + decenas(decena);
                        case 4: return "CUATROCIENTOS " + decenas(decena);
                        case 5: return "QUINIENTOS " + decenas(decena);
                        case 6: return "SEISCIENTOS " + decenas(decena);
                        case 7: return "SETECIENTOS " + decenas(decena);
                        case 8: return "OCHOCIENTOS " + decenas(decena);
                        case 9: return "NOVECIENTOS " + decenas(decena);
                    }

                    return decenas(decena);
                }//centenas()

                , seccion = function (num, divisor, strSingular, strPlural) {
                    let cientos = Math.floor(num / divisor),
                        resto = num - (cientos * divisor),
                        letras = "";

                    if (cientos > 0)
                        if (cientos > 1)
                            letras = centenas(cientos) + " " + strPlural;
                        else
                            letras = strSingular;

                    if (resto > 0)
                        letras += "";

                    return letras;
                }//seccion()

                , miles = function (num) {
                    let divisor = 1000,
                        cientos = Math.floor(num / divisor),
                        resto = num - (cientos * divisor),
                        strMiles = seccion(num, divisor, "UN MIL", "MIL"),
                        strCentenas = centenas(resto);

                    if(strMiles == "")
                        return strCentenas;

                    return strMiles + " " + strCentenas;
                }//miles()

                , millones = function (num) {
                    let divisor = 1000000,  
                        cientos = Math.floor(num / divisor),
                        resto = num - (cientos * divisor),
                        strMillones = seccion(num, divisor, "UN MILLON DE", "Millones DE"),
                        strMiles = miles(resto);

                    if(strMillones == "")
                        return strMiles;

                    return strMillones + " " + strMiles;
                }//Millones()

                , main = function (num) {
                    let data = {
                        numero: num,
                        enteros: Math.floor(num),
                        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                        letrasCentavos: "",
                        letrasMonedaPlural: 'PESOS',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
                        letrasMonedaSingular: 'PESO', //"PESO", 'Dólar', 'Bolivar', 'etc'

                        letrasMonedaCentavoPlural: "CENTAVOS",
                        letrasMonedaCentavoSingular: "CENTAVO"
                    };

                    if (data.centavos > 0) {
                        data.letrasCentavos = "CON " + (function (){
                            if (data.centavos == 1)
                                return millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
                            else
                                return millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
                            })();
                    };

                    if(data.enteros == 0)
                        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
                    if (data.enteros == 1)
                        return millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
                    else
                        return millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
                }//NumeroALetras()
                return main(numeroAConvertir);
            }
            
            
            
            
            
        }
        return interactivo
    }
    window.Evento = (typeof (window.Evento) === "undefined") ? window.Evento = main() : window.Evento;



})(window, document);