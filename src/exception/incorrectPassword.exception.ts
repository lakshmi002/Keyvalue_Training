import { CustomError } from "../utils/error.code";
import HHTPException from "./http.exception";

class IncorrectPasswordException extends HHTPException {
    constructor(error: CustomError) {
        super(401,error.MESSAGE);
    }
}
export default IncorrectPasswordException;