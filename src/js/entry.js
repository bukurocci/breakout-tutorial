import * as PIXI from 'pixi.js';
import Vector2 from './Vector2';

const APP_WIDTH = 600;
const APP_HEIGHT = 480;

const clamp = (value, min, max) => {
  return Math.min(max, Math.max(min, value));
};

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.js-canvas');

  // Pixi 初期化
  const app = new PIXI.Application({
    // アンチエイリアス有効
    antialias: true,

    // アンチエイリアスにFXAAアルゴリズムを使う
    forceFXAA: true,

    // 指定したHTML要素の領域に追従する
    resizeTo: wrapper
  });

  // 指定した半径の丸を描く関数
  const drawCircle = radius => {
    const g = new PIXI.Graphics();

    // これから塗りますよ
    g.beginFill(0xff0000);

    // 丸を描く
    g.drawCircle(0, 0, radius);

    g.pivot.x = -radius;
    g.pivot.y = -radius;

    // もう塗りました
    g.endFill();

    return g;
  };

  // 指定した幅と高さの四角形を描く関数
  const drawRect = (width, height) => {
    const g = new PIXI.Graphics();

    // 塗りますよ
    g.beginFill(0x00ff00);

    // 四角をかきますよ
    g.drawRect(0, 0, width, height);

    // 塗りましたよ
    g.endFill();

    return g;
  };

  const tick = () => {
    board.x = clamp(board.x + (userPointer.x - board.x) * 0.1, board.width * 0.5, APP_WIDTH - board.width * 0.5);
    board.y = APP_HEIGHT - 50;
  };

  const setEvents = () => {
    app.stage.on('pointermove', handlePointerMove);
  };

  const handlePointerMove = evt => {
    const { x, y } = evt.data.global;

    const xc = clamp(x, 0, APP_WIDTH);
    const yc = clamp(y, 0, APP_HEIGHT);

    userPointer.x = xc;
    userPointer.y = yc;
  };

  // ブロック崩しのボール
  const ball = drawCircle(10);

  // ボールを打つ板
  const board = drawRect(100, 10);
  board.pivot.set(50, 5);

  // ユーザーのマウス位置を保存します
  const userPointer = new Vector2(0, 0);

  app.stage.interactive = true;
  app.stage.addChild(ball);
  app.stage.addChild(board);

  // 描画 Canvas を DOM に挿入
  wrapper.appendChild(app.view);

  setEvents();

  // アップデート関数をtickerに登録する
  PIXI.Ticker.shared.add(tick);
});
