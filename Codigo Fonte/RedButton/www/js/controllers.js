angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, SoundPlayer) {SoundPlayer.stopAudio();})
.controller('DashCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopup, StorageInit) {
  if (!window.localStorage.initialized){
    $ionicPopup.show({
      template: 'Recomendamos que adicione suas informações e personalize o aplicativo imediatamente para maior eficiência do modo Emergência!',
      title: 'Bem vindo ao Red Button',
      scope: $scope,
      buttons: [
        { text: 'Entendi' },
      ]
    });
    StorageInit.init();
  }



})

.controller('ProfileCtrl', function($scope, $state) {
  $scope.patient = JSON.parse(window.localStorage.patient);
  $scope.save = function(){
    window.localStorage.patient = JSON.stringify($scope.patient);
    $state.go("dashboard");
  };
})
.controller('InfoCtrl', function($scope, $state) {
  $scope.diseases = JSON.parse(window.localStorage.diseases);
  $scope.alergies = JSON.parse(window.localStorage.alergies);
  $scope.save = function(){
    window.localStorage.diseases = JSON.stringify($scope.diseases);
    window.localStorage.alergies = JSON.stringify($scope.alergies);
    $state.go("dashboard");
  };
}).
controller('ConfigCtrl', function($scope, $state, SoundPlayer, $cordovaVibration) {
  $scope.config = JSON.parse(window.localStorage.config);
  $scope.alertPlaying = null;
  $scope.timeout = undefined;
  $scope.playAlert = function(sound){
    if ($scope.timeout){
      clearTimeout($scope.timeout);
    }
    if ($scope.alertPlaying !== null){
      $scope.alertPlaying.pause();
    }
    if (sound === "none")
      return;

    $scope.alertPlaying = new Audio("sounds/" + sound);
    $scope.alertPlaying.play();
    $scope.timeout = setTimeout(function(){
      $scope.alertPlaying.pause();
    }, 3000);
  };
  $scope.vibrate = function(toggle){
    if (toggle){
      document.addEventListener( "deviceready", function() {
        $cordovaVibration.vibrate( 500 ); }, false );
    }
  };
  $scope.save = function(){
    window.localStorage.config = JSON.stringify($scope.config);
    $state.go("dashboard");
  };
})
.controller('ContactsCtrl', function($scope, $state, SoundPlayer, $ionicModal, $ionicPopup) {
  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  SoundPlayer.stopAudio();
  $scope.editing = false;
  $scope.editIndex = -1;
  $scope.contacts = JSON.parse(window.localStorage.contacts);
  $scope.addContact = function(){
    $scope.newContact = {
      name: "",
      link: "",
      number: ""
    };
    $scope.editing = false;
    $scope.modal.show();
  };
  $scope.cancel = function(){
    $scope.editing = false;
    $scope.modal.hide();
  };
  $scope.save = function(){
    var contact = {name: $scope.newContact.name, link: $scope.newContact.link, number: $scope.newContact.number};
    if (!$scope.editing){
      $scope.contacts.push(contact);
    }
    else{
      $scope.contacts[$scope.editIndex] = contact;
    }
    window.localStorage.contacts = JSON.stringify($scope.contacts);
    $scope.editing = false;
    $scope.modal.hide();
  };
  $scope.startDelete = function(index){
    $ionicPopup.show({
      template: 'Deseja mesmo deletar o contato <b>' + $scope.contacts[index].name + '</b>?',
      title: 'Deletar Contato',
      scope: $scope,
      buttons: [
        { text: 'Não' },
        {
          text: 'Sim',
          type: 'button-assertive',
          onTap: function(e) {
            $scope.contacts.splice(index, 1);
            window.localStorage.contacts = JSON.stringify($scope.contacts);
          }
        }
      ]
    });

  };

  $scope.startEdit = function(index){
    var contact = $scope.contacts[index];
    $scope.newContact = {
      name: contact.name,
      link: contact.link,
      number: contact.number
    };
    $scope.editing = true;
    $scope.editIndex = index;
    $scope.modal.show();
  };

})
  .controller('StartEmergencyCtrl', function($scope, $state, $timeout, $cordovaVibration, SoundPlayer) {
    SoundPlayer.stopAudio();
  $scope.countdown = 5;
  var interval = setInterval(function(){
    if ($scope.$$destroyed){
      clearInterval(interval);
    }
    $scope.countdown--;
    $timeout(function(){});
    if ($scope.countdown === 0){
      clearInterval(interval);
      $state.go("emergency");
    }
    document.addEventListener( "deviceready", function() {
      $cordovaVibration.vibrate( 500 ); }, false );
  }, 1000);
})
  .controller('EmergencyCtrl', function($scope, $state, SoundPlayer, $cordovaVibration, $cordovaGeolocation, $cordovaSms, $http) {
    $scope.patient = JSON.parse(window.localStorage.patient);
    $scope.config = JSON.parse(window.localStorage.config);
    $scope.contacts = JSON.parse(window.localStorage.contacts);
    $scope.diseases = JSON.parse(window.localStorage.diseases);
    $scope.hasDisease = false;
    for (var d = 0; d < $scope.diseases.length; d++){
      if ($scope.diseases[d].checked){
        $scope.hasDisease = true;
        break;
      }
    }
    $scope.alergies = JSON.parse(window.localStorage.alergies);
    $scope.hasAllergy = false;
    for (var d = 0; d < $scope.alergies.length; d++){
      if ($scope.alergies[d].checked){
        $scope.hasAllergy = true;
        break;
      }
    }
    if ($scope.config.sound !== "none"){
      SoundPlayer.playAudio("sounds/" + $scope.config.sound);
    }
    var interval = setInterval(function(){
      if ($scope.$$destroyed){
        clearInterval(interval);
      }
      document.addEventListener( "deviceready", function() {
        $cordovaVibration.vibrate( 500 ); }, false );
    }, 1000);
    $scope.makeCall = function(number){
      window.plugins.CallNumber.callNumber(function(){

      }, function(){

      }, number)
    };
    var emergencyData = {
      patient: $scope.patient,
      allergies: $scope.alergies,
      diseases: $scope.diseases,
      contacts: $scope.contacts
    };
    document.addEventListener("deviceready", function () {
      $cordovaGeolocation.getCurrentPosition({timeout : 30000, enableHighAccuracy: false}).
        then(function(pos){
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        emergencyData.coordinates = {
          latitude: lat,
          longitude: long
        };
        $http.post('http://192.168.0.10:3030/api/emergency/', emergencyData);
        if ($scope.config.sendSMS){
          for (var c = 0; c < $scope.contacts.length; c++){
            var contact = $scope.contacts[c];
            $cordovaSms.send(contact.number, $scope.patient.name + " está pedindo uma ajuda de emergência!\nLatitude: " + lat + "\nLongitude: " + long + "\nVer no mapa: https://www.google.com/maps/preview/@" + lat + "," + long + ",8z", {replaceLineBreaks: true});
          }
        }
      },
      function(error){
        $http.post('http://192.168.0.10:3030/api/emergency/', emergencyData);
      });
    });
  });
