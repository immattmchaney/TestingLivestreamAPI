/**
   * Sample JavaScript code for youtube.liveChatMessages.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  var apiKey = "";
  var videoID = "";
  var liveID = "Cg0KCzBhV2lqdWtTQ2pRKicKGFVDS0pleGFkQ2VObzNsdTBVMjBza21OZxILMGFXaWp1a1NDalE";

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
    return gapi.client.youtube.liveChatMessages.list({
      "liveChatId": liveID,
      "part": [
        "authorDetails"
      ],
      "maxResults": 75
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  function executeVidToLSDeets() {
    return gapi.client.youtube.videos.list({
      "part": [
        "liveStreamingDetails"
      ],
      "id": [
        videoID
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "NONE"});
    });
  
  function loadVars() {
	  apiKey = document.getElementById("apiN").value
	  videoID = document.getElementById("vidUrl").value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)[6]
  }
  
  
