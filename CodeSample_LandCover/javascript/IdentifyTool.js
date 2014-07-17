

//configure identify tool	
var IDENTIFYTOOL_LAYERURL = THIS URL SHOULD POINT TO THE MAP SERVICE ENDPOINT;
var IDENTIFYTOOL_INFOWINDOW_WIDTH = 250;
var IDENTIFYTOOL_INFOWINDOW_HEIGHT = 90;
var IDENTIFYTOOL_INFOWINDOW_TITLE = "Identify"

//identify tool behavior
var IdentifyTool = {
	
	"initIdentifyTool": function(inMap) {
		
		//wire up identify task to map clicks
		dojo.connect(inMap, "onClick", this.doIdentify);	
		
	},
	
	"doIdentify": function(evt) {
		
		//identify operation
		identifyTask = new esri.tasks.IdentifyTask(IDENTIFYTOOL_LAYERURL); //TODO: Don't hardcode
        identifyParams = new esri.tasks.IdentifyParameters();
        identifyParams.tolerance = 5;
        identifyParams.returnGeometry = true;
        identifyParams.layerIds = [0];
        identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
        identifyParams.width  = MAP.width;
        identifyParams.height = MAP.height;
		identifyParams.geometry = evt.mapPoint;
		identifyParams.mapExtent = MAP.extent;
		
		identifyTask.execute(identifyParams, function(idResults) { 
			
			//identify results placeholder
			var identifyContent = "IGBP Class: " + idResults[0].feature.attributes.igbp_class;
			
			//show window if we have results to show
			if(idResults.length > 0)
			{
	
				//present results to user
				MAP.infoWindow.setTitle(IDENTIFYTOOL_INFOWINDOW_TITLE);
				MAP.infoWindow.setContent(identifyContent);
				MAP.infoWindow.resize(IDENTIFYTOOL_INFOWINDOW_WIDTH, IDENTIFYTOOL_INFOWINDOW_HEIGHT);
				MAP.infoWindow.show(evt.screenPoint, MAP.getInfoWindowAnchor(evt.screenPoint));
			}
		});
	}
};
