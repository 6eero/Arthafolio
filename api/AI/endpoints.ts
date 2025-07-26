import Cookies from "js-cookie";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export const getPortfolioValutation = async (
  onReasoning: (reasoning: string) => void,
  onText: (text: string) => void
) => {
  const accessToken = Cookies.get("access_token");
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

        if (type === "REASONING") {
          onReasoning(message);
        } else if (type === "TEXT") {
          onText(message);
        }
      } catch (err) {
        console.warn("[STREAM] Errore parsing JSON:", err);
      }
    },

    // Gestione degli errori di connessione
    onerror(err) {
      console.error("[STREAM] Errore di connessione:", err);
      // Devi lanciare l'errore per farlo propagare e catturare nel tuo `catch`
      throw err;
    },
  });
};
