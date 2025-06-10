document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const statusDiv = document.getElementById('status');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Получаем данные формы
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    try {
        // Отключаем кнопку на время отправки
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        // Отправляем данные на сервер
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            // Показываем успешное сообщение
            statusDiv.className = 'status success';
            statusDiv.textContent = 'Заявка успешно отправлена!';
            
            // Очищаем форму
            document.getElementById('leadForm').reset();
        } else {
            throw new Error(data.message || 'Что-то пошло не так');
        }
    } catch (error) {
        // Показываем сообщение об ошибке
        statusDiv.className = 'status error';
        statusDiv.textContent = error.message || 'Произошла ошибка при отправке заявки';
    } finally {
        // Включаем кнопку обратно
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
    }
}); 