import AboutMe from "@/components/modules/Home/AboutMe";
import Contact from "@/components/modules/Home/ContactForm";
import Hero from "@/components/modules/Home/Hero";
import MyProjects from "@/components/modules/Home/MyProjects";
import MyTechSkill from "@/components/modules/Home/MyTechSkill";



export default function Home() {
  return (
    <div className="space-y-6 md:space-y-20">
      <Hero />
      <AboutMe />
      <MyTechSkill />
      <MyProjects />
      <Contact/>
    </div>
  );
}
