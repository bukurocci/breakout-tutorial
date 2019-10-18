import * as PIXI from 'pixi.js';
import Vector2 from './Vector2';

// ブロック崩しの幅
const APP_WIDTH = 600;
// ブロック崩しの高さ
const APP_HEIGHT = 480;

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

  const clamp = (value, min, max) => {
    // 指定した最小値より小さい場合、最小値にする
    if (value < min) {
      value = min;
    }
    // 指定した最大値より場合、大きい最大値にする
    else if (value > max) {
      value = max;
    }

    return value;
  };

  // 毎フレーム実行されて、描画位置などをアップデートする
  const tick = () => {
    board.x = clamp(mousePosition.x, 0, APP_WIDTH);
  };

  // ブロック崩しのボール
  const ball = drawCircle(10);

  // ボールを打つ板
  const board = drawRect(100, 10);
  board.x = 0;
  board.y = APP_HEIGHT - 50;

  // 横方向に50px基準点をずらす
  board.pivot.x = 50;

  const mousePosition = new Vector2(0, 0);

  // ステージをマウスカーソルに反応させる
  app.stage.interactive = true;

  // ステージにグラフィックを登録する
  app.stage.addChild(ball);
  app.stage.addChild(board);

  // mousemoveを監視する
  app.stage.on('pointermove', event => {
    mousePosition.x = event.data.global.x;
    mousePosition.y = event.data.global.y;
  });

  // 描画 Canvas を DOM に挿入
  wrapper.appendChild(app.view);

  // アップデート関数をtickerに登録する
  PIXI.Ticker.shared.add(tick);
});
