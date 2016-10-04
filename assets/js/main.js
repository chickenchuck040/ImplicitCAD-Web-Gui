/* global Split */
/* global CodeMirror */
/* global startRendering */

var renderBtn = document.getElementById("renderBtn");

Split(['#editorDiv', '#viewerDiv'], {
    gutterSize: 4,
    cursor: 'col-resize',
    onDrag: onRendererResize
});

var editor = CodeMirror(document.getElementById("editor"), {
    lineNumbers: true,
    value: "import Graphics.Implicit\nmain = writeSTL 0.5 \"model.stl\" (cylinder 2 5)",
    mode: "haskell"
});

renderBtn.onclick = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            startLoading("assets/models/" + this.responseText + "/output/model.stl")
        }
    };
    xhttp.open("POST", "render", true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send(editor.getValue());
}

startRendering();