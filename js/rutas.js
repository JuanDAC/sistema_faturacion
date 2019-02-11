(function (window, document) {
    'use strict';
    My.getID("vista").enRutar()

        .ruta('/',
            'vistas/inicio.html',
            null,
            null)

        .ruta('/seccionFactura',
            'vistas/secciones/factura.html',
            null,
            null)

        .ruta('/seccionActualizaciones',
            'vistas/secciones/actualizaciones.html',
            null,
            null)

        .ruta('/movimientoDeCaja',
            'vistas/secciones/movimientoDeCaja.html',
            null,
            null)

        .ruta('/movimientoDeArticulos',
            'vistas/secciones/movimientoDeArticulos.html',
            null,
            null)

        .ruta('/ajustesInventario',
            'vistas/secciones/ajustesInventario.html',
            null,
            null)

        .ruta('/informes',
            'vistas/secciones/informes.html',
            null,
            null)

        .ruta('/resumen',
            'vistas/secciones/resumen.html',
            null,
            null)

        .ruta('/cartera',
            'vistas/secciones/cartera.html',
            null,
            null)

        .ruta('/ajustes',
            'vistas/secciones/ajustes.html',
            null,
            null)

        .ruta('/facturaVenta',
            'vistas/factura/facturaVenta.html',
            'facturar',
            function () {
                My.getID('crearfacturaVenta').noSubmit();
            })

        .ruta('/facturaVentaProducto',
            'vistas/factura/facturaVentaProducto.html',
            'facturar',
            function () {
                My.getID('facturaVentaProducto').noSubmit();
            })

        .ruta('/mostrarFactura',
            'vistas/factura/mostrarFactura.html',
            'facturar',
            null)

        .ruta('/organizacion',
            'vistas/ajustes/organizacion.html',
            'facturar',
            function () {
                My.getID('dataOrganizacion').noSubmit();
            })

        .ruta('/actualizarCliente',
            'vistas/actualizaciones/actualizarCliente.html',
            'facturar',
            function () {
                My.getID('dataCliente').noSubmit();
            })

        .ruta('/actualizarArticulos',
            'vistas/actualizaciones/actualizarArticulos.html',
            'facturar',
            function () {
                My.getID('dataArticulo').noSubmit();
            })

        .ruta('/proximamente',
            'vistas/error.html',
            null,
            null)
})(window, document);