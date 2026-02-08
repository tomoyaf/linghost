import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
            Terms of Service
          </h2>

          <div className="prose prose-invert prose-zinc prose-sm max-w-none space-y-6 text-zinc-400 leading-relaxed">
            <p className="text-zinc-500 text-xs">
              Last updated: February 8, 2026
            </p>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing or using linGhost (&quot;the Service&quot;), operated at linghost.app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                2. Description of Service
              </h3>
              <p>
                linGhost is an AI-powered story generation service. Users provide keywords, atmosphere, and style preferences, and the Service generates original short stories using artificial intelligence technology. The Service offers both free and paid subscription tiers.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                3. User Accounts
              </h3>
              <p>
                To use the Service, you must sign in with a Google account. You are responsible for maintaining the security of your account credentials. You must be at least 13 years of age to use the Service. By creating an account, you represent that the information you provide is accurate and complete.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                4. Content and Intellectual Property
              </h3>
              <p>
                Stories generated through the Service are created by AI and are provided to you for personal use. You may use, share, and modify stories generated for you. The Service, its design, code, and branding remain the intellectual property of linGhost. You may not reproduce, distribute, or create derivative works of the Service itself.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                5. Prohibited Use
              </h3>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to the Service or its systems</li>
                <li>Use automated tools to scrape or extract content from the Service</li>
                <li>Interfere with or disrupt the operation of the Service</li>
                <li>Use the Service to generate content that is harmful, abusive, or violates the rights of others</li>
                <li>Resell or commercially redistribute generated content without permission</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                6. Disclaimers
              </h3>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. AI-generated stories may contain inaccuracies, unexpected content, or errors. We do not guarantee the quality, accuracy, or appropriateness of generated content. The Service may reference current events; such references are AI-generated and may not be factually accurate.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                7. Limitation of Liability
              </h3>
              <p>
                To the maximum extent permitted by applicable law, linGhost and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                8. Subscription and Payments
              </h3>
              <p>
                Paid subscriptions are billed through Stripe. Subscriptions automatically renew unless cancelled before the renewal date. You may cancel your subscription at any time; access continues until the end of the current billing period. Due to the digital nature of the Service, refunds are not available.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                9. Termination
              </h3>
              <p>
                We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease. You may delete your account at any time by contacting us.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                10. Governing Law
              </h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Japan. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Tokyo, Japan.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                11. Changes to Terms
              </h3>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Your continued use of the Service after changes are posted constitutes your acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                12. Contact
              </h3>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
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
