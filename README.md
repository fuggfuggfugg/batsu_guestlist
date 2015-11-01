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

