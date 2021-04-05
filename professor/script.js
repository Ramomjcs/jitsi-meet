let api;
let professorNome;

function entrarNaChamada() {
  let nomeDoProfessor = document.querySelector("#nomeProfessor").value;
  professorNome = nomeDoProfessor;
  let turma = document.querySelector("#turma").value;
  let disciplina = document.querySelector("#disciplina").value;
  let nomeDaSala = `Turma ${turma} - Professor ${nomeDoProfessor} - ${disciplina}`; //onde tem espaço, na url tem %20

  const dominio = "meet.jit.si";
  const opcoes = {

    roomName: nomeDaSala,
    width: 700,
    height: 700,

    interfaceConfigOverwrite: { // interface_config.js
      SHOW_CHROME_EXTENSION_BANNER: false, // tirar notificação da extensão chrome
      APP_NAME: 'Educandus',
      DEFAULT_LOGO_URL: "",
      JITSI_WATERMARK_LINK: 'https://google.com',
      liveStreamingEnabled: false,

      TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'profile', 'chat', 'recording',
            'etherpad', 'sharedvideo', 'settings',
            'videoquality', 'filmstrip', 'invite', 'stats',
            'tileview', 'select-background', 'mute-everyone', 'mute-video-everyone'
        ]
    },

    configOverwrite: { // config.js
      prejoinPageEnabled: false, // entra sem a tela de prejoin
      startWithAudioMuted: true, 
      startWithVideoMuted: true,
      fileRecordingsEnabled: true,
      dropbox: {
            appKey: 'tg9ps5dsnx8bz1i',
            redirectURI: 'https://meet.jit.si/static/oauth.html'
        },
        autoCaptionOnRecord: true
    }, 

    parentNode: document.querySelector("#meet"),
    
    userInfo: {
      //email: document.querySelector('#email').value,
      displayName: document.querySelector("#nomeProfessor").value
    },
  };

  api = new JitsiMeetExternalAPI(dominio, opcoes);

  api.addEventListeners({
    readyToClose: function () {
        alert('Fechando a chamada');
    },
    // participantLeft: function(data){
    //   console.log('participantLeft', data);
    //   alert(`${data.nick} saiu da chamada`); // somente ID, nick não funciona
    // },
    incomingMessage: function(data){
      alert(`${data.nick} falou no chat`);
    }
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

function estatisticas(){
  const numberOfParticipants = api.getNumberOfParticipants();
  const infor = api.getParticipantsInfo();
  let estat = {
    numeroDeAlunos: numberOfParticipants,
    infoAlunos: infor
  };

  console.log(estat);

  let algo = estat.infoAlunos.map(function(item, indice) {
      if(item.displayName != professorNome){
        return " " + item.displayName ;
      }
  })

  alert(`Número de Alunos: ${estat.numeroDeAlunos-1}; Alunos: ${algo}`);
}

// Não funciona ....................

function gravar(){
  api.executeCommand('startRecording', {
    mode: 'file', //recording mode, either `file` or `stream`.
    dropboxToken: 'https://meet.jit.si/static/oauth.html' //dropbox oauth2 token.	
  });
}

//..................................