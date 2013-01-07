var FILEURI = 'fileuri';

window.addEventListener('load', function() {
    var fileselector = new FileSelector();
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

    this.fileuri = window.URL.createObjectURL(file);
    var overlay = new Layer(this);
    overlay.render();
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


/* Layer
 */
function Layer(selector) {
    this.selector = selector.fileuri;
    this.opacity = 0.5;
    this.id = 'Layer';
}

Layer.prototype.render = function() {
    var body = document.getElementsByTagName('body')[0];
    var layerMenu = document.createElement('div');
    layerMenu.class = 'Layer';

    var img = document.createElement('img');
    img.src = this.fileuri;
    img.style.opacity = this.opacity;
    layerMenu.appendChild(img);
    body.appendChild(layerMenu);
}
