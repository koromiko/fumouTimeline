var globalSpreadSheet = "https://docs.google.com/spreadsheet/pub?key=0Avv7Q0VS0N-wdFFudFhCNEQ4Wmo1WW1VbGxaZXhRNGc&output=html";
var monthsArray = "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月".split(",");
var monthsEngArray = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");

var source = ['中央社', '蘋果日報'];

var modeFumou = "fumou";
var modeSunflower = "sunflower";

$(document).ready(function() {

	

	


	// $.getJSON('fumou.json', "", function(data, textStatus) {

		
	// 	var dic = {};

	// 	$.each( data.reverse() , function(index, val) {
	// 		 /* iterate through array or object */
	// 		 console.log(val );
	// 		 var eventDate = toDate(val.date);
	// 		 var yearLabel = eventDate.getFullYear() + "." + monthsArray[ eventDate.getMonth() ];
	// 		 var itemID = eventDate.getFullYear() + "-" + eventDate.getMonth();
	// 		 var detailTime =  monthsEngArray[eventDate.getMonth()] + "." + (eventDate.getDay()+1);
	// 		 val.timeLabel = yearLabel;
	// 		 val.detailTime = detailTime;

	// 		 // val.newssrc = source[index%2]
			 
	// 		 // push an empty url
	// 		 if(val.readmoreurl == null || val.readmoreurl == '') {
	// 		 	val.readmoreurl = '';
	// 		 }

	// 		 if(dic[itemID]==null){
	// 			dic[ itemID ] = [ val ];
	// 		 }else{
	// 		 	dic[ itemID ].push( val );	
	// 		 }
			 
	// 	});


		
	// 	renderWaterfallView( { "newsData":dic } );
	// });



	// if( currentMode() == modeFumou ){
	
		displayTimeline();

	// }

	// modeBtnActionBinding();
	
	// layoutBtn();

	$("#cover-image").attr( 'class' ,  modeToClass(currentMode()) );
});


function displayTimeline(){
	
	var public_spreadsheet_url = globalSpreadSheet;
	Tabletop.init( { key: public_spreadsheet_url,
						reverse: true, 
	                 callback: function( rawData, tabsheet ){ 
	                 	console.log(tabsheet.Model);
	                 	var data = rawData;
	                 	
	                 	// renderWaterfallView( { "newsData":data } );
	                 	var dic = {};

	                 	$.each( data , function(index, val) {
	                 		 /* iterate through array or object */
	                 		 var eventDate = toDate(val.date);
	                 		 var yearLabel = eventDate.getFullYear() + "." + monthsArray[ eventDate.getMonth() ];
	                 		 var itemID = eventDate.getFullYear() + "-" + eventDate.getMonth();
	                 		 var detailTime =  monthsEngArray[eventDate.getMonth()] + "." + (eventDate.getDay()+1);
	                 		 val.timeLabel = yearLabel;
	                 		 val.detailTime = detailTime;

	                 		 // val.newssrc = source[index%2]
	                 		 
	                 		 // push an empty url
	                 		 if(val.readmoreurl == null || val.readmoreurl == '') {
	                 		 	val.readmoreurl = '';
	                 		 }

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

function layoutBtn( mode ){

	console.log( );
	if( mode =="" ){
		mode = currentMode();
	}else{
		mode = currentMode();
	}
	if( mode == modeFumou ){
		$("#mode-change-btn").text('服貿大事記');
		$("#mode-change-btn").attr('href', '#sunflower');
		displayTimeline();
	}else if( mode == modeSunflower ){
		$("#mode-change-btn").attr('href', '#fumou');
		$("#mode-change-btn").text('太陽花學運');
		$('#waterfall-container').html( '<font style="color:white">建構中</font>' );
	}

}


function modeBtnActionBinding(){


	$("#mode-change-btn").click(function(){

	    var delay = 3000, fadeTime = 2000;
		$("#cover-image").fadeOut('fade', function() {
			
			$("#cover-image").attr( 'class' , modeToClass( currentMode() ) );	

			layoutBtn( targetMode() );
			
			$("#cover-image").fadeIn(fadeTime);
		});

	}).mouseenter(function(){
		
		$("#mode-change-btn").text( modeToTitle( targetMode() ));

	}).mouseleave(function(){

		$("#mode-change-btn").text( modeToTitle( currentMode() ));

	});

}


function currentMode(){


	var hash = window.location.hash.substring(1);
	if( hash != ""){
		return hash;
	}else{
		return modeFumou;
	}

}

function targetMode(){
	
	var mode = currentMode();

	if( mode == modeSunflower ){
		return modeFumou;
	}else if( mode == modeFumou ){
		return modeSunflower;
	}

}

function modeToClass( mode ){

	if( mode == modeSunflower ){
		return 'cover-sunflower';
	}else if( mode == modeFumou ){
		return 'cover-fumou';
	}
}

function modeToTitle( mode ){

	if( mode == modeSunflower ){
		return "太陽花學運";
	}else if( mode == modeFumou ){
		return "服貿大事記";
	}

}


function toDate(t){
	var dd = new Date( Date.parse( t ) );
	return dd;
}

function renderWaterfallView( data ){

	
	var $container = $('#waterfall-container');
	loadTemplate( "item-template.html" , data , $container , function(){
		

		$.each( data['newsData'] , function(key, val) {
			 /* iterate through array or object */
			var $container2 = $('#waterfall-container-'+key);
			
			

			$container2.imagesLoaded( function(){
			  $container2.masonry({
			    itemSelector : '.item'
			  });
			});	
			
			


		});

		var s = skrollr.init();
		
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
