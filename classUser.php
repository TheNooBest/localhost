<?php

class User {

  private $firstName;
  private $lastName;
  private $email;
  private $passwordHash;

  private static function superHash($password) {
    return $password + 1;
  }

  function __construct($firstName, $lastName, $email, $password) {
    $this->firstName = $firstName;
    $this->lastName = $lastName;
    $this->email = $email;
    $this->passwordHash = User::superHash($password);
  }

  public function getFirstName() {
    return $this->firstName;
  }

  public function getLastName() {
    return $this->lastName;
  }

  public function getEmail() {
    return $this->email;
  }

  public function getPasswordHash() {
    return $this->passwordHash;
  }

}

?>
