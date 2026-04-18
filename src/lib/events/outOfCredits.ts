type Listener = (creditsNeeded: number) => void;

const listeners = new Set<Listener>();

export function emitOutOfCredits(creditsNeeded: number): void {
  listeners.forEach((l) => {
    try {
      l(creditsNeeded);
    } catch {
      // Listeners must not throw back into the emitter.
    }
  });
}

export function subscribeOutOfCredits(l: Listener): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
