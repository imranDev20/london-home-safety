export default function ContactAddress() {
  const contactData = [
    {
      id: 1,

      title: "Address:",
      info: <>43 Felton Road, Barking, London IG11 7YA</>,
    },
    {
      id: 2,
      title: "Work Hours:",
      info: <>Mon-Fri 08:00 AM - 05:00 PM Sat-Sun: Emergency only</>,
    },
    {
      id: 3,
      title: "Contact Info:",
      info: <>020 8146 6698 info@londonhomesafety.co.uk</>,
    },
  ];
  return (
    <div className="  bg-blue-50 py-20  ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-">
        {contactData.map((item) => (
          <div
            key={item.id}
            className="  flex space-x-4 bg-white rounded-2xl p-6 shadow-lg  w-[350px]"
          >
            <p>Icon</p>
            <div>
              <h3 className="font-bold text-xl mb-4">{item.title}</h3>
              <p className=" text-body font-semibold">{item.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
