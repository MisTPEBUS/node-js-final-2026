import uploadService from "../services/upload.service.js";
import responseHelper from "../utils/responseHelper.js";

const uploadController = {
  async uploadImage(req, res) {
    const imageUrl = await uploadService.uploadImage(req.user.id, req.file);

    return responseHelper.ok(res, {
      image_url: imageUrl,
    });
  },
};

export default uploadController;
