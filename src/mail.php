<?php>
    error_reporting(-1);
    header('Content-Type: text/html; charset= utf-8');

    $error = false;

    if (!empty($_POST["bsName"])) {
        $name = substr(htmlspecialchars(trim($_POST["bsName"])), 0, 50);
	}

    if (!empty($_POST["bsPhone"])) {
        $phone = substr(htmlspecialchars(trim($_POST["bsPhone"])), 0, 50);
	}
    else { $error = true; }

    /*if (!empty($_POST["bsEmail"])) {
        $email = substr(htmlspecialchars(trim($_POST["bsEmail"])), 0, 255);
	}

    if(empty($phone) && empty($email)) { $error = true; }*/


    if (!empty($_POST["whichService"])) {
        $whichService = substr(htmlspecialchars(trim($_POST["whichService"])), 0, 50);
	}

 	if (!$error) {
        $recepient = "uvezem.com@gmail.com"; /* "MiKrob09@gmail.com" */
        $sitename = "увезём.com";

        $pagetitle = "Новая заявка с сайта \"$sitename\"";
        $message = "Имя: $name \nТелефон: $phone\nКакую услугу: $whichService";
        mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

	} else {
		echo "<p class='bg-danger text-danger'>Произошла ошибка! Заполните правильно все поля!!!</p>";
	}
?>
