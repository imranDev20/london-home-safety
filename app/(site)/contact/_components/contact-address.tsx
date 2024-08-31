import { CONTACT } from "@/shared/data";

export default function ContactAddress() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-100 rounded-full">
                    {contact.icons}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 text-base">{contact.info}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
