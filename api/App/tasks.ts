import { useGlobalDispatchContext } from "@/Context/Global";
import actions from "@/Modules/App/actions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as APIGlobal from "./endpoint";
import { toast } from "sonner";

export const useAppActions = () => {
  const dispatch = useGlobalDispatchContext();
  const router = useRouter();
  return {
    onLogin: async (values: {
      username_or_email: string;
      password: string;
    }) => {
      try {
        dispatch(actions.login({}));
        const { data } = await APIGlobal.login(values);
        const { access_token, user, refresh_token } = data;

        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", refresh_token);

        router.push("/dashboard");

        dispatch(actions.loginSuccess({ data: user }));
      } catch (error) {
        dispatch(actions.loginFail({ error }));
      }
    },

    onWhoAmI: async () => {
      try {
        dispatch(actions.whoAmI({}));
        const { data } = await APIGlobal.whoAmI();

        dispatch(actions.whoAmISuccess({ data }));
      } catch (error) {
        dispatch(actions.whoAmIFail({ error }));
      }
    },

    onLogout: async () => {
      try {
        dispatch(actions.logout({}));
        await APIGlobal.logout();

        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        router.push("/login");

        dispatch(actions.logoutSuccess({}));
      } catch (error) {
        dispatch(actions.logoutFail({ error }));
      }
    },

    onUpdatePreferences: async (values: {
      preferred_currency: string;
      hide_holdings: boolean;
    }) => {
      dispatch(actions.updatePreferences({}));
      try {
        const { data } = await APIGlobal.updatePreferences(values);
        toast.success("Preferenze aggiornate ✅");
        dispatch(actions.updatePreferencesSuccess({ data }));
      } catch (error) {
        dispatch(actions.updatePreferencesFail({ error }));
      }
    },
  };
};
