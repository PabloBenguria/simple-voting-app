'use strict';

app.factory('UserSrv', function($resource, API_URL){
  var url = API_URL + 'twitter';
  return $resource(url, {id: '@id'}, {update: {method: 'PUT'}, isArray: false});
});