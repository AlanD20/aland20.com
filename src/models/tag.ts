import { prisma } from '@/app/prisma';


const all = async (query = {}) => {

  return await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    ...query
  });
}

const show = async (id, query = {}) => {

  return await prisma.tag.findFirst({
    where: { id },
    ...query
  });
}


const showQuery = async (query) => {

  return await prisma.tag.findFirst({
    ...query
  });
}

const store = async ({ name, projects = false, skills = false }) => {

  return await prisma.tag.create({
    data: {
      name,
      strict: name.toLowerCase()
    },
    include: { projects, skills }
  });
}

const update = async ({
  id, name, projects = false, skills = false
}) => {

  return await prisma.tag.update({
    where: { id },
    data: {
      name,
      strict: name.toLowerCase(),
    },
    include: { projects, skills }
  });
}

const destroy = async ({ id }) => {

  try {
    await prisma.tag.deleteMany({
      where: { id },
    });
    return true;
  } catch (error) {

    return false;
  }
}

export const tag = {
  all,
  show,
  showQuery,
  store,
  destroy,
  update,
}
