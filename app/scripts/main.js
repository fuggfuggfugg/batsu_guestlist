$(function(){

	// load snapshots
	artists_by_batsu_snapshot = null;
	artists_lookup_snapshot = null;
	artists_by_batsu_snapshot = Defiant.getSnapshot(artists_by_batsu);
	artists_lookup_snapshot = Defiant.getSnapshot(artists_lookup);
	

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
			$("#artist-ul .artist-li").remove();
			$("#artist-ul").append(template(artists_lookup));
			$("#artist-li-title").html(btn.text())
			$("#artist-count").html(artists_lookup.artist_lookup.length + " Guests")
			
		}else{

			// searching on snapshot created with web worker
			var found = JSON.search(artists_by_batsu_snapshot,"//"+loadSelectionOption);
			if (found.length > 0 && found[0].actor_list.length > 0) {
				found_list = found[0].actor_list;

				// JSON.search(artists_lookup_snapshot, "//*[artist_id='Egashira' or artist_id='Agnes_Chan']")
				var searchStr = "//*[";
				for (var i = 0; i <= found_list.length - 1; i++) {
					if (i==0) {
						searchStr += "artist_id='" + found_list[i] + "'";
					}else{
						searchStr += " or artist_id='" + found_list[i] + "'";
					}
				};

				searchStr += "]";
				guestList = JSON.search(artists_lookup_snapshot, searchStr) ;
				var guests =  {
  					"artist_lookup": guestList
  				}

				var source   = $("#user-template").html();
				var template = Handlebars.compile(source);
				$("#artist-ul .artist-li").remove();
				$("#artist-ul").append(template(guests));
				$("#artist-li-title").html(btn.text())
				$("#artist-count").html(guestList.length + " Guests")

				
			}else{
				alert("list is empty")
			}
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