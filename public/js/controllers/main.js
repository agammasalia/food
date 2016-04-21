angular.module('foodController', [])

	// inject the Food service factory into our controller
	.controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all foods and show them
		// use the service to get all the foods
		/* GET all foods */
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the name and price to the node API
		/* POST add food */
		/* BODY name, price */
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined && $scope.formData.price != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)
					.success(function(data) {
						$scope.getTotalBill();
						$scope.loading = false;
						$scope.formData = {};
						$scope.foods = data;
					});
			}
		};

		// DELETE ==================================================================
		/* Delete a food item */
		/* PARAMS _id */
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful deletion
				.success(function(data) {
					$scope.getTotalBill();
					$scope.loading = false;
					$scope.foods = data;
				});
		};

		// GET =====================================================================
		/* Get bill amount */
		$scope.getTotalBill = function() {
			$scope.loading = true;

			Foods.getBill()
				// if successful calculation
				.success(function(data) {
					$scope.loading = false;
					$scope.total = data;
				});
		};

	}]);
