const schedule = [
    { start: "14:00", end: "14:30", name: "Lunch", displayTime: "2:00 PM – 2:30 PM" },
    { start: "14:30", end: "15:30", name: "Homework", displayTime: "2:30 PM – 3:30 PM" },
    { start: "15:30", end: "16:30", name: "Study", displayTime: "3:30 PM – 4:30 PM" },
    { start: "16:30", end: "17:00", name: "Water Plants", displayTime: "4:30 PM – 5:00 PM" },
    { start: "17:00", end: "17:45", name: "Workout", displayTime: "5:00 PM – 5:45 PM" },
    { start: "17:45", end: "18:00", name: "Prayer", displayTime: "5:45 PM – 6:00 PM" },
    { start: "18:00", end: "21:00", name: "Outdoor Play", displayTime: "6:00 PM – 9:00 PM" },
    { start: "21:00", end: "22:00", name: "Dinner + Gaming", displayTime: "9:00 PM – 10:00 PM" },
    { start: "22:00", end: "23:59", name: "Sleep", displayTime: "10:00 PM onwards" }
];

function renderSchedule() {
    const tbody = document.getElementById('schedule-body');
    tbody.innerHTML = schedule.map((item, index) => `
        <tr id="task-${index}">
            <td class="time-col">${item.displayTime}</td>
            <td class="activity-col">${item.name}</td>
        </tr>
    `).join('');
}

function updateTracker() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const timeInMinutes = currentHours * 60 + currentMinutes;

    const statusBox = document.getElementById('current-status');
    
    // Clear previous highlights
    document.querySelectorAll('tr').forEach(tr => tr.classList.remove('current-task'));

    // Weekend Check
    if (day === 0 || day === 6) {
        statusBox.innerHTML = "🏁 It's the weekend! Time to recharge.";
        return;
    }

    let currentTaskIndex = -1;

    for (let i = 0; i < schedule.length; i++) {
        const [sHours, sMinutes] = schedule[i].start.split(':').map(Number);
        const [eHours, eMinutes] = schedule[i].end.split(':').map(Number);
        
        const startTotal = sHours * 60 + sMinutes;
        const endTotal = eHours * 60 + eMinutes;

        if (timeInMinutes >= startTotal && timeInMinutes < endTotal) {
            currentTaskIndex = i;
            break;
        }
    }

    if (currentTaskIndex !== -1) {
        const currentTask = schedule[currentTaskIndex];
        const row = document.getElementById(`task-${currentTaskIndex}`);
        if (row) row.classList.add('current-task');

        // Calculate time left in current task
        const [eHours, eMinutes] = currentTask.end.split(':').map(Number);
        const endTotal = eHours * 60 + eMinutes;
        const minutesLeft = endTotal - timeInMinutes;

        statusBox.innerHTML = `⚡ <strong>Current:</strong> ${currentTask.name} (${minutesLeft}m remaining)`;
    } else {
        statusBox.innerHTML = "🔋 Outside schedule hours / Free Time";
    }
}

// Initial setup
renderSchedule();
updateTracker();

// Update every 30 seconds
setInterval(updateTracker, 30000);
