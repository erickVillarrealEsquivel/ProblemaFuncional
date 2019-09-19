
function Producto(id, descripcion,precio,clasificacion,existencia,existeciaMin,existenciaMax) {
    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.clasificacion = clasificacion;
    this.existencia = existencia;
    this.existeciaMin = existeciaMin;
    this.existenciaMax = existenciaMax;
}

function Almacen(){
  this.productos=[];
  this.addProducto = function(product) {
     this.productos[this.productos.length]=product;
 }
 this.reporte1 = function() {
   var contador=0;
   for (var i = 0; i < this.productos.length; i++) {
     if(this.productos[i].existencia>20) {
       contador++;
     }
   }
   console.log("reporte 1: la cantidad de productos con existencia mayor a 20 es "+contador);
}
this.reporte2 = function() {
  var contador=0;
  for (var i = 0; i < this.productos.length; i++) {
    if(this.productos[i].existencia<15) {
      contador++;
    }
  }
  console.log("reporte 2: la cantidad de productos con existencia menor a 15 es "+contador);
}
this.reporte3 = function() {
  console.log("reporte 3:  Lista de productos con la misma clasificación y precio mayor 15.50");
  var listaClasificacion=[];
  var ban=true;
  for (var i = 0; i < this.productos.length; i++) {
    ban=true;
    for (var j = 0; j < listaClasificacion.length; j++) {
      if(this.productos[i].clasificacion==listaClasificacion[j]){
        ban=false;
      }
    }
    if(ban){
      console.log("La lista de los elemtos con la categoria "+this.productos[i].clasificacion);
      for (var j = 0; j < this.productos.length; j++) {
        if (this.productos[i].clasificacion==this.productos[j].clasificacion &&this.productos[j].precio>15.5) {
          console.log(this.productos[j].descripcion);
        }
      }
      listaClasificacion[listaClasificacion.length]=this.productos[i].clasificacion;
    }
  }
}
this.reporte4 = function() {
  console.log("reporte 4: Lista de productos con precio mayor a 20.30 y menor a 45.00");
  for (var i = 0; i < this.productos.length; i++) {
    if(this.productos[i].precio>20.30 &&this.productos[i].precio<45)
    console.log(this.productos[i].descripcion);
  }
}
this.reporte5 = function() {
  console.log("reporte 5:  Número de productos agrupados por su clasificación");
  var listaClasificacion=[];
  var ban=true;
  var cc=0;
  for (var i = 0; i < this.productos.length; i++) {
    ban=true;
    for (var j = 0; j < listaClasificacion.length; j++) {
      if(this.productos[i].clasificacion==listaClasificacion[j]){
        ban=false;
      }
    }
    if(ban){
      console.log("La cantidad de prductos con la categoria "+this.productos[i].clasificacion);
      for (var j = 0; j < this.productos.length; j++) {
        if (this.productos[i].clasificacion==this.productos[j].clasificacion) {
          cc++;
        }
      }
      console.log(cc);
      listaClasificacion[listaClasificacion.length]=this.productos[i].clasificacion;
      cc=0;
    }
  }
}
}

var almacen=new Almacen();

var fs = require('fs');

fs.readFile('dao.txt', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  console.log(data);
  var tempProductos=data.split("\n");
  for (var i = 0; i < tempProductos.length-1; i++) {
    var tempAtributos=tempProductos[i].split(",");
    var tempProducto=new Producto(tempAtributos[0],tempAtributos[1],tempAtributos[2],tempAtributos[3],tempAtributos[4],tempAtributos[5],tempAtributos[6]);
    almacen.addProducto(tempProducto);
  }


  almacen.reporte1();
  almacen.reporte2();
  almacen.reporte3();
  almacen.reporte4();
  almacen.reporte5();

});
