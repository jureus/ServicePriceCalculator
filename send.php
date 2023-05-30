<?php
if(isset($_POST['name'])) {

    // Адрес, куда будет отправлено письмо
    $to = "zakaz@site.ru";

    // Тема письма
    $subject = "Калькулятор услуг от ".$_POST['name'];

    // Текст письма
    $message = "Имя отправителя: ".$_POST['name']."\n\n";
    $message .= "Телефон отправителя: ".$_POST['phone']."\n\n";
	$message .= "Тип забора: ".$_POST['calcType']."\nВходная группа: ".$_POST['calcVchod']." \nДлина: ".$_POST['calcLength']." \nОбщая стоимость: ".$_POST['calcResult']."\n\n";	
    $message .= "Сообщение: \n".$_POST['message'];

    // Заголовки для письма
     $headers = "From: admin@site.ru\r\n";
    $headers .= "Reply-To: admin@site.ru\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Отправка письма
    if(mail($to, $subject, $message, $headers)) {
        echo "<b>Сообщение успешно отправлено.<b> <a href='/'>Перейти на главную страницу</a><br><br><br><img class='mx-auto d-block' src='/calculator/success.png'>";
    } else {
        echo "Ошибка при отправке сообщения.";
    }

} else {
    echo "Ошибка: Не удалось получить данные из формы.";
}
?>
