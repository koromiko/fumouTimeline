console.log('\'Allo \'Allo!');


var globalSpreadSheet = "https://docs.google.com/spreadsheet/pub?key=0Avv7Q0VS0N-wdFFudFhCNEQ4Wmo1WW1VbGxaZXhRNGc&output=html";
var monthsArray = "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月".split(",");

$(document).ready(function() {

	
	window.onload = function() { init() };

	var public_spreadsheet_url = globalSpreadSheet;

	function init() {
	Tabletop.init( { key: public_spreadsheet_url,
	                 callback: function( data ){ 
	                 	
	                 	// renderWaterfallView( { "newsData":data } );
	                 	var dic = {};
	                 	$.each( data.reverse() , function(index, val) {
	                 		 /* iterate through array or object */
	                 		 var eventDate = toDate(val.date);
	                 		 var yearLabel = eventDate.getFullYear() + "." + monthsArray[ eventDate.getMonth() ];
	                 		 var itemID = eventDate.getFullYear() + "-" + eventDate.getMonth();
	                 		 var detailTime = eventDate.getFullYear() + "." + (eventDate.getMonth()+1) + "." + (eventDate.getDay()+1);
	                 		 val.timeLabel = yearLabel;
	                 		 val.detailTime = detailTime;
	                 		 if(dic[itemID]==null){
								dic[ itemID ] = [ val ];
	                 		 }else{
	                 		 	dic[ itemID ].push( val );	
	                 		 }
	                 		 
	                 	});

	                 	

						renderWaterfallView( { "newsData":dic } );

	                 },
	                 simpleSheet: true } )
	}






});

function toDate(t){
	var dd = new Date( Date.parse( t ) );
	return dd;
}

function renderWaterfallView( data ){

	
	var $container = $('#waterfall-container');
	loadTemplate( "item-template.html" , data , $container , function(){
		

		$.each( data['newsData'] , function(key, val) {
			 /* iterate through array or object */
			var $container = $('#waterfall-container-'+key);
			
			$container.masonry({
				itemSelector: '.item'
			});	
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
