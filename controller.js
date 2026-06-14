var _scope;
var _child;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var app = angular.module('ngApp', ['ngSanitize']);

app.controller('MainController', function ($scope, $location, $http, $controller, $sce) {

    _scope = $scope;
    $scope.createjs = {};
    $scope.loadAssetComplete = false;
    $scope.prd_url = '';
    $scope.status_loading = '';
    $scope.safeApply = function (fn) {
        try {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest')
                this.$eval(fn);
            else
                this.$apply(fn);
        } catch (e) {}

    };

    $scope.nowPage = '';
    $scope.nowMenu = 0;

    $scope.setPage = function (index) {
        $scope.safeApply(function () {
            $scope.nowPage = index
        });
    }
    $scope.setMenu = function (index) {
        $scope.safeApply(function () {
            $scope.nowMenu = index
        });
    }
    $scope.checkMyMenu = function (index) {
        if (index == $scope.nowMenu) {
            return true;
        } else {
            return false;
        }
    }
    $scope.onMoveTo = function (index) {
        if ($scope.nowPage == 'Home') {
            try {
                fullpage_api.moveTo(index + 1);
            } catch (e) {
                try {
                    $('html, body').animate({
                        scrollTop: $('.sec-full-' + (index + 1)).offset().top - 61
                    }, 500, function () {
                        // window.location.hash = hash;
                    });
                    $('.navbar-toggle').trigger('click');
                } catch (e) {
                    window.location.href = '/#' + '.sec-full-' + (index + 1);
                }
            }
        } else {
            alert('$scope.nowPage : ' + $scope.nowPage)
            window.location.href = '/#' + '.sec-full-' + (index + 1);
        }

        $scope.setMenu(index)
    }

    $scope.sendAPI = function (url, _data, callback) {
        var callback = callback || null;
        $(".loader-api").show();
        var data = {
            '_token': $('input[name=_token]').val()
        }
        for (var n in _data) {
            data[n] = _data[n]
        }
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (response) {
                $(".loader-api").hide();
                if (callback != null) {
                    callback(response);
                }
            },
            error: function (data) {
                swal({
                    html: "เธเธเธเนเธญเธเธดเธ”เธเธฅเธฒเธ” <br>" + data['responseJSON']['error'],
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonText: 'เธ•เธเธฅเธ'
                })
            }
        });
    }

    $scope.isNull = function (_var) {
        if (_var == null || _var == 'null' || _var == '' || _var == undefined || _var == 'undefined' || _var == 'NaN' || _var == NaN) {
            return true;
        } else {
            return false;
        }
    }
    $scope.isEmail = function (email) {
        var emailExpression = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
        return emailExpression.test(email);
    }
    $scope.isNumeric = function (input) {
        return !isNaN(parseFloat(input)) && isFinite(input);
    }
    $scope.isMobile = function (input) {
        if (input.indexOf('09') > -1 || input.indexOf('08') > -1 || input.indexOf('07') > -1 || input.indexOf('06') > -1 || input.indexOf('05') > -1 || input.indexOf('04') > -1 || input.indexOf('03') > -1 || input.indexOf('02') > -1) {
            return !isNaN(parseFloat(input)) && isFinite(input) && input.length >= 10;
        } else {
            return false;
        }
    }
    $scope.isMobileTel = function (input) {
        if (input.indexOf('09') > -1 || input.indexOf('08') > -1 || input.indexOf('07') > -1 || input.indexOf('06') > -1 || input.indexOf('05') > -1 || input.indexOf('04') > -1 || input.indexOf('03') > -1) {
            return !isNaN(parseFloat(input)) && isFinite(input) && input.length >= 10;
        } else {
            return false;
        }
    }
    $scope.isPassword = function (input) {
        return input.length >= 4;
    }
    $scope.isUndefined = function (st) {
        return st == undefined || st == null || st == '' || st == '0' || st == 0;
    }

    $scope.isPostal = function (ps) {
        return ps.length == 5 && $scope.isNumeric(ps)
    }

    $scope.formatNumber = function (number, maxDecimals, forceDecimals, siStyle) {
        "use strict";

        number = number || 0;
        maxDecimals = maxDecimals || 2;
        forceDecimals = forceDecimals || false;
        siStyle = siStyle || true;

        var i = 0,
            inc = Math.pow(10, maxDecimals),
            str = String(Math.round(inc * Number(number)) / inc);
        var hasSep = str.indexOf(".") == -1,
            sep = hasSep ? str.length : str.indexOf(".");
        var ret = (hasSep && !forceDecimals ? "" : (siStyle ? "." : ",")) + str.substr(sep + 1);
        if (forceDecimals) {
            for (var j = 0; j <= maxDecimals - (str.length - (hasSep ? sep - 1 : sep)); j++) {
                ret += "0";
            }
        }
        while (i + 3 < (str.substr(0, 1) == "-" ? sep - 1 : sep)) {
            ret = (siStyle ? "," : ".") + str.substr(sep - (i += 3), 3) + ret;
        }
        return str.substr(0, sep - i) + ret;
    }

    $scope.formatTitleDate = function (input) {
        if (page_lang == 'th') {
            var _date = moment(input).lang(page_lang).format('DD MMM YYYY')
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]) + 543;

            var obj = {
                'day': _day,
                'month': _month,
                'year': _year.toString().slice(-2)
            }

            return obj;
        } else {
            var _date = moment(input).lang(page_lang).format('DD MMM YYYY')
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]);

            var obj = {
                'day': _day,
                'month': _month,
                'year': _year.toString().slice(-2)
            }

            return obj;
        }

    }

    $scope.login = function (obj, cb) {
        var cb = cb || null;
        if (kidkarnmaiFb.fbuser.status == 'connected') {
            $scope.sendAPI($scope.prd_url + '/api/member/login', {
                'fbid': kidkarnmaiFb.fbuser.id,
                'name': kidkarnmaiFb.fbuser.first_name,
                'lastname': kidkarnmaiFb.fbuser.last_name,
                'email': kidkarnmaiFb.fbuser.email,
                'picture': kidkarnmaiFb.fbuser.picture.data.url,
                'type': 'facebook'
            }, function (response) {
                // console.log('response')
                // console.log(response)
                user = response;
                if (cb != null) {
                    cb(response);
                }
            })
        }
    }
    $scope.loginEmail = function (obj, cb) {
        var cb = cb || null;
        $scope.sendAPI($scope.prd_url + '/api/member/login', {
            'email': obj.email,
            'password': obj.password,
            'type': 'email'
        }, function (response) {
            // console.log('response')
            // console.log(response)
            user = response;
            if (cb != null) {
                cb(response);
            }
        })
    }
    $scope.fblogin = function (cb) {
        var cb = cb || null;
        kidkarnmaiFb.fbLogin(function (obj) {
            // console.log('fbLogin');
            // console.log(obj)
            $scope.login(obj, cb);
        });
    }
    // kidkarnmaiFb.init('2594267283927279','v3.3',function(obj){
    //   $scope.login(obj);
    // });

    $scope.checkToPlay = function () {
        swal.close();
        if ($scope.nowPage == 'Game') {

        } else {
            if ($scope.isNull(user.token) || $scope.isNull(user.tel)) {
                if ($scope.isNull(user.token)) {
                    window.location.href = '/login';
                } else if ($scope.isNull(user.tel)) {
                    window.location.href = '/register';
                }
            } else {
                window.location.href = '/game';
            }
        }
    }

    $scope.jGet = function (name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
        );
    }

    $scope.checkIfCookie = function () {
        // $(".block-cookie").toggleClass("active")
        if (localStorage.getItem('cookie')) {
            return true;
        }
        return false;
    }
    $scope.closeCookie = function () {
        $(".block-cookie").toggleClass("active")
    }
    $scope.acceptCookie = function () {
        localStorage.setItem('cookie', true);
    }

    if (splash_menu == 'home') {
        $scope.splash_page_title = splash_page_title;
        $scope.splash_page_shown = Number(splash_page_shown || 0);

        $scope.isShowSplash = false;

        // เธ–เนเธฒ shown == 1 เนเธซเนเนเธชเธ”เธเนเธเนเธเธฃเธฑเนเธเน€เธ”เธตเธขเธง
        if ($scope.splash_page_shown === 1) {
            if (!localStorage.getItem($scope.splash_page_title)) {
                $scope.isShowSplash = true;

                // เธเธฑเธเธ—เธถเธเธ—เธฑเธเธ—เธตเธงเนเธฒเน€เธเธขเนเธชเธ”เธเนเธฅเนเธง
                localStorage.setItem($scope.splash_page_title, "1");
            }
        } else {
            // เธ–เนเธฒ shown != 1 เนเธซเนเนเธชเธ”เธเธ—เธธเธเธเธฃเธฑเนเธ
            $scope.isShowSplash = true;
        }

        $scope.closeSplash = function () {
            $scope.isShowSplash = false;
        };

        $scope.acceptSplash = function () {
            if ($scope.splash_page_shown === 1) {
                localStorage.setItem($scope.splash_page_title, "1");
            }

            $scope.isShowSplash = false;
        };
    }

})

