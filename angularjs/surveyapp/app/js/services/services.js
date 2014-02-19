'use strict';

surveyApp.factory('surveyStorage', function () {
        var STORAGE_ID = 'surveys-angularjs';
        return {
                get: function () {
                        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
                },

                put: function (surveys) {
                        localStorage.setItem(STORAGE_ID, JSON.stringify(surveys));
                }
        };
});