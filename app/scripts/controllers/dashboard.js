/**
 * Created by vatsalyagoel on 30/07/2016.
 */
angular.module('dequeApp')
  .controller('DashboardCtrl', ["$scope","$firebaseAuth", "$firebaseArray", function ($scope, $firebaseAuth, $firebaseArray) {
      $scope.now = Date.now();
      var queueItemsRef = firebase.database().ref().child("queueitems");
      var user = $firebaseAuth().$getAuth();
      var query = queueItemsRef.orderByChild("userid").equalTo(user.uid);
      $scope.queueItems = $firebaseArray(query);

      $scope.addQueueItem = function(){
        var multiplier = 60000;
        $scope.queueItems.$add({
          endtime: Date.now() + (parseInt(document.getElementById('wait').value, 10) * multiplier),
          name: $scope.customer.name,
          number: parseInt(document.getElementById('customer').value, 10),
          startime: Date.now(),
          userid: $firebaseAuth().$getAuth().uid
        });
      };
    }
  ]);
