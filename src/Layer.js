
export default class Layer {
  constructor(layerName, zIndex) {
    this.name = layerName;
    this.zIndex = zIndex;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = zIndex;
  }
}
