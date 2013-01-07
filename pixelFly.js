var FILEURI = 'fileuri';
var dialog = new LayerDialog();

window.addEventListener('load', function() {
    if (dialog.layers.length == 0) {
        var fileselector = new FileSelector();
    }
    dialog.render();
});


/* FileSelector
 */
function FileSelector() {
    this.fileuri = null;
    this._input_id = 'fileuri';
    if (!this.fileuri)
        this.render();
}
FileSelector.prototype.handleChange = function(e) {
    var file = this.files[0];
    if (file == undefined) {
        return false
    }

    var fileuri = window.URL.createObjectURL(file);
    var layer = new Layer(fileuri);
    dialog.appendLayer(layer);
    return true;
}
FileSelector.prototype.render = function() {
    var body = document.getElementsByTagName('body')[0];
    var input = document.createElement('input');
    input.type = 'file';
    input.name = this._input_id;
    input.id = this._input_id;
    body.appendChild(input);

    input.addEventListener(
            'change',
            this.handleChange,
            true);
}


/* Layerdialog
 */
function LayerDialog() {
    this.layers = new Array();
    this._domid = 'pixelfly.layerdialog';
}
LayerDialog.prototype.render = function() {
    var body = document.getElementsByTagName('body')[0];
    this._layerMenu = document.createElement('ul');
    this._layerMenu.id = this._domid;
    body.appendChild(this._layerMenu);
}
LayerDialog.prototype.appendLayer = function(layer) {
    this.layers.push(layer);
    this._layerMenu.appendChild(layer.getHTMLNode());
}


/* Layer
 */
function Layer(fileuri) {
    this.opacity = 0.5;
    this.id = 'Layer ' + fileuri;
    this.fileuri = fileuri;
}
Layer.prototype.getHTMLNode = function() {
    var img = document.createElement('img');
    img.src = this.fileuri;
    img.style.opacity = this.opacity;
    return img;
}
