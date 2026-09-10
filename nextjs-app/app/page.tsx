import Link from 'next/link';
import Image from 'next/image';
import { supabase, MovieRecord } from '../lib/supabase';
import { Play, Sparkles, Star, Film, Send } from 'lucide-react';

export const revalidate = 60; // ISR: Cache for 60 seconds, zero cost

export default async function HomePage() {
  const { data: movies, error } = await supabase
    .from('movies')
    .select('*')
    .eq('status', 'active')
    .order('pin', { ascending: false })
    .order('year', { ascending: false });

  const movieList: MovieRecord[] = movies || [];
  const heroMovie = movieList[0];

  return (
    <main className="min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center font-black text-lg">
            F
          </div>
          <span className="font-black text-lg tracking-tight">Family Version</span>
        </Link>
        <a
          href="https://t.me/addlist/58gZNGQ86uJiOWE9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Telegram Channel</span>
        </a>
      </header>

      {/* Hero Banner */}
      {heroMovie && (
        <section className="relative h-[65vh] min-h-[420px] flex items-end p-6 md:p-12 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroMovie.backdrop_url || heroMovie.poster_url})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <Sparkles className="w-4 h-4" />
              <span>FEATURED PREMIERE</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">{heroMovie.year}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black">{heroMovie.title}</h1>
            <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed">
              {heroMovie.synopsis || heroMovie.overview || 'Explore full movie details and watch on Telegram.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={`/movie/${heroMovie.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-sm shadow-lg shadow-red-600/30 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>View Details</span>
              </Link>
              {heroMovie.tg_link && (
                <a
                  href={heroMovie.tg_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Watch on Telegram</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black">All Movies & Series</h2>
            <p className="text-xs text-zinc-400 mt-1">Live synchronized from Supabase PostgreSQL</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 font-mono">
            {movieList.length} Titles
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {movieList.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group relative bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/50 transition-all hover:scale-[1.02]"
            >
              <div className="aspect-[2/3] relative bg-zinc-800">
                {movie.poster_url && (
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {movie.rating && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {Number(movie.rating).toFixed(1)}
                    </span>
                  )}
                  {movie.quality && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-600/80 text-white self-end">
                      {movie.quality}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold truncate group-hover:text-red-400 transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                  <span>{movie.year}</span>
                  <span className="truncate max-w-[90px]">{Array.isArray(movie.genres) ? movie.genres[0] : 'Movie'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
