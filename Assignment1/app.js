        document.querySelectorAll('.nav-link').forEach(tab => {
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                const tabId = tab.getAttribute('href').substring(1);
                const tabContent = document.getElementById(tabId);
                document.querySelectorAll('.tab').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.content').forEach(content => {
                    content.classList.remove('active');
                });
                tab.classList.add('active');
                tabContent.classList.add('active');
            });
        });