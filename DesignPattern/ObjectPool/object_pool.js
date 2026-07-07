class Object_pool {
    constructor(ObjectClass) {
        this.ObjectClass = ObjectClass;
        this._pool = [];
        this.totalCreated = 0;
    }

    get() {
        if (this._pool.length > 0) {
            return this._pool.pop();
        }

        this.totalCreated++;
        return new this.ObjectClass();
    }

    release(obj) {
        this._pool.push(obj);
    }

    clear() {
        this._pool = [];
    }
}