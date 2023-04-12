import { NextPage } from 'next';
import { Tag } from '@prisma/client';
import { useState } from 'react';
import TagList from '@misc/TagList';
import { toggleTagSelection } from '@/features/tagSelectionSlice';
import { useAppDispatch } from '@/config/hooks';

type TagWithSelected = Tag & {
  isSelected: boolean;
};

type Props = {
  tags: Tag[];
  defaultTags?: number[];
};

const TagListSelection: NextPage<Props> = ({
  tags: allTags,
  defaultTags = [],
}: Props) => {
  const dispatch = useAppDispatch();
  // Initial tags
  const [input, setInput] = useState<string>('');

  const [tags, setTags] = useState<TagWithSelected[]>(() =>
    allTags.map((tag) => ({
      ...tag,
      isSelected: defaultTags.includes(tag.id),
    }))
  );

  const selectedTags = tags.filter((tag) => tag.isSelected);
  const tagIds = selectedTags.map((tag) => tag.id).join(',');

  const handleOnClickTagToAdd = (event): void =>
    filterSelectedProperty({
      setTags,
      event,
      filterTo: true,
    });

  const handleOnClickTagToDelete = (event): void =>
    filterSelectedProperty({
      setTags,
      event,
      filterTo: false,
    });

  const handleOnClickButton = (event) => {
    event.preventDefault();
    dispatch(toggleTagSelection());
  };

  const handleOnChangeSearchField = (event) => {
    const value = event.target.value.toLowerCase();
    setInput(value);
  };

  return (
    <div className="field">
      <label htmlFor="search">Tags:</label>
      <input type="hidden" name="tags" value={tagIds} />
      <div className="tag-list-selection-container">
        <div className="selected-tag-list card">
          <TagList
            tags={selectedTags}
            handleClickEvent={handleOnClickTagToDelete}
          />
        </div>
        <button
          type="button"
          className="btn btn--secondary btn--lg"
          onClick={handleOnClickButton}
        >
          ＋
        </button>
        <div className="tag-list-container card">
          <dialog className="tag-list__dialog">
            <div className="field field--sm">
              <input
                type="text"
                id="search"
                name="search"
                data-ignore-input
                placeholder="Search..."
                onChange={handleOnChangeSearchField}
              />
            </div>
            {input === '' && (
              <TagList
                tags={tags.filter((t) => !t.isSelected)}
                handleClickEvent={handleOnClickTagToAdd}
              />
            )}
            {input !== '' && (
              <TagList
                tags={tags.filter(
                  (t) => t.strict.includes(input) && !t.isSelected
                )}
                handleClickEvent={handleOnClickTagToAdd}
              />
            )}
          </dialog>
        </div>
      </div>
    </div>
  );
};

function filterSelectedProperty({ event, setTags, filterTo }) {
  event.preventDefault();
  const tagId = Number(event.target.dataset.id);
  setTags((prev) =>
    prev.map((tag) =>
      tag.id !== tagId
        ? tag
        : {
            ...tag,
            isSelected: filterTo,
          }
    )
  );
}

export default TagListSelection;
