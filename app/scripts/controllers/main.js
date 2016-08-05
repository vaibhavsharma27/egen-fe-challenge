'use strict';

/**
 * @ngdoc function
 * @name egenFeChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the egenFeChallengeApp
 */
angular.module('egenFeChallengeApp')
  .controller('MainCtrl', function () {
    var vm = this;

    vm.isValid = false;
    vm.formSubmitted = false;
    vm.inValidMessage = 'Minimum 8 alphanumeric characters with at least one uppercase,' +
      ' one lowercase, and one special character';
    vm.submit = submit;
    vm.validate = validate;

    vm.passwordStrength = {
      strength:0
    };
    var lowercaseRegex = new RegExp('(?=.*[a-z])');
    var uppercaseRegex = new RegExp('(?=.*[A-Z])');
    var digitRegex = new RegExp('(?=.*\\d)');
    var specialCharacterRegex = new RegExp('(?=.*[!@#$%^&+=])');
    function validate() {
      vm.passwordStrength.strength = 0;
      if(lowercaseRegex.test(vm.password)) {
        vm.passwordStrength.strength++;
      }

      if(uppercaseRegex.test(vm.password)) {
        vm.passwordStrength.strength++;
      }

      if((lowercaseRegex.test(vm.password) || uppercaseRegex.test(vm.password)) &&
        digitRegex.test(vm.password)) {
        vm.passwordStrength.strength++;
      }

      if(vm.password.length >= 8) {
        vm.passwordStrength.strength++;
      }

      if(specialCharacterRegex.test(vm.password)) {
        vm.passwordStrength.strength++;
      }

      if(vm.passwordStrength.strength === 5) {
        vm.isValid = true;
      } else {
        vm.isValid = false;
      }

    }

    function submit() {
      if(vm.isValid) {
        vm.formSubmitted = true;
        console.log('Form Submitted');
      }
    }
  });
