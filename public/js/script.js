document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');
    let talks = [];

    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            talks = data;
            renderSchedule(talks);
        });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTalks = talks.filter(talk => 
            talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    });

    function renderSchedule(talksToRender) {
        scheduleContainer.innerHTML = '';
        let startTime = new Date();
        startTime.setHours(10, 0, 0, 0);

        talksToRender.forEach((talk, index) => {
            const talkElement = document.createElement('div');
            talkElement.classList.add('schedule-item');

            const time = new Date(startTime);
            const endTime = new Date(time.getTime() + 60 * 60 * 1000);

            talkElement.innerHTML = `
                <p class="time">${formatTime(time)} - ${formatTime(endTime)}</p>
                <h2>${talk.title}</h2>
                <p class="speakers">${talk.speakers.join(', ')}</p>
                <p>${talk.description}</p>
                <div>
                    ${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}
                </div>
            `;
            scheduleContainer.appendChild(talkElement);

            startTime.setTime(endTime.getTime() + 10 * 60 * 1000);

            if (index === 2) {
                const lunchBreak = document.createElement('div');
                lunchBreak.classList.add('break');
                lunchBreak.textContent = 'Lunch Break (1 Hour)';
                scheduleContainer.appendChild(lunchBreak);
                startTime.setTime(startTime.getTime() + 60 * 60 * 1000);
            }
        });
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
