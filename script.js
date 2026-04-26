window.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent;
    let osName = "Невідома ОС";
    if (userAgent.indexOf("Win") !== -1) osName = "Windows";
    if (userAgent.indexOf("Mac") !== -1) osName = "MacOS";
    if (userAgent.indexOf("Linux") !== -1) osName = "Linux";

    localStorage.setItem("userOS", osName);
    localStorage.setItem("userAgentInfo", userAgent);

    const footer = document.createElement('footer');
    footer.className = "footer-js";
    footer.innerHTML = `
        <p><strong>Ваша ОС:</strong> ${localStorage.getItem('userOS')}</p>
        <p><strong>Браузер:</strong> ${localStorage.getItem('userAgentInfo')}</p>
    `;
    document.body.appendChild(footer);

    fetch('https://jsonplaceholder.typicode.com/posts/3/comments')
        .then(response => response.json())
        .then(comments => {
            const commentsSection = document.createElement('section');
            commentsSection.className = 'comments-section';
            commentsSection.innerHTML = '<h2>Відгуки роботодавців</h2>';
            
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                commentDiv.innerHTML = `<strong>${comment.email}:</strong> <p>${comment.body}</p>`;
                commentsSection.appendChild(commentDiv);
            });
            document.querySelector('.main-content').appendChild(commentsSection);
        });

    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle';
    themeBtn.innerText = '🌙 / ☀️';
    document.body.appendChild(themeBtn);

    function checkTheme() {
        const hour = new Date().getHours();
        if (hour >= 7 && hour < 21) {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    checkTheme(); 

    setTimeout(() => {
        const modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Зворотний зв'язок</h2>
                <form action="https://formspree.io/f/xykblrpl" method="POST">
                    <input type="text" name="name" placeholder="Ваше ім'я" required>
                    <input type="email" name="email" placeholder="Ваш Email" required>
                    <input type="tel" name="phone" placeholder="Номер телефону">
                    <textarea name="message" placeholder="Ваше повідомлення"></textarea>
                    <button type="submit">Відправити</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').onclick = () => modal.remove();
    }, 60000);
});