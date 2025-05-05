import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Privacy = () => {
  return (
    <div className="bg-surface-50 dark:bg-surface-950 py-12">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="max-w-4xl mx-auto bg-white dark:bg-surface-900 rounded-xl shadow-sm overflow-hidden"
          variants={childVariants}
        >
          <div className="p-6 md:p-10">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              variants={childVariants}
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              className="text-surface-600 dark:text-surface-400 mb-8"
              variants={childVariants}
            >
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </motion.p>

            <motion.div
              className="space-y-8"
              variants={containerVariants}
            >
              {/* Introduction Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Introduction
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  At CueLens, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
                <p className="text-surface-600 dark:text-surface-400">
                  This privacy policy applies to all users of our platform and services. Please read this privacy policy carefully to understand our practices regarding your personal data.
                </p>
              </motion.section>

              {/* Information We Collect Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Information We Collect
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  We collect several types of information from and about users of our website, including:
                </p>
                <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 space-y-2">
                  <li>
                    <strong>Personal identifiers:</strong> Name, email address, phone number, and postal address.
                  </li>
                  <li>
                    <strong>Account information:</strong> Username, password, account preferences, and profile information.
                  </li>
                  <li>
                    <strong>Usage data:</strong> Information about how you use our website, products, and services.
                  </li>
                  <li>
                    <strong>Technical data:</strong> IP address, browser type and version, time zone setting, operating system and platform, and device information.
                  </li>
                  <li>
                    <strong>Marketing preferences:</strong> Your preferences in receiving marketing from us and our third parties.
                  </li>
                </ul>
              </motion.section>

              {/* How We Use Your Information Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  How We Use Your Information
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  We use the information we collect about you for various purposes, including:
                </p>
                <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 space-y-2">
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing your transactions and fulfilling your requests</li>
                  <li>Communicating with you about our services, updates, and promotions</li>
                  <li>Personalizing your experience and delivering content relevant to your interests</li>
                  <li>Protecting the security and integrity of our platform</li>
                  <li>Complying with legal obligations and enforcing our terms of service</li>
                </ul>
              </motion.section>

              {/* Cookies and Tracking Technologies Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
                </p>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  We use the following types of cookies:
                </p>
                <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 space-y-2">
                  <li>
                    <strong>Essential cookies:</strong> Necessary for the website to function properly.
                  </li>
                  <li>
                    <strong>Analytical/performance cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.
                  </li>
                  <li>
                    <strong>Functionality cookies:</strong> Used to recognize you when you return to our website.
                  </li>
                  <li>
                    <strong>Targeting cookies:</strong> Record your visit to our website, the pages you have visited, and the links you have followed.
                  </li>
                </ul>
                <p className="text-surface-600 dark:text-surface-400 mt-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </motion.section>

              {/* Data Sharing and Disclosure Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Data Sharing and Disclosure
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  We may share your personal information in the following situations:
                </p>
                <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 space-y-2">
                  <li>
                    <strong>Service providers:</strong> We may share your data with third-party vendors and service providers that perform services for us or on our behalf.
                  </li>
                  <li>
                    <strong>Business transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your data may be transferred as part of that transaction.
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                  </li>
                  <li>
                    <strong>With your consent:</strong> We may share your data with third parties when we have your consent to do so.
                  </li>
                </ul>
              </motion.section>

              {/* Data Security Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Data Security
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                </p>
                <p className="text-surface-600 dark:text-surface-400">
                  Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk. You should only access the services within a secure environment.
                </p>
              </motion.section>

              {/* Your Rights Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Your Rights
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 space-y-2">
                  <li>The right to access, update, or delete your personal information</li>
                  <li>The right to rectification if your information is inaccurate or incomplete</li>
                  <li>The right to object to our processing of your personal data</li>
                  <li>The right to request restriction of processing your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="text-surface-600 dark:text-surface-400 mt-4">
                  To exercise any of these rights, please contact us using the contact information provided below.
                </p>
              </motion.section>

              {/* Children's Privacy Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Children's Privacy
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  Our service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to take necessary actions.
                </p>
              </motion.section>

              {/* Changes to This Privacy Policy Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date. You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
                </p>
              </motion.section>

              {/* Contact Us Section */}
              <motion.section variants={childVariants}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
                  Contact Us
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                  <p className="text-surface-700 dark:text-surface-300">
                    <strong>Email:</strong> privacy@cuelens.com
                  </p>
                  <p className="text-surface-700 dark:text-surface-300">
                    <strong>Postal address:</strong> 123 Privacy Avenue, Suite 400, San Francisco, CA 94103, USA
                  </p>
                  <p className="text-surface-700 dark:text-surface-300">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </motion.section>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Privacy;