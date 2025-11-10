import { ServerClient } from 'postmark';

const postmakrClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);
export function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  return postmakrClient.sendEmail({
    From: process.env.POSTMARK_FROM_EMAIL!,
    To: to,
    Subject: subject,
    HtmlBody: html,
    TextBody: text,
  });
}
