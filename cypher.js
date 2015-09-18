(function () {
	var app = angular.module('homepage', []);
	
	app.controller('cypherController', function ($scope){
		this.tab = 0;
		this.encode = 1;
		this.textField = '';
		this.ceaserKey = null;
		this.vigKey = '';
		this.vigArrayKey = [];
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
				decrypted += nextChar;
			}
			$scope.cypher.decryptedText = decrypted;
		};
		
		//Encode w/ Vigneere
		this.vignereEncode = function () {
			$scope.cypher.vigArrayKey = [];
			//Convert key word into array of ceaser shifts
			$scope.cypher.vigKey = $scope.cypher.vigKey.toLowerCase();
			//For each char in key, push new shifting index into array of shifts
			for (var i=0; i < $scope.cypher.vigKey.length; i++) {
				if ($scope.cypher.lower.indexOf($scope.cypher.vigKey.charAt(i)) >=0) {
					var shift = $scope.cypher.lower.indexOf($scope.cypher.vigKey.charAt(i));
				} else {
					var shift = 0;
				}
				$scope.cypher.vigArrayKey.push(shift);
			} 
			//console.log($scope.cypher.vigArrayKey);
			var encrypted = '';
			//For each char in clearText, shift by appropriate length
			for (var i=0; i < $scope.cypher.clearText.length; i++) {
				if ($scope.cypher.upper.indexOf($scope.cypher.clearText.charAt(i)) >=0) {
					var nextChar = $scope.cypher.upper[($scope.cypher.upper.indexOf($scope.cypher.clearText.charAt(i)) + $scope.cypher.vigArrayKey[i % $scope.cypher.vigArrayKey.length]) % 26];
				} else if ($scope.cypher.lower.indexOf($scope.cypher.clearText.charAt(i)) >=0) {
					var nextChar = $scope.cypher.lower[($scope.cypher.lower.indexOf($scope.cypher.clearText.charAt(i)) + $scope.cypher.vigArrayKey[i % $scope.cypher.vigArrayKey.length]) % 26];
				} else {
					var nextChar = $scope.cypher.clearText.charAt(i);
				}
				encrypted += nextChar;
			}
			$scope.cypher.encryptedText = encrypted;
		};
		 //Decode w/ Vignere 
		this.vignereDecode = function () {
			$scope.cypher.vigArrayKey = [];
			$scope.cypher.vigKey = $scope.cypher.vigKey.toLowerCase();
			var decrypted = '';
			
			for (var i=0; i < $scope.cypher.vigKey.length; i++) {
				if ($scope.cypher.lower.indexOf($scope.cypher.vigKey.charAt(i)) >= 0) {
					var shift = $scope.cypher.lower.indexOf($scope.cypher.vigKey.charAt(i));
				} else {
					var shift = 0;
				}
				$scope.cypher.vigArrayKey.push(shift);
			}
			//console.log($scope.cypher.vigArrayKey);			
			
			for (var i=0; i < $scope.cypher.encryptedText.length; i++) {
				if ($scope.cypher.upper.indexOf($scope.cypher.encryptedText.charAt(i)) >= 0 ) {
					var nextChar = $scope.cypher.upper[($scope.cypher.upper.indexOf($scope.cypher.encryptedText.charAt(i) ) - $scope.cypher.vigArrayKey[i % $scope.cypher.vigArrayKey.length]) % 26];
				} else if ($scope.cypher.lower.indexOf($scope.cypher.encryptedText.charAt(i)) >=0) {
					var nextChar = $scope.cypher.lower[($scope.cypher.lower.indexOf($scope.cypher.encryptedText.charAt(i)) - $scope.cypher.vigArrayKey[i % $scope.cypher.vigArrayKey.length]) % 26];
				} else {
					var nextChar = $scope.cypher.encryptedText.charAt(i);
				}
				decrypted += nextChar;
			}
			$scope.cypher.clearText = decrypted;
			
		};
			
	});
})();