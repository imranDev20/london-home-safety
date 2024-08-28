import { CONTACT } from "@/shared/data";

export default function ContactAddress() {
  
  return (
    <div className="  bg-blue-50 py-20  ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-">
        {CONTACT.map((item) => (
          <div
            key={item.id}
            className="  flex space-x-4 bg-white rounded-2xl p-6 shadow-lg  w-[350px]"
          >
            {/* <p>{<item.Icon />}</p> */}
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
