let clockDiv = document.getElementById("clock");
let newsDiv = document.getElementById("news");

function updateClock() {
    clockDiv.textContent = new Date().toLocaleTimeString();
    requestAnimationFrame(updateClock);
}

async function getNews(proxy) {
    const url = `${proxy}https://api.webz.io/api/news?token=cc747078-8048-4e2d-afcf-083abbf1bf0b&q=language%3A%22english%22&sort=crawled&ts=1786421891487&format=json&webz_reporter=true&includeSyndicated=false&allowNewsHistory=false`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('News Data:', data);
        newsDiv.innerHTML = '';
        data.posts.slice(0, 2).forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `<h5 class="news-title">${post.title}</h5><a href="${post.site_full}" class="news-link""><p class="news-summary">${post.summary.slice(0, 65)}...</p></a>`;
            newsDiv.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Failed to fetch news:', error.message);
        console.log("Retrying without proxy...")
        getNews('');
    }
}

updateClock();
getNews('https://corsproxy.io/?key=9a40ef96&url=');