import { useGlobalDispatchContext } from "@/Context/Global";
import actions from "@/Modules/App/actions";
import { useRouter } from "next/navigation";
import * as APIGlobal from "./endpoint";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { clearTokens, setTokens } from "@/Utils/tokens";

export const useAppActions = () => {
  const dispatch = useGlobalDispatchContext();
  const router = useRouter();
  const t = useTranslations("");
  return {
    onLogin: async (values: {
      username_or_email: string;
      password: string;
    }) => {
      try {
        dispatch(actions.login({}));
        const { data } = await APIGlobal.login(values);
        const { access_token, user, refresh_token } = data;

        setTokens(access_token, refresh_token);

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

        clearTokens();

        dispatch(actions.logoutSuccess({}));
      } catch (error) {
        dispatch(actions.logoutFail({ error }));
      }
    },

    onRegister: async (values: {
      email: string;
      username: string;
      password: string;
      password_confirmation: string;
    }) => {
      try {
        dispatch(actions.register({}));
        await APIGlobal.register(values);

        router.push("/login");

        dispatch(actions.registerSuccess({}));
      } catch (error) {
        dispatch(actions.registerFail({ error }));
      }
    },

    onUpdatePreferences: async (values: {
      preferred_currency: string;
      hide_holdings: boolean;
    }) => {
      dispatch(actions.updatePreferences({}));
      try {
        const { data } = await APIGlobal.updatePreferences(values);
        toast.success(t("settings.preferences_updated"));
        dispatch(actions.updatePreferencesSuccess({ data }));
      } catch (error) {
        dispatch(actions.updatePreferencesFail({ error }));
      }
    },
  };
};
