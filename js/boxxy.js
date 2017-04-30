$(document).ready(function() {
  $("boxview").load("boxes", function() {
    var linkString = $('boxview').text();
    $('boxview').empty();
    var linkArray = linkString.split("\n");
    var i;
    var linkbox = 1;
    var column = 1;
    var html = '';

    for(i in linkArray) {
        var line = jQuery.trim(linkArray[i]);

        if(!line) {
            continue;
        } else if(line.substr(0,1) == '&') {
            if(column > 1) {
                html = html + '</ul></div></div>';
            }
            var lineArray = line.substr(2).split(' | ');
            var cols = lineArray[0];
            linkbox = 1;
            column = column + 1;
            html = html + '<div class="column col-' + cols + '">';
            continue;
        } else if(line.substr(0,1) == '|') {
            if(column > 1) {
                html = html + '</ul></div></div>';
            }
            linkbox = 1;
            column = column + 1;
            html = html + '<div class="column col-3">';
            continue;
        } else if(line.substr(0,1) == '#') {
            if(linkbox > 1) {
                html = html + '</ul></div>';
            }
            linkbox = linkbox + 1;
            html = html + '<div class="box"><h1><span class="blue">' + line.substr(2) + '</span></h1><ul><br/>';
            continue;
        } else if(line.substr(0,1) == '@') {
            var lineArray = line.substr(2).split(' | ');
            var url = lineArray[0];
            var title = lineArray[1];
            html = html + '[<a href="' + url + '"target="_blank">' + title + '</a>]<br>'
        } else {
            continue;
        }
    }

    html = html + '</ul></div></div>';
    $('boxview').append(html);
    $('ul').slideUp(0);
    $(".box").delegate('a', 'click', function(e){
        e.stopImmediatePropagation();}).click(function() {
            if ( $('ul', this).is( ":hidden" ) ) {
                $('ul', this).slideDown(80);
            } else {
                $('ul', this).slideUp(80);
            }
        });
    });
});