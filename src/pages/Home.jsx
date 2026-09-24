import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Skills from '../components/Skills'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Vijay Singh | MERN Stack Developer & Full-Stack Engineer | Haldwani, Uttarakhand</title>
        <meta name="description" content="Vijay Singh is a MERN Stack Developer & Full-Stack Engineer from Haldwani, Uttarakhand, India. Expert in React.js, Node.js, Express.js, MongoDB, and Generative AI. Available for freelance projects and full-time roles." />
        <meta name="keywords" content="Vijay Singh, MERN Stack Developer, Full Stack Developer, React Developer, Node.js Developer, MongoDB, Express.js, Web Developer Haldwani, Web Developer Uttarakhand, Frontend Developer, Backend Developer, JavaScript Developer, Software Engineer India, Portfolio, Generative AI, DevOps" />
        <link rel="canonical" href="https://vijay-singh.vercel.app/" />

        {/* Open Graph */}
        <meta property="og:title" content="Vijay Singh | MERN Stack Developer & Full-Stack Engineer" />
        <meta property="og:description" content="MERN Stack Developer from Haldwani, Uttarakhand. Expert in React.js, Node.js, Express.js, MongoDB, and Generative AI." />
        <meta property="og:url" content="https://vijay-singh.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="Vijay Singh | MERN Stack Developer & Full-Stack Engineer" />
        <meta name="twitter:description" content="MERN Stack Developer from Haldwani, Uttarakhand. Expert in React.js, Node.js, Express.js, MongoDB, and Generative AI." />
      </Helmet>

      <Hero />
      <Skills />
    </>
  )
}

export default Home