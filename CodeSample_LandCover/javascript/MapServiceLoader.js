
//configure map services

//map services
var MAPLAYERS = {
	
	"baseLayers":[
		{
			"mapServiceId": "baseMapAerial",
			"mapServiceName": "Aerial",
			"mapServiceType": "fusedCache",
			"restUrl": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
			"isVisible": true,
			"opacity": 1.0,
		},
		{
			"mapServiceId": "baseMapStreets",
			"mapServiceName": "Streets",
			"mapServiceType": "fusedCache",
			"restUrl": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
			"isVisible": false,
			"opacity": 1.0,
		},
		{
			"mapServiceId": "baseMapTopo",
			"mapServiceName": "Topographic",
			"mapServiceType": "fusedCache",
			"restUrl": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer",
			"isVisible": false,
			"opacity": 1.0,
		},
		{
			"mapServiceId": "baseMapTerrain",
			"mapServiceName": "Terrain",
			"mapServiceType": "fusedCache",
			"restUrl": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer",
			"isVisible": false,
			"opacity": 1.0,
		}
	],
	
	"operationalLayers":[
		{
			"mapServiceId": "landCover2001",
			"mapServiceName": "Land Cover 2001",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2001/MapServer",
			"isVisible": true,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2002",
			"mapServiceName": "Land Cover 2002",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2002/MapServer",
			"isVisible": false,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2003",
			"mapServiceName": "Land Cover 2003",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2003/MapServer",
			"isVisible": false,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2004",
			"mapServiceName": "Land Cover 2004",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2004/MapServer",
			"isVisible": false,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2005",
			"mapServiceName": "Land Cover 2005",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2005/MapServer",
			"isVisible": true,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2006",
			"mapServiceName": "Land Cover 2006",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2006/MapServer",
			"isVisible": false,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2007",
			"mapServiceName": "Land Cover 2007",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2007/MapServer",
			"isVisible": false,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2008",
			"mapServiceName": "Land Cover 2008",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2008/MapServer",
			"isVisible": false,
			"opacity": 0.7,
		},
		{
			"mapServiceId": "landCover2009",
			"mapServiceName": "Land Cover 2009",
			"mapServiceType": "fusedCache",
			"restUrl": "http://50.17.249.169/ArcGIS/rest/services/ReferenceNode/MODIS_Landcover_Type1_2009/MapServer",
			"isVisible": false,
			"opacity": 0.7,
		}
	]
};

var MapServiceLoader = {
	
	"loadMapServiceLayers": function(inMapServiceArray, inMap){
	 
		 var currentMapService = null;
		 var mapControl = inMap;
		 
		 try {
		 
		    //iterate all base map services in json config and add to map control
		 	for (var i = 0, il = inMapServiceArray.length; i < il; i++) {
				
		 		if (inMapServiceArray[i].mapServiceType == "fusedCache") {
	
		 			currentMapService = new esri.layers.ArcGISTiledMapServiceLayer(inMapServiceArray[i].restUrl, {
		 				id: inMapServiceArray[i].mapServiceId,
		 				opacity: inMapServiceArray[i].opacity,
		 				visible: inMapServiceArray[i].isVisible
		 			});
		 		}	
		 		else if (inMapServiceArray[i].mapServiceType == "dynamic") {
		 			
		 			currentMapService = new esri.layers.ArcGISDynamicMapServiceLayer(inMapServiceArray[i].restUrl, {
		 				id: inMapServiceArray[i].mapServiceId,
		 				opacity: inMapServiceArray[i].opacity,
		 				visible: inMapServiceArray[i].isVisible
		 			});
		 		}				
				
				mapControl.addLayer(currentMapService);	
		    }
		}
		catch(err){
			
			console.error("Error at loadMapServiceLayers() method." + "\nError Description:" + err.description);
		}
	}
};


//for loading map services
function loadMapServiceLayers(inMapServiceArray, inMap){
	 
	 var currentMapService = null;
	 var mapControl = inMap;
	 
	 try {
	 
	    //iterate all base map services in json config and add to map control
	 	for (var i = 0, il = inMapServiceArray.length; i < il; i++) {
			
	 		if (inMapServiceArray[i].mapServiceType == "fusedCache") {

	 			currentMapService = new esri.layers.ArcGISTiledMapServiceLayer(inMapServiceArray[i].restUrl, {
	 				id: inMapServiceArray[i].mapServiceId,
	 				opacity: inMapServiceArray[i].opacity,
	 				visible: inMapServiceArray[i].isVisible
	 			});
	 		}	
	 		else if (inMapServiceArray[i].mapServiceType == "dynamic") {
	 			
	 			currentMapService = new esri.layers.ArcGISDynamicMapServiceLayer(inMapServiceArray[i].restUrl, {
	 				id: inMapServiceArray[i].mapServiceId,
	 				opacity: inMapServiceArray[i].opacity,
	 				visible: inMapServiceArray[i].isVisible
	 			});
	 		}				
			
			mapControl.addLayer(currentMapService);	
	    }
	}
	catch(err){
		
		console.error("Error at loadMapServiceLayers() method." + "\nError Description:" + err.description);
	}
};