app.controller('HomeController', function ($scope, $location, $http, $controller, $sce) {
    _child = $scope;
    $scope.setPage('Home');
    //moment().lang('th').format('DD MMM YYYY')
    if (page_lang == 'th') {
        $(".news-date span").each(function (index) {
            var _date = moment($(this).text()).lang(page_lang).format('DD MMM YYYY')
            // console.log(_date)
            var _parent = $(this).parent();
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]) + 543;
            $(_parent).html("<h3>" + _day + "</h3><p>" + _month + " " + _year.toString().slice(-2) + "</p>");
        });
    } else {
        $(".news-date span").each(function (index) {
            var _date = moment($(this).text()).lang(page_lang).format('DD MMM YYYY')
            // console.log(_date)
            var _parent = $(this).parent();
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]);
            $(_parent).html("<h3>" + _day + "</h3><p>" + _month + " " + _year.toString().slice(-2) + "</p>");
        });
    }


    var promotion_main
    $(document).ready(function () {
        $(".block-promotion-slide").kidkarnmaiPreloader({
            setPercent: function (num) {},
            setPercentComplete: function () {
                promotion_main = $('.promotion-main-carousel');
                promotion_main.owlCarousel({
                    dots: true,
                    loop: true,
                    rewind: true,
                    items: 1,
                    autoWidth: true,
                    margin: 0,
                    smartSpeed: 800,
                    fluidSpeed: 800,
                    center: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: false,
                    responsive: {
                        0: {
                            items: 1,
                            autoWidth: false,
                            nav: false,
                        },
                        768: {
                            items: 1,
                            autoWidth: false,
                            nav: false,
                        },
                        1200: {
                            items: 1,
                            nav: false,
                        }
                    }
                });
            }
        });
    });


    $('#btn-slide-left').click(function () {
        promotion_main.trigger('prev.owl.carousel');
    })
    $('#btn-slide-right').click(function () {
        promotion_main.trigger('next.owl.carousel');

    })

    $scope.checkShowSplash = function () {
        if (localStorage.getItem('show_splash_page')) {
            return true;
        }
        return false;
    }


});


