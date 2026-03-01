const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitsContainer = document.getElementById("habitsContainer");
const resetBtn = document.getElementById("resetBtn");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Add a new habit
function addHabit() {
    const habitName = habitInput.value.trim();
    if (!habitName) return alert("Please enter a habit.");

    const habit = {
        id: Date.now(),
        name: habitName,
        progress: [false, false, false, false,false, false, false] // 7 days
    };

    habits.push(habit);
    updateLocalStorage();
    renderHabits();
    habitInput.value = "";
}

// Render UI
function renderHabits() {
    habitsContainer.innerHTML = "";

    habits.forEach(habit => {
        const card = document.createElement("div");
        card.classList.add("habit-card");

        card.innerHTML = `
            <div>
                <h3>${habit.name}</h3>
                <div class="checks" id="checks-${habit.id}">
                </div>
            </div>
            <button class="delete-btn" onclick="deleteHabit(${habit.id})">Delete</button>
        `;

        habitsContainer.appendChild(card);

        // Add checkboxes
        const checksContainer = document.getElementById(`checks-${habit.id}`);
        habit.progress.forEach((isChecked, index) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = isChecked;

            checkbox.addEventListener("change", () => {
                habit.progress[index] = checkbox.checked;
                updateLocalStorage();
            });

            checksContainer.appendChild(checkbox);
        });
    });
}

// Delete habit
function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    updateLocalStorage();
    renderHabits();
}

// Reset daily progress (all checkboxes)
function resetProgress() {
    habits.forEach(habit => {
        habit.progress = [false, false, false, false, false, false, false];
    });
    updateLocalStorage();
    renderHabits();
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// Event listeners
addHabitBtn.addEventListener("click", addHabit);
resetBtn.addEventListener("click", resetProgress);

// Initial render
renderHabits();
