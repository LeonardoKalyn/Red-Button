angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, SoundPlayer) {SoundPlayer.stopAudio();})
.controller('DashCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopup, StorageInit, SoundPlayer, $cordovaVibration) {
  SoundPlayer.stopAudio();
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

.controller('ProfileCtrl', function($scope, $state, SoundPlayer) {
  SoundPlayer.stopAudio();
  $scope.patient = JSON.parse(window.localStorage.patient);
  $scope.save = function(){
    window.localStorage.patient = JSON.stringify($scope.patient);
    $state.go("dashboard");
  };
})
.controller('InfoCtrl', function($scope, $state, SoundPlayer) {
  SoundPlayer.stopAudio();
  $scope.diseases = JSON.parse(window.localStorage.diseases);
  $scope.alergies = JSON.parse(window.localStorage.alergies);
  $scope.save = function(){
    window.localStorage.diseases = JSON.stringify($scope.diseases);
    window.localStorage.alergies = JSON.stringify($scope.alergies);
    $state.go("dashboard");
  };
}).
controller('ConfigCtrl', function($scope, $state, SoundPlayer, $cordovaVibration) {
  SoundPlayer.stopAudio();
  $scope.config = JSON.parse(window.localStorage.config);
  $scope.alertPlaying = null;
  $scope.playAlert = function(sound){
    if ($scope.alertPlaying !== null){
      $scope.alertPlaying.pause();
    }
    if (sound === "none")
      return;

    $scope.alertPlaying = new Audio("sounds/" + sound);
    $scope.alertPlaying.play();
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
  console.log($scope.contacts);
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

});
