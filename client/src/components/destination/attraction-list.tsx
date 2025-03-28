interface AttractionListProps {
  attractions: string[];
}

export default function AttractionList({ attractions }: AttractionListProps) {
  return (
    <p className="text-gray-600">{attractions.join(", ")}</p>
  );
}
