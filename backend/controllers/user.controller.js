import userService from "../services/user.service.js";
import responseHelper from "../utils/responseHelper.js";

const userController = {
  async signup(req, res) {
    const user = await userService.createAsync(req.validated.body);

    return responseHelper.created(res, {
      user: {
        id: user.id,
        name: user.name,
      },
    });
  },
  async login(req, res) {
    const result = await userService.loginAsync(req.validated.body);

    return responseHelper.created(res, result);
  },
  async getUserProfile(req, res) {
    const { id } = req.user;
    const result = await userService.getUserById(id);

    return responseHelper.ok(res, {
      user: {
        name: result.name,
        email: result.email,
      },
    });
  },

  async updateName(req, res) {
    const { name } = req.validated.body;
    const { id } = req.user;

    const result = await userService.updateNameById(id, name);
    return responseHelper.ok(res, {
      user: {
        name: result,
      },
    });
  },
  async updatePassword(req, res) {
    const { id } = req.user;
    await userService.updatePasswordById(id, req.validated.body);

    return responseHelper.ok(res, null);
  },
};

export default userController;
