

//layout
dojo.require("dijit.dijit"); // optimize: load dijit layer
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.TabContainer");

//teset for split container
dojo.require("dijit.layout.SplitContainer");

//tree
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dijit.Tree");


//after dom loads
dojo.addOnLoad(init);


function init(){
	
	//initialize navigation tree 
	self.initNavTreeSelection();	
	
	//animate selections			
};


//for handling user clicking on navigation tree
function initNavTreeSelection() {
	
	//listen for user selection of tree item
	var navTree = dijit.byId("navTree");
	
	dojo.connect(navTree, "onClick", function(item){
		
		//show url for appropriate documentation
		var documentationURL = item.url;
		
		if(documentationURL == undefined || documentationURL == "") {
			
			return;
		} 
		else {
			
			dojo.byId("devDocFrame").src = documentationURL;
		};
	});
};