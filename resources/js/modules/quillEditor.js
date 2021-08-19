import $ from "jquery";
/* import katex from "../libs/katex.min";
import hljs from '../libs/highlight.min';
import Quill from "../libs/quill/quill.min"; */



// Quill installation
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }], // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
    //[{ 'direction': 'rtl' }], // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['image', 'formula'], // add's image support
    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],


    ['clean'] // remove formatting button
];
var quillOptions = {
    //debug: 'info',
    modules: {
        syntax: true,
        toolbar: toolbarOptions,

    },
    placeholder: '1. You can build here your rich content and inject a snapshot in the canvas (camera button) 2.If you paste some text and format it as a list, you can Quickly generate your item (quick injection buttons)... 3. You can also paste a text encoded version of your items to massively produce items respecting a template (printer button)...',
    readOnly: false,
    theme: 'snow'
};



var editor = new Quill('.editor', quillOptions); // First matching element will be used








//$(".ql-toolbar").append('<span class="ql-formats"><button data-bs-toggle="modal" data-bs-target="#SharpModal" id="sharpCode" title="Remind #code rules">#Code</button></span>')
$(".ql-toolbar").append('<span class="ql-formats"><select class="parserSelect" title="Choose a parser"><option>#code</option><option>QTI</option><option>DOCX</option></select></span>')


// This code define how to write an handler for a Quill button toolbar !
/* var toolbar = editor.getModule('toolbar');
toolbar.addHandler('image', showImageUI);

function showImageUI(image, callback) {
    console.log("Hello Handlers!")
    var range = this.quill.getSelection();
    var value = prompt('please copy paste the image url here.');
    if (value) {
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
} */