import { PrismaClient } from '@prisma/client';
import projects from './data/projects';
import faqs from './data/faqs';
import skills from './data/skills';
import tags from './data/tags';

const prisma = new PrismaClient();

async function main() {
  // tags
  for (let t of tags) {
    await prisma.tag.create({
      data: t,
    });
  }

  // faqs
  for (let f of faqs) {
    await prisma.faq.create({
      data: f,
    });
  }

  // projects
  for (let p of projects) {
    await prisma.project.create({
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
    });
  }

  // skills
  for (let s of skills) {
    await prisma.skill.create({
      data: {
        title: s.title,
        priority: s.priority,
        tags: {
          connect: s.tags,
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