app.controller('NewsDetailsController', function ($scope, $location, $http, $controller, $sce) {
    _child = $scope;
    $scope.setPage('NewsDetails');
    if (page_lang == 'th') {
        $(".news_details_date p").each(function (index) {
            var _date = moment($(this).text()).lang(page_lang).format('DD MMM YYYY')
            // console.log(_date)
            var _parent = $(this).parent();
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]) + 543;
            $(_parent).html("<p>" + _day + " " + _month + " " + _year.toString().slice(-2) + "</p>");
        });
    } else {
        $(".news_details_date p").each(function (index) {
            var _date = moment($(this).text()).lang(page_lang).format('DD MMM YYYY')
            // console.log(_date)
            var _parent = $(this).parent();
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]);
            $(_parent).html("<p>" + _day + " " + _month + " " + _year.toString().slice(-2) + "</p>");
        });
    }

});

app.controller('PromotionDetailController', function ($scope, $location, $http, $controller, $sce) {
    _child = $scope;
    $scope.setPage('PromotionDetail');
    if (page_lang == 'th') {
        $(".promotion_detail_date p").each(function (index) {
            var _date = moment($(this).text()).lang(page_lang).format('DD MMM YYYY')
            // console.log(_date)
            var _parent = $(this).parent();
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]) + 543;
            $(_parent).html("<p>" + _day + " " + _month + " " + _year.toString().slice(-2) + "</p>");
        });
    } else {
        $(".promotion_detail_date p").each(function (index) {
            var _date = moment($(this).text()).lang(page_lang).format('DD MMM YYYY')
            // console.log(_date)
            var _parent = $(this).parent();
            var _day = _date.split(' ')[0];
            var _month = _date.split(' ')[1];
            var _year = Number(_date.split(' ')[2]);
            $(_parent).html("<p>" + _day + " " + _month + " " + _year.toString().slice(-2) + "</p>");
        });
    }

});

app.controller('SearchController', ['$scope', '$sce', function ($scope, $sce) {
    _search = $scope;

    $scope.form = {
        'search': ''
    }

    $scope.allowSearch = function () {
        var bol = false;
        $scope.error = [];
        $scope.error_log = '';

        if ($scope.isNull($scope.form['search'])) {
            $scope.error.push('search')
        }

        if ($scope.error.length == 0) {
            bol = true;
        }

        return bol;
    }

    $scope.onSearch = function () {
        // console.log('onSearch')
        if ($scope.allowSearch() && !$scope.lock) {
            if (lang == '') {
                location.href = "/search/" + $scope.form['search'];
            } else {
                location.href = "/" + lang + "/search/" + $scope.form['search'];
            }
        } else {
            if (lang == '') {
                swal({
                    html: "เธเธฃเธธเธ“เธฒเธเธดเธกเธเนเธเธณเธ—เธตเนเธ•เนเธญเธเธเธฒเธฃเธเนเธเธซเธฒ",
                    showCancelButton: false,
                    confirmButtonColor: '#4B4B4B',
                    confirmButtonText: 'เธ•เธเธฅเธ'
                }).then(function (result) {


                })
            } else {
                swal({
                    html: "Please type the search term.",
                    showCancelButton: false,
                    confirmButtonColor: '#4B4B4B',
                    confirmButtonText: 'OK'
                }).then(function (result) {


                })
            }

        }
    }



}])

app.directive('ngSearchEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            // console.log(event.which)
            if (event.which === 13) {
                _search.onSearch();
                event.preventDefault();
            }
        });
    };
});



