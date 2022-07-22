/**
   * Sample JavaScript code for youtube.liveChatMessages.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  var apiKey = "";
  var videoID = "";
  var liveID = "Cg0KCzBhV2lqdWtTQ2pRKicKGFVDS0pleGFkQ2VObzNsdTBVMjBza21OZxILMGFXaWp1a1NDalE";

  var messageDeets = null;
  var lsDeets = null;
  var running = false;
  
  const names = [];
  var currentIndex = 0;

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey(apiKey);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    gapi.client.youtube.liveChatMessages.list({
      "liveChatId": liveID,
      "part": [
        "authorDetails",
		"snippet"
      ],
      "maxResults": 75
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
	        messageDeets = response;
                //console.log("Response", response);
			populateTable();
			if(running) {
			    setTimeout(execute, messageDeets.result.pollingIntervalMillis)
			}
              },
              function(err) { console.error("Execute error", err); });
    return messageDeets
  }
  function executeVidToLSDeets() {
    gapi.client.youtube.videos.list({
      "part": [
        "liveStreamingDetails"
      ],
      "id": [
        videoID
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
	        lsDeets = response;
	        liveID = lsDeets.result['items'][0]['liveStreamingDetails']['activeLiveChatId']
                //console.log("Response", response);
			running = true;
	        execute();
              },
              function(err) { console.error("Execute error", err); });
    return lsDeets
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "NONE"});
    });
  
  function loadVars() {
	  apiKey = document.getElementById("apiN").value
	  videoID = document.getElementById("vidUrl").value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)[6]
  }

  function populateTable() {
	for(var i = 0; i < messageDeets['result']['items'].length; i++) {
		names.push([ messageDeets['result']['items'][i]['authorDetails']['displayName'], messageDeets['result']['items'][i]['snippet']['publishedAt']]);
	}
  
    var table = document.getElementById('messageTbl');
	for(var i = currentIndex; i < names.length; i++) {
    //messageDeets['result']['items'].forEach( item => {
      let row = table.insertRow(0);
      let date = row.insertCell(0);
      date.innerHTML = names[i][0];
      let name = row.insertCell(1);
      name.innerHTML = names[i][1];
    });
	currentIndex = names.length;
  }
  
  function stopRunning() { running = false; }

  function resetTable() {
    var table = document.getElementById('messageTbl');
	
    while(table.rows.length) { table.deleteRow(0); }
	while (names.length) { names.pop(); }
  }
  
  
