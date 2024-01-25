import Cookies from "js-cookie";
import router from "next/router";

const deleteCookies = () => {
  Cookies.remove("MyBxyWYaeX");
  router.replace("/auth/login");
};

export default deleteCookies;
