(function () {
	var app = angular.module('homepage', []);
	
	app.controller('cypherController', function ($scope){
		this.tab = 0;
		this.encode = 1;
		this.textField = '';
		this.ceaserKey = null;
		this.vigKey = '';
		this.clearText = '';
		this.encryptedText = '';
		this.upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
					  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
					  'W', 'X', 'Y', 'Z'];
		this.lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
					  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
					  'w', 'x', 'y', 'z'];
		this.buttonClasses = ['btn btn-lg', 'btn btn-lg selected'];
		
		//Encode w/ ceaser cypher
		this.ceaserEncode = function () {
			var encrypted = '';
			for (var i=0; i<$scope.cypher.clearText.length; i++) {
				if ($scope.cypher.upper.indexOf($scope.cypher.clearText.charAt(i)) >= 0) {
				var upperIndex = $scope.cypher.upper.indexOf($scope.cypher.clearText.charAt(i));
					var nextChar = $scope.cypher.upper[(upperIndex + $scope.cypher.ceaserKey) % 26];
				} else if ($scope.cypher.lower.indexOf($scope.cypher.clearText.charAt(i)) >= 0) {
					var lowerIndex = $scope.cypher.lower.indexOf($scope.cypher.clearText.charAt(i));
					var nextChar = $scope.cypher.lower[(lowerIndex + $scope.cypher.ceaserKey) % 26];
				} else {
					var nextChar = $scope.cypher.clearText.charAt(i);
				}
				console.log('nextChar ' + nextChar);
				encrypted = encrypted + nextChar;
			}
			$scope.cypher.encryptedText = encrypted;
		};
		
		//Decode w/ ceaser cypher
		this.ceaserDecode = function () {
			var decrypted = '';
			for (var i=0; i<$scope.cypher.encryptedText.length; i++) {
				if ($scope.cypher.upper.indexOf($scope.cypher.encryptedText.charAt(i)) >=0) {
					var upperIndex = $scope.cypher.upper.indexOf($scope.cypher.encryptedText.charAt(i));
					var nextChar = $scope.cypher.upper[(upperIndex - $scope.cypher.ceaserKey) % 26];
				} else if ($scope.cypher.lower.indexOf($scope.cypher.encryptedText.charAt(i)) >=0) {
					var lowerIndex = $scope.cypher.lower.indexOf($scope.cypher.encryptedText.charAt(i));
					var nextChar = $scope.cypher.lower[(lowerIndex - $scope.cypher.ceaserKey) % 26];
				} else {
					var nextChar = $scope.cypher.encryptedText.charAt(i);
				}
				console.log(nextChar);
				decrypted += nextChar;
			}
			$scope.cypher.decryptedText = decrypted;
		};
		
		//Encode w/ Vigneere
		this.vignereEncode = function () {};
		 //Decode w/ Vignere 
		this.vignereDecode = function () {};
			
	});
})();