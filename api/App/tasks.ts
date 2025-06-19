import { useGlobalDispatchContext } from "@/Context/Global";
import actions from "@/Modules/App/actions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as APIGlobal from "./endpoint";

export const useAppActions = () => {
  const dispatch = useGlobalDispatchContext();
  const router = useRouter();
  return {
    // LOGIN
    onLogin: async (values: { email: string; password: string }) => {
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
  };
};
