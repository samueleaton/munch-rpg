import _ from 'lodash';


class Munch {
  constructor() {
    this.gameContainer = null;
    this.layers = {};
    this.gameObjects = [];
    this.clock = 0;
  }
  hook(element) {
    this.gameContainer = new GameContainer(element);
  }
  createObject(...args) {
    const gameObj = new GameObject(...args);
    this.gameObjects.push(gameObj);
    return gameObj;
  }
  createLayer(layerName, zIndex) {
    const layer = new Layer(layerName, zIndex);
    // update layer dimensions here
    //
    this.layers[layerName] = layer;
  }
  init() {
    _.forOwn(this.layers, (layerObj, layerName) => {
      this.gameContainer.element.appendChild(layerObj.canvas);
    })
    this.loop();
  }
  loop() {
    _.forEach(this.gameObjects, gameObj => {
      gameObj.update(/*inject state instead of just clock value*/ this.clock);
    });
    _.forOwn(this.layers, (layerObj,  layerName) => {
      layerObj.ctx.clearRect(0, 0, layerObj.canvas.width, layerObj.canvas.height);
    });
    _.forEach(this.gameObjects, gameObj => {
      gameObj.draw(this.layers[gameObj.layer].ctx);
    });
    this.clock++;
    // requestAnimationFrame(() => this.loop());
  }
}

class GameContainer {
  constructor(element) {
    this.element = element;
  }
}

class GameObject {
  constructor(conf) {
    if (conf && !_.isObjectLike(conf))
      throw new Error('Invalid game object config');

    if (_.isObjectLike(conf)) {
      this.spriteSheet = new Image();
      this.spriteSheet.src = conf.spriteSheet;

      this.layer = conf.layer;
    }

    this.x = this.y = this.w = this.h = 10;
    this.animations = {};
    this.currentAnimationName = null;
    this.currentAnimationFrame = 0;
    this.ticksPerFrame = 1;
  }

  defineAnimation(animationName, confObj) {
    this.ticksPerFrame = confObj.ticksPerFrame || 1;
    this.animations[animationName] = confObj.frames;
  }

  setAnimation(animationName) {
    this.currentAnimationName = animationName;
    this.currentAnimationFrame = 0;
  }

  // divideFpsFrequency(number) {
  //   this.ticksPerFrame = Math.floor(number);
  //   if (this.ticksPerFrame < 1)
  //     this.ticksPerFrame = 1;
  // }

  update(clockValue) {
    if (this.currentAnimationName) {
      console.log('check 1 . .');
      if (clockValue % this.ticksPerFrame === 0) {
        console.log('check . 2 .');
        this.currentAnimationFrame++;
        if (!this.animations[this.currentAnimationName][this.currentAnimationFrame])
          this.currentAnimationFrame = 0;
      }
    }
    // console.log('updated!');
  }

  draw(ctx) {
    if (this.currentAnimationName) {
      console.log('check . . 3');
      const anim = this.animations[this.currentAnimationName][this.currentAnimationFrame];
      ctx.drawImage(
        this.spriteSheet, anim.x, anim.y, anim.w, anim.h, 50, 50, anim.w, anim.h
      );
    }
    // console.log('drew: ', ctx);
    // ctx.fillStyle = 'orange';
    // ctx.fillRect(this.x, this.y, this.w, this.h);


  }
}

class Layer {
  constructor(layerName, zIndex) {
    this.name = layerName;
    this.zIndex = zIndex;
    this.canvas = document.createElement("canvas");
    this.canvas.height = 400;
    this.canvas.width = 700;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = zIndex;
  }
}

// function Layer(appendTo, _WIDTH, _HEIGHT, Z_INDEX) {
//   thisLayer = this;
//   this.canvas = document.createElement("canvas");
//   this.canvas.height = _HEIGHT;
//   this.canvas.width = _WIDTH;
//   (function(){
//     thisLayer.canvas.style.position = "relative";
//     thisLayer.canvas.style.zIndex = Z_INDEX;
//     var parent = appendTo;
//     appendTo.appendChild(thisLayer.canvas);
//   })();
//   return this.canvas.getContext("2d");
// }


// const munch = {
//   createObject: (...args) => new GameObject(...args),
//   init:
// };

export default new Munch();
