import NextTopLoader from "nextjs-toploader";

export default function SiteTopLoader() {
  return (
    <NextTopLoader
      color="#FFC527"
      initialPosition={0.08}
      crawlSpeed={300}
      height={3}
      crawl
      showAtBottom={false}
      showSpinner={true}
      easing="ease"
      speed={300}
      zIndex={999999999}
      shadow={`0 0 10px #FFC527,0 0 5px #FFC527`}
    />
  );
}
