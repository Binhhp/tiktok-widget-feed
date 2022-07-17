export class RegexConstants {
  public static username: any = /(?![@_.])(?:[a-zA-Z0-9]|([._])(?!\1)){0,150}/g;
}

export class ValidatorProvider {
  public static UserName(value?: string): boolean {
    if (value) {
      if (value.charAt(0) === "@") return false;
      const testValue = new RegExp(RegexConstants.username);
      return testValue.test(value);
    }
    return true;
  }
}

export class ErrorMessage {
  public static REQUIREMENTS: string = `{0} is required`;
  public static WIDGET_USERNAME: string =
    "Usernames can only contain letters, numbers, underscores, and periods. However, periods can't be put at the end of the username";
}
