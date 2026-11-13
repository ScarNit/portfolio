import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <Projects />
        <Timeline />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
