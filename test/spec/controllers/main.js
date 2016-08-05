'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('egenFeChallengeApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  describe('validate', function() {
    it('sets strength for only lowercase', function() {
      MainCtrl.password = 'ads';
      MainCtrl.validate();

      expect(MainCtrl.isValid).toEqual(false);
      expect(MainCtrl.passwordStrength.strength).toEqual(1);
    });

    it('sets strength for only uppercase', function() {
      MainCtrl.password = 'ADS';
      MainCtrl.validate();

      expect(MainCtrl.isValid).toEqual(false);
      expect(MainCtrl.passwordStrength.strength).toEqual(1);
    });

    it('does not set strength for only number', function() {
      MainCtrl.password = '133';
      MainCtrl.validate();

      expect(MainCtrl.isValid).toEqual(false);
      expect(MainCtrl.passwordStrength.strength).toEqual(0);
    });

    it('sets strength for only special character', function() {
      MainCtrl.password = '#$';
      MainCtrl.validate();

      expect(MainCtrl.isValid).toEqual(false);
      expect(MainCtrl.passwordStrength.strength).toEqual(1);
    });

    it('set strength for matching multiple criteria properly', function() {
      MainCtrl.password = 'wsW2';
      MainCtrl.validate();

      expect(MainCtrl.isValid).toEqual(false);
      expect(MainCtrl.passwordStrength.strength).toEqual(3);
    });

    it('set strength and isValid property for matching all criteria ', function() {
      MainCtrl.password = 'wsW232!gfd';
      MainCtrl.validate();

      expect(MainCtrl.isValid).toEqual(true);
      expect(MainCtrl.passwordStrength.strength).toEqual(5);
    });

  });

  describe('submit', function() {

    beforeEach(function(){
      MainCtrl.formSubmitted = false;
    });

    it('sets formSubmitted to true for valid password', function () {
        MainCtrl.isValid = true;
        MainCtrl.submit();

        expect(MainCtrl.formSubmitted).toEqual(true);
    });

    it('does not set formSubmitted to true for invalid password', function () {
      MainCtrl.isValid = false;
      MainCtrl.submit();

      expect(MainCtrl.formSubmitted).toEqual(false);
    });
  });



});
