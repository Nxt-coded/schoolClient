import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className=" w-full h-screen bg-red-400">
      <Helmet>
        <title>About Us - Just Next School Management Platform</title>
        <meta name="description" content="Learn about Just Next, our mission, vision, and how we are transforming school management for educational institutions in Nigeria." />
        <link rel="canonical" href="https://justnext.ng/about" />
      </Helmet>
      About
    </div>
  );
};

export default About;
