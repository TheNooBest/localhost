<?php

  require "classUser.php";

  $fakeDatabase = array(
    new User('Имя', 'Фамилия', 'a@a.a', 123),
    new User('Имя', 'Фамилия', 'b@b.b', 123)
  );

  $answer = array();

  if (isset($_POST['firstName']) && $_POST['firstName']
  && isset($_POST['secondName']) && $_POST['secondName']
  && isset($_POST['email']) && $_POST['email']
  && isset($_POST['password']) && $_POST['password']
  && isset($_POST['passconfirm']) && $_POST['passconfirm']) {

    if ($_POST['password'] != $_POST['passconfirm']) {
      $answer['status'] = 0;
      $answer['message'] = 'Пароли не совпадают';
      echo json_encode($answer);
      goto end;
    }

    foreach ($fakeDatabase as $user) {
      if ($user->getEmail() == $_POST['email']) {
        $answer['status'] = 0;
        $answer['message'] .= 'Такой email уже зарегестрирован';
        echo json_encode($answer);
        goto end;
      }
    }

    $answer['status'] = 1;
    $answer['message'] = 'Вы успешно зарегестрировались';
    echo json_encode($answer);
  } else {
    $answer['status'] = 0;
    $answer['message'] = 'Одно из полей оставлено пустым';
    echo json_encode($answer);
  }

end:

$log = date('Y-m-d H:i:s') . ' Попытка регистрации: ';
$log .= $answer['status'] == 1
  ? ('Успех: '.$_POST['firstName'].' '.$_POST['secondName'].' '.$_POST['email'])
  : ('Ошибка: '.$answer['message']);
file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);

?>
