var key = 'fileuri';

$(document).ready(function () {
    var olduri = localStorage.getItem(key) ? localStorage.getItem(key) : '';
    $('body').append('<input id="fileuri" name="fileuri" value="'+olduri+'" />');
    var overlay = document.getElementById('Layer');
    if (overlay == null && olduri)
        var overlay = new Overlay(olduri);

    $('#fileuri').change(function() {
        var fileuri = document.getElementById('fileuri').value
        if (window['localStorage'] !== null) {
            if (olduri !== fileuri)
                localStorage.setItem(key, fileuri)
        }
        if (!$('#Layer').length)
            var overlay = new Overlay(fileuri);
        else
            $('#Layer img')[0].attr('src', fileuri);
    });
});

function Overlay(fileuri) {
    this.id = 'Layer';
    this.fileuri = fileuri;

    if (document.getElementById(this.id) == null) {
        $('body').append('<div id="'+this.id+'"><img src="' + this.fileuri + '" /></div>')
        $('#Layer').draggable();
    }
}
