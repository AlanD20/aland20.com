import { prisma } from '@/app/prisma';

const all = async (query = {}) => {
  return prisma.skill.findMany({
    ...query,
  });
};

const show = async (id, query = {}) => {
  return prisma.skill.findFirst({
    where: { id },
    ...query,
  });
};

const showQuery = async (query) => {
  return prisma.skill.findFirst({
    ...query,
  });
};

const store = async ({ title, priority = 1, tags = [] }) => {
  return prisma.skill.create({
    data: {
      title,
      priority,
      tags: {
        connect: tags,
      },
    },
    include: { tags: tags.length > 0 },
  });
};

const update = async ({ id, title, priority, tags = [] }) => {
  return prisma.skill.update({
    where: { id },
    data: {
      title,
      priority,
      tags: {
        set: tags,
      },
    },
    include: { tags: tags.length > 0 },
  });
};

const destroy = async ({ id }) => {
  try {
    await prisma.skill.deleteMany({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const skill = {
  all,
  show,
  showQuery,
  store,
  update,
  destroy,
};
