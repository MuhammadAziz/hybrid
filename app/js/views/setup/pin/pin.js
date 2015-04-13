define([
    'text!./pin.html',
    'utils/passcode-helper',
    'utils/settings'
], function (html, passcodeHelper, settings) {
    var $passCode = null, $formDataConfirm = null, notif = navigator.notification,
    model = mrapp.view({
        html: html,
        name: "pin",
        isConfirm: false,
        onBeforeShow: function(e){
            if(settings.isSetupComplete()){
                e.preventDefault();
            }else{
                e.isSetup = true;
                model.reset();
            }
        },
        onInit: function (e) {
            $passCode = e.sender.element.find('#view-pin-code-1');
            $formDataConfirm = e.sender.element.find('#view-pin-code-confirm-1');
        },
        onShow: function (e) {
        },
        onAfterShow: function () {
            $passCode.focus();
        },
        formData: {
            passCode1: null,
            passCode2: null,
            passCode3: null,
            passCode4: null
        },
        formDataConfirm: {
            passCode1: null,
            passCode2: null,
            passCode3: null,
            passCode4: null
        },
        onKeyup: function (event) {
            var target = $(event.target);
            var value = target.val();
            var next = $("#" + target.attr('data-next'));
            value && next.focus();
        },
        dataChanged: function () {
            var data = model.formData, confirm = model.formDataConfirm, passCodes = [];
            if (data.passCode1 && data.passCode2 && data.passCode3 && data.passCode4 && !model.isConfirm) {
                model.set("isConfirm", true);
                $formDataConfirm.focus();
            } else if (confirm.passCode1 && confirm.passCode2 && confirm.passCode3 && confirm.passCode4 && model.isConfirm) {
                if (module.isPasscodeValid()) {
                    passCodes.push(confirm.passCode1);
                    passCodes.push(confirm.passCode2);
                    passCodes.push(confirm.passCode3);
                    passCodes.push(confirm.passCode4);
                    module.save(passCodes.join(''));
                } else {
                    notif.alert("Passcode doesn't match", module.resetConfirmPasscode, "Invalid PIN");
                    $formDataConfirm.focus();
                }
            }
        },
        reset: function () {
            module.resetConfirmPasscode();
            module.resetPasscode();
            model.set("isConfirm", false);
            $passCode && $passCode.focus();
        },
        skip: function () {
            module.skip();
        }
    }),
    module = {
        skip: function(){
            //TODO: skip validation, hint: passcode can be skipped only if still in first launch
            passcodeHelper.togglePasscode(false);
            if (settings.isSetupComplete()) {
                mrapp.mobile.navigate("#:back");
            } else {
                mrapp.mobile.navigate("#view-agreement");
            }
        },
        save: function (data) {
            passcodeHelper.savePasscode(data);
            passcodeHelper.togglePasscode(true);
            mrapp.mobile.navigate("#view-agreement");
        },
        isPasscodeValid: function () {
            var data = model.formData, confirm = model.formDataConfirm;
            if (data.passCode1 === confirm.passCode1 &&
                    data.passCode2 === confirm.passCode2 &&
                    data.passCode3 === confirm.passCode3 &&
                    data.passCode4 === confirm.passCode4) {
                return true;
            }
            return false;
        },
        resetConfirmPasscode: function () {
            model.resetForm.call(model, "formDataConfirm");
        },
        resetPasscode: function () {
            model.resetForm.call(model, "formData");
        }
    };
    return model;
});