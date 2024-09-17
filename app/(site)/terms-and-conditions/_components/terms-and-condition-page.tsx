export default function TermsAndConditionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p className="mb-2">
          Welcome to London Home Safety Limited. These Terms and Conditions
          govern your use of our website londonhomesafety.com and the services
          we provide. By accessing our website or using our services, you agree
          to be bound by these Terms and Conditions. If you disagree with any
          part of these terms, you may not use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Definitions</h2>
        <p className="mb-2">For the purposes of these Terms and Conditions:</p>
        <ul className="list-disc list-inside ml-4">
          <li>
            {" "}
            Refers to you, the person accessing this website and accepting these
            Terms and Conditions.
          </li>
          <li> We refers to London Home Safety Limited.</li>
          <li>
            Services refers to the services provided by London Home Safety
            Limited as described on our website.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Services</h2>
        <p className="mb-2">
          We provide various home safety services, including but not limited to:
        </p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>Electrical Installation Condition Reports</li>
          <li>Portable Appliance Testing</li>
          <li>Fuse Box Installation</li>
          <li>Electrical Diagnostic & Repair Services</li>
          <li>EV Charger Installation</li>
          <li>Gas Certificate & Repairs</li>
          <li>Boiler Service & Repair</li>
          <li>Fire Risk Assessment</li>
          <li>Fire Alarm Certificate</li>
          <li>Fire Alarm Installation</li>
          <li>Emergency Light Installation</li>
          <li>Energy Performance Certificate</li>
          <li>Asbestos Surveys</li>
          <li>Inventory Services</li>
        </ul>
        <p>
          All services are subject to availability and we reserve the right to
          refuse service to anyone for any reason at any time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Booking and Payment</h2>
        <p className="mb-2">
          When you book a service through our website, you agree to provide
          current, complete, and accurate purchase and account information. We
          use Stripe for payment processing. By providing your payment
          information, you represent and warrant that you have the legal right
          to use any payment method(s) in connection with any purchase.
        </p>
        <p>
          All prices listed on our website are in British Pounds (GBP) and are
          inclusive of VAT unless otherwise stated. We reserve the right to
          change our prices at any time without prior notice.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          5. Cancellations and Refunds
        </h2>
        <p className="mb-2">
          Our cancellation and refund policy is as follows:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            Cancellations made more than 48 hours before the scheduled service
            will receive a full refund.
          </li>
          <li>
            Cancellations made between 24 and 48 hours before the scheduled
            service will be charged a 50% cancellation fee.
          </li>
          <li>
            Cancellations made less than 24 hours before the scheduled service
            or no-shows will be charged the full service fee.
          </li>
          <li>
            If we are unable to perform the service due to circumstances within
            our control, you will receive a full refund.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          6. User Responsibilities
        </h2>
        <p className="mb-2">You are responsible for:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Providing accurate information when booking our services.</li>
          <li>
            Ensuring that our team has safe and reasonable access to perform the
            requested services.
          </li>
          <li>
            Informing us of any potential hazards or special circumstances
            before our arrival.
          </li>
          <li>
            Complying with all applicable laws and regulations in connection
            with your use of our services.
          </li>
          <li>
            Ensuring that you have the necessary permissions (e.g., from
            landlords) to carry out the requested services.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          7. Limitation of Liability
        </h2>
        <p className="mb-2">
          To the fullest extent permitted by applicable law, London Home Safety
          Limited shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits or
          revenues, whether incurred directly or indirectly, or any loss of
          data, use, goodwill, or other intangible losses resulting from:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Your use or inability to use our services</li>
          <li>
            Any unauthorized access to or use of our servers and/or any personal
            information stored therein
          </li>
          <li>
            Any interruption or cessation of transmission to or from our
            services
          </li>
          <li>
            Any bugs, viruses, trojan horses, or the like that may be
            transmitted to or through our services
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          8. Intellectual Property
        </h2>
        <p>
          The content on our website, including text, graphics, logos, and
          images, is the property of London Home Safety Limited and is protected
          by copyright and other intellectual property laws. You may not use,
          reproduce, or distribute any content from our website without our
          express written permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">9. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the
          laws of England and Wales, without regard to its conflict of law
          provisions. Our failure to enforce any right or provision of these
          Terms will not be considered a waiver of those rights.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time.
          We will notify users of any changes by posting the new Terms and
          Conditions on this page and updating the &quot;Last updated&quot; date
          at the top of this page. You are advised to review these Terms and
          Conditions periodically for any changes.
        </p>
      </section>
    </div>
  );
}