app.controller('FormController', ['$scope', '$sce', function ($scope, $sce) {
    _child = $scope;

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        var inputs = document.querySelectorAll('input[type="number"]');
        for (var i = inputs.length; i--;)
            inputs[i].setAttribute('pattern', '\\d*');
    }
}])

app.directive('diFormPattern', function () {
    return {
        restrict: "A",
        compile: function (tElement, tAttrs) {
            return function (scope, element, attrs) {
                element.bind("input change keyup paste", function (event) {
                    var keyCode = this.value.slice(-1);
                    var keyCodeChar = this.value.slice(-1);
                    var st_pattern = "";
                    if (attrs.diFormPattern == "english")
                        st_pattern = "[a-z.A-Z]";
                    else if (attrs.diFormPattern == "thai")
                        st_pattern = "[เธ เธ–เธธเธถเธเธ•เธเธเธเนเนเธณเธเธฐเธฑเธตเธฃเธเธขเธเธฅเธเธซเธเธ”เน€เนเนเธฒเธชเธงเธเธเธเนเธญเธดเธทเธ—เธกเนเธเธเธนเธเธ‘เธเนเนเธ“เธฏเธเธเธ…เธคเธเธเนเธเนเนเธฉเธจเธเธเธฎเธบเนเธ’เธฌเธฆ A-Za-z]";
                    else if (attrs.diFormPattern == "textaddress")
                        st_pattern = "[เธ เธ–เธธเธถเธเธ•เธเธเธเนเนเธณเธเธฐเธฑเธตเธฃเธเธขเธเธฅเธเธซเธเธ”เน€เนเนเธฒเธชเธงเธเธเธเนเธญเธดเธทเธ—เธกเนเธเธเธนเธเธ‘เธเนเนเธ“เธฏเธเธเธ…เธคเธเธเนเธเนเนเธฉเธจเธเธเธฎเธบเนเธ’เธฌเธฆ A-Za-z0-9+#.-\/]"
                    else if (attrs.diFormPattern == "number")
                        st_pattern = "[0-9]"
                    else if (attrs.diFormPattern == "numberslash")
                        st_pattern = "[0-9\/\-]"
                    else if (attrs.diFormPattern == "numberpoint")
                        st_pattern = "[0-9.]"
                    else if (attrs.diFormPattern == "email")
                        st_pattern = "[a-z_.@0-9\\-\\^]"
                    else if (attrs.diFormPattern == "unchar")
                        st_pattern = "[]"
                    else if (attrs.diFormPattern == "line")
                        st_pattern = "^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?`~]+$";
                    if (!keyCodeChar.match(new RegExp(st_pattern, "i"))) {
                        //  event.preventDefault();
                        var inputString = this.value;
                        var shortenedString = inputString.substr(0, (inputString.length - 1));
                        this.value = shortenedString
                        return false;
                    }

                });
            };
        }
    };
})




//FOR CREATEJS

