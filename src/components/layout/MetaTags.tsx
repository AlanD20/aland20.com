import { NextPage } from 'next';

const MetaTags: NextPage = () => {
  return (
    <>
      <meta name="title" content="AlanD20's Portfolio" />
      <meta
        name="description"
        content="AlanD20's Portfolio Website. who is a self-taught in tech industry. Passionate about Full-stack development especially Backend development"
      />
      <meta
        name="keywords"
        content="aland20, aland2011, aland_2011, alandslemani, alandal-jaf, alandaljaf, aland_al-jaf, aland_aljaf, alands20, alandking20, AlanD20, AlanD2011, AlanD_2011, #aland20, #aland2011, #AlanD_2011"
      />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Aland Al-Jaf" />
      <meta name="robots" content="index, follow" />
      <meta name="contact" content="aland20@pm.me" />
      <meta name="revisit-after" content="7" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@AlanD_2011" />
      <meta name="twitter:title" content="AlanD20's Portfolio" />
      <meta
        name="twitter:description"
        content="AlanD20's portfolio website. who is a self-taught computer science student. Passionate about web development and programming."
      />
      <meta
        name="twitter:image"
        content="https://www.aland20.tech/images/512x512.png"
      />
    </>
  );
};

export default MetaTags;
