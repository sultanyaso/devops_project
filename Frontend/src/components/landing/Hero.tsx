interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8">
            Accelerate Your Career with AI-Powered LinkedIn Growth
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-12">
            Transform your LinkedIn presence with AI-driven content generation,
            smart networking, and career growth analytics. Stand out from the
            crowd and reach your professional goals faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
            >
              Get started
            </button>
            <button
              onClick={() => (window.location.href = "#features")}
              className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Partner logos */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
            alt="IBM"
            className="h-8 opacity-50 hover:opacity-75 transition-opacity"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
            alt="Microsoft"
            className="h-8 opacity-50 hover:opacity-75 transition-opacity"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
            className="h-8 opacity-50 hover:opacity-75 transition-opacity"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
            alt="Instagram"
            className="h-8 opacity-50 hover:opacity-75 transition-opacity"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-8 opacity-50 hover:opacity-75 transition-opacity"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
            alt="YouTube"
            className="h-8 opacity-50 hover:opacity-75 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
}
