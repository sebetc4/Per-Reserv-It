import { CustomError } from "../../../packages/classes";
import { SignInBody } from "../../../packages/types";
import { signInSchema } from "../../../packages/schemas";
import { dbConnect } from "../config";
import { User } from "../models";
import { findUserByEmail } from "../queries/user.queries";

const validCredentials = async (credentials: SignInBody) => {
    const { email, password } = credentials;
    if (!(await signInSchema.isValid({ email, password }))) {
        throw new Error(CustomError.BAD_REQUEST.message);
    }
    return credentials;
};

export const handleCredentialsProvider = async (credentials: SignInBody) => {
    await dbConnect();
    const { email, password } = await validCredentials(credentials);
    const user = await User.findOne({ email });
    if (user.authProvider !== 'credentials') {
        throw new Error(CustomError.EMAIL_ALREADY_EXISTS_OTHER_PROVIDER.message)
    }
    if (!(await user.isValidPassword(password))) {
        throw new Error(CustomError.WRONG_PASSWORD.message);
    }
    return user;
}
