angular.module('scheduleController', [])

	// inject the Schedule service factory into our controller
	.controller('mainController', ['$scope','$http','Schedules','$filter', function($scope, $http, Schedules, $filter) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all schedules and show them
		// use the service to get all the schedules
		Schedules.get()
			.success(function(data) {
				data.sort(function(a,b){
					return new Date(a.date) - new Date(b.date);
				})
				$scope.schedules = data;
				$scope.loading = false;
			});

		$scope.formData.date = $filter("date")(Date.now(), 'yyyy-MM-dd');

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createSchedule = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log($scope.formData, 'formdata');

			if (($scope.formData.start && $scope.formData.end) != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Schedules.create($scope.formData)

					// if successful creation, call our get function to get all the new schedules
					.success(function(data) {

						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.schedules = data; // assign our new list of schedules
					});
			}
		};

		// UPDATE ==================================================================
		// update a schedule after checking it
		$scope.updateSchedule = function(id) {
			$scope.loading = true;

			Schedules.update(id)
				// if successful creation, call our get function to get all the new schedules
				.success(function(data) {
					$scope.loading = false;
					$scope.schedules = data; // assign our new list of schedules
				});
		};

		// DELETE ==================================================================
		// delete a schedule after checking it
		$scope.deleteSchedule = function(id) {
			$scope.loading = true;
			Schedules.delete(id)
				// if successful creation, call our get function to get all the new schedules
				.success(function(data) {
					$scope.loading = false;
					$scope.schedules = data; // assign our new list of schedules
				});
		};
	}]);