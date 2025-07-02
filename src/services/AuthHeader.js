import Cookies from "js-cookie";

export default function authHeader() {

    try {
      // Try to parse the user from the cookie
      const userFromCookie = Cookies.get('user-egos');
      let user = userFromCookie ? JSON.parse(userFromCookie) : null;

      return { Authorization: user.token }; // for Spring Boot back-end

    } catch (error) {
      // Handle the error if JSON parsing fails
      console.error('Error parsing user from cookie:', error);
      // You can choose to set a default value or leave it as null
      return {}
    }

}

export function authHeaderWithContentType(contentType) {
  let user = Cookies.get("user-egos");

  if (user) {

    if(!user.token)
      return {}

    return {
      Authorization: user.token,
      "Content-Type": contentType
    }; // for Spring Boot back-end
  } else {
    return {};
  }
}
