"use client";

import { useEffect } from "react";

export default function ClientDebugger() {
  useEffect(() => {
    console.log("✅ Hydration complete");
    const bodyAttrs = Array.from(document.body.attributes).map(
      (attr) => attr.name
    );
    console.log("🧩 Body attributes:", bodyAttrs);
  }, []);

  return null;
}
