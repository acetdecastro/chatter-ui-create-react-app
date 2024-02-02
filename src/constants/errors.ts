import { SnackMessage } from "../interfaces/snack-message.interface";

const UNKNOWN_ERROR_MESSAGE =
  "Sorry, something went wrong. Please try again later.";

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};

const CREDENTIALS_ARE_NOT_VALID = "Credentials are not valid.";

export {
  UNKNOWN_ERROR_MESSAGE,
  UNKNOWN_ERROR_SNACK_MESSAGE,
  CREDENTIALS_ARE_NOT_VALID,
};
