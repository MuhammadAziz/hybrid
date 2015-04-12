define(function () {
    var mrapp = window.mrapp = window.mrapp || {model: {}},
    MediRecordsObservable = kendo.data.ObservableObject.extend({
        init: function (options) {
            var that = this;
            options._forms = {};
            kendo.data.ObservableObject.fn.init.call(that, options);
            //append template to DOM
            if (options.html && options.hasOwnProperty("html")) {
                $(options.html).appendTo(document.body);
            } else {
                throw new Error("mrapp.view(): html view shoud be defined");
            }
            //expose view model to global object as mrapp.model[name]
            if (options.name && options.hasOwnProperty("name")) {
                mrapp.model[options.name] = that;
            } else {
                throw new Error("mrapp.view(): view model name shoud be defined");
            }
            //clone all field which key starts with 'form' as resetable form data
            $.each(options, function (key, value) {
                var data = {};
                /^form/i.test(key) && value && ($.extend(true, data, value), that._forms[key] = data);
            });
            //cache super function
            setAugmentation(that);
        },
        onBeforeShow: function (e) {
            //TODO: add view validation
            /*
            if(setup_incomplete && passcode_invalid){
                e.preventDefault();
                redirect: intro
            }
            if(setup_complete && passcode_valid){
                e.preventDefault();
                no: home --> setup
            }
            if(setup_complete && passcode_invalid){
                e.preventDefault();
                redirect: lock
            }
            //*/
        },
        onInit: function (e) {

        },
        onShow: function (e) {

        },
        onAfterShow: function (e) {

        },
        onBeforeHide: function (e) {

        },
        onHide: function (e) {

        },
        resetView: function (e) {
            //scroll view to top
            e.view.scroller.reset();

            //clear active tab strip
            e.view.footer.find('[data-role-tabstrip]')
                    .data('kendoMobileTabStrip')
                    .clear();
        },
        resetForm: function () {
            var that = this, forms = that._forms,
            reset = function (name, form) {
                var data = null;
                if(typeof form === 'object' && (form instanceof Array) === false && form){
                    data = {};
                    $.extend(true, data, form);
                }else{
                    data = form;
                }
                that.set(name, data);
            },
            validate = function (target) {
                var names = target.split("."), valid = true, counter = 0, source,
                    parser = function(form, name){
                        if(name && valid){
                            counter++;
                            if(form.hasOwnProperty && form.hasOwnProperty(name)){
                                source = form[name];
                                parser(source, names[counter]);
                            }else{
                                valid = false;
                            }
                        }
                    };
                parser(forms, names[counter]);
                if (valid) {
                    reset(target, source);
                } else {
                    throw new Error("resetForm(): Cannot find any resetable form data with name: " + target + ". Only field which name starts with 'form' will treat as resetable form data.");
                }
            };
            $.each(arguments, function (i, val) {
                /^form/i.test(val) && validate(val);
            });
        }
    }),
    //Override event
    setAugmentation = function(target){
        var fn = MediRecordsObservable.fn;
        target && $.each(target, function(key, value){
            if(/^on/i.test(key) && fn.hasOwnProperty(key)){
                target[key] = function(method){
                    return function(e){
                        method.call(this, e);
                        if(e.isDefaultPrevented() === false){
                            fn[key].call(this, e);
                        }
                    };
                }(target[key]);
            }
        });
    };
    mrapp.view = function (options) {
        return new MediRecordsObservable(options);
    };
    return MediRecordsObservable;
});

