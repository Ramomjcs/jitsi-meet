
let api;

function entrarNaChamada() {
  const dominio = "meet.jit.si";
  const opcoes = {
    roomName: document.querySelector("#nomeDaSala").value,
    width: 700,
    height: 700,

    interfaceConfigOverwrite: { // interface_config.js
      APP_NAME: 'Educandus',
      DEFAULT_LOGO_URL: "",
      JITSI_WATERMARK_LINK: 'https://google.com',
      liveStreamingEnabled: false,
      TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview', 'fullscreen', 'hangup', 'chat', 'recording', 'invite', 'settings'],
      DEFAULT_BACKGROUND: '#000000',
    },

    configOverwrite: { // config.js
      startWithAudioMuted: true, 
      startWithVideoMuted: true,
      fileRecordingsEnabled: true,
      dropbox: {
            appKey: 'tg9ps5dsnx8bz1i', // Specify your app key here.
            // A URL to redirect the user to, after authenticating
            // by default uses:
            // 'https://jitsi-meet.example.com/static/oauth.html'
            redirectURI:
                  'https://meet.jit.si/static/oauth.html'
                 //'https://jitsi-meet.example.com/subfolder/static/oauth.html'
        },
        autoCaptionOnRecord: true
    }, 
    // interfaceConfigOverwrite: {
    //   LANG_DETECTION: true,
    //   TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview'],
    //   filmStripOnly: false,
    //   DEFAULT_BACKGROUND: '#4dbdea'
    // },

    parentNode: document.querySelector("#meet"),
    
    userInfo: {
      email: document.querySelector('#email').value,
      displayName: document.querySelector("#nome").value,
    },
  };

  api = new JitsiMeetExternalAPI(dominio, opcoes);

  api.addEventListeners({
    readyToClose: function () {
        alert('going to close');
    },
    participantLeft: function(data){
      console.log('participantLeft', data);
      alert('participantLeft');
    },
    incomingMessage: function(data){
      alert(data.nick);
    }
  });

  displayNone();
  toBack();
  //return api;
}

function comando() {
  api.executeCommand('toggleAudio');
}

function displayNone() {
  document.querySelector('#form').style.display = "none";
}

function toBack(){
  document.querySelector('#back').style.display = "flex";
}

function gravar(){
  api.executeCommand('startRecording', {
    mode: file, //recording mode, either `file` or `stream`.
    dropboxToken: 'https://jitsi-meet.example.com/static/oauth.html', //dropbox oauth2 token.
    shouldShare: true, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
});
}

