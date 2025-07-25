import Cookies from "js-cookie";

export const getPortfolioValutation = async (
  onReasoning: (reasoning: string) => void,
  onText: (text: string) => void
) => {
  const accessToken = Cookies.get("access_token");

  const response = await fetch("http://localhost:3001/api/ai/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.body) {
    throw new Error("No stream available");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunkText = decoder.decode(value, { stream: true });
    buffer += chunkText;

    const lines = buffer.split("\n");

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.replace("data: ", "").trim();
      if (!jsonStr || jsonStr === "[DONE]") continue;

      try {
        const json = JSON.parse(jsonStr);
        const { type, message } = json;

        if (type === "REASONING") {
          onReasoning(message);
        } else if (type === "TEXT") {
          onText(message);
        }
      } catch (err) {
        console.warn("[STREAM] Errore parsing JSON:", err);
      }
    }

    buffer = lines[lines.length - 1]; // keep incomplete line
  }
};
