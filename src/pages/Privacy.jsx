import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Policy Content */}
        <motion.div
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-surface-900 dark:prose-headings:text-white prose-p:text-surface-700 dark:prose-p:text-surface-300"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              CueLens ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
            </p>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-medium mb-3">Personal Data</h3>
            <p>
              Personally identifiable information, such as your name, email address, and other unique identifiers that you voluntarily give to us when you register with our website or when you choose to participate in various activities related to the website.
            </p>
            <h3 className="text-xl font-medium mb-3 mt-6">Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.
            </p>
            <h3 className="text-xl font-medium mb-3 mt-6">Financial Data</h3>
            <p>
              If you choose to subscribe to our premium services, we may collect financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date). We store only very limited financial information that we need to process your subscription.
            </p>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Create and manage your account.</li>
              <li>Process transactions and send you related information, including confirmations and invoices.</li>
              <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
              <li>Respond to your comments, questions, and requests.</li>
              <li>Provide, maintain, and improve the website and our services.</li>
              <li>Monitor and analyze trends, usage, and activities in connection with the website.</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
              <li>Personalize the website experience for you.</li>
              <li>Deliver targeted advertising, newsletters, and other information regarding promotions.</li>
            </ul>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <h3 className="text-xl font-medium mb-3 mt-6">By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
            <h3 className="text-xl font-medium mb-3 mt-6">Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
            <h3 className="text-xl font-medium mb-3 mt-6">Marketing Communications</h3>
            <p>
              With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
            </p>
            <h3 className="text-xl font-medium mb-3 mt-6">Business Transfers</h3>
            <p>
              If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
            </p>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            <p className="mt-4">
              Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
            </p>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Policy for Children</h2>
            <p>
              We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
            </p>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Controls for Do-Not-Track Features</h2>
            <p>
              Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
            </p>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Options Regarding Your Information</h2>
            <h3 className="text-xl font-medium mb-3">Account Information</h3>
            <p>
              You may at any time review or change the information in your account or terminate your account by:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Logging into your account settings and updating or deleting your information.</li>
              <li>Contacting us using the contact information provided below.</li>
            </ul>
            <p className="mt-4">
              Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use, and/or comply with legal requirements.
            </p>
            <h3 className="text-xl font-medium mb-3 mt-6">Emails and Communications</h3>
            <p>
              If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Clicking the unsubscribe link at the bottom of any email from us.</li>
              <li>Contacting us using the contact information provided below.</li>
            </ul>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">California Privacy Rights</h2>
            <p>
              California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year.
            </p>
            <p className="mt-4">
              If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
            </p>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
            </p>
            <p className="mt-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
            <h3 className="text-xl font-medium mb-3 mt-6">Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Essential/Necessary Cookies:</strong> These cookies are essential to provide you with services available through our website and to enable you to use some of its features.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you make when you use our site.</li>
              <li><strong>Analytics Cookies:</strong> These cookies track information about how the website is used so that we can make improvements.</li>
              <li><strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements that are relevant to you and your interests.</li>
            </ul>
          </motion.section>

          <motion.section className="mb-10" variants={fadeIn}>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4">
              <p className="font-medium">CueLens</p>
              <p>123 Privacy Lane</p>
              <p>Data City, DC 12345</p>
              <p>United States</p>
              <p className="mt-2">Email: privacy@cuelens.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </motion.section>
        </motion.div>

        {/* Acceptance Statement */}
        <motion.div 
          className="mt-12 p-6 bg-surface-100 dark:bg-surface-800 rounded-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg font-medium mb-2">By using CueLens, you acknowledge that you have read and understand this Privacy Policy.</p>
          <p className="text-surface-600 dark:text-surface-400">If you do not agree with our policies and practices, please do not use our services.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;