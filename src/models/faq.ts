import config from '@config';
import { prisma } from '@/config/prisma';
import { getStaticData } from '@/helpers/getStaticData';

const all = async (query = {}) => {
  if (config.static) {
    return getStaticData({
      model: 'faqs',
      query,
    });
  }

  return prisma.faq.findMany({
    ...query,
  });
};

const show = async (id, query = {}) => {
  return prisma.faq.findFirst({
    where: { id },
    ...query,
  });
};

const showQuery = async (query) => {
  return prisma.faq.findFirst({
    ...query,
  });
};

const store = async ({ title, content, priority = 1 }) => {
  return prisma.faq.create({
    data: { title, content, priority },
  });
};

const update = async ({ id, title, content, priority }) => {
  return prisma.faq.update({
    where: { id },
    data: { title, content, priority },
  });
};

const destroy = async ({ id }): Promise<boolean> => {
  try {
    await prisma.faq.deleteMany({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const faq = {
  all,
  show,
  showQuery,
  store,
  destroy,
  update,
};
