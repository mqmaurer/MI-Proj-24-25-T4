        document.querySelectorAll('.nav-link').forEach(tab => {
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                const tabId = tab.getAttribute('href').substring(1);
                const tabContent = document.getElementById(tabId);
                document.querySelectorAll('.nav-link').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.content').forEach(content => {
                    content.classList.remove('active');
                });
                tab.classList.add('active');
                tabContent.classList.add('active');
            });
        });

        function showErrorMessage(message) {
            var errorMessage = document.getElementById('error-message');
            errorMessage.innerText = message;
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show');

            setTimeout(function() {
                errorMessage.classList.remove('show');
                errorMessage.style.display = 'none';
            }, 3000);
        }
        function validateForm(){
            var author = document.getElementById('author').value;
            var title = document.getElementById('title').value;
            var isbn = document.getElementById('isbn').value;
            var description = document.getElementById('description').value;

            if(author === ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            if(title === ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            if(isbn === ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            if(description=== ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            return true;
        }