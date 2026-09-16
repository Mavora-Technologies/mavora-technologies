import { Hero } from '@/components/sections/Hero';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { SolutionMapping } from '@/components/sections/SolutionMapping';
import { HowWeWork } from '@/components/sections/HowWeWork';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ServicesGrid />
      <SolutionMapping />
      <HowWeWork />
    </>
  );
}