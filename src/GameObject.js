import _ from 'lodash';
import store from './stateStore';

const props = new WeakMap();

export default class GameObject {
  constructor(conf) {
    if (conf && !_.isObjectLike(conf))
      throw new Error('Invalid game object config');

    if (_.isObjectLike(conf)) {
      const spriteSheet = new Image()
      spriteSheet.src = conf.spriteSheet;

      this.layer = conf.layer;
      this.currentAnimation = '';
      props.set(this, {
        spriteSheet: spriteSheet,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        animations: {},
        currentAnimationName: null,
        currentAnimationFrame: 0,
        animationFlippedHorizontal: false,
        alreadyFlippedHorizontal: false,
        ticksPerFrame: 1
      });
    }
  }

  defineAnimation(animationName, confObj) {
    props.get(this).ticksPerFrame = confObj.ticksPerFrame || 1;
    props.get(this).animations[animationName] = confObj;
  }

  setAnimation(animationName, config) {
    if (config && config.flipX === true) {
      this.animationFlippedHorizontal = true;
      if (!store.state.flippedX)
        store.modifyState(state => {state.flippedX = true;});
    }
    else {
      this.animationFlippedHorizontal = false;
      if (store.state.flippedX)
        store.modifyState(state => {state.flippedX = false;});
    }
    
    if (this.currentAnimation === animationName) return;

    this.currentAnimation = animationName;
    props.get(this).currentAnimationFrame = 0;

    console.log('change animation: ', animationName);

    props.get(this).ticksPerFrame = props.get(this).animations[animationName] &&
      props.get(this).animations[animationName].ticksPerFrame || 1;
  }

  update(gameState) {
    if (this.currentAnimation) {
      // console.log('check 1 . .');
      if (gameState.clock % props.get(this).ticksPerFrame === 0) {
        // console.log('check . 2 .');
        props.get(this).currentAnimationFrame++;
        if (!props.get(this).animations[this.currentAnimation].frames[props.get(this).currentAnimationFrame])
          props.get(this).currentAnimationFrame = 0;
      }
    }
    // console.log('updated!');
  }

  draw(layer, ctx) {
    if (this.currentAnimation) {
      // console.log('check . . 3');
      const anim = props.get(this).animations[this.currentAnimation].frames[props.get(this).currentAnimationFrame];

      if (this.animationFlippedHorizontal && !this.alreadyFlippedHorizontal) {
        ctx.translate(layer.width, 0);
        ctx.scale(-1, 1);
        this.alreadyFlippedHorizontal = true;
      }
      else if (!this.animationFlippedHorizontal && this.alreadyFlippedHorizontal) {
        ctx.translate(layer.width, 0);
        ctx.scale(-1, 1);
        this.alreadyFlippedHorizontal = false;
      }

      const X = (layer.width - anim.w) * 0.5;
      const Y = (layer.height - anim.h) * 0.5;
      ctx.save();

      ctx.drawImage(
        props.get(this).spriteSheet,
        anim.x,
        anim.y,
        anim.w,
        anim.h,
        X,
        Y,
        anim.w,
        anim.h
      );

      ctx.restore();
    }
  }
}
