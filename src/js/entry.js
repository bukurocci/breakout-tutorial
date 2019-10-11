import * as PIXI from 'pixi.js';

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
    // ball.x = ball.x + 1;
    // ball.y = ball.y + 1;

    board.x = board.x + 1;
    board.y = board.x + 2;
  };

  // ブロック崩しのボール
  const ball = drawCircle(10);

  // ボールを打つ板
  const board = drawRect(100, 10);

  app.stage.addChild(ball);
  app.stage.addChild(board);

  // 描画 Canvas を DOM に挿入
  wrapper.appendChild(app.view);

  // アップデート関数をtickerに登録する
  PIXI.Ticker.shared.add(tick);
});
