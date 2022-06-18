import { prisma } from '@/app/prisma';

const all = async (query = {}) => {
  return prisma.project.findMany({
    ...query,
  });
};

const show = async (id, query = {}) => {
  return prisma.project.findFirst({
    where: { id },
    ...query,
  });
};

const showQuery = async (query) => {
  return prisma.project.findFirst({
    ...query,
  });
};

const store = async ({
  title,
  content,
  sourceLink,
  previewLink,
  createdDate,
  completedDate,
  priority = 1,
  tags = [],
}) => {
  return prisma.project.create({
    data: {
      title,
      content,
      priority,
      sourceLink,
      previewLink,
      createdDate: createdDate ? new Date(createdDate).toISOString() : null,
      completedDate: completedDate
        ? new Date(completedDate).toISOString()
        : null,
      tags: {
        connect: tags,
      },
    },
    include: { tags: tags.length > 0 },
  });
};

const update = async ({
  id,
  title,
  content,
  priority,
  sourceLink,
  createdDate,
  completedDate,
  previewLink,
  tags = [],
}) => {
  return prisma.project.update({
    where: { id },
    data: {
      title,
      content,
      priority,
      sourceLink,
      previewLink,
      createdDate: createdDate ? new Date(createdDate).toISOString() : null,
      completedDate: completedDate
        ? new Date(completedDate).toISOString()
        : null,
      tags: {
        set: tags,
      },
    },
    include: { tags: tags.length > 0 },
  });
};

const destroy = async ({ id }) => {
  try {
    await prisma.project.deleteMany({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const project = {
  all,
  show,
  showQuery,
  store,
  update,
  destroy,
};
