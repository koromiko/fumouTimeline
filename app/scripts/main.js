console.log('\'Allo \'Allo!');


var globalSpreadSheet = "https://docs.google.com/spreadsheet/pub?key=0Avv7Q0VS0N-wdFFudFhCNEQ4Wmo1WW1VbGxaZXhRNGc&output=html";

$(document).ready(function() {

	
	  window.onload = function() { init() };

	  var public_spreadsheet_url = globalSpreadSheet;

	  function init() {
	    Tabletop.init( { key: public_spreadsheet_url,
	                     callback: function( data ){ console.log( data ); loadVerticalTimeline(); },
	                     simpleSheet: true } )
	  }

	  function showInfo(data, tabletop) {
	    alert("Successfully processed!")
	    console.log(data);
	  }






});



function loadVerticalTimeline(){
	$('.timeline-jquery-example').verticalTimeline({
        key: globalSpreadSheet,
        sheetName: 'Sheet1',
        defaultDirection: 'oldest',
        
        groupFunction: 'groupSegmentByYear',
        width: '80%',
        columnMapping: { 'title': 'title', 'title_icon': 'title icon', 'date': 'date', 'display_date': 'display date', 'photo_url': 'photo url', 'caption': 'caption', 'body': 'body', 'read_more_url': 'read more url' } 
	});
}
