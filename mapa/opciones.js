window.onload = function(){

    	//document.getElementById("btnBuscar").addEventListener("click", function(){buscar()});

}

function nuevaConexion(){
	var res;
	if(window.XMLHttpRequest){
		res = new XMLHttpRequest();
	}else{
		if(window.ActiveXObject){
			res = new ActiveXObject();
		}
	}

	return res;
}

function buscar(){
     map.removeMarkers();
	conexion = nuevaConexion();
	 url="mapa.php";
	conexion.open("GET", url);
	conexion.onreadystatechange = bPuntos;
	conexion.send();
}


function bPuntos(){
	if(conexion.readyState == 4){
		if(conexion.status == 200){
        
			pintaPunto(JSON.parse(conexion.responseText));
            
		}
	}
}

function pintaPunto(res){
  var aux=0;
    $("input:checkbox:checked").each(function(){
		//cada elemento seleccionado
		
		for(dato in res){
		 
             
        if($(this).val()=="todo"){
            aux=1;
				 map.addMarker({
					icon: "images/"+res[dato].tipo+".png",
					lat: res[dato].latitud,
					lng: res[dato].longitud,
					title: res[dato].id,
					infoWindow: {
					  content: '<h1>'+res[dato].nombre+'</h1><p>HTML Content</p>'
					}               

                 });
		}else{
		  if(res[dato].tipo==$(this).val() && aux==0){
			 map.addMarker({
					icon: "images/"+res[dato].tipo+".png",
					lat: res[dato].latitud,
					lng: res[dato].longitud,
					title: res[dato].id,
					infoWindow: {
					  content: '<h1>'+res[dato].nombre+'</h1><p>HTML Content</p>'
					}               
			  });
                 
			 }
		 }
		}
	});
    
}
function guardar(){
        var parametros = {
                "longitud" : document.getElementById("longitud").value,
                "latitud" : document.getElementById("latitud").value,
                "nombre" : document.getElementById("nombre").value,
                "tipo" : document.getElementById("tipo").value
        };
        $.ajax({
                data:  parametros,
                url:   'mapa.php',
                type:  'post',
                beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#resultado").html(response);
                }
        });
}



$(function(){
     
      $('#borrar').on('click', function() {
          
            $(document).ready(function(){
                    map.removeMarkers();
            });
       });
    
   
    $("input:checkbox").on('click', function() {
        if (this.checked){
            if($(this).val()=="todo"){
                 $("input.sub").attr("disabled", true);                 
            }
        }else{
            if($(this).val()=="todo"){
                $("input.sub").removeAttr("disabled");
            }
        }
            
       });


     
        $('#anadir').on('click', function() {
        
           $(document).ready(function(){
                  map = new GMaps({
                    el: '#map',
                    lat: 37.778903, 
                    lng: -3.782828,
                      zoom:9,
                      markerClusterer: function(map) {
                      return new MarkerClusterer(map);
                    }
                  }); 
               
                         buscar();

           });
       });
    
   
    
      $('#pueblos').on('change', function() {
         var longitud=0;
         var latitud=0;
          var pueblo=$('#pueblos').val();
         switch(pueblo){
            case "jaen":
                 latitud=37.778903;
                 longitud=-3.782828;
                break;
            case "mengibar":
                 latitud=37.9677871;
                 longitud=-3.8071357000000035;
            break;
            case "baeza":
                 latitud=37.9935868;
                 longitud=-3.4677616999999827;
            break;        
        }
         $(document).ready(function(){
                    map.setCenter({
                    lat: latitud, 
                    lng: longitud,
                  });       
                });         
       });
    $('#verTipo').on('change', function() {
         buscarPunto();         
     });
    
    $('#geocoding_form').submit(function(e){
        map.removeMarkers();
        e.preventDefault();
        GMaps.geocode({
          address: $('#address').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              map.setCenter(latlng.lat(), latlng.lng());
              map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng()
              });
            }
              document.getElementById("longitud").value=latlng.lng();
              document.getElementById("latitud").value=latlng.lat();
               document.getElementById("nombre").value=$('#address').val().trim();
              
          }
        });
      });
    
    $('#guardar').on('click', function() {
          
          guardar();
       });
    
    });