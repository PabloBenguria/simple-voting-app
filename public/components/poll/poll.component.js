'use strict';

function PollCtrl(API_URL, $http){

	var vm = this;
  vm.Poll = {};

  // Check if user exist to save or not his vote
  vm.saveVote = function(){
    if(vm.user.user){
      updatePoll();
    }else{
      Materialize.toast('Login to vote!', 3000, 'red lighten-1');
    }
  };
  	
  // Configuration Chart object
  var config = {
    type: 'pie',
    data: {
      datasets: [{
        data: [],
        backgroundColor: [
          window.chartColors.red,
          window.chartColors.green,
          window.chartColors.yellow,
          window.chartColors.blue,
        ],
        label: 'Dataset 1'
      }],
      labels: []
    },
    options: {
      responsive: true
    }
  };

  // Get all polls
  function getPoll(){
    $http({
      method: 'GET',
      url: API_URL + 'poll'
    }).then(function successCallback(response) {
        vm.Polls = response;
        angular.forEach(response.data, function(value, key) {
          config.data.datasets[0].data.push(value.users_voted.length);
          config.data.labels.push(value.name);
        }, config.data.datasets[0].data);
        window.myPie.update();
      }, function errorCallback(response) {
        console.log('Response error');
      });
  };

  // Update poll
  function updatePoll(){
    vm.Poll.users_voted = vm.user.user.name;
    $http({
      method: 'PUT',
      url: API_URL + 'poll',
      data: vm.Poll
    }).then(function successCallback(response) {
        config.data.datasets[0].data = [];
        config.data.labels = [];
        vm.showChart();
        if(response.data.voted){
          Materialize.toast('Already voted!', 3000, 'red lighten-1');
        }else{
          Materialize.toast('Vote saved!', 3000, 'green accent-4');
        }
      }, function errorCallback(response) {
        console.log('Response error');
      });
  };
  
  // Render Chart
  vm.showChart = function() {
    getPoll();
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx, config);
  };

  var colorNames = Object.keys(window.chartColors);
  
  vm.initMaterialize = function(){
    $(function(){
      $('select').material_select();
    });
  };
  vm.initMaterialize();

};

app.component('vaPoll', {
	templateUrl: 'components/poll/poll.html',
	controller: PollCtrl,
  bindings: {
    user: '<'
  }
});