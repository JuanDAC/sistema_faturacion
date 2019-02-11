(function (window, document) {
    'use strict';
    //Este numero se obtendra de la ultima fila de numero de factura en la ultima pocicion  
    let consecutivo = 0,
        numeroProducto = -1,
        consecutivoProducto = 0,
        consecutivoCliente = 0;

    My.controlador('facturar', {
        pocicionCliente: new Number(),
        organizacion: {},
        facturar: {},
        producto: {},
        cliente: {},
        facturas: [],
        productos: [],
        clientes: [],
        facturaProductos: [],
        agregarProductoAFacturar: function () {
            let self = this;
            ((numeroProducto + 1)) ? self.facturaProductos.push(numeroProducto): alert("Error");
            console.log(self.facturaProductos);
            numeroProducto = -1;
        },
        cantidadPoductoUnico: function (Elemento) {
            let formulario = Elemento.form,
                self = this,
                unidad = (formulario.facturaVentaProductoValorUnidad.value === "") ? 0 : parseFloat(self.productos[numeroProducto].valorUnidad, 10),
                cantidad = (formulario.facturaVentaProductoCantidad.value === "") ? 0 : parseFloat(formulario.facturaVentaProductoCantidad.value, 10),
                descuento = (formulario.facturaVentaProductoDescuento.value === "") ? 0 : (parseFloat(formulario.facturaVentaProductoDescuento.value.split("%")[0], 10) / 100);
            console.log(parseFloat(((unidad * cantidad) - ((unidad * cantidad) * descuento))));
            console.log(descuento);
            console.log(cantidad);
            console.log(unidad);
            console.log(numeroProducto);

            self.productos[numeroProducto].compra = {}

            self.productos[numeroProducto].compra.porcentajeDescuento = descuento;
            self.productos[numeroProducto].compra.cantidad = cantidad;
            self.productos[numeroProducto].compra.valorTotal = parseFloat(((unidad * cantidad) - ((unidad * cantidad) * descuento)));

            formulario.facturaVentaProductoValorTotal.value = self.productos[numeroProducto].compra.valorTotal;

            console.log(self.productos);

            //                    self.productos[numeroProducto].; 

        },
        facturaCodigoProductoObtener: function (elementoCodigo) {
            let formulario = elementoCodigo.form,
                self = this;

            for (let i = 0; i < self.productos.length; i++) {
                if (self.productos[i].codigo === elementoCodigo.value) {

                    numeroProducto = i;
                    formulario.facturaVentaProductoDescripcion.value = self.productos[i].descripcion;
                    formulario.facturaVentaProductoExistancias.value = self.productos[i].existencias;
                    formulario.facturaVentaProductoValorUnidad.value = self.productos[i].valorUnidad;
                }
            }
        },
        facturaCodigoProducto: function (elementoCodigo) {
            let self = this,
                esta = false;

            for (let i = 0; i < self.productos.length; i++) {
                for (let j = 0; j < elementoCodigo.children.length; j++) {
                    if (elementoCodigo.children[j].textContent === self.productos[i].codigo)
                        esta = true;
                }
                let newOption = document.createElement('option');
                newOption.value = self.productos[i].codigo;
                newOption.textContent = self.productos[i].codigo;
                (esta) ? esta: elementoCodigo.appendChild(newOption);
                esta = false;
            }
        },
        codigoProducto: function (elementoCodigo) {
            let formulario = elementoCodigo.form,
                self = this,
                numero = "",
                estante = "",
                categoria = "",
                sede = "",
                mostar = function () {
                    document.getElementsByClassName("cajaInfo")[2].style.display = 'block';
                    formulario.ArticuloExistancias.style.display = 'inline-block';
                    formulario.ArticuloExistancias.labels[0].style.display = 'inline-block';
                },
                ocultar = function () {
                    document.getElementsByClassName("cajaInfo")[2].style.display = 'none';
                    formulario.ArticuloExistancias.style.display = 'none';
                    formulario.ArticuloExistancias.labels[0].style.display = 'none';
                    formulario.ArticuloExistancias.value = "";
                    formulario.ArticuloEstante.value = "";
                    formulario.ArticuloSede.value = "";
                };

            self.producto.nombre = formulario.ArticuloNombre.value;
            self.producto.descripcion = formulario.ArticuloDescripcion.value;

            switch (formulario.ArticuloCategoria.value) {
                case "Producto":
                    categoria = "P-";
                    mostar();
                    break;
                case "Servicio":
                    categoria = "S-";
                    ocultar();
                    break;
                case "Materia Prima":
                    categoria = "MP-";
                    mostar();
                    break;
                case "Ing. Tercero":
                    categoria = "IT-";
                    ocultar();
                    break;
                case "":
                    categoria = "";
                    mostar();
                    break;
            }
            numero = (consecutivoProducto + 1).toString();
            sede = formulario.ArticuloSede.value;
            estante = formulario.ArticuloEstante.value
            //            formulario.ArticuloCodigo.value = categoria + sede + estante + numero;
            formulario.ArticuloCodigo.value = `${categoria}${(categoria ==="")?"":sede}${(categoria ==="")?"":estante}${(categoria ==="")?"":numero}`;
        },
        newProducto: function (formulario) {
            let self = this;
            //            cambiar la obtencion de los datos segundarios, sacarlos de la base de dato en ves del front-ent
            self.producto.nombre = formulario.ArticuloNombre.value;
            self.producto.descripcion = formulario.ArticuloDescripcion.value;
            self.producto.categoria = formulario.ArticuloCategoria.value;
            self.producto.existencias = parseInt(formulario.ArticuloExistancias.value, 10);
            self.producto.valorUnidad = parseInt(formulario.ArticuloValorUnidad.value, 10);
            self.producto.Sede = formulario.ArticuloSede.value;
            self.producto.estante = formulario.ArticuloEstante.value;
            self.producto.codigo = formulario.ArticuloCodigo.value;
            consecutivoProducto = consecutivoProducto + 1;
            self.producto.numero = consecutivoProducto;
            //            agregar Producto
            self.productos.push(self.producto);
            //            Limpiar objeto 
            self.producto = {};
            //            Limpiar elementos
            formulario.reset();
            console.log(self.producto)
            console.log(self.productos)
        },
        newCliente: function (formulario) {
            let self = this;
            self.cliente.nit = formulario.NitCliente.value;
            self.cliente.denominacion = formulario.DenominacioCliente.value;
            self.cliente.tipoDeSociedad = formulario.tipoDeSociedadCliente.value;
            self.cliente.razonSocial = formulario.razonSocialCliente.value;
            self.cliente.numerotelefonico = formulario.numerotelefonicoCliente.value;
            self.cliente.email = formulario.emailCliente.value;
            self.cliente.web = formulario.webCliente.value;
            self.cliente.domicilio = formulario.domicilioCliente.value;
            self.cliente.ciudad = formulario.ciudadCliente.value;
            self.cliente.pedido = 0;

            consecutivoCliente = consecutivoCliente + 1;
            self.cliente.numero = consecutivoCliente;
            //            agregar cliente
            self.clientes.push(self.cliente);
            //            Limpiar objeto 
            self.cliente = {};
            //            Limpiar elementos
            formulario.reset();
            console.log(self.cliente)
            console.log(self.clientes)
        },
        ivaTarifa: function (elemento) {
            'use strict';
            let self = this,
                formulario = elemento.form,
                conIVA = function () {
                    self.organizacion.tarifaIva = 0.19;
                    self.organizacion.resultadoTarifaIva = 1.19;
                };

            switch (formulario.regimenOrganizacion.value) {
                case "Regimen Comun":
                    formulario.tarifaIvaOrganizacion.value = '19%';
                    conIVA();
                    break;
                case "Regimen Simplificado":
                    formulario.tarifaIvaOrganizacion.value = '0%';
                    self.organizacion.tarifaIva = 0;
                    break;
                case "":
                    formulario.tarifaIvaOrganizacion.value = '';
                    conIVA();
                    break;
            }
        },
        newOrganizacion: function (formulario) {
            let self = this;
            self.organizacion.nit = formulario.NitOrganizacion.value;
            self.organizacion.denominacion = formulario.DenominacioOrganizacion.value;
            self.organizacion.tipoDeSociedad = formulario.tipoDeSociedadOrganizacion.value;
            self.organizacion.razonSocial = formulario.razonSocialOrganizacion.value;
            self.organizacion.predijoDeFactura = formulario.predijoDeFacturaOrganizacion.value;
            self.organizacion.autorizacionDeFacturaDe = formulario.autorizacionDeFacturaOrganizacionDel.value;
            self.organizacion.autorizacionDeFacturaAl = formulario.autorizacionDeFacturaOrganizacionAl.value;
            self.organizacion.numerotelefonico = formulario.numerotelefonicoOrganizacion.value;
            self.organizacion.email = formulario.emailOrganizacion.value;
            self.organizacion.web = formulario.webOrganizacion.value;
            self.organizacion.domicilio = formulario.domicilioOrganizacion.value;
            self.organizacion.ciudad = formulario.ciudadOrganizacion.value;
            self.organizacion.regimen = formulario.regimenOrganizacion.value;
            self.organizacion.actividadEconomica = formulario.actividadEconomicaOrganizacion.value;
            self.organizacion.autorizacionDeLaDian = formulario.autorizacionDeLaDianOrganizacion.value;
            self.organizacion.retenedores = (formulario.retenedores[0].checked) ? true : false;

            //            Limpiar elementos
            formulario.reset();
            console.log(self.organizacion)
        },
        traerClienteNit: function (elementoCodigo) {
            let self = this,
                esta = false;

            for (let i = 0; i < self.clientes.length; i++) {
                for (let j = 0; j < elementoCodigo.children.length; j++) {
                    if (elementoCodigo.children[j].textContent === self.clientes[i].nit)
                        esta = true;
                }
                let newOption = document.createElement('option');
                newOption.value = i;
                newOption.textContent = self.clientes[i].nit;
                (esta) ? esta: elementoCodigo.appendChild(newOption);
                esta = false;
            }
        },
        traerCliente: function (elementoCodigo) {
            let self = this,
                formulario = elementoCodigo.form;
            self.pocicionCliente = parseInt(elementoCodigo.value, 10);
            (elementoCodigo.value) ? formulario.facturaVentaCliente.value = self.clientes[self.pocicionCliente].razonSocial: "";
        },
        crear: function (formulario) {
            //Objeto para poderlo utilizar en otras funciones 
            let self = this;
            // Datos Cliente
            self.facturar.nit = formulario.facturaVentaNit.value;
            // traer datos de otro lado que no sea del fron-end el unico dato del cliente de debe de traer de ahi seria el  nit el cliente llegara automaticamente, por lo tanto es mejor obtenerlo de la base de datos con respecto al NIT y no de el fron-ent ya que lo pueden alterar (por el momento lo treeremos del fron-end pero esto tentra que cambiarse por ptenerla de la base de datos )
            self.facturar.cliente = formulario.facturaVentaCliente.value;
            // Datos Vendador
            self.facturar.vendedor = formulario.facturaVentaVendedor.value;
            // Datos Venta
            self.facturar.tipoPago = formulario.facturaVentaTipoPago.value;
            self.facturar.vence = formulario.facturaVentaVence.value;
            self.facturar.observaciones = formulario.facturaVentaObservaciones.value;
            self.facturar.nacional = formulario.facturaVentaNAC.checked;
            self.facturar.exportacion = formulario.facturaVentaEXP.checked;
            consecutivo += 1;
            self.facturar.numeroFactura = consecutivo;
            self.facturas.push(self.facturar);
            self.facturar = {};
            alert("Fcatura numero " + consecutivo + " Creada");
            formulario.reset();
            //            console.log(this.facturas);
        },
        actualizar: function () {},
        listar: function (ultima) {
            //Objeto para poderlo utilizar en otras funciones 
            let self = this;
            while(!(My.getID('cuerpoTablaCliente').ID)){
                setTimeout(function(){return 0},1000);
            }
            //            console.log(longitudFacturas);
            setTimeout(function () {
                //                console.log();
                let cuerpoTablaCliente = My.getID('cuerpoTablaCliente').ID,
                    cuerpoNumeroFactura = My.getID('tituloFactura').ID,
                    cuerpoInfoOrganizacion = My.getID('divInfoOrganizacion').ID,
                    cuerpoTablaProductos = My.getID('cuerpoTablaProductos').ID,
                    cuerpoTablaTotales = My.getID('cuerpoTablaTotales').ID,

                    templateCliente = My.getID('contenidoTablaCliente').ID,
                    templateNumeroFactura = My.getID('contenidoNumeroFactura').ID,
                    templateInfoOrganizacion = My.getID('contenidoInfoEmprasa').ID,
                    templateTablaProductos = My.getID('contenidoTablaProductos').ID,
                    templateTablaTotales = My.getID('contenidoTablaTotales').ID,

                    //                    fragmento = document.createDocumentFragment(),
                    //                    posicion de productos
                    posPro = 0,
                    //                    total de los productos 
                    subtotal = 0,
                    total = 0,
                    //                    max = this.facturas.length,
                    registro,
                    clonTablaClientes,
                    clonTablaOrganizacion,
                    clonNumeroFactura,
                    clonTablaProductos,
                    clonTablaTotales,
                    RetenedorIVA,
                    longitudFacturas,
                    fecha = new Date();

                longitudFacturas = (typeof (ultima) === 'number') ? longitudFacturas = ultima - 1 : longitudFacturas = self.facturas.length - 1;
                //                    console.log(cuerpoTablaCliente);
                //                console.log(typeof ultima);

                //                   lIMPIAR CONTENEDORES
                cuerpoTablaCliente.innerHTML = '';
                cuerpoNumeroFactura.innerHTML = '';
                cuerpoInfoOrganizacion.innerHTML = '';
                cuerpoTablaProductos.innerHTML = '';
                cuerpoTablaTotales.innerHTML = '';




                //            for (;i < max; i += 1){
                //                registro = self.contactos[i];

                //                            Datos Cliente
                clonTablaClientes = templateCliente.content.cloneNode(true);


                clonTablaClientes.querySelector('.fechaActual').textContent = (fecha.getFullYear() + "-" + ((fecha.getMonth() < 9) ? "0" + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + "-" + fecha.getDate());
                clonTablaClientes.querySelector('.fechaVence').textContent = self.facturas[longitudFacturas].vence;
                clonTablaClientes.querySelector('.clienteNombre').textContent = self.clientes[self.pocicionCliente].razonSocial;
                clonTablaClientes.querySelector('.clienteNit').textContent = self.clientes[self.pocicionCliente].nit;
                clonTablaClientes.querySelector('.clienteDomicilio').textContent = self.clientes[self.pocicionCliente].domicilio;
                clonTablaClientes.querySelector('.clienteTelefono').textContent = self.clientes[self.pocicionCliente].numerotelefonico;
                self.clientes[self.pocicionCliente].pedido++;
                clonTablaClientes.querySelector('.clientePedido').textContent = self.clientes[self.pocicionCliente].pedido;
                clonTablaClientes.querySelector('.clienteFormaPago').textContent = self.facturas[longitudFacturas].tipoPago;
                //                    Cargar datos
                cuerpoTablaCliente.appendChild(clonTablaClientes);
                //                            Numero de factura
                //                    Cargar datos
                clonNumeroFactura = templateNumeroFactura.content.cloneNode(true);
                clonNumeroFactura.querySelector('.numeroFactura').textContent = `${self.organizacion.predijoDeFactura}${self.facturas[longitudFacturas].numeroFactura}`;
                cuerpoNumeroFactura.appendChild(clonNumeroFactura);


                RetenedorIVA = (self.organizacion.retenedores) ? "Somos retenedores de IVA" : "No somos retenedores de IVA";

                //                            Datos de la organización 
                clonTablaOrganizacion = templateInfoOrganizacion.content.cloneNode(true);
                clonTablaOrganizacion.querySelector('.organizacionNombre').textContent = self.organizacion.razonSocial;
                clonTablaOrganizacion.querySelector('.organizacionNit').textContent = self.organizacion.nit;
                clonTablaOrganizacion.querySelector('.organizacionDomicilio').textContent = self.organizacion.domicilio;
                clonTablaOrganizacion.querySelector('.organizacionCiudad').textContent = self.organizacion.ciudad;
                clonTablaOrganizacion.querySelector('.organizacionTelefono').textContent = self.organizacion.numerotelefonico;
                clonTablaOrganizacion.querySelector('.organizacionCorreo').textContent = self.organizacion.email;
                clonTablaOrganizacion.querySelector('.organizacionWeb').textContent = self.organizacion.web;
                clonTablaOrganizacion.querySelector('.organizacionRegimen').textContent = self.organizacion.regimen;
                clonTablaOrganizacion.querySelector('.organizacionRetenedorIVA').textContent = RetenedorIVA;
                clonTablaOrganizacion.querySelector('.organizacionICA').textContent = `Actividad economica ${self.organizacion.actividadEconomica}`;
                clonTablaOrganizacion.querySelector('.organizacionAutorizacionDIAN').textContent = `Autorización DIAN ${self.organizacion.autorizacionDeLaDian}`;
                clonTablaOrganizacion.querySelector('.organizacionRango').textContent = `Autorizadas ${self.organizacion.predijoDeFactura}${self.organizacion.autorizacionDeFacturaDe} - ${self.organizacion.predijoDeFactura}${self.organizacion.autorizacionDeFacturaAl}`;
                clonTablaOrganizacion.querySelector('.organizacionRetenedorIVA').textContent = RetenedorIVA;
                clonTablaOrganizacion.querySelector('.organizacionRetenedorIVA').textContent = RetenedorIVA;
                //                    Cargar datos
                cuerpoInfoOrganizacion.appendChild(clonTablaOrganizacion);


                //                  IMPRIMIR LOS PRODUCTOS 

                for (let i = 0; i < self.facturaProductos.length; i++) {
                    clonTablaProductos = templateTablaProductos.content.cloneNode(true);
                    posPro = self.facturaProductos[i];
                    clonTablaProductos.querySelector('.productosCodigo').textContent = self.productos[posPro].codigo;
                    clonTablaProductos.querySelector('.productosDescripcion').textContent = `${self.productos[posPro].nombre} el cual es  ${self.productos[posPro].categoria}. \n${self.productos[posPro].descripcion}`;
                    clonTablaProductos.querySelector('.productosCantidad').textContent = self.productos[posPro].compra.cantidad;
                    clonTablaProductos.querySelector('.productosDescuento').textContent = `${(self.productos[posPro].compra.porcentajeDescuento*100)}%`;
                    clonTablaProductos.querySelector('.productosPrecioUnidad').textContent = "$" + self.productos[posPro].valorUnidad;
                    clonTablaProductos.querySelector('.productosPrecioTotal').textContent = "$" + self.productos[posPro].compra.valorTotal;
                    subtotal = subtotal + parseFloat(self.productos[posPro].compra.valorTotal, 10);

                    //                    self.producto[posPro].existencias = (self.producto[posPro].existencias) ? (parseInt(self.productos[posPro].existencias, 10) - parseInt(self.productos[posPro].compra.cantidad, 10)) : "";
                    cuerpoTablaProductos.appendChild(clonTablaProductos);
                }
                self.facturaProductos = [];

                //                  IMPRIMIR LOS TOTALES 

                clonTablaTotales = templateTablaTotales.content.cloneNode(true);
                clonTablaTotales.querySelector('.totalesSubtotal').textContent = subtotal;
                clonTablaTotales.querySelector('.totalesIva').textContent = (subtotal * self.organizacion.tarifaIva);
                total = (subtotal * self.organizacion.resultadoTarifaIva);
                clonTablaTotales.querySelector('.totalesTotal').textContent = total;
                cuerpoTablaTotales.appendChild(clonTablaTotales);

                //                            OBSERVACIONES de factura
                //                    Cargar datos
                document.querySelector('#cajaInfoObservaciones').textContent = self.facturas[self.facturas.length - 1].observaciones;
                //                            cajaNumerosALetras
                //                    Cargar datos
                document.querySelector('#cajaNumerosALetras').textContent = Evento.numeroALetras(total);

                //            }

            }, 300, self)
        }
    })
})(window, document);