app.controller('CreatejsContoller', function ($scope, $location, $http, $attrs, $sce) {
    var setting_data = {
        type: '',
        scale: 'full',
        width: 960,
        height: 640,
        id: '',
        onpage: 'yes',
        obj: '',
        comp: '',
        mobile_width: 750,
        mobile_height: 0,
        mobile_start: 919,
        mobile: false,
        drag: false
    };

    $scope.myHTML = "";

    // console.log($attrs)

    setting_data.scale = $attrs.scale || setting_data.scale;
    setting_data.width = $attrs.width || setting_data.width;
    setting_data.height = $attrs.height || setting_data.height;
    setting_data.id = $attrs.id || setting_data.id;
    setting_data.type = $attrs.type || $attrs.id;
    setting_data.onpage = $attrs.onpage || setting_data.onpage;
    setting_data.obj = $attrs.obj || setting_data.obj;
    setting_data.comp = $attrs.comp || setting_data.comp;
    setting_data.mobile_width = $attrs.mobileWidth || setting_data.mobile_width;
    setting_data.mobile_height = $attrs.mobileHeight || setting_data.mobile_height;
    setting_data.mobile_start = $attrs.mobileStart || setting_data.mobile_start;
    setting_data.mobile = $attrs.mobile || setting_data.mobile;

    if (setting_data.obj != '') {
        setting_data.obj = jQuery.parseJSON(($attrs.obj.toString()))
    }

    var id = setting_data.id;
    var type = setting_data.type;
    var scale = setting_data.scale;
    var width = setting_data.width;
    var height = setting_data.height;
    var onpage = setting_data.onpage;
    var dataObject = setting_data.obj;
    var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
    var comp, lib, images, ss;
    var _numload = 0;
    var st = '';
    var fixh = 0;

    st += '<div id="animation_container_' + type + '" style="width:' + width + 'px; height:' + height + 'px">'
    st += '<canvas id="canvas_' + type + '" width="' + width + '" height="' + height + '" style="position: absolute; display: block;"></canvas>'
    st += '<div id="dom_overlay_container_' + type + '" style="pointer-events:none; overflow:hidden; width:' + width + 'px; height:' + height + 'px; position: absolute; left: 0px; top: 0px; display: block;">'
    st += '</div>'
    st += '</div>'

    $scope.myHTML = $sce.trustAsHtml(st);

    try {
        kkmFlow.createjs[type + "_init"] = init;
    } catch (e) {}
    $(document).ready(function () {
        if (jQuery(window).width() > 1000) {
            if (id.indexOf('_m') == -1) {
                init();
            }
        } else {
            if (id.indexOf('_m') > -1) {
                init();
            }
        }

    });


    function init() {
        comp = AdobeAn.getComposition(setting_data.comp);
        lib = comp.getLibrary();
        if (!jQuery.isEmptyObject(lib.properties.manifest)) {
            for (var i = 0; i < lib.properties.manifest.length; i++) {
                lib.properties.manifest[i]['src'] = '/animate/' + lib.properties.manifest[i]['src']
            }
            var loader = new createjs.LoadQueue(false);
            loader.addEventListener("fileload", function (evt) {
                handleFileLoad(evt)
            });
            loader.addEventListener("complete", function (evt) {
                handleComplete(evt)
            });
            loader.loadManifest(lib.properties.manifest);
        } else {
            setLib()
        }
        createjs.MotionGuidePlugin.install();
    }

    function handleFileLoad(evt) {
        _numload++;
        // console.log('handleFileLoad : ' + _numload)
        images = comp.getImages();
        if (evt && (evt.item.type == "image")) {
            images[evt.item.id] = evt.result;
            var percentage = Math.round((_numload / lib.properties.manifest.length) * 100);
            try {
                kkmFlow.showWait(percentage);
            } catch (e) {}
        }
    }

    function handleComplete(evt) {
        ss = comp.getSpriteSheet();
        var queue = evt.target;
        var ssMetadata = lib.ssMetadata;
        for (i = 0; i < ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                "images": [queue.getResult(ssMetadata[i].name)],
                "frames": ssMetadata[i].frames
            })
        }
        // $(".bg_lds_roller").hide();
        setLib();
    }

    function setLib() {
        canvas = document.getElementById("canvas_" + type);
        anim_container = document.getElementById("animation_container_" + type);
        dom_overlay_container = document.getElementById("dom_overlay_container_" + type);
        var kkmAction = this[id + "Action"]
        exportRoot = new lib[id]();
        stage = new lib.Stage(canvas);

        $scope.createjs[type + "_root"] = exportRoot;
        $scope.createjs[type + "_action"] = kkmAction;
        kkmAction.setupStart(exportRoot, stage, lib, $scope);
        fnStartAnimation = function () {
            stage.addChild(exportRoot);
            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);
        }

        function makeResponsive(isResp, respDim, isScale, scaleType) {
            var lastW, lastH, lastS = 1;
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            function resizeCanvas() {
                var w = lib.properties.width,
                    h = lib.properties.height;

                if (setting_data.mobile) {
                    if (jQuery(window).width() <= setting_data.mobile_start) {
                        w = setting_data.mobile_width
                        h = setting_data.mobile_height
                    }
                }

                var iw = jQuery(window).width();
                var ih = jQuery(window).height();
                var pRatio = window.devicePixelRatio || 1,
                    xRatio = iw / w,
                    yRatio = ih / h,
                    sRatio = 1;
                if (isResp) {
                    if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                        sRatio = lastS;
                    } else if (!isScale) {
                        if (iw < w || ih < h)
                            sRatio = Math.min(xRatio, yRatio);
                    } else if (scaleType == 1) {
                        sRatio = Math.min(xRatio, yRatio);
                    } else if (scaleType == 2) {
                        sRatio = Math.max(xRatio, yRatio);
                    }
                }
                if (scale == 'fix-div') {
                    if (jQuery("#canvas_" + type).parent().parent().width() > 0) {
                        canvas.width = w * pRatio * sRatio;
                        canvas.height = h * pRatio * sRatio;
                        canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
                        canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
                        stage.scaleX = pRatio * sRatio;
                        stage.scaleY = pRatio * sRatio;
                        lastW = iw;
                        lastH = ih;
                        lastS = sRatio;
                        stage.tickOnUpdate = false;
                        stage.update();
                        stage.tickOnUpdate = true;
                        jQuery("#canvas_" + type).parent().parent().parent().parent().css('min-height', h * sRatio + 'px');
                        try {
                            kkmAction.resizeContent(iw, ih, pRatio, sRatio, scale);
                        } catch (e) {}
                    }
                } else if (scale == 'fix-div-jimny') {
                    if (jQuery("#canvas_" + type).parent().parent().width() > 0) {
                        canvas.width = w * pRatio * sRatio;
                        canvas.height = h * pRatio * sRatio;
                        canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
                        canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
                        stage.scaleX = pRatio * sRatio;
                        stage.scaleY = pRatio * sRatio;
                        lastW = iw;
                        lastH = ih;
                        lastS = sRatio;
                        stage.tickOnUpdate = false;
                        stage.update();
                        stage.tickOnUpdate = true;
                        jQuery("#canvas_" + type).parent().parent().parent().parent().css('min-height', h * sRatio + 'px');
                        try {
                            kkmAction.resizeContent(iw, ih, pRatio, sRatio, scale);
                        } catch (e) {}
                    }
                } else if (scale == 'fix-width') {
                    if (jQuery("#canvas_" + type).parent().parent().parent().width() > 0) {
                        if (jQuery(window).width() > w) {
                            iw = jQuery("#canvas_" + type).parent().parent().parent().parent().width();

                        } else {
                            iw = jQuery(window).width();
                        }
                        ih = h * (iw / w);
                        xRatio = iw / w
                        yRatio = ih / h
                        sRatio = Math.min(xRatio, yRatio);

                        canvas.width = w * pRatio * sRatio;
                        canvas.height = h * pRatio * sRatio;
                        canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
                        canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
                        stage.scaleX = pRatio * sRatio;
                        stage.scaleY = pRatio * sRatio;
                        lastW = iw;
                        lastH = ih;
                        lastS = sRatio;
                        stage.tickOnUpdate = false;
                        stage.update();
                        stage.tickOnUpdate = true;
                        jQuery("#canvas_" + type).parent().parent().parent().parent().css('min-height', h * sRatio + 'px');
                        // console.log(jQuery("#canvas_" + type).parent().parent().parent().parent().width()+' : w : '+w+' | pRatio : '+pRatio+' | sRatio : '+sRatio+' | canvas.width : '+canvas.width)
                        try {
                            kkmAction.resizeContent(iw, ih, pRatio, sRatio, scale);
                        } catch (e) {}
                    }
                } else if (scale == 'full') {
                    if (jQuery("#canvas_" + type).parent().parent().width() > 0) {
                        var now_width = jQuery(window).width();
                        var now_hieght = jQuery(window).height();

                        if (setting_data.mobile && jQuery(window).width() <= setting_data.mobile_start && (now_hieght > now_width)) {
                            canvas.width = w * pRatio * xRatio;
                            canvas.height = h * pRatio * yRatio;
                            canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * xRatio + 'px';
                            canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * yRatio + 'px';
                            try {
                                kkmAction.resizeContent(w * pRatio * xRatio, h * pRatio * yRatio, pRatio, sRatio, scale, xRatio, yRatio);
                            } catch (e) {}
                            $(".fullcanvas").css('width', w * xRatio);
                            $(".fullcanvas").css('height', h * yRatio);
                        } else {
                            canvas.width = w * pRatio * xRatio;
                            canvas.height = h * pRatio * yRatio;
                            canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * xRatio + 'px';
                            canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * yRatio + 'px';
                            try {
                                kkmAction.resizeContent(w * pRatio * xRatio, h * pRatio * yRatio, pRatio, sRatio, scale, xRatio, yRatio);
                            } catch (e) {}
                            $(".fullcanvas").css('width', $(window).width());
                            $(".fullcanvas").css('height', $(window).height());
                        }

                        lastW = iw;
                        lastH = ih;
                        lastS = sRatio;
                        stage.tickOnUpdate = false;
                        stage.update();
                        stage.tickOnUpdate = true;

                    }
                }

            }


            kkmAction.resizeCanvas = resizeCanvas;
        }

        makeResponsive(true, 'both', true, 1);

        AdobeAn.compositionLoaded(lib.properties.id);
        fnStartAnimation();

        if (onpage == 'true') {
            if (kkmFlow.createjsArray.indexOf(type) == -1) {
                kkmFlow.createjsArray.push(type);
            }
            try {
                kkmFlow.createjs[type + "_remove"] = removeEvent;
            } catch (e) {}

            try {
                kkmFlow.createjs[type + "_removeAllEvent"] = kkmAction.removeAllEvent;
            } catch (e) {}
        }

        function removeEvent() {
            createjs.Ticker.removeEventListener("tick", stage);
            stage.clear();
        }

        // if (setting_data.drag=='true') {
        // createjs.Touch.enable(stage);
        // stage.enableMouseOver(10);
        // stage.mouseMoveOutside = true;
        // }
    }

});

