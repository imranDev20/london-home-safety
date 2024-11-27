'use client';

interface PolicyConsentPopupProps {
  onConsent: (consent: boolean) => void;
}

const PolicyConsentPopup: React.FC<PolicyConsentPopupProps> = ({ onConsent }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="consent-popup-title"
      aria-describedby="consent-popup-description"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <h2 id="consent-popup-title" className="text-lg font-bold">
          We Value Your Privacy
        </h2>
        <p id="consent-popup-description" className="text-sm text-gray-600 my-4">
          By using this site, you agree to our Privacy Policy and Cookie Policy.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => onConsent(true)}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={() => onConsent(false)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyConsentPopup;
