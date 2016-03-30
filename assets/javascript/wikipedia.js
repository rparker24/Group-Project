$('#submit').click(function(){
    var searchText = $('#address').val().trim();
    searchText = searchText.replace(" ", "_");
    var url = "https://en.wikipedia.org/wiki/" + searchText;
    var title = url.split("/");
      title = title[title.length - 1];
      console.log(url);
    //Get Leading paragraphs (section 0)
    $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=text&section=0&format=json&callback=?", function (data) {
        for (text in data.parse.text) {
            var text = data.parse.text[text].split("<p>");
            var pText = "";
            for (p in text) {
                //Remove html comment
                text[p] = text[p].split("<!--");
                if (text[p].length > 1) {
                    text[p][0] = text[p][0].split(/\r\n|\r|\n/);
                    text[p][0] = text[p][0][0];
                    text[p][0] += "</p> ";
                }
                text[p] = text[p][0];
                //Construct a string from paragraphs
                if (text[p].indexOf("</p>") == text[p].length - 5) {
                    var htmlStrip = text[p].replace(/<(?:.|\n)*?>/gm, '') //Remove HTML
                    var splitNewline = htmlStrip.split(/\r\n|\r|\n/); //Split on newlines
                    for (newline in splitNewline) {
                        if (splitNewline[newline].substring(0, 11) != "Cite error:") {
                            pText += splitNewline[newline];
                            pText += "\n";
                        }
                    }
                }
            }
            pText = pText.substring(0, pText.length - 2); //Remove extra newline
            pText = pText.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)
            document.getElementById('div_text').innerHTML = pText;
        }
    });
});