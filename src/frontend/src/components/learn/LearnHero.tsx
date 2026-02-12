export default function LearnHero() {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-orange-50 to-amber-50 dark:from-green-950/20 dark:via-orange-950/20 dark:to-amber-950/20 border-b border-border/40">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Hey Here is Abhishek Singh &Team Join Fast!!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover legitimate opportunities, avoid scams, and build skills for remote work success. Our educational
              content helps you navigate the world of online income with confidence.
            </p>
          </div>

          <div className="relative">
            <img
              src="/assets/generated/hero-guidance-logo.dim_1600x900.png"
              alt="Guidance and Learning platform logo with graduation cap, book, and laurel wreath"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
