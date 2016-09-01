//Develop by Arijit Chaterjee 
// SCRIPT.JS---stores all our angular code



    // create the module and name it scotchApp
    var myApp = angular.module('myDemoApp', ['ngRoute']);

    // configure our routes
    myApp.config(function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '/pages/Login.html',
                controller  : 'mainController'
            })

            .when('/signup', {
                templateUrl : '/pages/signup.html',
                controller  : 'signController'
            })

           
            .when('/adduser', {
                templateUrl : '/pages/addUser.html',
                controller  : 'userController'
            })
			
            .when('/transaction', {
                templateUrl : '/pages/transaction.html',
                controller  : 'transactionController'
            })

            .when('/addBook', {
                templateUrl : '/pages/addBook.html',
                controller  : 'bookController'
            })

            .when('/booklist', {
                templateUrl : '/pages/bookList.html',
                controller  : 'bookListController'
            });
           // use the HTML5 History API
        $locationProvider.html5Mode(true); 
    });


    // create the controller and inject Angular's $scope
    myApp.controller('mainController', function($scope, $http, $location) {

        // create a message to display in our view
        $scope.message = '';
        $scope.ErrorFlag=false;
        $scope.errorMessage='';
        $scope.user={};
        $scope.submitted=false;

        $scope.signin = function(isValid){
            console.log($scope.user);
            console.log('validity checking ==============> '+isValid);
            $scope.submitted=true;
            if(isValid)
            {
                 $http.post('http://localhost:3000/login',$scope.user)
                .success(function(data, status){console.log(data);
                if(status===200){
                    //$scope.message="You are successfully logged in";
                    $location.path('booklist');
                    }
                })
            .error(function(data, status){
                console.log('Eror message ---------- >'+data);
              // success.visible=false;
               $scope.ErrorFlag=true;
              $scope.errorMessage=data;
                });
            }
        };
    });

    myApp.controller('signController', function($scope, $http,$location) {
        $scope.message = '';
        $scope.ErrorFlag=false;
        $scope.errorMessage='';
        $scope.user={};
        $scope.submitted=false;

        $scope.signUpUser = function(isValid){
            console.log($scope.user);
            $scope.submitted=true;
            if(isValid)
            {
                $http.post('http://localhost:3000/signup',$scope.user)
            .success(function(data, status){console.log(data);
                if(status===200){
                    //$scope.message="You are successfully registered";
                    $location.path('/');
                }
            })
            .error(function(data, status){
               console.log('Eror message ---------- >'+data);
              // success.visible=false;
               $scope.ErrorFlag=true;
              $scope.errorMessage=data;
          });
            }
            
        };
    });

    myApp.controller('userController', function($scope, $http) {
        $scope.message = '';
        $scope.user={};
        $scope.submitted=false;
        $scope.ErrorFlag=false;
        $scope.errorMessage='';

        $scope.addUser = function(isValid){
            console.log($scope.user);
            $scope.submitted=true;
            if(isValid)
            {
                $http.post('http://localhost:3000/adduser',$scope.user)
            .success(function(data, status){console.log(data);
                if(status===200){
                    $scope.message='User has been added successfully';
                }
            })
            .error(function(data, status){
              $scope.ErrorFlag=true;
              $scope.errorMessage=data;
          });
            }
            
        };
        
        
    });
	myApp.controller('bookController', function($scope, $http) {
        $scope.message = '';
        //$scope.value1="Put the directive here.";
        $scope.book={};

        $scope.addBook = function(){
            console.log($scope.book);
            $http.post('http://localhost:3000/addBook',$scope.book)
            .success(function(data, status){console.log(data);
                if(status===200){
                    $scope.message='Your book has been added successfully';
                }
            })
            .error(function(data, status){
              // success.visible=false;
              // error.visible=true;
              // error.message=data.error;
          });
        };

    });

    myApp.controller('transactionController', function($scope, $http) {
        $scope.message = 'Transaction Form';
        $scope.transaction={};
        $scope.books=[];
        $scope.users=[];


        $scope.init= function(){
            $scope.transaction.Type='--Select--';
            $scope.getBookDetails();
            $scope.getUserDetails();
        };

        $scope.getBookDetails= function(){
            $http.get('http://localhost:3000/bookList')
            .success(function(data, status){console.log(data);
                if(status===200){
                    $scope.books=data;
                    $scope.transaction.bookname='--Select--';
                }
            })
            .error(function(data, status){
              // success.visible=false;
              // error.visible=true;
              // error.message=data.error;
          });
        };

        $scope.getUserDetails= function(){
            $http.get('http://localhost:3000/userList')
            .success(function(data, status){console.log(data);
                if(status===200){
                    $scope.users=data;
                    $scope.transaction.username='--Select--';
                }
            })
            .error(function(data, status){
              // success.visible=false;
              // error.visible=true;
              // error.message=data.error;
          });
        };

        $scope.addTransaction = function(){
            console.log($scope.transaction);
            $http.post('http://localhost:3000/transaction',$scope.transaction)
            .success(function(data, status){console.log(data);
                if(status===200){
                    $scope.message='Your transaction has been completed successfully';
                }
            })
            .error(function(data, status){
              // success.visible=false;
              // error.visible=true;
              // error.message=data.error;
          });
        };
        $scope.init();
    });

    myApp.controller('bookListController', function($scope, $http) {
        $scope.message = 'Loading...';
        $scope.books=[];
        $scope.searching=false;

        $scope.showAllBook = function(){
            $scope.searching=true;
            $http.get('http://localhost:3000/bookList')
            .success(function(data, status){console.log(data);
                if(status===200){
                    $scope.books=data;
                }
            })
            .error(function(data, status){
              // success.visible=false;
              // error.visible=true;
              // error.message=data.error;
          });
        };

        $scope.removeBook= function(book){

            //console.log('Bppk name ======> '+book);
            $http.delete('http://localhost:3000/removebook?bookid='+book.name)
            .success(function(data, status){console.log(data);
                if(status===200){
                    $scope.showAllBook();
                }
            })
            .error(function(data, status){
              // success.visible=false;
              // error.visible=true;
              // error.message=data.error;
          });
        };

        $scope.showAllBook();

    });


myApp.directive("passwordVerify",function(){
        return{
            
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;
            console.log('ari 1 ---'+scope.passwordVerify);
            console.log('ari 2--- '+ctrl.$viewValue);
            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
        }
    });