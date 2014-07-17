
//configure identify tool
var LAYERLIST_OPACITYID = "hwsdSoils";
var MAPSERVICE_URL_FOR_LAYER_LIST = THIS URL SHOULD POINT TO THE MAP SERVICE ENDPOINT;
var MAPSERVICE_LAYERID_FORLEGEND = "0";

dojo.require("dijit.Dialog");
dojo.require("dojo.fx");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.Slider");

var LayerListTool = {
	
	/*
	 * For initializing the layer list tool (e.g. constructing the legend)
	 */
	"initLayerListTool": function() {
		
		dojo.require("dojo.io.script");
    
	    var jsonpArgs = {
	    	url: MAPSERVICE_URL_FOR_LAYER_LIST + "/legend?f=json",
	     	callbackParamName: "callback",
	     	load: function(data){
	       
	       		var legendHTML = "<table>";
	       		
	       		//iterate legend items
				for(var i = 0, il = data.layers[0].legend.length; i < il; i++)
				{
					var currentLegendItem = data.layers[0].legend[i];
					
					//legend item label
					var currentLegendItemLabel = currentLegendItem.label;
	
					//legend item url
					var currentLegendItemUrl = MAPSERVICE_URL_FOR_LAYER_LIST + "/" + MAPSERVICE_LAYERID_FORLEGEND + "/images/" + currentLegendItem.url;
					
					//add to table
					legendHTML += "<tr><td><img src='" + currentLegendItemUrl + "' /></td><td>" + currentLegendItemLabel + "</td></tr>"			
				}
				
				legendHTML += "</table>";
				
				//put legend in dialog
				document.getElementById('legendPlaceholder').innerHTML = legendHTML;
	     	},
	     	error: function(error){
	       		targetNode.innerHTML = "An unexpected error occurred: " + error;
	     	}
	   };
	   
	   dojo.io.script.get(jsonpArgs);
		
	},
	
	/*
	 * For opening the layer list tool floating dialog
	 */
	"openLayerListDialog": function(layerListDivId){
		
		//get reference to dijit dialog object
		var layerListDlg = dijit.byId(layerListDivId);

		if(!layerListDlg.open){
			
			//slide dialog in
			this.slideInDialog("132", "110", layerListDivId);
	
			//show
			layerListDlg.show();
					
			//fade in dialog
			this.fadeInDialog(layerListDivId);		
		}
		else{
			
			//already open, but fade in to notify user
			this.fadeInDialog(layerListDivId);	
		}
	},
	
	/*
	 * For animating the opening of the layer list tool dialog
	 */
	"slideInDialog": function(inTop, inLeft, inDivId){
		
		var slideArgs = {
        	node: inDivId,
        	top: inTop,
        	left: inLeft,
			duration: 800,
			unit: "px"
    	};
		
    	dojo.fx.slideTo(slideArgs).play();
	},
	
	/*
	 * For animating the opening of the layer list tool dialog
	 */
	"fadeInDialog": function(inDivId){

        dojo.style(inDivId, "opacity", "0");
		
        var fadeArgs = {
            node: inDivId,
            duration: 700,
        };
		
        dojo.fadeIn(fadeArgs).play();
	}
};

