import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

//storage setup
/**
 *
 * @param {String} fileName - The key of the `file` received from the front-end
 */
const upload = (fileName) => {
	var storage = multer.diskStorage({
		filename: function (_, file, callback) {
			callback(null, Date.now() + file.originalname);
		},
	});

	return multer({ storage: storage }).single(fileName);
};

/**
 *
 * @param {String} filePath -Path of the 'file to upload'
 * @param {Object} param1 -`rootFolder`, `folder` & `name`
 * @example
 * `rootFolder`: events, `folder`: Comic-con, `name`: san-diego2022.png
 * The file is uploaded as `/events/Comic-con/san-diego2022.png`
 * @returns a secure url of the uploaded Image.
 */
const uploadImage = async (filePath, { rootFolder, folder, name }) => {
	var subsequentFolder = rootFolder ? `/${rootFolder}/` + folder : `${folder}`;
	var result = await cloudinary.uploader.upload(filePath, {
		folder: subsequentFolder,
		public_id: name.split(".")[0] + "-" + Date.now().toString(),
	});

	return result.secure_url;
};

export default {
	upload,
	uploadImage,
};
