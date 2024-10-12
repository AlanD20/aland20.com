const faqs = [
  {
    title: 'Was it worth it to use Nextjs for this website?',
    content:
      "@pg ABSOLUTELY not. Although I learnt why I shouldn't use nextjs for my next project :) @block The developer experience is pretty good and I did enjoy working with it. But it was the time to deploy (I'm a self-host person) I got a lot of issues especially with the static data and how the SSR is being deployed using nginx. It was not convenient at all. @endblock @block Now, this is running on Vercel, which is so much easier but the bandwidth per month is limited @endblock @endpg",
  },
  {
    title: 'What does the login button do?',
    content:
      '@pg The login button is only allowed for some github users to login as an admin of the website. Admin users can manage the entire website such as: Adding, Editing, and Deleting content throughout the website. @endpg',
  },
  {
    title: 'What technologies have you used to build this website?',
    content:
      '@pg I wanted to update my personal website for a long time, and I was also interested in learning Next.js, Prisma, GraphQL. So, I utilized these technologies as a first-hand to build this website. The experience of using those were amazing but deployment is a pain! @block You can checkout the @link([https://github.com/AlanD20/aland20.com][github repo]) to see how this is done. I used Next.js with Typescript, Prisma, SQLite, TailwindCSS. And additional authentication with GitHub to build an admin dashboard so that I can dynamically update the content of this website. I also built a custom directive parser that helps me to use a friendly directive in my contents to make them HTML compatible. @endblock @endpg',
  },
  {
    title: 'Why do you use database for your personal website?',
    content:
      "@pg I do a lot of content modification for the website. So, It was a good reason for me to use a database to have simple CRUD actions. Especially SQLite as a file, which allows me to easily back up all the contents without worrying about losing the data. @block On the other side, when I moved to Vercel to host this website, I'm currently using a static file to show these data on the website. @endblock @endpg",
  },
  {
    title: 'Custom Directives? What is this?',
    content:
      '@pg You can find the README file in the @link([https://github.com/AlanD20/aland20.com/tree/main/src/modules/CustomDirectives][GitHub repository with examples]). @block The whole website contents are rendered using this custom directive renderer where also you can find the static data in the @link([https://github.com/AlanD20/aland20.com/tree/main/prisma/data][GitHub repository with actual data there.]) @endblock @endpg',
  },
];
export default faqs;
