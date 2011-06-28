var key = 'fileuri';

$(document).ready(function () {
    var olduri = localStorage.getItem(key) ? localStorage.getItem(key) : '';
    $('body').append('<input id="fileuri" name="fileuri" value="'+olduri+'" />');
    var overlay = document.getElementById('Layer');
    if (overlay == null && olduri)
        var overlay = new createOverlay(olduri);

    $('#fileuri').change(function() {
        var fileuri = document.getElementById('fileuri').value
        if (fileuri == '') {
            delete localStorage[key];
            return true;
        }
        if (window['localStorage'] !== null) {
            if (olduri !== fileuri)
                localStorage.setItem(key, fileuri)
        }
        if (!$('#Layer').length)
            var overlay = createOverlay(fileuri);
        else
            $('#Layer img').attr('src', fileuri);
    });
});

function createOverlay(fileuri) {
    var id = 'Layer';
    var opacity = 0.5;

    if (document.getElementById(id) == null) {
        $('body').append('<div id="'+id+'"><div id="LayerMenu" style="position: relative; top: 0; right: 0;"></div><img src="' + fileuri + '" /></div>')
        $('#LayerMenu').append('<input value="0" id="Xpos" readonly="true" />')
        $('#LayerMenu').append('<input value="' + opacity + '" id="Opacity" />')
        $('#LayerMenu').append('<a href="#" id="Close">Close</a>')
        $('#Layer').draggable();
        $('#Layer').bind('dragstop', function(event, ui) {
            $('#Xpos').attr('value', ui.offset.left + ':' + ui.offset.top);
        });

        $('#Opacity').change(function () {
            $('#Layer img').css('opacity', $('#Opacity').attr('value'));
        });
        jQuery('#Opacity').trigger(jQuery.Event('change'));

        $('#Close').click(function() {
            $('#fileuri').attr('value', '');
            jQuery('#fileuri').trigger(jQuery.Event('change'));
            $('#' + id).empty();
        });
    }
}

