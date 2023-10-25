// export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user && user.token) {
//         // For Spring Boot back-end
//         return { Authorization: "Bearer " + user.token };

//         // for Node.js Express back-end
//         // return { "x-access-token": user.token };
//     } else {
//         return {};
//     }
// }

export function authHeader() {
    let token = localStorage.getItem("token");
    if (token) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        // const currentOrigin = window.location.origin;
        // const allowedOrigins = ["http://localhost:5000", "https://colony.app"];

        // if (allowedOrigins.includes(currentOrigin)) {
        //     headers.withCredentials = true;
        // }

        return headers;
    } else {
        return {};
    }
}




export function getOptions() {
    let options = {};
    let token = localStorage.getItem("token");
    if (token) {
        options.headers = {
            Authorization: "Token " + token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
    } else {
        options.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
    }

    return options;
}


export default getOptions;
