const hitTest = (a, b) => {
  //描画されている矩形の中心を出す
  const ahw = a.width * 0.5;
  const ahh = a.height * 0.5;
  const bhw = b.width * 0.5;
  const bhh = b.height * 0.5;
  const acx = a.x + ahw - a.pivot.x;
  const acy = a.y + ahh - a.pivot.y;
  const bcx = b.x + bhw - b.pivot.x;
  const bcy = b.y + bhh - b.pivot.y;

  return Math.abs(acx - bcx) < ahw + bhw && Math.abs(acy - bcy) < ahh + bhh;
};

export default hitTest;
