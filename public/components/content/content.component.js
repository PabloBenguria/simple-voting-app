'use strict';

function ContentCtrl(UserSrv){
	var vm = this;
  vm.User = UserSrv.get();
};

app.component('vaContent', {
	templateUrl: 'components/content/content.html',
	controller: ContentCtrl
});