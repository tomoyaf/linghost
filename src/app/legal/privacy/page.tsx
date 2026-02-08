import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            &larr; Home
          </Link>

          <h2 className="font-serif text-3xl font-bold text-zinc-50 mb-8">
            Privacy Policy
          </h2>

          <div className="prose prose-invert prose-zinc prose-sm max-w-none space-y-6 text-zinc-400 leading-relaxed">
            <p className="text-zinc-500 text-xs">
              Last updated: February 8, 2026
            </p>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                1. Information We Collect
              </h3>
              <p>When you use linGhost, we collect the following information:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong className="text-zinc-300">Google Account Information:</strong>{" "}
                  When you sign in with Google, we receive your display name, email address, and profile photo URL.
                </li>
                <li>
                  <strong className="text-zinc-300">Generated Stories:</strong>{" "}
                  The stories you generate, including the keywords, settings, and output text, are stored in association with your account.
                </li>
                <li>
                  <strong className="text-zinc-300">Usage Data:</strong>{" "}
                  We may collect basic usage information such as generation timestamps and feature usage to improve the Service.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                2. How We Use Your Information
              </h3>
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Provide and maintain the Service</li>
                <li>Authenticate your identity and manage your account</li>
                <li>Store and display your generated stories</li>
                <li>Enforce usage limits (e.g., daily story generation limits)</li>
                <li>Improve and develop the Service</li>
                <li>Communicate with you about the Service when necessary</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                3. Third-Party Services
              </h3>
              <p>
                The Service integrates with the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong className="text-zinc-300">Google Firebase:</strong>{" "}
                  Used for authentication (Firebase Auth) and data storage (Cloud Firestore). Google&apos;s privacy policy applies to their processing of your data.
                </li>
                <li>
                  <strong className="text-zinc-300">Anthropic API:</strong>{" "}
                  Your story generation requests (keywords, settings, and theme notes) are sent to Anthropic&apos;s Claude API to generate stories. Anthropic&apos;s privacy policy governs their handling of this data.
                </li>
                <li>
                  <strong className="text-zinc-300">Stripe:</strong>{" "}
                  Payment processing for paid subscriptions is handled by Stripe. We do not store your payment card details. Stripe&apos;s privacy policy applies to payment data.
                </li>
                <li>
                  <strong className="text-zinc-300">Google Analytics:</strong>{" "}
                  We use Google Analytics 4 to collect anonymous usage statistics such as page views, session duration, and general device/browser information. Google Analytics uses cookies (<code className="text-zinc-300">_ga</code>, <code className="text-zinc-300">_ga_*</code>) to distinguish unique visitors. This data helps us understand how the Service is used and identify areas for improvement. Analytics cookies are only set after you provide consent via our cookie banner. You can learn more about how Google processes data at{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  . You may also opt out of Google Analytics by installing the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                4. Cookies and Local Storage
              </h3>
              <p>The Service uses the following types of cookies and local storage:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong className="text-zinc-300">Essential Cookies:</strong>{" "}
                  Used for authentication session management. These are required for the Service to function and cannot be disabled.
                </li>
                <li>
                  <strong className="text-zinc-300">Analytics Cookies:</strong>{" "}
                  Google Analytics cookies (<code className="text-zinc-300">_ga</code>, <code className="text-zinc-300">_ga_*</code>) are used to collect anonymous usage statistics. These are only set after you provide consent via our cookie banner.
                </li>
                <li>
                  <strong className="text-zinc-300">Cookie Consent Preference:</strong>{" "}
                  We store your cookie consent choice in browser local storage so that we do not ask you repeatedly.
                </li>
              </ul>
              <p className="mt-2">
                We do not use third-party advertising cookies.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                5. Data Retention
              </h3>
              <p>
                Your account information and generated stories are retained as long as your account is active. If you wish to delete your account and associated data, please contact us at the email address below. We will process deletion requests within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                6. Data Security
              </h3>
              <p>
                We implement reasonable security measures to protect your data, including encrypted connections (HTTPS), secure authentication through Firebase, and server-side access controls. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                7. Your Rights
              </h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us at the email address below.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                8. Children&apos;s Privacy
              </h3>
              <p>
                The Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete that information.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                9. Changes to This Policy
              </h3>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Your continued use of the Service after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                10. Contact
              </h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a
                  href="mailto:tomoya.fujita@fluxenic.com"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  tomoya.fujita@fluxenic.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
