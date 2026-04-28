import aj from "../lib/arcjet.js";

import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ error: "Too Many Requests.Rate Limit Exceeded" });
      } else if (decision.reason.isBot()) {
        return res
          .status(403)
          .json({ error: "Forbidden - Bot Detected.BotAccessDenied" });
      } else {
        return res
          .status(403)
          .json({ error: "Forbidden - Request Denied by Security Policy" });
      }
    }

    //check for spoofed bots
    if(decision.results.some(isSpoofedBot)){
        return res.status(403).json({ error: "Forbidden - Spoofed Bot Detected" });
    }
    next();

  } catch (err) {
    console.error("Error in Arcjet middleware:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
