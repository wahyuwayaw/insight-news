export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const categories = [
  { name: "Nasional", slug: "nasional", icon: "🇮🇩" },
  { name: "Hukum", slug: "hukum", icon: "⚖️" },
  { name: "Ekonomi", slug: "ekonomi", icon: "💰" },
  { name: "Politik", slug: "politik", icon: "🏛️" },
  { name: "Olahraga", slug: "olahraga", icon: "⚽" },
  { name: "Kesehatan", slug: "kesehatan", icon: "🏥" },
  { name: "Teknologi", slug: "teknologi", icon: "💻" },
  { name: "Hiburan", slug: "hiburan", icon: "🎬" },
];

export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(slug: string): Article[] {
  return articles.filter((a) => a.categorySlug === slug);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured);
}

export function getRecentArticles(count: number): Article[] {
  return articles.slice(0, count);
}
