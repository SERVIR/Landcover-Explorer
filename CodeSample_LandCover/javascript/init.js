dojo.require("esri.map");

var MAP;

function init() {
	
	
	/*
	//------------INITIALIZE MAP------------
	*/
	
    //configure map slider on map
    esriConfig.defaults.map.slider = { left: "30px", top: "60px", width: null, height: "200px" };
    
    //create map extent (san fran)
    var initialExtent = new esri.geometry.Extent({"xmin":-13215580.33,"ymin":-1451997.95,"xmax":4395510.99,"ymax":10288729.59,"spatialReference":{"wkid":102100}});

	//instantiate map
	MAP = new esri.Map("map", { extent: initialExtent });
		
	
	/*
	//------------INITIALIZE MAP LAYERS------------
	*/

	//base map layers
	MapServiceLoader.loadMapServiceLayers(MAPLAYERS.baseLayers, MAP);
	
	//operational layers
	MapServiceLoader.loadMapServiceLayers(MAPLAYERS.operationalLayers, MAP);
	
	
	/*
	//------------INITIALIZE TOOLS------------
	*/
	
	//identify tool - pass in the global map object
	IdentifyTool.initIdentifyTool(MAP);
	
	//layer list tool - pass in map service rest url and layer id to use for legend
    LayerListTool.initLayerListTool();

}

dojo.addOnLoad(init);

//for loading map services
function loadMapServiceLayers(inMapServiceArray, inMap) {
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
	

//Handle resize of browser
var RESIZETIMER;
function resizeMap() {
	
    clearTimeout(RESIZETIMER);
	
    RESIZETIMER = setTimeout(function() {
		MAP.resize(); 
		MAP.reposition();
    }, 800);
};




