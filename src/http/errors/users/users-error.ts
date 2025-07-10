export class UserAlreadyExistError extends Error {
  constructor() {
    super("E-mail already exist");
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credential");
  }
}

export class UserNotFound extends Error {
  constructor() {
    super("User not found");
  }
}
