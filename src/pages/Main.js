import Story from "../component/Story";
import Home from "../component/Home";
import About from "../component/About";
import Team from "../component/Team";
import Roadmap from "../component/Roadmap";
import SignUp from "../component/SignUp";
import Faq from "../component/Faq";
import Contact from "../component/Contact";

export default function Main() {
  return (
    <div className="overflow-hidden">
      <Home />
      <Story />
      <About />
      <Team />
      <Roadmap />
      <SignUp />
      <Faq />
      <Contact />
    </div>
  );
}
