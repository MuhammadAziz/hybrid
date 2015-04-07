define([
	'text!views/setup/pin/pin.html',
	'views/baseview',
	'utils/utils'
], function (html, View, utils) {
	var $passCode = null, $confirmPasscode = null, isSaved = false;
	var model = kendo.observable({
		isConfirm: false,
		onInit: function (e) {
			$passCode = e.sender.element.find('#view-pin-code-1');
			$confirmPasscode = e.sender.element.find('#view-pin-code-confirm-1');
		},
		onShow: function (e) {
		},
		onAfterShow: function () {
			$passCode.focus();
		},
		onBeforeShow:function(e) {
			isSaved && e.preventDefault();
		},
		formData: {
			passCode1: null,
			passCode2: null,
			passCode3: null,
			passCode4: null
		},
		confirmPasscode:{
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
		dataChanged: function(){
			var data = this.formData, confirm = this.confirmPasscode, that = this, passCodes = [];
			if (data.passCode1 && data.passCode2 && data.passCode3 && data.passCode4 && !that.isConfirm) {
				that.set("isConfirm", true);
				$confirmPasscode.focus();
			}else if (confirm.passCode1 && confirm.passCode2 && confirm.passCode3 && confirm.passCode4 && that.isConfirm) {
				if(that._isPasscodeValid()){
					passCodes.push(confirm.passCode1);
					passCodes.push(confirm.passCode2);
					passCodes.push(confirm.passCode3);
					passCodes.push(confirm.passCode4);
					that._save(passCodes.join(''));
				}else{
					alert("Passcode doesn't match");
					that._resetConfirmPasscode();
					$confirmPasscode.focus();
				}
			}
		},
		_resetConfirmPasscode: function(){
			this.set("confirmPasscode", {
				passCode1: null,
				passCode2: null,
				passCode3: null,
				passCode4: null
			});
		},
		_resetPasscode: function(){
			this.set("formData", {
				passCode1: null,
				passCode2: null,
				passCode3: null,
				passCode4: null
			});
			this.set("isConfirm", false);
		},
		_isPasscodeValid: function(){
			var data = this.formData, confirm = this.confirmPasscode;
			if( data.passCode1 === confirm.passCode1 && 
				data.passCode2 === confirm.passCode2 && 
				data.passCode3 === confirm.passCode3 && 
				data.passCode4 === confirm.passCode4) {
				return true;
			}
			return false;
		},
		_save: function (data) {
			utils.savePasscode(data);
			App.mobile.navigate("#view-home");
			isSaved = true;
		},
		reset: function(){
			this._resetConfirmPasscode();
			this._resetPasscode();
			$passCode.focus();
		},
		skip: function () {
			utils.skipPasscode(true);
			App.mobile.navigate("#view-home");
			isSaved = true;
		}
	});
	new View('pin', html, model);
	return model;
});