angular.module('scheduleService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Schedules', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/schedules');
			},
			create : function(scheduleData) {
				return $http.post('/api/schedules', scheduleData);
			},
			update : function(id) {
				return $http.put('/api/schedules/' + id);
			},
			delete : function(id) {
				return $http.delete('/api/schedules/' + id);
			}
		}
	}]);