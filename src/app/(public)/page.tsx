import AboutMe from "@/components/modules/Home/AboutMe";
import Hero from "@/components/modules/Home/Hero";
import MyProjects from "@/components/modules/Home/MyProjects";



export default function Home() {
  return (
    <div>
      <Hero />
      <AboutMe/>
      <MyProjects/>
    </div>
  );
}
