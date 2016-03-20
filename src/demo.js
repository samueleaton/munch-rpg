import munch from './munch';

munch.hook(document.getElementById('root'));

munch.createLayer('playerLayer', 1);

const player = munch.createObject({
  // scale: 1, scaleY: 1, scaleX: 1,
  layer: 'playerLayer',
  spriteSheet: './images/football_sprite_11.png'
});

// player.spriteSheet('./images/football_sprite_11.png');

player.defineAnimation('idle', {
  ticksPerFrame: 10,
  frames: [
    {x: 288, y: 0, w: 36, h: 64, flipX: false },
    {x: 324, y: 0, w: 36, h: 64, flipX: false },
    {x: 360, y: 0, w: 36, h: 64, flipX: false },
    {x: 324, y: 0, w: 36, h: 64, flipX: false },
  ]
});

// player.divideFpsFrequency(6);

window.player = player;
window.munch = munch;

player.setAnimation('idle');
setTimeout(() => {
  munch.init();
}, 500);
// player.defineAnimation('run', [
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
//   {x: 0, y: 0, w: 10, h: 10, flipX: false },
// ]);