app.directive('diCreatejs', function () {
    return {
        templateUrl: '/vendor/createjs/createjs.html'
    }
});



//FOR CREATEJS Custom

app.controller('CreatejsCustomContoller', function($scope, $location, $http, $attrs, $sce) {
    var setting_data = {
        type: '',
        scale: 'full',
        width: 960,
        height: 640,
        id: '',
        onpage: 'yes',
        obj: '',
        comp: '',
        mobile_width: 750,
        mobile_height: 0,
        mobile_start: 919,
        mobile: false,
        drag: false
    };

    $scope.myHTML = "";

    // console.log($attrs)

    setting_data.scale = $attrs.scale || setting_data.scale;
    setting_data.width = $attrs.width || setting_data.width;
    setting_data.height = $attrs.height || setting_data.height;
    setting_data.id = $attrs.id || setting_data.id;
    setting_data.type = $attrs.type || $attrs.id;
    setting_data.onpage = $attrs.onpage || setting_data.onpage;
    setting_data.obj = $attrs.obj || setting_data.obj;
    setting_data.comp = $attrs.comp || setting_data.comp;
    setting_data.mobile_width = $attrs.mobileWidth || setting_data.mobile_width;
    setting_data.mobile_height = $attrs.mobileHeight || setting_data.mobile_height;
    setting_data.mobile_start = $attrs.mobileStart || setting_data.mobile_start;
    setting_data.mobile = $attrs.mobile || setting_data.mobile;

    if (setting_data.obj != '') {
        setting_data.obj = jQuery.parseJSON(($attrs.obj.toString()))
    }

    var id = setting_data.id;
    var type = setting_data.type;
    var scale = setting_data.scale;
    var width = setting_data.width;
    var height = setting_data.height;
    var onpage = setting_data.onpage;
    var dataObject = setting_data.obj;
    var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
    var comp, lib, images, ss;
    var _numload = 0;
    var st = '';
    var fixh = 0;

    st += '<div id="animation_container_' + type + '" style="width:' + width + 'px; height:' + height + 'px">'
    st += '<canvas id="canvas_' + type + '" width="' + width + '" height="' + height + '" style="position: absolute; display: block;"></canvas>'
    st += '<div id="dom_overlay_container_' + type + '" style="pointer-events:none; overflow:hidden; width:' + width + 'px; height:' + height + 'px; position: absolute; left: 0px; top: 0px; display: block;">'
    st += '</div>'
    st += '</div>'

    $scope.myHTML = $sce.trustAsHtml(st);

    try {
        kkmFlow.createjs[type + "_init"] = init;
    } catch (e) {}
    $(document).ready(function() {
        init();
    });


    function init() {
        comp = AdobeAn.getComposition(setting_data.comp);
        lib = comp.getLibrary();
        if (!jQuery.isEmptyObject(lib.properties.manifest)) {
            for (var i = 0; i < lib.properties.manifest.length; i++) {
                lib.properties.manifest[i]['src'] = '/animate/' + lib.properties.manifest[i]['src']
            }
            var loader = new createjs.LoadQueue(false);
            loader.addEventListener("fileload", function(evt) {
                handleFileLoad(evt)
            });
            loader.addEventListener("complete", function(evt) {
                handleComplete(evt)
            });
            loader.loadManifest(lib.properties.manifest);
        } else {
            setLib()
        }
        createjs.MotionGuidePlugin.install();
    }

    function handleFileLoad(evt) {
        $(".loader").show();
        _numload++;
        // console.log('handleFileLoad : ' + _numload)
        images = comp.getImages();
        if (evt && (evt.item.type == "image")) {
            images[evt.item.id] = evt.result;
            var percentage = Math.round((_numload / lib.properties.manifest.length) * 100);
            try {
                kkmFlow.showWait(percentage);
            } catch (e) {}
        }
    }

    function handleComplete(evt) {
        ss = comp.getSpriteSheet();
        var queue = evt.target;
        var ssMetadata = lib.ssMetadata;
        for (i = 0; i < ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                "images": [queue.getResult(ssMetadata[i].name)],
                "frames": ssMetadata[i].frames
            })
        }
        setLib();
        $(".bg_lds_roller").hide();
    }

    function setLib() {
        canvas = document.getElementById("canvas_" + type);
        anim_container = document.getElementById("animation_container_" + type);
        dom_overlay_container = document.getElementById("dom_overlay_container_" + type);
        var kkmAction = this[id + "Action"]
        exportRoot = new lib[id]();
        stage = new lib.Stage(canvas);

        $scope.createjs[type + "_root"] = exportRoot;
        $scope.createjs[type + "_action"] = kkmAction;
        kkmAction.setupStart(exportRoot, stage, lib, $scope);
        fnStartAnimation = function() {
            stage.addChild(exportRoot);
            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);
        }

        function makeResponsive(isResp, respDim, isScale, scaleType) {
            var lastW, lastH, lastS = 1;
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            function resizeCanvas() {
                var w = lib.properties.width,
                    h = lib.properties.height;

                    w = setting_data.width
                    h = setting_data.height

                if (setting_data.mobile) {
                    if (jQuery(window).width() <= setting_data.mobile_start) {
                        w = setting_data.mobile_width
                        h = setting_data.mobile_height
                    }
                }

                var iw = jQuery(window).width();
                var ih = jQuery(window).height();
                var pRatio = window.devicePixelRatio || 1,
                    xRatio = iw / w,
                    yRatio = ih / h,
                    sRatio = 1;
                if (isResp) {
                    if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                        sRatio = lastS;
                    } else if (!isScale) {
                        if (iw < w || ih < h)
                            sRatio = Math.min(xRatio, yRatio);
                    } else if (scaleType == 1) {
                        sRatio = Math.min(xRatio, yRatio);
                    } else if (scaleType == 2) {
                        sRatio = Math.max(xRatio, yRatio);
                    }
                }
                if (scale == 'fix-div') {
                    if (jQuery("#canvas_" + type).parent().parent().width() > 0) {
                        canvas.width = w * pRatio * sRatio;
                        canvas.height = h * pRatio * sRatio;
                        canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
                        canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
                        stage.scaleX = pRatio * sRatio;
                        stage.scaleY = pRatio * sRatio;
                        lastW = iw;
                        lastH = ih;
                        lastS = sRatio;
                        stage.tickOnUpdate = false;
                        stage.update();
                        stage.tickOnUpdate = true;
                        jQuery("#canvas_" + type).parent().parent().parent().parent().css('min-height', h * sRatio + 'px');
                        try {
                            kkmAction.resizeContent(iw, ih, pRatio, sRatio, scale);
                        } catch (e) {}
                    }
                } else if (scale == 'fix-width') {
                    if (jQuery("#canvas_" + type).parent().parent().parent().width() > 0) {
                        if (jQuery(window).width() > w) {
                            iw = jQuery("#canvas_" + type).parent().parent().parent().parent().width();

                        } else {
                            iw = jQuery(window).width();
                        }
                        ih = h * (iw / w);
                        xRatio = iw / w
                        yRatio = ih / h
                        sRatio = Math.min(xRatio, yRatio);

                        canvas.width = w * pRatio * sRatio;
                        canvas.height = h * pRatio * sRatio;
                        canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
                        canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
                        stage.scaleX = pRatio * sRatio;
                        stage.scaleY = pRatio * sRatio;
                        lastW = iw;
                        lastH = ih;
                        lastS = sRatio;
                        stage.tickOnUpdate = false;
                        stage.update();
                        stage.tickOnUpdate = true;
                        jQuery("#canvas_" + type).parent().parent().parent().parent().css('min-height', h * sRatio + 'px');
                        // console.log(jQuery("#canvas_" + type).parent().parent().parent().parent().width()+' : w : '+w+' | pRatio : '+pRatio+' | sRatio : '+sRatio+' | canvas.width : '+canvas.width)
                        try {
                            kkmAction.resizeContent(iw, ih, pRatio, sRatio, scale);
                        } catch (e) {}
                    }
                } else if (scale == 'full') {
                    if (jQuery("#canvas_" + type).parent().parent().width() > 0) {
                        var now_width = jQuery(window).width();
                        var now_hieght = jQuery(window).height();

                        if (setting_data.mobile && jQuery(window).width() <= setting_data.mobile_start && (now_hieght > now_width)) {
                            canvas.width = w * pRatio * xRatio;
                            canvas.height = h * pRatio * yRatio;
                            canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * xRatio + 'px';
                            canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * yRatio + 'px';
                            try {
                                kkmAction.resizeContent(w * pRatio * xRatio, h * pRatio * yRatio, pRatio, sRatio, scale, xRatio, yRatio);
                            } catch (e) {}
                            $(".fullcanvas").css('width', w * xRatio);
                            $(".fullcanvas").css('height', h * yRatio);
                        } else {
                            canvas.width = w * pRatio * xRatio;
                            canvas.height = h * pRatio * yRatio;
                            canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * xRatio + 'px';
                            canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * yRatio + 'px';
                            try {
                                kkmAction.resizeContent(w * pRatio * xRatio, h * pRatio * yRatio, pRatio, sRatio, scale, xRatio, yRatio);
                            } catch (e) {}
                            $(".fullcanvas").css('width', $(window).width());
                            $(".fullcanvas").css('height', $(window).height());
                        }

                        lastW = iw;
                        lastH = ih;
                        lastS = sRatio;
                        stage.tickOnUpdate = false;
                        stage.update();
                        stage.tickOnUpdate = true;

                    }
                }

            }


            kkmAction.resizeCanvas = resizeCanvas;
        }

        makeResponsive(true, 'both', true, 1);

        AdobeAn.compositionLoaded(lib.properties.id);
        fnStartAnimation();

        $(".loader").show();
        $("body").addClass('overflowhidden')
        $(".container.custom-container").hide();

        if (onpage == 'true') {
            if (kkmFlow.createjsArray.indexOf(type) == -1) {
                kkmFlow.createjsArray.push(type);
            }
            try {
                kkmFlow.createjs[type + "_remove"] = removeEvent;
            } catch (e) {}

            try {
                kkmFlow.createjs[type + "_removeAllEvent"] = kkmAction.removeAllEvent;
            } catch (e) {}
        }

        function removeEvent() {
            createjs.Ticker.removeEventListener("tick", stage);
            stage.clear();
        }

        // if (setting_data.drag=='true') {
        // createjs.Touch.enable(stage);
        // stage.enableMouseOver(10);
        // stage.mouseMoveOutside = true;
        // }
    }

});

app.directive('diCreatejscustom', function() {
    return {
        templateUrl: '/vendor/createjs/createjs.html'
    }
});
