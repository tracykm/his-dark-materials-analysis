import { mapValues, pickBy } from "lodash-es";
import {
  BookData,
  ChapterRow,
  CharactersData,
  IndexedSentencesData,
  RelationshipData,
  RelationshipTimelineData,
} from "./utils";

export async function getBookData({
  selectedBook = 0,
  series = "his_dark_materials",
}) {
  const charactersJson = await import(`./data/${series}/characters.json`);
  const chaptersJson = await import(`./data/${series}/chapters.json`);
  // const dates = await import(`./data/${series}/dates.json`);
  const relationshipsJson = await import(`./data/${series}/relationships.json`);
  const indexedSentencesJson = await import(
    `./data/${series}/indexedSentences.json`
  );
  const relationshipTimelinesJson = await import(
    `./data/${series}/relationshipTimelines.json`
  );
  const booksJson = await import(`./data/${series}/books.json`);
  const manualConfigJson = await import(`./data/${series}/manualConfig.json`);

  let characters: CharactersData = charactersJson.default;
  let relationships: RelationshipData = relationshipsJson.default;
  let chapters: ChapterRow[] = chaptersJson.default;
  let indexedSentences: IndexedSentencesData = indexedSentencesJson.default;
  let relationshipTimelines: RelationshipTimelineData =
    relationshipTimelinesJson.default;
  const manualConfig = manualConfigJson.default;
  let books: BookData[] = booksJson.default;
  books = books.map((book, idx) => {
    let startLetterIndex = 0;
    if (idx > 0) {
      startLetterIndex = chapters[books[idx - 1].chapters].letterIndex;
    }
    return {
      ...book,
      startLetterIndex,
    };
  });

  const flatChapterToBook = chapters.reduce((acc, d) => {
    acc[d.chapterFlat] = d.book;
    return acc;
  }, {} as Record<string, number>);

  if (selectedBook != 0) {
    chapters = chapters.filter((d) => d.book === selectedBook);

    indexedSentences = pickBy(
      indexedSentences,
      (_, idx) =>
        flatChapterToBook[indexedSentences[idx].chapterFlat] === selectedBook
    );

    characters = mapValues(characters, (d) => {
      const refs = d.refs.filter((idx) => indexedSentences[idx]);
      return {
        ...d,
        refs,
        count: refs.length,
      };
    });

    characters = pickBy(characters, (d) => d.count > 0);

    relationships = mapValues(relationships, (rel) => {
      return mapValues(rel, (refPairs) => {
        return refPairs.filter((pair) => indexedSentences[pair[0]]);
      });
    });

    relationshipTimelines = pickBy(
      relationshipTimelines,
      (_, name) => characters[name]
    );

    relationshipTimelines = mapValues(relationshipTimelines, (rel) => {
      return pickBy(rel, (_, name) => characters[name]);
    });
    relationshipTimelines = mapValues(relationshipTimelines, (rel) => {
      return mapValues(rel, (r) => ({
        ...r,
        positivity: r.positivity.filter(
          (p) => flatChapterToBook[p.chapterFlat] === selectedBook
        ),
      }));
    });
  }

  return {
    characters,
    relationships,
    chapters,
    indexedSentences,
    relationshipTimelines,
    books,
    selectedBook,
    manualConfig,
  };
}
