var game7App = angular.module("game7App", []);
game7App.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
});

game7App.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

game7App.service("Ajax", function($http){
    return {
        request:function (method, url, data, callback_success, callback_error) {
            $http({
                method: method,
                params: data,
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                callback_success(response);
            }, function errorCallback(response) {
                callback_error(response);
            });
        }
    }
});


game7App.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

game7App.directive("fileread", [function () {
  return {
    scope: { fileread: "=" },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () { scope.fileread = loadEvent.target.result; });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
     }
   }
 }]);
