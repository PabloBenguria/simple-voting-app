'use strict';

function NavCtrl($document, API_URL, LogoutSrv){

  var vm = this;
  vm.logout = function(){
    LogoutSrv.get();
    vm.user = null;
  };
  
  vm.initMaterialize = function(){
    $(function(){
      vm.$dropdownButton = $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, 
        gutter: 0, 
        belowOrigin: true, 
        alignment: 'left',
        stopPropagation: false 
      });
    });
  };
  vm.initMaterialize();

};

app.component('vaNav', {
	templateUrl: 'components/nav/nav.html',
	controller: NavCtrl,
  bindings: {
    user: '<'
  }
});