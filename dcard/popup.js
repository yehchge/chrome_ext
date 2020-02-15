chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    chrome.tabs.executeScript({
      code: 'console.log("dddd")'
    });
    message.innerText = request.source;
    // var mydata = JSON.parse(request.source);
    // alert(mydata);
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}


function getJsonData(){
  var message = document.querySelector('#message');
  $.ajax({
      method: "GET",
      dataType: "json",
      url: "https://www.dcard.tw/_api/forums/makeup/posts?popular=false"
  }).done(function(msg) {
      // chrome.tabs.executeScript({
      //   code: 'console.log("' + JSON.stringify(msg) + '")'
      // });

      var ss = '<table border=1>';
      for(k in msg){
        ss += '<tr><td>';
        ss += msg[k].id;
        ss += '</td><td>';
        ss += '<a href="https://www.dcard.tw/f/makeup/p/' + msg[k].id + '" target="_BLANK">' + msg[k].title + "</a>";
        ss += '</td></tr>';
      }
      ss += '</table>';
      message.innerHTML = ss;
  });
}

function myrun(){
  chrome.tabs.executeScript({
    code: 'console.log("run myrun")'
  });
  var result = getJsonData();
}


let getme = document.getElementById('getme');
getme.onclick = function(element){
  chrome.tabs.executeScript({
    code: 'console.log("click")'
  });
  myrun();
}

// window.onload = onWindowLoad;