(function (window, document) {
    'use strict';
    let inicio = function () {
        let elemento = null,
            marco = null,
            ctrlActual = null,
            rutas = {},
            controladores = {},

            libreria = {

                getID: function (id) {
                    this.ID = elemento = document.getElementById(id);
                    return this;
                },

                noSubmit: function () {
                    elemento.addEventListener('submit', function (e) {
                        e.preventDefault();
                    }, false)
                    return this;
                },

                controlador: function (nombre, ctrl) {
                    controladores[nombre] = {
                        'controlador': ctrl
                    };
                },

                getCtrl: function () {
                    return ctrlActual;
                },

                enRutar: function () {
                    marco = elemento;
                    return this;
                },

                ruta: function (ruta, plantilla, controlador, carga) {
                    rutas[ruta] = {
                        'plantilla': plantilla,
                        'controlador': controlador,
                        'carga': carga
                    };
                    return this;
                },

                manejadorRutas: function () {
                    let hash = window.location.hash.substring(1) || '#/',
                        destino = rutas[hash],
                        xhr = new XMLHttpRequest();
                    if (destino && destino.plantilla) {
                        if (destino.controlador) {
                            ctrlActual = controladores[destino.controlador].controlador;
                        }

                        xhr.addEventListener('load', function () {
                            marco.innerHTML = this.responseText;
                            // si no funciona asi ensierra a funcion etre ''
                            setTimeout(function () {
                                if (typeof destino.carga === "function") {
                                    destino.carga();
                                }
                            }, 500)
                        }, false);

                        xhr.open('get', destino.plantilla, true);
                        xhr.send(null);

                    } else {
                        window.location.hash = '#/';
                    }
                    return this;
                }
            };

        return libreria;
    }
    if (typeof window.My === "undefined") {
        window.My = inicio();
        window.addEventListener('load', My.manejadorRutas, false)
        window.addEventListener('hashchange', My.manejadorRutas, false)
    } else {
        console.log("Se llamo la librería nuevamente")
    }
})(window, document);