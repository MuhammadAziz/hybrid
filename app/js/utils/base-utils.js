define(function(){
//	var iv = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
	var BaseUtils = kendo.Class.extend({
		saveToStorage: function (key, value) {
			var currentValue = null;
			switch(true){
				case typeof value === 'string':
					localStorage.setItem(key, value);
					break;
				case typeof value === 'object':
					currentValue = this.getFromStorage(key);
					if(currentValue){
						$.extend(true, currentValue, value);
						save(currentValue);
					}else{
						save(value);
					}
					break;
			}
			function save(value){
				localStorage.setItem(key, JSON.stringify(value));
			}
		},
		getFromStorage: function (key) {
			var value = localStorage.getItem(key);
			try{
				value = JSON.parse(value);
			}catch (e){
				//is string?
			}
			return value;
		},
		deleteFromStorage: function(key, objKey){
			var currentValue = this.getFromStorage(key);
			if(typeof currentValue === 'object' && objKey){
				delete currentValue[objKey];
				localStorage.setItem(key, JSON.stringify(currentValue));
			}else{
				localStorage.removeItem(key);
			}
		},
		encrpyt: function(passphrase, decrypted){
//			var key = CryptoJS.enc.Hex.parse(passphrase);
			var encrypted = CryptoJS.AES.encrypt(decrypted, passphrase);
			return encrypted.toString();
		},
		decrypt: function(passphrase, encrypted){
//			var key = CryptoJS.enc.Hex.parse(passphrase);
			var decrypted = CryptoJS.AES.decrypt(encrypted, passphrase);
			decrypted = CryptoJS.enc.Latin1.stringify(decrypted);
			return decrypted;
		}
	});
	return BaseUtils;
});

