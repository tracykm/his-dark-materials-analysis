import { Box, Divider, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { CharacterPieCharts } from "./CharacterPieCharts";
import { TimeGraphAndExcerpts } from "./TimeGraphAndExcerpts";
import { ErrorBoundary } from "./ErrorBoundry";
import { useEffect, useState } from "react";
import { isEmpty, startCase } from "lodash-es";
import { TopCharacters } from "./TopCharacters";
import { RelationshipsOverTime } from "./RelationshipsOverTime";
import { DataContextProvider, useDataContext } from "./DataContext";
import { FirstAndLastRefs } from "./FirstAndLastRefs";
import { HelpTooltip } from "./HelpTooltip";

function Section({
  children,
  title,
  tooltipTitle,
}: {
  children: React.ReactNode;
  title: string;
  tooltipTitle?: string;
}) {
  return (
    <>
      <Divider sx={{ mt: 4, mb: 1 }} />
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: "light",
          mb: 4,
          display: "flex",
          alignItems: "center",
        }}
        component="h3"
      >
        {title} <HelpTooltip title={tooltipTitle} />
      </Typography>
      {children}
    </>
  );
}

function BookTabs({
  setSelectedBook,
  selectedBook,
  books,
}: {
  setSelectedBook: (book: number) => void;
  selectedBook: number;
  books: { id: number; title: string }[];
}) {
  if (books.length === 1) return null;
  const manyBooks = books.length > 3;
  return (
    <Tabs
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#333",
        width: "100%",
      }}
      variant={manyBooks ? "scrollable" : "standard"}
      onChange={(e, opt) => {
        setSelectedBook(opt);
      }}
      value={selectedBook}
    >
      <Tab key={0} label="All Books" />
      {books.map((book) => (
        <Tab key={book.id} label={book.title} />
      ))}
    </Tabs>
  );
}

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlBook = urlParams.get("book") || "0";
  const series = urlParams.get("series") || "his_dark_materials";
  const [selectedBook, _setSelectedBook] = useState(Number(urlBook));
  const setSelectedBook = (book: number) => {
    window.history.replaceState(
      null,
      "",
      `?book=${book === 0 ? "" : book.toString()}&series=${series}`
    );
    _setSelectedBook(book);
    document.title = series;
  };
  useEffect(() => {
    document.title = `${startCase(series)} Data Analysis`;
  }, [series]);

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", p: 1 }}>
      <header>
        <Typography variant="h1" sx={{ fontSize: 34 }}>
          {startCase(series)}
        </Typography>
      </header>

      <DataContextProvider selectedBook={selectedBook} series={series}>
        <MainContent setSelectedBook={setSelectedBook} series={series} />
      </DataContextProvider>
    </Box>
  );
}

const preloadHasRelationshipTimelines = ["jane_austen", "his_dark_materials"];

function MainContent({
  setSelectedBook,
  series,
}: {
  setSelectedBook: (book: number) => void;
  series: string;
}) {
  const fullContext = useDataContext();

  const loading = !Object.keys(fullContext).length;

  const selectedBook = fullContext.selectedBook || 0;
  const books = fullContext.books || [{ id: 1, title: "Loading..." }];

  const forceRemountKey = fullContext.manualConfig?.sharedCharacters
    ? "shared"
    : fullContext.selectedBook;

  const hasRelationshipTimelines = !isEmpty(fullContext.relationshipTimelines);

  return (
    <ErrorBoundary>
      <BookTabs {...{ setSelectedBook, selectedBook, books }} />

      {(hasRelationshipTimelines ||
        (loading && preloadHasRelationshipTimelines.includes(series))) && (
        <Section
          title="Relationships Over Time"
          tooltipTitle="Completely subjective data"
        >
          <ErrorBoundary>
            {loading ? (
              <Skeleton variant="rectangular" height={410} />
            ) : (
              <RelationshipsOverTime />
            )}
          </ErrorBoundary>
        </Section>
      )}

      <Section
        title="Top Relationships"
        tooltipTitle="Counts are based on times characters are mentioned within 3 sentences of each other."
      >
        <ErrorBoundary>
          {loading ? (
            <Skeleton variant="rectangular" height={450} />
          ) : (
            <TopCharacters key={forceRemountKey} />
          )}
        </ErrorBoundary>
      </Section>

      <Section title="Character Categories">
        <ErrorBoundary>
          {loading ? (
            <Skeleton variant="rectangular" height={380} />
          ) : (
            <CharacterPieCharts />
          )}
        </ErrorBoundary>
      </Section>

      <Section
        title="Character References Over Time"
        tooltipTitle="Broken down by chapter. The number of sentences where the characters name or a pseudonym was used."
      >
        <ErrorBoundary>
          {loading ? (
            <Skeleton variant="rectangular" height={500} />
          ) : (
            <TimeGraphAndExcerpts />
          )}
        </ErrorBoundary>
      </Section>

      <Section title="First and Last References">
        <ErrorBoundary>
          {loading ? (
            <Skeleton variant="rectangular" height={1200} />
          ) : (
            <FirstAndLastRefs />
          )}
        </ErrorBoundary>
      </Section>
    </ErrorBoundary>
  );
}

export default App;
