
function EasyWebStorage(appName, providerType) {
    this.appName = appName;
    this.providerType = providerType;
    this.keysName = this.appName + "-keys";
    this.init();
}

EasyWebStorage.prototype.init = function () {
    switch (this.providerType) {
        case "localStorage":
            this.initLocalStorage();
            break;
        default:
            this.initLocalStorage();
            break;
    }
};

EasyWebStorage.prototype.initLocalStorage = function () {
    this.keys = localStorage[this.keysName];
    if (!this.keys) {
        this.keys = [];
        localStorage[this.keysName] = JSON.stringify(this.keys);
    } else {
        this.keys = JSON.parse(this.keys);
    }
};

EasyWebStorage.prototype.get = function (key) {
    return JSON.parse(localStorage[key]);
};

EasyWebStorage.prototype.updateKeys = function () {
    this.update(this.keysName, this.keys);
};


EasyWebStorage.prototype.insert = function (data) {

    var key = this.appName + "_" + (new Date()).getTime();
    this.keys.push(key);
    this.updateKeys();
    data._id = key;
    localStorage.setItem(key, JSON.stringify(data));
    return data;

};

EasyWebStorage.prototype.update = function (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};


EasyWebStorage.prototype.delete = function (key) {

    if (this.keys) {
        for (var index = 0; index < this.keys.length; index++) {
            if (key === this.keys[index]) {
                this.keys.splice(index, 1);
            }
        }
        localStorage.removeItem(key);
        this.updateKeys();
    }
};

EasyWebStorage.prototype.clearAll = function () {

    this.keys.forEach(function (key) {
        localStorage.removeItem(key);
    });
    this.keys = [];
    this.updateKeys();

};