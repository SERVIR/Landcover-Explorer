
var LandCoverSliderTool = {
	
	"changeLandCoverMapService": function(year) {
		
		//show layer of interest
		var targetId = "landCover" + year;
		
		var targetLayer = MAP.getLayer(targetId);
		
		targetLayer.show();
		
		//hide operational layers
		for(var i = 0, il = MAPLAYERS.operationalLayers.length; i < il; i++)
		{
			var currentMapServiceId = MAPLAYERS.operationalLayers[i].mapServiceId;
			
			if(currentMapServiceId != targetId)
			{
				var layerToHide = MAP.getLayer(MAPLAYERS.operationalLayers[i].mapServiceId);
				
				layerToHide.hide();
			}
		}	
	},
	
	/*
	 * For toggling on/off a map service layer in the layer list.  
	 */
	"toggleMapLayer": function(checkBoxName, layerId) {
		
		var checkBox = document.getElementById(checkBoxName);
		var targetLayer = MAP.getLayer(layerId);
	
		//turn on layer
		if(checkBox.checked == true)
		{
			targetLayer.show();
		}
		//turn off layer
		else
		{
			targetLayer.hide();
		}
	},

};
