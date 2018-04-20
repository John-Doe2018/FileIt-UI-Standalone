﻿fileItApp
		.controller(
				'MainController',
				[
						'$rootScope',
						'$scope',
						'$location',
						'$window',
						'$translate',
						'$interval',
						'LoadingService',
						function($rootScope, $scope, $location, $window,
								$translate, $interval, LoadingService) {
							LoadingService.hideLoad();
							var locale;
							$translate.use("en_US");
							$(function() {
								$(document).on('click', 'input[type=text]',
										'input[type=number]', function() {
											this.select();
										});
							});
							$location.path('/login');
							$scope.loginState = false;
							$scope.headerPath = "app/modules/header/views/header.html";
							$scope.footerPath = "app/modules/header/views/footer.html";
							// below field controls the currency position
							$scope.leftPlacing = true;

							$(document)
									.on(
											"keydown",
											function(e) {
												if (e.which === 8
														&& !$(e.target)
																.is(
																		"input:not([readonly]):not([type=radio]):not([type=checkbox]), textarea, [contentEditable], [contentEditable=true]")) {
													e.preventDefault();
												}
											});

							/**
							 * It is the common route change success call back.
							 * It will be triggered when the router changes
							 */
							$scope.$on('$routeChangeSuccess', function(next,
									current) {
								// $translate.use(OMNI_PROP.locale);
								$scope.fitScreen();
							});

							$scope.$on('ErrorData', function(event, args) {
								$scope.errorData = args.errStatus;
								$('#bizErrorModal').modal('show');
							});

							$scope.$on('SuccessModal', function(event, args) {
								$scope.sucessMessage = args.sucessMsg;
								$('#successMsgModal').modal('show');
							});
							$scope.$on('WarningModal', function(event, args) {

								$scope.warningMessage = args.sucessMsg;
								$('#warningMsgModal').modal('show');
							});

							/**
							 * Window resize call back. Call fitScreen() when
							 * window is resized.
							 */
							var windowObj = angular.element($window);
							windowObj.bind('resize', function() {
								$scope.fitScreen();
							});

							/**
							 * This method sets height of ng-view area. To
							 * initiate fitScreen() method call after 100ms
							 * delay Reason: ng-view takes time to load the page
							 */
							$scope.fitScreen = function() {
								var fitScreenDelay = $interval(function() {
									$interval.cancel(fitScreenDelay);
									var windowHeight = $(window).height();
									var headerHeight = $('.header').height();
									/*
									 * var footerHeight = $('.loginFooter')
									 * .height();
									 */
									/*
									 * var appPageContainer = windowHeight -
									 * headerHeight - footerHeight;
									 */
									var appPageContainer = windowHeight
											- headerHeight;
									$('.app-page-container').height(
											appPageContainer + 'px');
								}, 50);
								$rootScope.$broadcast('FitSideMenu');
							};

							// call fit screen when App loads for the first time
							$scope.fitScreen();
							$scope.$on('FitScreen', function() {
								$scope.fitScreen();
							});

							/**
							 * Successful login callback
							 */

							$scope.$on('OnLogOut', function() {
								RESOURCE_SVC.setResourceList([]);
								$scope.sideMenuPath = '';
								$scope.loginState = false;
							});

							$scope.$on('loginSuccess', function() {
								$scope.loginState = true;
							});

							$scope.$on('fullWidth', function() {
								$scope.loginState = false;
							});

							$scope.$on('partialWidth', function() {
								$scope.loginState = true;
							});

							/**
							 * This is the common function can be used to
							 * convert the amount with standard format
							 */
							$scope.parseFloat = function(amount) {
								amount = parseFloat(amount).toFixed(2);
								if (isNaN(amount)) {
									amount = 0.00;
								}
								return amount;
							};
						} ]);

fileItApp.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
});