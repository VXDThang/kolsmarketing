// const DOMAIN_API = 'http://localhost:3000/';
// const DOMAIN_FE = 'http://localhost:3001/';
 //backend
const DOMAIN_API = 'https://kolsmarketing-be.herokuapp.com/';
//frontend
const DOMAIN_FE = 'https://kolsmarketing-fe.netlify.app';
const CLOUDINARY_NAME = 'kolcloudinary';
const PRESET_NAME = 'kolpreset';

const ERROR_PERMISSIONS_TITLE = "Không có quyền";
const ERROR_TYPE_POINT_TITLE = "Sai định dạng"
const ENTER_PASSWORD_TITLE = "Password trống"
const ENTER_PASSWORD_DESC = "Bạn cần nhập mật khẩu trước khi muốn thay đổi!"
const SUCCESS_PASSWORD_TITLE = "Thành công"
const SUCCESS_PASSWORD_DESC = "Thay đổi password thành công!"
const SUCCESS_PROFILE_TITLE = "Thành công"
const SUCCESS_PROFILE_DESC = "Thay đổi profile thành công!"

const googleClientID = '1091140274470-2vb73bkmivqpjj019n00jj4tjnj8pbat.apps.googleusercontent.com';
const googleClientSecret = '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';

module.exports = {
    DOMAIN_API, DOMAIN_FE,
    CLOUDINARY_NAME, PRESET_NAME,
    ERROR_PERMISSIONS_TITLE,
    ERROR_TYPE_POINT_TITLE,
    ENTER_PASSWORD_TITLE, ENTER_PASSWORD_DESC,
    SUCCESS_PASSWORD_TITLE, SUCCESS_PASSWORD_DESC,
    SUCCESS_PROFILE_TITLE, SUCCESS_PROFILE_DESC,
    googleClientID,
    googleClientSecret,
}
