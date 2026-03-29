export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white mt-auto">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold text-zinc-700">Longevity Assessment</span>
        </div>
        <p className="text-xs text-zinc-400 text-center max-w-xs">
          For informational purposes only. Not medical advice. Consult a qualified healthcare professional before making changes.
        </p>
        <p className="text-xs text-zinc-400 whitespace-nowrap">Powered by Claude AI</p>
      </div>
    </footer>
  );
}
