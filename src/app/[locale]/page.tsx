import HomePage from "./HomePage";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <HomePage />;
}
