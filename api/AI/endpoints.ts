import Cookies from "js-cookie";

export const getPortfolioValutation = async (
  onChunk: (chunk: string) => void
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
  let fullMessage = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunkText = decoder.decode(value, { stream: true });
    buffer += chunkText;

    const lines = buffer.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const content = line.replace("data: ", "").trim();

        if (content && content !== "[DONE]") {
          try {
            const json = JSON.parse(content);
            const delta = json.choices?.[0]?.delta?.content;

            if (delta) {
              fullMessage += delta;
              onChunk(delta); // opzionale: mostra live
            }
          } catch (err) {
            console.warn("[STREAM] Errore parsing JSON:", err);
          }
        }
      }
    }

    buffer = lines[lines.length - 1];
  }

  console.log("✅ Messaggio AI completo:", fullMessage);
};
