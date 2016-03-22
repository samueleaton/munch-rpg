import munch from './index';

munch.hook(document.getElementById('root'));

munch.createLayer('playerLayer', 1);

const player = munch.createObject({
  name: 'player',
  // scale: 1, scaleY: 1, scaleX: 1,
  layer: 'playerLayer',
  spriteSheet: './images/football_sprite_11.png'
});

player.defineAnimation('idle', {
  ticksPerFrame: 25,
  frames: [
    {x: 288, y: 0, w: 36, h: 64, flipX: false },
    {x: 324, y: 0, w: 36, h: 64, flipX: false },
    {x: 360, y: 0, w: 36, h: 64, flipX: false },
    {x: 324, y: 0, w: 36, h: 64, flipX: false }
  ]
});

player.defineAnimation('walk', {
  ticksPerFrame: 5,
  frames: [
    {x: 36,  y: 0, w: 36, h:64},
    {x: 72,  y: 0, w: 36, h:64},
    {x: 108, y: 0, w: 36, h:64},
    {x: 144, y: 0, w: 36, h:64},
    {x: 180, y: 0, w: 36, h:64},
    {x: 216, y: 0, w: 36, h:64},
    {x: 252, y: 0, w: 36, h:64}
  ]
});

player.defineAnimation('sprint', {
  ticksPerFrame: 3,
  frames: [
    {x: 468, y: 0, w: 36, h: 64},
    {x: 504, y: 0, w: 36, h: 64},
    {x: 540, y: 0, w: 36, h: 64},
    {x: 576, y: 0, w: 36, h: 64},
    {x: 612, y: 0, w: 36, h: 64},
    {x: 648, y: 0, w: 36, h: 64},
    {x: 684, y: 0, w: 36, h: 64}
  ]
});


window.player = player;
window.munch = munch;

setTimeout(() => {
  munch.init();
}, 500);

// setTimeout(function() {
//   player.setAnimation('walk');
// }, 2000);

// setTimeout(function() {
//   player.setAnimation('sprint');
// }, 4000);

munch.loop((state, previousState) => {
  if (state.keys.left && state.keys.right && state.keys.shift) {
    if (!previousState.keys.left && state.keys.left)
      player.setAnimation('sprint', {flipX: true});
    else if (!previousState.keys.right && state.keys.right)
      player.setAnimation('sprint');
  }
  else if (state.keys.right && state.keys.shift)
    player.setAnimation('sprint');
  else if (state.keys.left && state.keys.shift)
    player.setAnimation('sprint', {flipX: true});
  else if (state.keys.left && state.keys.right) {
    if (!previousState.keys.left && state.keys.left)
      player.setAnimation('walk', {flipX: true});
    else if (!previousState.keys.right && state.keys.right)
      player.setAnimation('walk');
  }
  else if (state.keys.left)
    player.setAnimation('walk', {flipX: true});
  else if (state.keys.right)
      player.setAnimation('walk');
  else if (state.flippedX)
    player.setAnimation('idle', {flipX: true});
  else
    player.setAnimation('idle');
});
// player.defineAnimation('run', [
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
// ]);


