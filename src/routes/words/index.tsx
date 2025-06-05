import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

const words = [
  {
    en: "apple",
    dk: "æble",
    pl: "jabłko",
    jp: "りんご (ringo)",
  },
  {
    en: "I",
    dk: "jeg",
    pl: "ja",
    jp: "私 (watashi)",
  },
];

export const Route = createFileRoute("/words/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      q: (search.q as string) || "",
    };
  },
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    const query = q || "";
    return { words: words.filter((word) => word.en.includes(query)) };
  },
});

function RouteComponent() {
  const { words } = Route.useLoaderData();
  const { q } = Route.useSearch();
  console.log("Search query:", q);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {words.map((word) => (
        <Link to="/words/$word" params={{ word: word.en }} key={word.en}>
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{word.en}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>DK:</strong> {word.dk}
              </p>
              <p>
                <strong>PL:</strong> {word.pl}
              </p>
              <p>
                <strong>JP:</strong> {word.jp}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
