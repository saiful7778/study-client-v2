import Faq from "@/sections/FAQ";
import Banner from "@/shared/Banner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <header>
        <Banner />
      </header>
      <main>
        <Faq />
      </main>
    </>
  );
}
