import { ClientError, globalError } from "shokhijakhon-error-handler";

export const checkAdmin = (req, res, next) => {
    try {
        if(!req.admin) throw new ClientError('Only admin can send request', 403);
        return next();
    } catch (error) {
        globalError(error, res);
    }
}
