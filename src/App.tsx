import React, { useEffect, useState } from "react";
import { distinctUntilChanged } from "rxjs/operators";
import { trackHelper } from "./orientationTracker";

import "./styles.css";

trackHelper.orientation$.subscribe(console.log);
trackHelper.trackOrientationChange();

export const useWindowResize = () => {
  const [localState, setLocalState] = useState<{
    TS: number;
    isLandscape: undefined | boolean;
  }>({
    TS: -1,
    isLandscape: undefined,
  });

  useEffect(() => {
    // Subscribe to observable
    const subscription = trackHelper.orientation$
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev.isLandscape === curr.isLandscape;
        })
      )
      .subscribe(({ isLandscape }) => {
        // Update the localState only when the new value is different from last state
        setLocalState({ TS: Date.now(), isLandscape });
      });
    // Unsubscribe on cleanup
    return () => {
      subscription?.unsubscribe();
    };
    // Dependency array empty since localState is accessed within the callback
  }, [trackHelper.orientation$]);

  return localState;
};

export default function App() {
  const { TS, isLandscape } = useWindowResize();

  return (
    <div className="App">
      <h1>Orientation Tracker</h1>
      <h2>Resize to see some magic happen!</h2>
      <p>changed on: {TS}</p>
      <p>{isLandscape ? "Landscape" : "Portrait"}</p>
    </div>
  );
}
