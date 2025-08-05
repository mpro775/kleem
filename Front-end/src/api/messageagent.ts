import axios from "axios";
import type { ChannelType } from "../types/chat";

export async function sendAgentMessage(payload: {
  merchantId: string;
  sessionId: string;
  channel: ChannelType;
  messages: Array<{ role: "agent"; text: string }>;
  agentId?: string; // لو تريد حفظ رقم معرف الموظف
}) {
  // استبدل URL بباك اندك وليس n8n
  return axios.post(
    `https://api.smartagency-ye.com/webhooks/agent-reply/${payload.merchantId}`,
    {
      sessionId: payload.sessionId,
      text: payload.messages[0].text,
      channel: payload.channel,
      agentId: payload.agentId,
      // أضف أي حقول أخرى مثل metadata إذا تحتاج
    }
  );
}
