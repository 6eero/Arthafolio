import { useGlobalDispatchContext } from "@/Context/Global";
import actions from "@/Modules/App/actions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as APIGlobal from "./endpoint";

export const useAppActions = () => {
  const dispatch = useGlobalDispatchContext();
  const router = useRouter();
  return {
    // APP LOAD
    onAppLoad: async (isPublicUrl: boolean) => {
      dispatch(actions.appLoad({}));
      try {
        let user = {};
        if (!isPublicUrl) {
          const { data } = await APIGlobal.whoAmI();
          user = data;
        }
        dispatch(actions.appLoadSuccess({ data: user }));
      } catch (error) {
        dispatch(actions.appLoadFail({ error }));
      }
    },
    // LOGIN
    onLogin: async (values: { email: string; password: string }) => {
      try {
        const { data } = await APIGlobal.login(values);
        const { access_token, user, refresh_token } = data;

        console.log("data", data);

        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", refresh_token);
      } catch (error) {}
    },

    //LOGOUT
    onLogout: async () => {
      dispatch(actions.logout());
      try {
        await APIGlobal.logout();

        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        router.push("/login");

        setTimeout(() => {
          dispatch(actions.logoutSuccess());
        }, 500);
      } catch (error) {
        dispatch(actions.logoutFail({ error }));
      }
    },

    // RESET_PASSWORD
    onResetPassword: async (email: string) => {
      dispatch(actions.resetPassword({}));
      try {
        await APIGlobal.resetPassword({ email });
        dispatch(actions.resetPasswordSuccess({ email }));
      } catch (error) {
        dispatch(actions.resetPasswordFail({ error }));
      }
    },

    // CREATE_NEW_PASSWORD
    onCreateNewPassword: async (values: {
      verification_code: string;
      password: string;
      password_confirmation: string;
    }) => {
      dispatch(actions.createNewPassword({}));
      try {
        const { data } = await APIGlobal.createNewPassword(values);
        const { email } = data;

        //Login
        const { data: loginData } = await APIGlobal.login({
          email,
          password: values.password,
        });
        const { access_token, user, refresh_token } = loginData;

        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", refresh_token);

        router.push("/");
        dispatch(actions.createNewPasswordSuccess({ user }));
      } catch (error) {
        dispatch(actions.createNewPasswordFail({ error }));
      }
    },
  };
};
