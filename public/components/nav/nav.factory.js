'use strict';

app.factory('LogoutSrv', function($resource, API_URL){
  var url = API_URL + 'logout';
  return $resource(url, {id: '@id'}, {update: {method: 'PUT'}, isArray: false});
});