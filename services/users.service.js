const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getAll, getByID, getUserByEmail, insert, update, softDeleteByID } = require("../models/users.model");

async function getAllUsers() {
    const data = await getAll();
    if (data) {
        return {
            error: false,
            data,
            message: "Users fetched successfully"
        };
    } else {
        return {
            error: true,
            message: "Some error occured while fetching the users !!"
        };
    }
}

async function getUserByID(id) {
    const data = await getByID(id);
    if (data) {
        return {
            error: false,
            data,
            message: "User fetched successfully"
        };
    } else {
        return {
            error: true,
            message: "Some error occured while fetching the user !!"
        };
    }
}

async function register(formData) {
    const hashedPassword = await bcrypt.hash(formData.Password, 10);
    const data = await insert({ ...formData, Password: hashedPassword });

    if (data.error) {
        return {
            error: true,
            message: data.message
        }
    }

    if (data) {
        const token = jwt.sign({ UserID: data.UserID, Email: data.Email, Role: data.Role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        return {
            error: false,
            data:{
                token
            },
            message: "User Registered Successfully"
        }
    } else {
        return {
            error: true,
            message: "Some error occured while registering the user !!"
        }
    }
}

async function checkLogin(formData) {
    const data = await getUserByEmail(formData.Email);
    if (data) {
        const passwordMatch = await bcrypt.compare(formData.Password, data.Password);
        if (passwordMatch) {
            const token = jwt.sign({ UserID: data.UserID, Email: data.Email, Role: data.Role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            
            delete data.Password

            return {
                error: false,
                data: {
                    token,
                    user: data
                },
                message: "Login successful"
            };
        }
        return {
            error: true,
            message: "User Name or Password does not match !!"
        }
    }
    return {
        error: true,
        message: "User Name or Password does not match !!"
    }
}

async function deleteUser(id) {
    const deletedData = await softDeleteByID(id);
    if(!deletedData){
        return{
            error:true,
            message:"User Not found or already deleted !!"
        }
    }

    return {
        error: false,
        data: { UserID: id },
        message: "User deleted successfully"
    };
}

async function updateUser(id, formData) {
    const updatedData = await update(id, formData);
    if(!updatedData){
        return {
            error:true,
            message:"User Not found or no changes made !!"
        };
    }
    const user = await getByID(id);
    return {
        error:false,
        data:user,
        message:"User Updated Successfully"
    }
}

module.exports = { getAllUsers, getUserByID, checkLogin, register, deleteUser, updateUser };