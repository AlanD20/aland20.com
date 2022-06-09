import { prisma } from '@/app/prisma';


const all = async (query = {}) => {

  return await prisma.faq.findMany({
    ...query
  });
}


const show = async (id, query = {}) => {

  return await prisma.faq.findFirst({
    where: { id },
    ...query
  });
}

const showQuery = async (query) => {

  return await prisma.faq.findFirst({
    ...query
  });
}


const store = async ({ title, content, priority = 1 }) => {

  return await prisma.faq.create({
    data: { title, content, priority },
  });
}


const update = async ({ id, title, content, priority }) => {

  return await prisma.faq.update({
    where: { id },
    data: { title, content, priority },
  });
}

const destroy = async ({ id }): Promise<boolean> => {

  try {
    await prisma.faq.deleteMany({
      where: { id }
    });
    return true;
  } catch (error) {

    return false;
  }
}

export const faq = {
  all,
  show,
  showQuery,
  store,
  destroy,
  update,
}
