angular.module('starter.services', [])

.factory('SoundPlayer', function() {
  return {
    audio: null,
    playAudio: function(sound){
      this.audio = new Audio(sound);
      this.audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      this.audio.play();
    },
    stopAudio: function(){
      if (this.audio === null)
        return;
      this.audio.addEventListener('ended', function() {
        this.pause();
        this.currentTime = 0;
      }, false);
    }
  }
})


.factory('StorageInit', function() {

  return {
    init: function() {
      console.log("Init app storage data");
      window.localStorage.initialized = true;
      window.localStorage.patient = JSON.stringify({
        name: "",
        healthPlan: "",
        planNumber: "",
        bloodType: "",
        donor: "false"
      });
      window.localStorage.contacts = JSON.stringify([]);
      window.localStorage.config = JSON.stringify({
        sound: "ambulance.mp3",
        vibrate: true
      });
      window.localStorage.diseases = JSON.stringify([
        {
          name: "Alcoolismo",
          checked: false
        },
        {
          name: "Alzheimer",
          checked: false
        },
        {
          name: "Arritimias cardíacas",
          checked: false
        },
        {
          name: "Asma",
          checked: false
        },
        {
          name: "AVC",
          checked: false
        },
        {
          name: "Colesterol Alto",
          checked: false
        },
        {
          name: "Diabetes",
          checked: false
        },
        {
          name: "Hepatite Viral",
          checked: false
        },
        {
          name: "Hipertensão arterial",
          checked: false
        },
        {
          name: "HIV",
          checked: false
        },
        {
          name: "Insuficiência Renal Crônica",
          checked: false
        },
        {
          name: "Leucemia",
          checked: false
        }

      ]);
      window.localStorage.alergies = JSON.stringify([
        {
          name: "Acaro",
          checked: false
        },
        {
          name: "Amendoim",
          checked: false
        },
        {
          name: "Camarão",
          checked: false
        },
        {
          name: "Canela",
          checked: false
        },
        {
          name: "Frutas Cítricas",
          checked: false
        },
        {
          name: "Frutos do Mar",
          checked: false
        },
        {
          name: "Glúten",
          checked: false
        },
        {
          name: "Leite",
          checked: false
        },
        {
          name: "Milho",
          checked: false
        },
        {
          name: "Ovo",
          checked: false
        },
        {
          name: "Peixe",
          checked: false
        },
        {
          name: "Picada de Abelha",
          checked: false
        },
        {
          name: "Pimenta",
          checked: false
        },
        {
          name: "Polen",
          checked: false
        },
        {
          name: "Rinite Alérgica",
          checked: false
        },
        {
          name: "Soja",
          checked: false
        }
      ]);
    },
  };
});
