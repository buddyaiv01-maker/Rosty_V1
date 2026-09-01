import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import StreamingPage from "./components/streaming/StreamingPage";
import WhoIsWatching from "./components/WhoIsWatching";
import { ThemeContext } from "./theme/ThemeContext";
import { LIQUID_GLASS } from "./data/styles";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <ThemeContext.Provider value={LIQUID_GLASS}>
      <StreamingPage style={LIQUID_GLASS} />
      <AnimatePresence>{!entered && <WhoIsWatching key="who" onSelect={() => setEntered(true)} />}</AnimatePresence>
    </ThemeContext.Provider>
  );
}
