document.addEventListener('DOMContentLoaded', function () {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', async function () {
            var formDataString = serializeForm(document.getElementById('filterForm'));
            try {
                const response = await fetch('/user/products/filter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formDataString,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.text();
                document.getElementsByTagName('main')[1].style.display = 'none';
                document.getElementById('searchResult-Container').innerHTML=data
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    function serializeForm(formElement) {
        const formData = new FormData(formElement);
        const serialized = [];
        
        for (const [key, value] of formData.entries()) {
            serialized.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }

        return serialized.join('&');
    }
});
