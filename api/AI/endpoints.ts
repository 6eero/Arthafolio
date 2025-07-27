import Cookies from "js-cookie";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export const getPortfolioValuation = async (
  onText: (text: string) => void,
  onComplete: (text: string) => void,
  onError?: () => void
) => {
  const accessToken =
    Cookies.get("access_token") || localStorage.getItem("access_token");
  const basePath =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://arthafolio-be.onrender.com";

  await fetchEventSource(`${basePath}/api/ai/chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "text/event-stream",
    },

    // La funzione onmessage viene chiamata per ogni evento "data:"
    onmessage(event) {
      if (event.event === "close" || event.data === "[DONE]") {
        // Puoi gestire qui la fine dello stream se il backend la segnala
        return;
      }

      try {
        const json = JSON.parse(event.data);
        const { type, message } = json;

        if (type === "TEXT") {
          onText(message);
        } else if (type === "COMPLETE") {
          onComplete(message);
        } else if (type === "ERROR") {
          console.warn("[STREAM] Errore ricevuto:", message);
          if (onError) onError(); // ✅ chiamiamo callback per gestione errori
        }
      } catch (err) {
        console.warn("[STREAM] Errore parsing JSON:", err);
        if (onError) onError();
      }
    },

    // Gestione degli errori di connessione
    onerror(err) {
      console.error("[STREAM] Errore di connessione:", err);
      if (onError) onError();
    },
  });
};
