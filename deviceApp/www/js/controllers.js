angular.module('starter.controllers', [])

.controller('AccountCtrl', ["AccountService", "$state", "$rootScope", "$ionicLoading", "$ionicPopup", function(AccountService, $state, $rootScope, $ionicLoading, $ionicPopup) {

  var errorHandler = function(options) {
    var errorAlert = $ionicPopup.alert({
      title: options.title,
      okType : 'button-assertive',
      okText : "Try Again"
    });
  }

  var vm = this;

  vm.login = function() {
    $ionicLoading.show();
    Stamplay.User.login(vm.user)
    .then(function(user) {
      $rootScope.user = user;
      $state.go("tasks");
    }, function(error) {
      $ionicLoading.hide();
      errorHandler({
        title : "<h4 class='center-align'>Incorrect Username or Password</h4>"
      })
    })
  }

  vm.logout = function() {
    $ionicLoading.show();
    var jwt = window.location.origin + "-jwt";
    window.localStorage.removeItem(jwt);
    AccountService.currentUser()
    .then(function(user) {
      $rootScope.user = user;
      $ionicLoading.hide();
    }, function(error) {
      console.error(error);
      $ionicLoading.hide();
    })
  }

}])

.controller('AppCtrl', ['$scope', '$ionicModal', '$ionicPopover', '$timeout', '$ionicLoading', function ($scope, $ionicModal, $ionicPopover, $timeout, $ionicLoading) {
    // Form data for the login modal
    $scope.loginData = {};

    // Display loading indicator
    $ionicLoading.show();
    $ionicLoading.hide();

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        //location.href = 'https://twitter.com/satish_vr2011';
        window.open('https://twitter.com/satish_vr2011', '_blank');
    });

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });

    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
}])

.controller('StartCtrl', ['$scope', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) { });
  

}])

.controller('PitchersCtrl', ['$scope','PitcherService', function($scope, PitcherService) {
  

  $scope.pitchers = PitcherService.getPitchers();

}])

;