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
    this.opacity = 0.5;

    if (document.getElementById(this.id) == null) {
        $('body').append('<div id="'+this.id+'"><div id="LayerMenu" style="position: relative; top: 0; right: 0;"></div><img src="' + this.fileuri + '" /></div>')
        $('#LayerMenu').append('<input value="0" id="Xpos" readonly="true" />')
        $('#LayerMenu').append('<input value="' + this.opacity + '" id="Opacity" />')
        $('#Layer').draggable();
        $('#Layer').bind('dragstop', function(event, ui) {
            $('#Xpos').attr('value', ui.offset.left + ':' + ui.offset.top);
        });

        $('#Opacity').change(function () {
            this.opacity = $('#Opacity').value;
            $('#Layer img').css('opacity', this.opacity);
        });
        $('#Layer img').css('opacity', this.opacity)
    }
}

