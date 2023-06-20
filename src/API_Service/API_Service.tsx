// This is for common path for API
const baseApiUrl: string = `https://gogreenverz.in/api/`;

// File Path For LandOwner
const LandOwnerFiles: string = `https://gogreenverz.in/api/uploading_files/land_owner/`;

// File Path For Investor
const InvestorFiles: string = `https://gogreenverz.in/api/uploading_files/investor/`;

// get method
const methodGet: string = 'GET';

// post method
const methodPost: string = 'POST';

// Add Customer Details and project details
const get_all_user_profile_type: string = `${baseApiUrl}get_all_user_profile_type`;

const user_sign_up: string = `${baseApiUrl}user_sign_up`;

const user_sign_in: string = `${baseApiUrl}user_sign_in`;

const add_land_owner: string = `${baseApiUrl}add_land_owner`;

const get_all_land_owner: string = `${baseApiUrl}get_all_land_owner`;

export {
    get_all_user_profile_type,
    user_sign_in,
    user_sign_up,
    add_land_owner,
    get_all_land_owner,
    LandOwnerFiles,
    InvestorFiles,
    methodGet,
    methodPost,
};
