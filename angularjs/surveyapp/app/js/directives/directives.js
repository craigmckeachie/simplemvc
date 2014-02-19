surveyApp.directive('confirm',function(){
	return {
		restrict : 'A',
		link: function(scope, element, attrs){
			element.bind('click',function(){confirm('Are you sure?')});
		}
	}
})