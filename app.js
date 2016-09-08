var app = angular.module("calcModule", []);
app.controller('calcCtrl', function($scope){
  $scope.buttons = [
    {content: "AC", display: "AC", class: "ac"},
    {content: 1, display: "1", class: "one number"},
	{content: 2, display: "2", class: "two number"},
	{content: 3, display: "3", class: "three number"},
	{content: "CE", display: "CE", class: "ce"},
	{content: 4, display: "4", class: "four number"},
	{content: 5, display: "5", class: "five number"},
	{content: 6, display: "6", class: "six number"},
	{content: "toggle", display: "+/-", class: "toggle"},
	{content: 7, display: "7", class: "seven number"},
	{content: 8, display: "8", class: "eight number"},
	{content: 9, display: "9", class: "nine number"},
	{content: "—", display: "-", class: "minus operator"},
	{content: "+", display: "+", class: "plus operator"},
	{content: ".", display: ".", class: "point"},
	{content: 0, display: "0", class: "number zero"},
	{content: "x", display: "x", class: "multiply operator"},
	{content: "/", display: "/", class: "divide operator"},
	{content: "=", display: "=", class: "equals"}
  ];

  $scope.resultVar = 0;
  var operation = "", maxLength = '';

  var clear = function(){$scope.resultVar = 0, operation = "", maxLength = '';  }
  clear();

  $scope.buttonClick = function(btnClass, btnCont){
	if (btnClass == 'ac') clear();
	else if (btnClass == 'ce'){
		maxLength = '';
        var clearOneNum = function(oper){
            $scope.resultVar = 0;
            operation = operation.substring(0, operation.indexOf(oper)+1);
        };
		if ($scope.resultVar == '+' || $scope.resultVar == '—' || $scope.resultVar == '/' || $scope.resultVar == 'x') return;
		else if (operation.indexOf('=') >= 0) clear();
		else if(operation.indexOf('+') > 0) clearOneNum('+');
		else if(operation.indexOf('—') > 0) clearOneNum('—');
		else if(operation.indexOf('/') > 0) clearOneNum('/');
		else if(operation.indexOf('x') > 0) clearOneNum('x');
		else clear();
	}
	else if (btnClass == 'toggle'){
        var toggleFunc = function(oper){
            var array = operation.split(oper);
            if (array[1] == ''){
                operation += '-';
                $scope.resultVar = '-0';
            }
            else if (array[1].indexOf('-')<0){
				array[1] = '-' + array[1];
				operation = array.join(oper);
				$scope.resultVar = '-' + $scope.resultVar;
			}
			else{
				array[1] = array[1].slice(1);
				operation = array.join(oper);
				$scope.resultVar = String($scope.resultVar).slice(1);
			}
        };
		if (operation.indexOf('=') >= 0) toggleFunc('=');
		else if (operation.indexOf('+') >= 0) toggleFunc('+');
		else if (operation.indexOf('—') >= 0) toggleFunc('—');
		else if (operation.indexOf('/') >= 0) toggleFunc('/');
		else if (operation.indexOf('x') >= 0) toggleFunc('x');
        else if (isNaN($scope.resultVar)) return;
		else{
			if (operation.indexOf('-')<0){
				operation = '-' + operation;
				$scope.resultVar = '-' + $scope.resultVar;
			}
			else{
				operation = String(operation).slice(1);
				$scope.resultVar = String($scope.resultVar).slice(1);
			}
		}
	}
	else if (btnClass.indexOf('number') >= 0){
        var clearPrev = function(){$scope.resultVar = btnCont, operation = '' + btnCont, maxLength = '';};
        var updateOper = function(){$scope.resultVar = btnCont, operation += "" + btnCont, maxLength = '';};
        if ($scope.resultVar.length >= 12 && maxLength == '') return;
		else if(operation == '-' || operation.charAt(operation.length-1) == '-'){
			operation += '' + btnCont;
			$scope.resultVar = '-' + '' + btnCont;
		}
		else if (operation.slice(-2) == '=0') clearPrev();
        else if ($scope.resultVar == 0 && String($scope.resultVar).length == 1) updateOper();
        else if ($scope.resultVar == 0 && String($scope.resultVar) === '-0'){
            updateOper();
            $scope.resultVar = '-' + $scope.resultVar;
        }
		else if (operation.indexOf('=') >= 0) clearPrev();
		else if (!isNaN(parseInt(operation.charAt(operation.length-1))) || operation.charAt(operation.length-1) == '.'){
			$scope.resultVar += "" + btnCont;
			operation += "" + btnCont;
			maxLength = '';
		}
		else if (operation.indexOf('+') >= 0 || operation.indexOf('—') >= 0 || operation.indexOf('/') >= 0 || operation.indexOf('x') >= 0 || $scope.resultVar == 0) updateOper();
	}
	else if (btnClass == 'point'){
        if (String($scope.resultVar).length >= 12 && operation.indexOf('=') < 0) return;
		else{
			maxLength = '';
			if (String($scope.resultVar).charAt($scope.resultVar.length-1) == '.') return;
            else if (isNaN(operation.charAt(operation.length-1))){
                operation += '0.';
				$scope.resultVar = '0.';
            }
            else if (operation.indexOf('=') >= 0){
				operation = '0.';
				$scope.resultVar = '0.';
			}
			else if (String($scope.resultVar).indexOf('.') >= 0) return;
            else{
                $scope.resultVar += '.';
                operation += '.';
            }
        }
	}
	else if (btnClass.indexOf('operator') >= 0){
		if ($scope.resultVar == 0) return;
		if (operation.indexOf('=') >= 0){
				maxLength = '';
				var array = operation.split('=');
				operation = array[1];
				$scope.resultVar = btnCont;
			}
		if (operation.indexOf('+') >= 0 || operation.indexOf('—') >= 0 || operation.indexOf('/') >= 0 || operation.indexOf('x') >= 0){
			if(maxLength.charAt(0) == '!') return;
			else if (!isNaN(parseInt(operation.charAt(operation.length-1)))){
				maxLength = '';
				if (operation.indexOf('+') >= 0){
					var array = operation.split('+');
					$scope.resultVar = parseFloat(array[0]) + parseFloat(array[1]);
				}
				else if (operation.indexOf('—') >= 0){
					var array = operation.split('—');
					$scope.resultVar = parseFloat(array[0]) - parseFloat(array[1]);
				}
				else if (operation.indexOf('x') >= 0){
					var array = operation.split('x');
					$scope.resultVar = parseFloat(array[0]) * parseFloat(array[1]);
				}
				else if (operation.indexOf('/') >= 0){
					var array = operation.split('/');
					$scope.resultVar = parseFloat(array[0]) / parseFloat(array[1]);
				}
                var operatorOnDisp = function(oper){
                    operation = $scope.resultVar + oper;
					$scope.resultVar = oper;
                }
				if (btnClass == 'plus operator') operatorOnDisp('+');
				else if (btnClass == 'minus operator'){
					operation = $scope.resultVar + '—';
					$scope.resultVar = '-';
				}
				else if (btnClass == 'multiply operator') operatorOnDisp('x');
				else if (btnClass == 'divide operator') operatorOnDisp('/');
			}
		}
		else{
			if(maxLength.charAt(0) == '!') return;
			else{
				maxLength = '';
				operation += "" + btnCont;
				if (btnClass == 'minus operator') $scope.resultVar = '-';
				else $scope.resultVar = btnCont;
			}
		}
	}
	else if (btnClass == 'equals'){
		if (isNaN(operation.charAt(operation.length-1)) && operation.charAt(operation.length-1) != '.') return;
		else{
            var equalFunc = function(oper){
                var array = operation.split(oper);
                operation = array.join(oper);
                if (oper == '+') $scope.resultVar = parseFloat(array[0]) + parseFloat(array[1]);
                else if (oper == 'x') $scope.resultVar = parseFloat(array[0]) * parseFloat(array[1]);
                else if (oper == '—') $scope.resultVar = parseFloat(array[0]) - parseFloat(array[1]);
                else if (oper == '/') $scope.resultVar = parseFloat(array[0]) / parseFloat(array[1]);
            };
		if (operation.indexOf('+') >= 0) equalFunc('+');
		else if (operation.indexOf('—') >= 0) equalFunc('—');
		else if (operation.indexOf('x') >= 0) equalFunc('x');
		else if (operation.indexOf('/') >= 0) equalFunc('/');
		operation += "=" + $scope.resultVar;
		if (String($scope.resultVar).length >= 12){
			$scope.resultVar = parseFloat($scope.resultVar).toExponential(7);
			maxLength = '!';
		}
		}
	}
  };
});
