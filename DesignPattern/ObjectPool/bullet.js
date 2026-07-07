class Bullet extends Game_object {
    constructor() {
        super();
        this.speed = 200;
    }

    update(dt) {
        this.x += this.speed * dt;
    }
}