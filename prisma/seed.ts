import { PrismaClient } from '@prisma/client';
import projects from './data/projects';
import faqs from './data/faqs';
import skills from './data/skills';
import tags from './data/tags';

const prisma = new PrismaClient();

async function processAsync(array: any[], action: Function) {
  for (const data of array) {
    // eslint-disable-next-line no-await-in-loop
    await action(data);
  }
}

async function main() {
  // tags

  await processAsync(tags, (t) => prisma.tag.create({ data: t }));

  // faqs
  await processAsync(faqs, (f) => prisma.faq.create({ data: f }));

  // projects
  await processAsync(projects, (p) =>
    prisma.project.create({
      data: {
        title: p.title,
        priority: p.priority,
        content: p.content,
        sourceLink: p.sourceLink,
        previewLink: p.previewLink,
        createdDate: p.createdDate
          ? new Date(p.createdDate).toISOString()
          : null,
        completedDate: p.completedDate
          ? new Date(p.completedDate).toISOString()
          : null,
        tags: {
          connect: p.tags,
        },
      },
    })
  );

  // skills
  await processAsync(skills, (s) =>
    prisma.skill.create({
      data: {
        title: s.title,
        priority: s.priority,
        tags: {
          connect: s.tags,
        },
      },
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
