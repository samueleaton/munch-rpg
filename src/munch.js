import _ from 'lodash';
import GameObject from './GameObject';
import Layer from './Layer';
import GameContainer from './GameContainer';
import store from './stateStore';
import keyMap from './keyMap';

document.addEventListener('keydown', function(evt) {
  store.modifyState(state => {
    state.keys[keyMap[evt.keyCode]] = true;
  });
});

document.addEventListener('keyup', function(evt) {
  store.modifyState(state => {
    state.keys[keyMap[evt.keyCode]] = false;
  });
});

const props = new WeakMap();

export default class Munch {
  constructor() {
    props.set(this, {
      gameContainer: null,
      layers: {},
      gameObjects: [],
      gameLoop: state => {}
    });

    store.setInitialState({
      clock: 0,
      keys: {},
    });
  }
  hook(element) {
    props.get(this).gameContainer = new GameContainer(element);
  }
  createObject(...args) {
    const gameObj = new GameObject(...args);
    props.get(this).gameObjects.push(gameObj);
    return gameObj;
  }
  createLayer(layerName, zIndex) {
    if (!props.get(this).gameContainer)
      throw new Error('Must set gameContainer before a layer can be created');

    const layer = new Layer(layerName, zIndex);
    layer.canvas.width = props.get(this).gameContainer.width;
    layer.canvas.height = props.get(this).gameContainer.height;
    props.get(this).layers[layerName] = layer;
  }
  init() {
    _.forOwn(props.get(this).layers, (layerObj, layerName) => {
      props.get(this).gameContainer.element.appendChild(layerObj.canvas);
    })
    this.__loop__();
  }
  __loop__() {
    props.get(this).gameLoop(store.state, store.previousState);
    _.forEach(props.get(this).gameObjects, gameObj => {
      gameObj.update(store.state);
    });
    _.forOwn(props.get(this).layers, (layerObj,  layerName) => {
      layerObj.ctx.clearRect(0, 0, layerObj.canvas.width, layerObj.canvas.height);
    });
    _.forEach(props.get(this).gameObjects, gameObj => {
      const layer = props.get(this).layers[gameObj.layer];
      gameObj.draw(layer.canvas, layer.ctx);
    });
    store.modifyState(state => state.clock++);
    requestAnimationFrame(() => this.__loop__());
  }
  loop(func) {
    props.get(this).gameLoop = func;
  }
}


window.store = store;
