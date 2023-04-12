import skills from '@/seed/data/skills';
import tags from '@/seed/data/tags';
import projects from '@/seed/data/projects';
import faqs from '@/seed/data/faqs';
import { Tag } from '@prisma/client';

export interface StaticData {
  model: 'tags' | 'skills' | 'projects' | 'faqs';
  query: {
    include?: { tags: boolean };
  };
}

export const getStaticData = ({ model, query }: StaticData) => {
  let data = getDataArray(model);

  if (query.include && query.include.tags) {
    data = data.map((m) => {
      m.tags = m.tags.map((tag: Tag) => {
        const t = tags[tag.id - 1];

        if (t) {
          tag.strict = t?.strict;
          tag.name = t?.name;
        }

        return tag;
      });

      return m;
    });
  }

  return data;
};

function getDataArray(name: string): any[] {
  if (name === 'skills') return skills;
  if (name === 'projects') return projects;
  if (name === 'tags') return tags;
  if (name === 'faqs') return faqs;

  return [];
}
