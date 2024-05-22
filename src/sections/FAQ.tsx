import { faqData } from "@/assets/staticData";
import Accordion from "@/components/ui/accordion";
import { FC } from "react";

const Faq: FC = () => {
  return (
    <section>
      <div className="mb-10 mt-20 text-center">
        <h3 className="text-5xl font-bold">FAQ</h3>
        <p className="text-muted-foreground">People asked</p>
      </div>
      <Accordion type="multiple" className="mx-auto w-full max-w-xl">
        {faqData.map((ele, idx) => (
          <Accordion.item value={"faq-" + idx} key={"faq-" + idx}>
            <Accordion.trigger>{ele.header}</Accordion.trigger>
            <Accordion.content>{ele.content}</Accordion.content>
          </Accordion.item>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
