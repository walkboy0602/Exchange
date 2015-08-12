angular.module('starter.services', ['ngResource'])

var serviceBase = 'http://localhost:4411/';

app.factory('authInterceptorService', function ($q, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        //console.log('authInterceptorServiceFactory', authData);

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            //$state.go('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
});

app.factory('authService', function ($http, $q, localStorageService) {

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        username: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;
        console.log("data", data);

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, username: loginData.username });

            _authentication.isAuth = true;
            _authentication.username = loginData.username;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.username = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        console.log('autData', authData);
        if (authData) {
            _authentication.isAuth = true;
            _authentication.username = authData.username;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
        }

        return authData;
    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
})

app.factory('rateService', function ($resource) {

    return $resource('http://api.fixer.io/latest?base=USD', {}, {
        query: { method: 'GET' }
    })

});

app.factory('accountService', function () {

    var account = [{
        currency: 'MYR',
        balance: '4200.00',
        flag: 'http://flags.fmcdn.net/data/flags/small/my.png'
    }, {
        currency: 'SGD',
        balance: '0.00',
        flag: 'http://flags.fmcdn.net/data/flags/small/sg.png'
    }, {
        currency: 'THB',
        balance: '0.00',
        flag: 'http://flags.fmcdn.net/data/flags/small/th.png'
    }, {
        currency: 'IND',
        balance: '0.00',
        flag: 'http://flags.fmcdn.net/data/flags/small/id.png'
    }, {
        currency: 'VND',
        balance: '0.00',
        flag: 'http://flags.fmcdn.net/data/flags/small/vn.png'
    }]

    return {
        all: function () {
            return account;
        }
    }
})

app.factory('postService', function ($resource) {

    return $resource(serviceBase + 'api/post', {}, {
        post: { method: 'POST' }
    })

})

.factory('currencyService', function ($resource) {

    var currency = [{
        name: 'MYR',
        flag: 'http://flags.fmcdn.net/data/flags/small/my.png',
    }, {
        name: 'SGD',
        flag: 'http://flags.fmcdn.net/data/flags/small/sg.png'
    }, {
        name: 'USD',
        flag: 'http://flags.fmcdn.net/data/flags/small/us.png'
    }, {
        name: 'GBP',
        flag: 'http://flags.fmcdn.net/data/flags/small/gb.png'
    }, {
        name: 'JPY',
        flag: 'http://flags.fmcdn.net/data/flags/small/jp.png'
    }, {
        name: 'IDR',
        flag: 'http://flags.fmcdn.net/data/flags/small/id.png'
    }, {
        name: 'THB',
        flag: 'http://flags.fmcdn.net/data/flags/small/th.png'
    }, {
        name: 'CNY',
        flag: 'http://flags.fmcdn.net/data/flags/small/cn.png'
    }, {
        name: 'KRW',
        flag: 'http://flags.fmcdn.net/data/flags/small/kr.png'
    }
    ]

    return {
        all: function () {
            return currency;
        }
    }

})

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: '/img/photo.jpg'
    }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 4,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: '/img/mcfly.jpg'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});
