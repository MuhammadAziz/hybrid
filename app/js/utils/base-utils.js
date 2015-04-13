define(function(){
	var BaseUtils = kendo.Class.extend({
		getObject: function(obj, is, value){
			if(typeof is === 'string'){
				return this.getObject(obj, is.split("."), value);
			}else if(is.length === 1 && value !== undefined){
				return obj[is[0]] = value;
			}else if (is.length === 0){
				return obj;
			}else{
				value !== undefined && !obj[is[0]] && (obj[is[0]] = {});
				return this.getObject(obj[is[0]], is.slice(1), value);
			}
		},
		saveToSession: function(key, value){
			var name = key.split(":"), currentValue = null, that = this;
			currentValue = that.getFromStorage(name[0]);
			if(name[1]){
				currentValue = currentValue || {};
				that.getObject(currentValue, name[1], value);
			}else {
				currentValue = value;
			}
			sessionStorage.setItem(name[0], getEncrypted(that.encrpyt, JSON.stringify(currentValue)));
		},
		getFromSession: function (key) {
			var name = key.split(":"), value = sessionStorage.getItem(name[0]), that = this;
			try{
				value && (value = getDecrypted(that.decrypt, value), value = JSON.parse(value));
			}catch (e){
				//is string;
			}
			if(value && typeof value === 'object' && (value instanceof Array) === false && name[1]){
				return this.getObject(value, name[1]);
			}else{
				return value;
			}
			return value;
		},
		deleteFromSession: function(key){
			var names = key.split(":"), currentValue, name, parent, child;
			if(names[1]){
				name = names[1].split(".");
				if(name.length > 1){
					parent = names[1].substring(0, names[1].lastIndexOf("."));
					child = names[1].substring(names[1].lastIndexOf(".") + 1, names[1].length);
					currentValue = this.getFromSession(names[0]+":"+parent);
					if(typeof currentValue === 'object'){
						delete currentValue[child];
						this.saveToSession(names[0]+":"+parent, currentValue);
					}else{
						throw new Error("Unknown :" + key);
					}
				}else{
					currentValue = this.getFromSession(names[0]);
					if(currentValue && typeof currentValue === 'object' && (currentValue instanceof Array) === false){
						delete currentValue[names[1]];
						this.saveToSession(names[0], currentValue);
					}else{
						sessionStorage.removeItem(key);
					}
				}
			}else{
				sessionStorage.removeItem(key);
			}
		},
		saveToStorage: function (key, value) {
			var name = key.split(":"), currentValue = null, that = this;
			currentValue = that.getFromStorage(name[0]);
			if(name[1]){
				currentValue = currentValue || {};
				that.getObject(currentValue, name[1], value);
			}else {
				currentValue = value;
			}
			localStorage.setItem(name[0], getEncrypted(that.encrpyt, JSON.stringify(currentValue)));
		},
		getFromStorage: function (key) {
			var name = key.split(":"), value = localStorage.getItem(name[0]), that = this;
			try{
				value && (value = getDecrypted(that.decrypt, value), value = JSON.parse(value));
			}catch (e){
				//is string;
			}
			if(value && typeof value === 'object' && (value instanceof Array) === false && name[1]){
				return this.getObject(value, name[1]);
			}else{
				return value;
			}
			return value;
		},
		deleteFromStorage: function(key){
			var names = key.split(":"), currentValue, name, parent, child;
			if(names[1]){
				name = names[1].split(".");
				if(name.length > 1){
					parent = names[1].substring(0, names[1].lastIndexOf("."));
					child = names[1].substring(names[1].lastIndexOf(".") + 1, names[1].length);
					currentValue = this.getFromStorage(names[0]+":"+parent);
					if(typeof currentValue === 'object'){
						delete currentValue[child];
						this.saveToStorage(names[0]+":"+parent, currentValue);
					}else{
						throw new Error("Unknown :" + key);
					}
				}else{
					currentValue = this.getFromStorage(names[0]);
					if(currentValue && typeof currentValue === 'object' && (currentValue instanceof Array) === false){
						delete currentValue[names[1]];
						this.saveToStorage(names[0], currentValue);
					}else{
						localStorage.removeItem(key);
					}
				}
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

