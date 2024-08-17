import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemButton,
  Typography,
} from "@mui/material";
import { sort } from "d3";
import { groupBy, throttle, uniq } from "lodash-es";
import {
  getPercent,
  LETTERS_PER_PAGE,
  RelationshipRefs,
  SetState,
} from "./utils";
import { useDataContext } from "./DataContext";
import React, { useCallback, useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Close from "@mui/icons-material/Close";
import { ErrorBoundary } from "./ErrorBoundry";

export function RelationshipModal({
  relationship,
  ...rest
}: {
  onClose: () => void;
  title: string;
  relationship: RelationshipRefs;
  selectedChapter?: number;
}) {
  const flattenedSentences = relationship.flatMap((pair) => pair);

  return <RefsModal {...rest} refs={flattenedSentences} />;
}

const getChapterId = (chapter: number) => `chapter-${chapter}`;

function useScrollToChapter({ chapter }: { chapter?: number }) {
  useEffect(() => {
    if (!chapter) return;
    const scrollToChapter = () => {
      let chp = chapter;
      let chapterEl = document.getElementById(getChapterId(chapter));
      while (!chapterEl && chp > 0) {
        chp--;
        chapterEl = document.getElementById(getChapterId(chp));
      }
      if (isElementVisible(chapterEl)) return;
      const container = document.getElementById("refs-modal");
      if (chapterEl && container) {
        const offset = 250;
        const elementPosition =
          chapterEl.getBoundingClientRect().top +
          container.getBoundingClientRect().top;
        const offsetPosition = elementPosition - offset;
        container.scrollTo({
          top: offsetPosition,
        });
      }
    };

    const timeoutId = setTimeout(scrollToChapter, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [chapter]);
}

export function RefsModal({
  onClose,
  title,
  refs,
  selectedChapter,
}: {
  onClose: () => void;
  title: string;
  refs: number[];
  selectedChapter?: number;
}) {
  const [chaptersClosed, setChaptersClosed] = useState({});
  const [sentenceRefs, setSentenceRefs] = useState(refs);
  const sortedRefs = sort(uniq(sentenceRefs));
  useScrollToChapter({ chapter: selectedChapter });
  const { chapters, indexedSentences, books } = useDataContext();
  const totalLength = refs.reduce(
    (sum, idx) => sum + (indexedSentences[idx]?.sentence.length || 0) + 1,
    0
  );

  const totalBookLength = chapters[chapters.length - 1].letterIndex;

  const groupedByBookThenChapter = Object.entries(
    groupBy(
      Object.entries(
        groupBy(sortedRefs, (s) => indexedSentences[s].chapterFlat)
      ),
      (d) => chapters.find((c) => String(c.chapterFlat) === d[0])?.book
    )
  );
  const selectedBook: number = selectedChapter
    ? chapters.find((c) => c.chapterFlat === selectedChapter)?.book!
    : Number(groupedByBookThenChapter[0][0]);
  const [booksToShow, setBooksToShow] = useState(
    selectedBook > 1 ? [selectedBook - 1, selectedBook] : [selectedBook]
  );

  const updateSetBooksToShow = useCallback(() => {
    if (books.length === 1) return;
    const visibleBooks = books
      .map((b) => b.id)
      .filter((bookIdx) => {
        const bookEl = document.getElementById(`book-${bookIdx}`);
        if (!bookEl) return;
        if (isElementVisible(bookEl)) {
          return true;
        }
      });
    const firstBook = visibleBooks[0];
    visibleBooks.unshift(firstBook - 1);

    setBooksToShow(visibleBooks);
  }, [books]);

  const handleScroll = useCallback(throttle(updateSetBooksToShow, 200), [
    books,
  ]);

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      sx={{ ".MuiDialog-paperScrollPaper": { maxWidth: 800 } }}
    >
      <DialogTitle sx={{ display: "flex", gap: 1, px: 2 }}>
        <div>The Story of {title}</div>
        <div style={{ flexGrow: 1 }} />
        <div style={{ opacity: 0.5, fontWeight: "lighter" }}>
          {getPercent(totalLength / totalBookLength)}% of total text
        </div>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{ position: "relative", p: 0 }}
        onScroll={handleScroll}
        id="refs-modal"
      >
        <ErrorBoundary>
          {groupedByBookThenChapter.map(([bookIdx, chaptersText]) => (
            <BookText
              key={bookIdx}
              bookIdx={bookIdx}
              chaptersText={chaptersText}
              books={books}
              setChaptersClosed={setChaptersClosed}
              chaptersClosed={chaptersClosed}
              setSentenceRefs={setSentenceRefs}
              sentenceRefs={sortedRefs}
              originalRefs={refs}
              displayPlaceholder={
                refs.length > 1000 && !booksToShow.includes(Number(bookIdx))
              }
              updateSetBooksToShow={updateSetBooksToShow}
            />
          ))}
        </ErrorBoundary>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() =>
            setChaptersClosed(
              chapters.reduce(
                (acc, ch) => ({
                  ...acc,
                  [ch.chapterFlat]: !Object.values(chaptersClosed)[0],
                }),
                {}
              )
            )
          }
        >
          Collapse Chapters
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

const collapseSx = {
  position: "sticky",
  top: 0,
  backgroundColor: "#444",
  border: "1px solid #555",
  zIndex: 10,
  display: "flex",
  justifyContent: "space-between",
  ":hover": {
    backgroundColor: "#444",
  },
} as const;

function BookText({
  bookIdx,
  chaptersText,
  books,
  setChaptersClosed,
  chaptersClosed,
  setSentenceRefs,
  sentenceRefs,
  originalRefs,
  displayPlaceholder,
  updateSetBooksToShow,
}: {
  bookIdx: string;
  chaptersText: [string, number[]][];
  books: any[];
  chaptersClosed: Record<string, boolean>;
  setChaptersClosed: SetState<Record<string, boolean>>;
  setSentenceRefs: SetState<number[]>;
  sentenceRefs: number[];
  originalRefs: number[];
  displayPlaceholder?: boolean;
  updateSetBooksToShow: () => void;
}) {
  const book = books[Number(bookIdx) - 1];
  const [open, setOpen] = useState(true);

  return (
    <div key={bookIdx}>
      <ListItemButton
        sx={{
          ...collapseSx,
          textTransform: "uppercase",
          zIndex: 11,
        }}
        onClick={() => {
          setOpen(!open);
          setTimeout(() => {
            updateSetBooksToShow();
          }, 500);
        }}
        id={`book-${bookIdx}`}
      >
        <div>
          {book?.title}{" "}
          <span style={{ opacity: 0.5 }}> Book {Number(bookIdx)}</span>
        </div>
        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </ListItemButton>
      <Collapse in={open}>
        {chaptersText.map(([chapterIdx, sentences]) => {
          return (
            <ChapterText
              key={chapterIdx}
              chapterIdx={chapterIdx}
              sentences={sentences}
              book={book}
              setChaptersClosed={setChaptersClosed}
              chaptersClosed={chaptersClosed}
              setSentenceRefs={setSentenceRefs}
              sentenceRefs={sentenceRefs}
              originalRefs={originalRefs}
              displayPlaceholder={displayPlaceholder}
            />
          );
        })}
      </Collapse>
    </div>
  );
}

function ChapterTitle({
  open,
  chapter,
  onClick,
}: {
  open: boolean;
  chapter: any;
  onClick?: () => void;
}) {
  const noChapterName = String(chapter?.chapter) === chapter?.title;

  return (
    <ListItemButton
      onClick={onClick}
      sx={{ ...collapseSx, top: 46, justifyContent: "flex-start" }}
    >
      <Box>
        {open ? (
          <ExpandMore sx={{ mt: 0.5 }} />
        ) : (
          <KeyboardArrowRightIcon sx={{ mt: 0.5 }} />
        )}
      </Box>
      <div>
        <Box
          id={getChapterId(chapter?.chapterFlat)}
          sx={{ zIndex: -1, position: "relative" }}
        />
        <span style={{ opacity: 0.5 }}>
          {noChapterName ? "" : `  Chapter ${chapter?.chapter} `}
        </span>
        {noChapterName ? ` Chapter ${chapter?.chapter} ` : chapter?.title}
      </div>
    </ListItemButton>
  );
}

function ChapterText({
  chapterIdx,
  sentences,
  book,
  chaptersClosed,
  setChaptersClosed,
  setSentenceRefs,
  sentenceRefs,
  originalRefs,
  displayPlaceholder,
}: {
  chapterIdx: string;
  sentences: number[];
  book?: { startLetterIndex: number };
  chaptersClosed: Record<string, boolean>;
  setChaptersClosed: SetState<Record<string, boolean>>;
  setSentenceRefs: SetState<number[]>;
  sentenceRefs: number[];
  originalRefs: number[];
  displayPlaceholder?: boolean;
}) {
  const { chapters, indexedSentences, manualConfig } = useDataContext();
  const chapter = chapters.find((c) => c.chapterFlat === Number(chapterIdx))!;
  const open = !chaptersClosed[chapter?.chapterFlat];

  if (displayPlaceholder) {
    return (
      <div>
        <ChapterTitle chapter={chapter} open={open} />
        {open && <div style={{ height: sentences.length * 100 }} />}
      </div>
    );
  }

  return (
    <div>
      <ChapterTitle
        chapter={chapter}
        open={open}
        onClick={() => {
          setChaptersClosed((cs) => ({
            ...cs,
            [chapter?.chapterFlat]: !cs[chapter?.chapterFlat],
          }));
          const chapterEl = document.getElementById(
            getChapterId(chapter.chapterFlat)
          );
          if (chapterEl) {
            setTimeout(() => {
              const rect = chapterEl.getBoundingClientRect();
              const isVisible =
                rect.top >= 120 && // Adjusted top padding
                rect.left >= 0 &&
                rect.bottom <=
                  (window.innerHeight ||
                    document.documentElement.clientHeight) &&
                rect.right <=
                  (window.innerWidth || document.documentElement.clientWidth);
              if (!isVisible) {
                chapterEl.scrollIntoView({
                  block: "start",
                  behavior: "smooth",
                });
              }
            }, 400);
          }
        }}
      />

      <Collapse in={open}>
        {sentences.map((sentenceIdx, i) => {
          let sentenceText = indexedSentences[sentenceIdx].sentence;
          if (sentenceText.includes("~~~ ")) return null;
          sentenceText =
            manualConfig.replaceTextFn?.(sentenceText) || sentenceText;
          const refIdx = sentenceRefs.findIndex((d) => d === sentenceIdx) || 0;
          const nextSentenceIdx = sentenceRefs[refIdx + 1];

          const gapLen = nextSentenceIdx - sentenceIdx;
          const longGap = gapLen > 500;
          const originalRef = originalRefs.includes(sentenceIdx);

          const page = book
            ? Math.floor(
                (sentenceIdx - book.startLetterIndex) / LETTERS_PER_PAGE
              )
            : "";

          let gapNode = null as React.ReactNode;
          if (
            gapLen &&
            gapLen !== indexedSentences[nextSentenceIdx]?.sentence.length
          ) {
            const longGapNode = longGap && (
              <Typography sx={{ mb: 3, opacity: 0.3 }}>p. {page}</Typography>
            );
            gapNode = (
              <div style={{ position: "relative", zIndex: 1 }}>
                {manualConfig.publicDomain ? (
                  <Button
                    color="inherit"
                    sx={{ minWidth: 10 }}
                    onClick={() => {
                      setSentenceRefs((refs) => {
                        const allKeys = Object.keys(indexedSentences);
                        const overallIndex = allKeys.findIndex(
                          (d) => d === String(sentenceIdx)
                        );
                        const newRefs = [
                          Number(allKeys[overallIndex + 1]),
                          Number(allKeys[overallIndex + 2]),
                          Number(allKeys[overallIndex + 3]),
                          Number(allKeys[overallIndex + 4]),
                          Number(allKeys[overallIndex + 5]),
                        ];

                        return [...refs, ...newRefs];
                      });
                    }}
                  >
                    ...
                  </Button>
                ) : (
                  <Typography sx={{ mt: 0, opacity: 0.3 }}>...</Typography>
                )}
                {longGapNode}
              </div>
            );
          }
          let topGapNode = null;
          if (i === 0 && chapter.letterIndex !== sentenceIdx) {
            topGapNode = (
              <div style={{ position: "relative", zIndex: 1 }}>
                {manualConfig.publicDomain ? (
                  <Button
                    color="inherit"
                    sx={{ minWidth: 10 }}
                    onClick={() => {
                      setSentenceRefs((refs) => {
                        const allKeys = Object.keys(indexedSentences);
                        const overallIndex = allKeys.findIndex(
                          (d) => d === String(sentenceIdx)
                        );
                        const newRefs = [Number(allKeys[overallIndex - 1])];

                        return [...refs, ...newRefs];
                      });
                    }}
                  >
                    ...
                  </Button>
                ) : (
                  <Typography sx={{ mt: 0, opacity: 0.3 }}>...</Typography>
                )}
              </div>
            );
          }
          return (
            <Box sx={{ my: 2, px: 2, color: originalRef ? "#ccc" : "#999" }}>
              {topGapNode}
              <Typography key={sentenceIdx} variant="body1">
                <div dangerouslySetInnerHTML={{ __html: sentenceText }} />
              </Typography>
              {gapNode}
            </Box>
          );
        })}
      </Collapse>
    </div>
  );
}
