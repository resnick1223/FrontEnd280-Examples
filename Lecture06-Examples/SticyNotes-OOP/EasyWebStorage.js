
function EasyWebStorage(namespace, providerType) {
    this.namespace = namespace;
    this.providerType = providerType;
    this.keyTableName = this.namespace + "KeyTable";
    this.keyTable = [];
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
    this.keyTable = localStorage[this.keyTableName];
    if (!this.keyTable) {
        this.keyTable = [];
        localStorage[this.keyTableName] = JSON.stringify(this.keyTable);
    } else {
        this.keyTable = JSON.parse(this.keyTable);
    }
};

EasyWebStorage.prototype.get = function (key) {
    return JSON.parse(localStorage[key]);
};

EasyWebStorage.prototype.updateKeyTable = function () {
    this.update(this.keyTableName, this.keyTable);
};


EasyWebStorage.prototype.insert = function (data) {

    var key = this.namespace + "_" + (new Date()).getTime();
    this.keyTable.push(key);
    this.updateKeyTable();
    data._id = key;
    localStorage.setItem(key, JSON.stringify(data));
    return data;

};

EasyWebStorage.prototype.update = function (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};


EasyWebStorage.prototype.delete = function (key) {

    if (this.keyTable) {
        for (var index = 0; index < this.keyTable.length; index++) {
            if (key === this.keyTable[index]) {
                this.keyTable.splice(index, 1);
            }
        }
        localStorage.removeItem(key);
        this.updateKeyTable();
    }
};

EasyWebStorage.prototype.clearAll = function () {

    this.keyTable.forEach(function (key) {
        localStorage.removeItem(key);
    });
    this.keyTable = [];
    this.updateKeyTable();

};