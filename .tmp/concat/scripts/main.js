console.log('\'Allo \'Allo!');


var globalSpreadSheet = "https://docs.google.com/spreadsheet/pub?key=0Avv7Q0VS0N-wdFFudFhCNEQ4Wmo1WW1VbGxaZXhRNGc&output=html";

$(document).ready(function() {

	
	window.onload = function() { init() };

	var public_spreadsheet_url = globalSpreadSheet;

	function init() {
	Tabletop.init( { key: public_spreadsheet_url,
	                 callback: function( data ){ 
	                 	console.log( data ); 
	                 	renderWaterfallView( { "newsData":data } );
	                 },
	                 simpleSheet: true } )
	}






});


function renderWaterfallView( data ){

	var $container = $('#waterfall-container');

	loadTemplate( "item-template.html" , data , $container , function(){
		// initialize
		$container.masonry({
		  
		  itemSelector: '.item'
		});	
	} );

	

}



/* load tempalte file and render it to #entry */
function loadTemplate( templateName , data , entry , callback ){

	// console.log(templateName, data);

    $.ajax({
		url : templateName ,
		dataType: "text",
		success : function (source) {
            
			var template = Handlebars.compile(source);
			var html    = template(data);

			/* put html string into entry */
			entry.html( html );	
			if(callback){
				callback();	
			}
			

        }
    });
    
}
