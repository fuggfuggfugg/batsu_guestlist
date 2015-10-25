Welcome. You love GNT? I do too. However it was a pain to pause the video constantly to google the celebrities as they appear. 
So I set out to build up a list all in one place. The idea is to just have a line or two of some cool info on the celebrity and provide link to find out more. The list is incomplete, If you wish to help. Let me know. 

Click to view --> https://fuggfuggfugg.github.io/batsu_guestlist/

As for the coding bit: 
* I am using a yeoman webapp and built on top of it. 
* JS libraries I'm using are:
   * Bootstrap - mostly Javascript with overriden styles in main.scss
   * Handlebar - JS templating for each artist. 
   * markdown-js - to convert artist description from text to markdown. Allows formatting in description.
   * defiant.js - provides good searching capability on huge JSON structures. Initially I use it to get artists by dropdown selection. I intend to add a search textbox too. My data comes from a huge JSON structure. I was too lazy to create databases and all that. 
   
Process so far: 
* Initially I set out to watch every video and start typing a list, I got annoyed and looked for other options. 
* I was lucky to find imdb link for couple of series that listed out the cast list. (Big TQ to whoever compiled that list). 
   * http://www.imdb.com/title/tt2565758/fullcredits?ref_=tt_cl_sm#cast
   * http://www.imdb.com/title/tt2158889/fullcredits?ref_=tt_cl_sm#cast
   * http://www.imdb.com/title/tt1804515/fullcredits?ref_=tt_cl_sm#cast
   * http://www.imdb.com/title/tt2535036/fullcredits?ref_=tt_cl_sm#cast
   * http://www.imdb.com/title/tt1575835/fullcredits?ref_=tt_cl_sm#cast
   * http://www.imdb.com/title/tt3350976/fullcredits?ref_=tt_cl_sm#cast
   * http://www.imdb.com/title/tt4216806/fullcredits?ref_=tt_cl_sm#cast
   * - these lists may be incomplete or inaccurate
* [I then create a unique master list of all the artists in Google docs Spreadsheets](https://docs.google.com/spreadsheets/d/1RzqkaOmO1_RbBnlFByUQCiR9rOvTVNQq0m1WjW_UhFE/edit?usp=sharing)
   * This spreadsheet contains a sheet for every show.
   * The last sheet is a unique lookup list, since some artists appear in multiple series, I'd rather have one list to maintain than to update information everywhere.
   * I create a JSON structured list using online [CSV to JSON converter](http://codebeautify.org/csv-to-xml-json)
   * The json files are located [here](https://github.com/fuggfuggfugg/batsu_guestlist/tree/master/app/json_lookup)
   * When my page first loads, I simply load data from the artists_lookup.json.
   * When a series is selected from the dropdown, I then use defiant to perform quick search and build a list and re-render. Simple. 
   
Pending Stuff: 
* Maintain a full Imgur album of all celebrities. 
* Update the lookup spreadsheet with description of each celebrity, image link, and link to their twitter/imdb or wikia. 
* Some series are empty, I'll have to go through remaining videos and manually update. 
* Add bootstrap scrollspy for easier navigation. 


****
Data Compiled from 
Wiki, google search
http://echie7.blogspot.com/p/airport-batsu-subbed.html
http://echie7.blogspot.com/2012/02/airport-151-180-people-and-item.html
http://mygakiblog.blogspot.com/
https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&format=json&exintro=&explaintext=&inprop=url&titles=Masatoshi_Hamada
https://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary
https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&prop=extracts|info&format=json&exintro=&explaintext=&inprop=url&titles=Masatoshi_Hamada

https://stackoverflow.com/questions/3709597/wait-until-all-jquery-ajax-requests-are-done


var mwjs = MediaWikiJS({baseURL: 'https://en.wikipedia.org', apiPath: '/w/api.php'});
mwjs.send({
   action: 'query', 
   prop: 'extracts|info', 
   format: 'json',
   exsentences:4,
   exlimit:'max',
   exintro:'',
   explaintext:'',
   inprop:'url',
   pageids: '2233913|21529550|35216335|36097029|2590542|2303220|17182565|14490434|3315152|14742810|1691144|45469877|1024054|1932236|38981051|17673013|22599999|45667826|12925202|36340083|3696621|2747684|26987842|4685657|26741285|4424576|7193278|19662294|24665533|47968026|16706483|9834906|20273201|12387170|296879|1448035|174147|13594784|22382187|7541034|41865031|2793564|37713149|12866371|1367269|1845225|11842920|43873550|9981220|7396866|38174078|21620769|38947771|47922518|2793564|40987357|13209546|1033492|33415670|26504249|4047051|2347647|40410221|2882926|3023093|5306927|33496343|35632215|4272940|15700739|47551192|9352552|825213|1989037|14373561|33415670|47528061|4933332|41899251|39492436|21251363|11341280|27666129|21989882|1101058|22876754|5321723|46536196|4609483|2035031|1225292|1561716|2318951|8109224|40410221|2377157'

}, function (data) {
    var pages = data.query.pages;
    console.log(pages);
});

