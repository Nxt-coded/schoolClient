import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

const SearchBar = ({ onSearch, onFilter }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search courses, topics, or instructors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 shadow-soft"
        />
      </div>
      <Button type="submit" size="lg" className="px-8">
        Search
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="lg"
        onClick={onFilter}
        className="px-4"
      >
        <Filter className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;