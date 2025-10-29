import { BehaviorSubject } from "rxjs";
import { throttle, isPortrait } from "./utils";

interface IOrientationTracker {
  isLandscape: boolean;
}

/** Class Object that tracks orientation change and resize events and produces Observable accordingly. */
class OrientationTrack {
  orientation$ = new BehaviorSubject<IOrientationTracker>({
    isLandscape: !isPortrait(),
  });
  isLandscape = !isPortrait();

  getIsLandscape = () => !isPortrait();

  checkOrientation = throttle(
    () => {
      this.isLandscape = this.getIsLandscape();
      window.console.log("orientation", this.isLandscape);
      this.orientation$?.next({ isLandscape: this.isLandscape });
    },
    500
    // { leading: true, trailing: true }
  );

  trackOrientationChange() {
    window.addEventListener("orientationchange", this.checkOrientation);
    window.addEventListener("resize", this.checkOrientation);
  }
}

export const trackHelper = new OrientationTrack();
