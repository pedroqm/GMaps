$(function(){
     
 var map;
    $(document).ready(function(){
      map = new GMaps({
        el: '#map',
       lat: 37.778903, 
        lng: -3.782828,
          zoom: 9,
      });
      $('#geocoding_form').submit(function(e){
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
          }
        });
      });
    });
});