import { Accordion } from '../Accordion/Accordion';
import { Section } from './Section';
import { ACCORDION_ITEMS } from '../../constants/data';

export function AccordionDemo() {
  return (
    <Section
      tag="03 Accordion"
      title="Accordion (Single & Multiple)"
      desc="First accordion allows only one open panel at a time. Arrow keys navigate between headers. ARIA: aria-expanded, aria-controls, role=region, aria-labelledby."
    >
      <div className="card accordion-card--spaced">
        <p className="accordion-mode-label">
          Mode: Single (only one open at a time)
        </p>
        <Accordion.Root mode="single" id="faq-single">
          {ACCORDION_ITEMS.map((item, i) => (
            <Accordion.Item key={i} index={i}>
              <Accordion.Trigger>
                {item.title}
              </Accordion.Trigger>
              <Accordion.Panel>{item.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <div className="card">
        <p className="accordion-mode-label">
          Mode: Multiple (any number can be open)
        </p>
        <Accordion.Root mode="multiple" defaultOpen={[0]} id="faq-multi">
          {ACCORDION_ITEMS.map((item, i) => (
            <Accordion.Item key={i} index={i}>
              <Accordion.Trigger>
                {item.title}
              </Accordion.Trigger>
              <Accordion.Panel>{item.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </Section>
  );
}
