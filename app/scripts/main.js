$(function(){

	// load snapshots
	artists_by_batsu_snapshot = null;
	artists_lookup_snapshot = null;
	artists_by_batsu_snapshot = Defiant.getSnapshot(artists_by_batsu);
	artists_lookup_snapshot = Defiant.getSnapshot(artists_lookup);
	artists_wiki_lookup = {};

	// update count and header name
	// draw all artist
	reloadList = function(){
		$(".loading").show();
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

				
			}
		}
	}



	// handle dropdown changed	
	$(".js-game-selection-menu li a").on("click", function(e){
		if ($(this).parent().hasClass("disabled")) {
			return false;
		};

		// currentTarget = $(e.currentTarget);
		btn =  $("#js-game-selection-btn");
		btn.html($(this).text() + ' <span class="caret"></span>');
		btn.val($(this).data('value'));
		btn.attr("data-selection", $(this).attr("data-selection"));


		// reload-list
		reloadList();
	});

	Handlebars.registerHelper("markdownToHtml", function(text, artist_wiki_id) {
		var htmlWikiMarkup = ""

		if ( artist_wiki_id != "" ) {
			wikiObj = artists_wiki_lookup[artist_wiki_id]
			htmlWikiMarkup =  "<div class='wiki-info'>" + wikiObj.extract + "<a href='" + wikiObj.fullurl + "'> Wikipedia <a/>" + "</div>";	
		}
		

		htmlMoreInfoMarkup =  "<div class='til-info'>" +  markdown.toHTML(text) + "</div>";

		return new Handlebars.SafeString(htmlWikiMarkup + htmlMoreInfoMarkup);
		

	});
	

	function split(a, n) {
	    var len = a.length,out = [], i = 0;
	    while (i < len) {
	        var size = Math.ceil((len - i) / n--);
	        out.push(a.slice(i, i + size));
	        i += size;
	    }
	    return out;
	}

	// split(buildString, Math.ceil(buildString.length/50) )
	function deferredLoad(){
		
		buildStringArr = JSON.search(artists_lookup_snapshot, "//artist_wiki_info").filter(Boolean)
		var deferreds = [];

		// divising into equal parts since only 50 rows are the limit that is returned from the api
		var splitBuildStr = split(buildStringArr, Math.ceil(buildStringArr.length/20) );

		for (var i = 0; i < splitBuildStr.length ; i++) {		
			buildString = splitBuildStr[i].join("|");
			var wiki_lookup = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&format=json&exsentences=1&exlimit=max&exintro=&inprop=url&pageids="
			wiki_lookup += buildString;
			
			
			def =  $.ajax({
				url: wiki_lookup,
				dataType: 'jsonp',
				success: function(results){
					$.extend(artists_wiki_lookup, results.query.pages);
				}
			});

			deferreds.push(def);
		};

		return deferreds;
	}

	var deferreds = deferredLoad()
	$.when.apply(null, deferreds).done(function(){
		reloadList();
	});

	// function ajax1(){
	// 	wiki_lookup = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&format=json&exsentences=1&exlimit=max&exintro=&explaintext=&inprop=url&titles=";
	// 	//Masatoshi_Hamada%7CAgnes_Chan
	// 	buildString = JSON.search(artists_lookup_snapshot, "//artist_wiki_info").filter(Boolean).join("%7C");

	// 	wiki_lookup += buildString;

	// 	return $.ajax({
	// 		url:wiki_lookup,
	// 		dataType: 'jsonp'
	// 	});
	// }

	// $.when( ajax1()).done(function(a1){
	// 	artists_wiki_lookup = Defiant.getSnapshot( a1.query.pages);
	// 	// first time load
	// 	reloadList();
	// });

	// first time load
		



});