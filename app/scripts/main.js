$(function(){

	Handlebars.registerHelper("markdownToHtml", function(text) {
		return markdown.toHTML(text);		
	});

	// update count and header name
	// draw all artist
	reloadList = function(){
		btn =  $("#js-game-selection-btn");
		loadSelectionOption = btn.attr("data-selection");



		if (loadSelectionOption == "all") {
			var source   = $("#user-template").html();
			var template = Handlebars.compile(source);
			$("#artist-ul").append(template(artists_lookup));
			$("#artist-li-title").html(btn.text())
			$("#artist-count").html(artists_lookup.artist_lookup.length + " Guests")
			
		}else{
			console.log (artists_by_batsu);
			$("#artist-li-title").html(btn.text())
			$("#artist-count").html(artists_lookup.artist_lookup.length  + " Guests")

		}
	}

	// first time load
	reloadList();

	// handle dropdown changed	
	$(".js-game-selection-menu li a").on("click", function(e){

		// currentTarget = $(e.currentTarget);
		btn =  $("#js-game-selection-btn");
		btn.html($(this).text() + ' <span class="caret"></span>');
		btn.val($(this).data('value'));
		btn.attr("data-selection", $(this).attr("data-selection"));

		// reload-list
		reloadList();

	});



});