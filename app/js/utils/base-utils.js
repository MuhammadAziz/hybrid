define(function(){
	var BaseUtils = kendo.Class.extend({
		saveToSession: function(key, value){
			var currentValue = null, that = this;
			switch(true){
				case typeof value === 'string':
					sessionStorage.setItem(key, value);
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
				sessionStorage.setItem(key, JSON.stringify(value));
			}
		},
		getFromSession: function (key) {
			var value = sessionStorage.getItem(key), that = this;
			// value && (value = getDecrypted(that.decrypt, value));
			try{
				value = JSON.parse(value);
			}catch (e){
				//is string?
			}
			return value;
		},
		deleteFromSession: function(key, objKey){
			var currentValue = this.getFromStorage(key);
			if(typeof currentValue === 'object' && objKey){
				delete currentValue[objKey];
				sessionStorage.setItem(key, JSON.stringify(currentValue));
			}else{
				sessionStorage.removeItem(key);
			}
		},
		saveToStorage: function (key, value) {
			var currentValue = null, that = this;
			switch(true){
				case typeof value === 'string':
					localStorage.setItem(key, getEncrypted(that.encrpyt, value));
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
				localStorage.setItem(key, getEncrypted(that.encrpyt, JSON.stringify(value)));
			}
		},
		getFromStorage: function (key) {
			var value = localStorage.getItem(key), that = this;
			value && (value = getDecrypted(that.decrypt, value));
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
			var encrypted = CryptoJS.AES.encrypt(decrypted, passphrase);
			return encrypted.toString();
		},
		decrypt: function(passphrase, encrypted){
			var decrypted = CryptoJS.AES.decrypt(encrypted, passphrase);
			decrypted = CryptoJS.enc.Latin1.stringify(decrypted);
			return decrypted;
		}
	});
	var passKey = "U2FsdGVkX194LL7C9viD6Hc04eLuKhQFIv2FJ9Vj2Q9E/PbaMz3/mE/nBTA/+Ma2sDrqP/e8gwJwntgsGaFlwQ==";
	function getEncrypted(encryptor, value){
		return encryptor(passKey, value);
	}
	function getDecrypted(decryptor, value){
		return decryptor(passKey, value);
	}
	return BaseUtils;
});

