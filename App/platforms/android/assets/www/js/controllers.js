//angular.module('starter.controllers', [])

app.controller('DashCtrl', function ($scope) { })

.controller('MainCtrl', function ($scope, $state, $ionicLoading, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $state.go('login');
    }

    $scope.authentication = authService.authentication;

})

    
.controller('MatchCtrl', function($scope, $ionicSwipeCardDelegate) {
    var cardTypes = [{
        title: 'Swipe down to clear the card',
        image: 'img/pic.png'
    }, {
        title: 'Where is this?',
        image: 'img/pic.png'
    }, {
        title: 'What kind of grass is this?',
        image: 'img/pic2.png'
    }, {
        title: 'What beach is this?',
        image: 'img/pic3.png'
    }, {
        title: 'What kind of clouds are these?',
        image: 'img/pic4.png'
    }];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

    $scope.cardSwiped = function(index) {
        $scope.addCard();
    };

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
    $scope.goAway = function() {
        var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
        card.swipe();
    };
})

.controller('CurrencyCtrl', function ($scope, $state, currencyService) {
    $scope.currencies = currencyService.all();

    $scope.form = {};

    $scope.currencyFrom = function (data) {
        $scope.form.currencyFrom = data;
    }

    $scope.currencyTo = function (data) {
        $scope.form.currencyTo = data;
        $state.go('post');
    }

})


.controller('PostCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, postService) {
    $scope.form = {
        amount: '',
        rate: 2.80,
        receivedAmount: ''
    };

    //$scope.form.rate = 2.80;


    $scope.submitPost = function (data) {

        $state.go('complete');

        //$ionicLoading.show({
        //    template: 'Submitting...'
        //});

        //postService.post(data).$promise.then(function (response) {
        //    console.log(data);
        //    $ionicLoading.hide();
        //    $scope.form = {};
        //    var alertPopup = $ionicPopup.alert({
        //        title: 'Success!',
        //        template: 'Your request is successfully submitted.'
        //    });
        //}, function (err) {
        //    $ionicLoading.hide();
        //    console.log(err);
        //});
    }


});


app.controller('RatesCtrl', function ($scope, $state, $ionicLoading, authService, rateService, $http) {

    //rateService.query();

    $scope.rates = [];
    $http.jsonp('http://api.fixer.io/latest?base=USD&callback=jsonp_callback');

    window.jsonp_callback = function (data) {
        console.log(data);

        $scope.rates = data.rates;
    }


    //$http({ method: 'GET', url: "http://localhost:4400/json/rate.json" }).
    //         success(function (data, status) {
    //             $scope.items = data.entries;
    //         }).
    //         error(function (data, status) {
    //             console.log(data || "Request failed");
    //         });

})

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $ionicLoading, $rootScope, $ionicPopup, authService) {

    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.signIn = function (user) {
        $state.go('tab.dash');
        //if (user && user.username && user.password) {
        //    $ionicLoading.show({
        //        template: 'Signing In...'
        //    });

        //    authService.login(user).then(function (response) {
        //        $ionicLoading.hide();
        //        $state.go('tab.dash');
        //    }, function (err) {
        //        $ionicLoading.hide();
        //        console.log('error', err);
        //        //$scope.message = err.error_description;
        //    });
        //} else {

        //}
    }
    //alert("Please enter email and password both");

    $scope.createUser = function (user) {


        if (user && user.email && user.password) {
            $ionicLoading.show({
                template: 'Signing Up...'
            });

            authService.saveRegistration(user).then(function (response) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Account created success! Click OK to Login.'
                });
                alertPopup.then(function (res) {
                    $scope.modal.hide();
                });
            },
             function (response) {
                 $ionicLoading.hide();
                 var errors = [];
                 for (var key in response.data.modelState) {
                     for (var i = 0; i < response.data.modelState[key].length; i++) {
                         errors.push(response.data.modelState[key][i]);
                     }
                 }
                 $scope.message = "Failed to register user due to:" + errors.join(' ');
             });


        } else {
            //alert("Please fill all details");
        }


    }

})

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope, accountService) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.accounts = accountService.all();

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.accounts.splice(fromIndex, 1);
        $scope.accounts.splice(toIndex, 0, item);
    };


    console.log('account', $scope.accounts);    
});
