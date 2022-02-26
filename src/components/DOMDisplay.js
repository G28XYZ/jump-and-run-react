import { scale } from "../utils/constants";

export default class DOMDisplay {
  constructor() {
    this.dom = document.querySelector(".game");
  }

  clear() {
    this.dom.remove();
  }

  syncState(state) {
    this.scrollPlayerIntoView(state);
  }

  scrollPlayerIntoView(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    let left = this.dom.scrollLeft,
      right = left + width;
    let top = this.dom.scrollTop,
      bottom = top + height;

    let center = state.player.pos.plus(state.player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  }
}
