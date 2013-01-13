var FILEURI = 'fileuri';


window.addEventListener('load', function() {
    window.pixelfly_dialog = new LayerDialog();
    if (window.pixelfly_dialog.layers.length == 0) {
        var layer = new Layer();
    }
});


/* Layerdialog
 */
function LayerDialog() {
    this.layers = new Array();
    this._domid = 'pixelfly.layerdialog';
    this._layerMenu = document.createElement('ul');
    this._layerMenu.id = this._domid;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(this._layerMenu);
}
LayerDialog.prototype.appendLayer = function(layer) {
    this.layers.push(layer);
    this._layerMenu.appendChild(layer.html_container);
}


/* FileSelector
 */
function FileSelector(layer) {
    this.layer = layer;
    this.fileuri = null;
    this._input_id = 'fileuri';
}
FileSelector.prototype.handleChange = function(input, e) {
    var file = input.files[0];
    if (file == undefined) {
        return false
    }

    this.fileuri = window.URL.createObjectURL(file);
    this.layer.update();
    return true;
}
FileSelector.prototype.select_file = function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.name = this._input_id;
    input.id = this._input_id;

    input.addEventListener(
            'change',
            this.handleChange.bind(this, input),
            true);
    return input;
}


/* Layer
 */
function Layer() {
    this.opacity = 0.5;
    this.id = 'layer1';
    this.x = 0;
    this.y = 0;
    this.mouse_x = 0;
    this.mouse_y = 0;
    this.drag = false;

    this.img = null;

    this.html_container = document.createElement('li');
    this.html_container.id = this.id;

    this.fileselector = new FileSelector(this);
    if (! this.fileselector.fileuri) {
        var input = this.fileselector.select_file();
        this.html_container.appendChild(input);
        window.pixelfly_dialog.appendLayer(this);
    }
}
Layer.prototype.update = function() {
    var img = this.getHTMLNode();
    if (this.html_container.lastChild instanceof HTMLImageElement) {
        this.html_container.removeChild(this.html_container.lastChild);
    }
    this.html_container.appendChild(img);
}
/* Re-render the layer (e.g. fileuri has changed)
 */
Layer.prototype.getHTMLNode = function() {
    this.img = document.createElement('img');
    this.img.id = this.id + '_img';
    this.img.src = this.fileselector.fileuri;
    this.img.style.opacity = this.opacity;
    this.img.style.position = 'fixed';
    this.img.style.top = 0;
    this.img.style.left = 0;
    this.img.addEventListener('mousedown',
            this.layerMouseDown.bind(this),
            true);
    this.img.addEventListener('mousemove',
            this.layerMouseMove.bind(this),
            true);
    this.img.addEventListener('mouseup',
            this.layerMouseUp.bind(this),
            true);
    return this.img;
}
Layer.prototype.layerMouseMove = function(e) {
    if (! this.drag) {
        return
    }
    this.img.style.left = String(this.x + e.clientX - this.mouse_x) + 'px';
    this.img.style.top = String(this.y + e.clientY - this.mouse_y) + 'px';
}
Layer.prototype.layerMouseDown = function(e) {
    this.drag = true;
    this.mouse_x = e.clientX;
    this.mouse_y = e.clientY;
}
Layer.prototype.layerMouseUp = function(e) {
    this.drag = false;
}
