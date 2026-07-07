const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
document.getElementById("currentMode").innerText = "POOL MODE";

const bulletPool = new Object_pool(Bullet);
const bullets = [];
let lastTime = performance.now();

let isPressing = false;

canvas.addEventListener("mousedown", () => isPressing = true);
window.addEventListener("mouseup", () => isPressing = false);

function spawnBulletsWithPool() {
    for (let i = 0; i < 5; ++i) {
        const bullet = bulletPool.get();
        bullet.active = true;
        bullet.x = 0;
        bullet.y = Math.random() * canvas.height;
        bullets.push(bullet);
    }
}

function update(dt) {
    if (isPressing)
        spawnBulletsWithPool();

    for (let i = 0; i < bullets.length; ++i) {
        const bullet = bullets[i];
        bullet.update(dt);

        if (bullet.x > canvas.width) {
            bullet.active = false;
            bulletPool.release(bullet);
            bullets.splice(i, 1);
            i--;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4caf50";
    for (let bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    document.getElementById("activeCount").innerText = bullets.length;
    document.getElementById("pooledCount").innerText = bulletPool._pool.length;
    document.getElementById("totalCreated").innerText = bulletPool.totalCreated;
}

function gameLoop(currentTime) {
    let dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    update(dt);
    draw();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);