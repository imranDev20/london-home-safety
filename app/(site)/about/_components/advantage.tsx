import EngineerIcon from "@/components/icons/engineer";
import { Card } from "@/components/ui/card";
export default function Advantage() {
  return (
    <section className="bg-blue-100 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Reasons You Should Call Us</h2>
        <p className="text-body mb-10">
          Electrician is your single source for a complete range of high quality
          electrical <br /> services, including design/build, engineering and
          maintenance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white p-6  rounded-2xl shadow-lg text-center">
           <EngineerIcon className="fill-primary" />
            <h3 className="text-lg font-semibold mb-2">
              Our Qualified Engineers
            </h3>
            <p className="text-body">Over 30 Years Experience</p>
          </Card>
          <Card className="bg-white p-6  rounded-2xl shadow-lg text-center">
            <p>Icon</p>
            <h3 className="text-lg font-semibold mb-2">Low Price Promise</h3>
            <p className="text-body">We won&apos;t be beaten on price.</p>
          </Card>
          <Card className="bg-white p-6  rounded-2xl shadow-lg text-center">
            <p>Icon</p>
            <h3 className="text-lg font-semibold mb-2">Fast Response</h3>
            <p className="text-body">
              Arrange an appointment, as early as tomorrow
            </p>
          </Card>
          <Card className="bg-white p-6  rounded-2xl shadow-lg text-center">
            <p>Icon</p>
            <h3 className="text-lg font-semibold mb-2">Book Any Time</h3>
            <p className="text-body">Book at a time that works for you</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
