let api;

function entrarNaChamada() {
  let nomeDoProfessor = document.querySelector("#nomeProfessor").value;
  let turma = document.querySelector("#turma").value;
  let disciplina = document.querySelector("#disciplina").value;
  let nomeDaSala = `Turma ${turma} - Professor ${nomeDoProfessor} - ${disciplina}`; //onde tem espaço, na url tem %20

  const dominio = "meet.jit.si";
  const opcoes = {

    roomName: 'Turma%203B%20-%20Professor%20Ramom%20-%20Matem%C3%A1tica',
    width: 700,
    height: 700,

    interfaceConfigOverwrite: { // interface_config.js
      SHOW_CHROME_EXTENSION_BANNER: false, // tirar notificação da extensão chrome
      APP_NAME: 'Educandus',
      DEFAULT_LOGO_URL: "",
      JITSI_WATERMARK_LINK: 'https://google.com',
      liveStreamingEnabled: false,
      TOOLBAR_BUTTONS: ['microphone', 'camera', 'fodeviceselection', 'settings', , 'tileview', 'fullscreen', 'hangup', 'chat', 'raisehand', 'videoquality', 'desktop'], //'invite', 
      DEFAULT_BACKGROUND: '#000000',
    },

    configOverwrite: { // config.js
      prejoinPageEnabled: false, // entra sem a tela de prejoin
      startWithAudioMuted: true, 
      startWithVideoMuted: true,
      remoteVideoMenu: {
        disableKick: true
      },
      disableRemoteMute: true
    }, 

    parentNode: document.querySelector("#meet"),
    
    userInfo: {
      //email: document.querySelector('#email').value,
      //displayName: document.querySelector("#nomeProfessor").value
      displayName: 'Fernanda'
    },
  };

  api = new JitsiMeetExternalAPI(dominio, opcoes);

  api.addEventListeners({
    readyToClose: function () {
        alert('going to close');
    },
    // participantLeft: function(data){
    //   console.log('participantLeft', data);
    //   alert(`${data.nick} saiu da chamada`);
    // }
    // incomingMessage: function(data){
    //   alert(data.nick);
    // }
  });

  displayNone();
  toBack();
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

