import type { CommonProviderOptions } from "./index.js";
import type { Options as SMTPTransportOptions } from "nodemailer/lib/smtp-transport";
import type { Awaitable, Theme } from "../types.js";
export interface SendVerificationRequestParams {
    identifier: string;
    url: string;
    expires: Date;
    provider: EmailConfig;
    token: string;
    theme: Theme;
}
/**
 * The Email Provider needs to be configured with an e-mail client.
 * By default, it uses `nodemailer`, which you have to install if this
 * provider is present.
 *
 * You can use a other services as well, like:
 * - [Postmark](https://postmarkapp.com)
 * - [Mailgun](https://www.mailgun.com)
 * - [SendGrid](https://sendgrid.com)
 * - etc.
 *
 * @see [Custom email service with Auth.js](https://authjs.dev/guides/providers/email#custom-email-service)
 */
export interface EmailConfig extends CommonProviderOptions {
    type: "email";
    server: string | SMTPTransportOptions;
    /** @default `"Auth.js <no-reply@authjs.dev>"` */
    from?: string;
    /**
     * How long until the e-mail can be used to log the user in,
     * in seconds. Defaults to 1 day
     *
     * @default 86400
     */
    maxAge?: number;
    /** [Documentation](https://authjs.dev/guides/providers/email#customizing-emails) */
    sendVerificationRequest: (params: SendVerificationRequestParams) => Awaitable<void>;
    /**
     * By default, we are generating a random verification token.
     * You can make it predictable or modify it as you like with this method.
     *
     * @example
     * ```ts
     *  Providers.Email({
     *    async generateVerificationToken() {
     *      return "ABC123"
     *    }
     *  })
     * ```
     * [Documentation](https://authjs.dev/guides/providers/email#customizing-the-verification-token)
     */
    generateVerificationToken?: () => Awaitable<string>;
    /** If defined, it is used to hash the verification token when saving to the database . */
    secret?: string;
    /**
     * Normalizes the user input before sending the verification request.
     *
     * ⚠️ Always make sure this method returns a single email address.
     *
     * @note Technically, the part of the email address local mailbox element
     * (everything before the `@` symbol) should be treated as 'case sensitive'
     * according to RFC 2821, but in practice this causes more problems than
     * it solves, e.g.: when looking up users by e-mail from databases.
     * By default, we treat email addresses as all lower case,
     * but you can override this function to change this behavior.
     *
     * [Documentation](https://authjs.dev/guides/providers/email#normalizing-the-e-mail-address) | [RFC 2821](https://tools.ietf.org/html/rfc2821) | [Email syntax](https://en.wikipedia.org/wiki/Email_address#Syntax)
     */
    normalizeIdentifier?: (identifier: string) => string;
}
export type EmailProviderType = "email";
/** TODO: */
export default function Email(config: EmailConfig): EmailConfig;
//# sourceMappingURL=email.d.ts.map