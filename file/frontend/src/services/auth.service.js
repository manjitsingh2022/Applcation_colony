import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from "../config/config";


export const register = (name, email, password, role) => {
    console.log(name, email, password, role, 'request register');
    return axios
        .post(API_URL + "users/register", {
            name,
            email,
            password,
            role
        }, {
            headers: authHeader(),
        })
        .then(handleResponse)
        .then((response) => {
            console.log(response, 'response register');

            if (response.success) {
                return response; // Return the response as is
            } else {
                // Handle the error response here
                return {
                    success: false, // Set success flag to false
                    message: response.message || 'An error occurred during registration.',
                    data: null, // No data for error
                };
            }
        })
        .catch((error) => {
            // Handle other errors here
            return {
                success: false, // Set success flag to false for error
                message: error.message || 'An error occurred during registration.',
                data: null, // No data for error
            };
        });
};


function handleResponse(response) {
    console.log(response, 'handleReponse')
    if (!response) {
        return Promise.reject('Empty response');
    }

    if (!response.ok) {
        return Promise.reject(`Request failed with status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    console.log(contentType, 'cotentType')
    if (!contentType || !contentType.includes('application/json')) {
        return Promise.reject('Response is not in JSON format');
    }

    return response
        .json()
        .then((data) => {
            console.log(data, 'responsedata')
            return data;
        })
        .catch((error) => {
            console.log(error, 'checkresponseerror')
            return Promise.reject('Error parsing response data');
        });
}


export const login = async (email, password) => {
    return await axios
        .post(API_URL + "users/login", {
            email,
            password,
        }, {
            headers: authHeader() // Use authHeader to include JWT token in headers
        })
        .then((response) => {
            console.log(response, 'loginnnnn')
            if (response) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                localStorage.setItem("token", response.data.data.token);
            }
            return response.data;
        });
};

export const logout = async () => {
    try {
        await axios.get(API_URL + "users/logout");
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
        }
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};


export const getUser = async () => {
    return await axios
        .get(API_URL + "users/user", {
            headers: authHeader() // Use authHeader to include JWT token in headers
        })
        .then((response) => {
            console.log(response, 'getUser')

            return response.data;
        });
};
export const getUsers = async (page) => {
    try {
        const response = await axios.get(`${API_URL}users/all-users?page=${page}`, {

            headers: authHeader(),
        });


        return response.data;
    } catch (error) {
        console.log(error, 'error')
        throw error;
    }
};

export const updateUser = async (name, address, phone) => {
    return await axios
        .patch(API_URL + "users/updateUser", { name, address, phone }, {
            headers: authHeader() // Use authHeader to include JWT token in headers
        })
        .then((response) => {
            console.log(response, 'response')

            return response.data;
        });
};

export const updatePhoto = async (photo) => {
    return await axios
        .patch(API_URL + "users/updateUser", { photo }, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const updateUserById = async (userId, name, address, phone, status, password, photo, role) => {
    try {
        const response = await axios.put(
            `${API_URL}users/user/${userId}`,
            { name, address, phone, status, password, photo, role },
            {
                headers: {
                    ...authHeader(),
                },
            }
        );

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(`Update failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};



export const deleteUserById = async (userId) => {
    console.log('deleteUserById', userId)
    try {
        const response = await axios.delete(
            `${API_URL}users/user/${userId}`,

            {
                headers: authHeader()
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const registerOnly = async (name, email, password) => {
    console.log(name, email, password, 'name, email, password, role')
    try {
        const response = await axios.post(
            `${API_URL}users/register-only`,
            { name, email, password }
        );
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
export const changePassword = async (password, newPassword) => {
    console.log(password, newPassword, 'changePassword request');
    try {
        const response = await axios.put(
            `${API_URL}users/change-password`,
            { password, newPassword },
            {
                headers: authHeader(),
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};







const authService = {
    register, registerOnly,
    login, changePassword,
    logout, getUser, updateUser, updatePhoto, getUsers, updateUserById, deleteUserById
};








export default authService;