import jQuery from "jquery";
import JSZip from "jszip";
import FileSaver from "file-saver";
const $ = jQuery.noConflict();

/* Collapsible video embed section */
var coll = document.getElementById("collapsible");
coll.addEventListener("click", function () {
  this.classList.toggle("active");
  var content = document.getElementById("embed");
  var contentBox = document.getElementById("lesson");
  if (content.style.display === "block") {
    content.style.display = "none";
    contentBox.style.flex = 0;
  } else {
    content.style.display = "block";
    contentBox.style.flex = 1;
  }
  // Increase code area height when top section is collapsed
  if ($(".tabcontent").height() > 500) {
    $(".prism-live").css({ "max-height": "100%" });
  }
});

/* Run code from the editors */
let runBtn = document.getElementById("run");
runBtn.addEventListener("click", function Run() {
  /* Extract code from textarea upon clicking run button */
  let html = document.getElementById("html-editor").value;
  let cssText = document.getElementById("css-editor").value;
  let css = "<style>" + cssText + "</style>";
  let jsText = document.getElementById("js-editor").value;
  let js = "<script>" + jsText + "</script>";

  /* Display rendered code in iframe */
  let doc = document.getElementById("iframe").contentWindow.document;
  doc.open();
  doc.write(html + css + js);
  doc.close();
});

/* Run seed code in the editors as site opens */
runBtn.click();

/* Toggle card to add and embed article/video link */
$("#add-link").click(function () {
  $("#enter-link").toggle(500);
});

/* Extract youtube id from url */
function youtubeParser(url) {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
}

/* Use user-entered url */
$("#link-done").click(function () {
  $("#enter-link").hide(500);
  let embedVideo = document.getElementById("embed-content");
  let enteredUrl = document.getElementById("link-box");
  let urlValue = enteredUrl.value;

  /* Check if url is valid */
  function validURL(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  }
  let valid = validURL(urlValue);
  /* Only embed if valid url is entered */
  if (valid) {
    let ytID = youtubeParser(urlValue);
    /* If youtube url is given, embed video */
    if (ytID) {
      let videoEmbedLink = "https://www.youtube.com/embed/" + ytID;
      embedVideo.setAttribute("src", videoEmbedLink);
      $("#embed-prompt").removeClass("embed-active");
      $("#embed-content").addClass("embed-active");
     /* If non-youtube url, display whole page in an iframe*/ 
    } else {
      embedVideo.setAttribute("src", urlValue);
      $("#embed-prompt").removeClass("embed-active");
      $("#embed-content").addClass("embed-active");
    }
  } else {
    $("#embed-prompt").text("Enter a valid url");
    $("#embed-prompt").addClass("embed-active");
    $("#embed-content").removeClass("embed-active");
  }
});

/* Clear existing values for new project */
$("#new-project").click(function () {
  $("#html-editor").val("");
  $("#css-editor").val("");
  $("#js-editor").val("");
  /* Display rendered code in iframe */
  let doc = document.getElementById("iframe").contentWindow.document;
  doc.open();
  doc.write();
  doc.close();
});

/* Save and download project files as zip */
$("#download-project").click(function () {
  var zip = new JSZip();
  let htmlContent = $("#html-editor").val();
  let cssContent = $("#css-editor").val();
  let jsContent = $("#js-editor").val();
  zip.file("index.html", htmlContent);
  zip.file("styles.css", cssContent);
  zip.file("index.js", jsContent);
  zip.generateAsync({ type: "blob" }).then(function (content) {
    // see FileSaver.js
    saveAs(content, "project.zip");
  });
});
