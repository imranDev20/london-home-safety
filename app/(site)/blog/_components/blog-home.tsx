import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SiteSettingWithRelations } from "@/types/misc";
import Image from "next/image";
import Electrical from '../../../../public/electrician-multimeter.webp'

export default function BlogHome({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) {
  return (
    <div className="container my-10">
      <h2 className="max-w-3xl mx-auto mb-8 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight text-center my-5">
        Great Local Multiplayer Games to Play on PS5
      </h2>
      <div className="flex items-center">
        <Avatar className="mr-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>by <span className="text-primary">Jhon Doe - </span></p>
        <p>July 31, 2024</p>
      </div>

      <div className="my-6">
        <Image src={Electrical} width={500} height={400} className="w-full h-[400px] object-cover" alt="Electrical image"/>
        <div className="max-w-6xl mx-auto">
        <p className="my-6 ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt quisquam aliquam eum ratione saepe nesciunt. Incidunt hic et aut, quasi ratione quam sed explicabo minus a, recusandae quia, corporis magni cupiditate sit obcaecati maxime neque architecto laudantium temporibus. Incidunt quis velit libero eveniet dolore, ab cupiditate consequuntur accusantium iure itaque.</p>
        
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia recusandae dolore assumenda blanditiis quod pariatur facilis, quasi aliquid dignissimos omnis nisi? Quasi, sunt? Repudiandae vero officiis ratione debitis officia eaque, dolorem nisi hic obcaecati. Odio, nisi odit? Voluptatibus unde doloribus nisi quas nemo, odio nulla blanditiis aspernatur, officiis cumque aliquam et, laborum iste quo excepturi ea eum ipsum quia eaque cupiditate? Optio alias quis praesentium debitis doloremque illum et sint sed error molestiae dicta voluptas tempora, consequuntur dignissimos impedit aperiam?</p>
        </div>
      </div>
    </div>
  );
}
