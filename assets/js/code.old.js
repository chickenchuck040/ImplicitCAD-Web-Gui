/* global CodeMirror */

var editor = CodeMirror(document.getElementById("code"), {
  value: "function myScript(){return 100;}\n",
  mode:  "javascript"
});