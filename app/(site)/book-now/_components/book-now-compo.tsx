import { getPackages } from "@/app/admin/(require-auth)/orders/[order_id]/actions";
import BookNowPackages from "./book-now-packages";

export default async function BookNowComponent() {
  const packages = await getPackages();

  return <BookNowPackages packages={packages} />;
}
