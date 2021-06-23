import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

//storage setup
const upload = (fileName) => {
	var storage = multer.diskStorage({
		filename: function (_, file, callback) {
			callback(null, Date.now() + file.originalname);
		},
	});

	return multer({ storage: storage }).single(fileName);
};

const uploadImage = async (filePath, { rootFolder, folder, name }) => {
	var result = await cloudinary.uploader.upload(filePath, {
		folder: `/${rootFolder}/` + folder,
		public_id: name.split(".")[0] + "-" + Date.now().toString(),
	});

	return result.secure_url;
};

export default {
	upload,
	uploadImage,
};
