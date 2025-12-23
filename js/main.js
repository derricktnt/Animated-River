import { River } from "./river.js";
import { Fish } from "./fish.js";

const canvas = document.getElementById("riverCanvas");
const ctx = canvas.getContext("2d");

const modal = document.getElementById("fishModal");
const input = document.getElementById("fishNameInput");
const saveBtn = document.getElementById("saveFishName");
const cancelBtn = document.getElementById("cancelFishName");

let selectedFish = null;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const river = new River(canvas);
const fishSchool = Array.from({ length: 6 }, () => new Fish(canvas));

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const fish of fishSchool) {
        if (fish.isClicked(x, y)) {
            selectedFish = fish;
            input.value = fish.name || "";
            modal.classList.remove("hidden");
            input.focus();
            break;
        }
    }
});

saveBtn.addEventListener("click", () => {
    if (selectedFish && input.value.trim()) {
        selectedFish.name = input.value.trim();
    }
    closeModal();
});

cancelBtn.addEventListener("click", closeModal);

function closeModal() {
    modal.classList.add("hidden");
    input.value = "";
    selectedFish = null;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    river.draw(ctx);

    fishSchool.forEach(fish => {
        fish.update();
        fish.draw(ctx);
    });

    requestAnimationFrame(animate);
}

animate();
