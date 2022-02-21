class MouseStalker {

  constructor() {
    // 動かすオブジェクト
    this.elDot = document.querySelector('.stalker');

    // オブジェクトの初期スタイル
    this.elDotWidth = getComputedStyle(this.elDot).width;
    this.elDotHeight = getComputedStyle(this.elDot).height;
    this.elBorderWidth = 2;
    this.elDotBorderRadius = getComputedStyle(this.elDot).borderRadius;

    // 画面全体
    this.elStage = document.querySelector('.mv');

    // マウス位置
    this.mouse = {
      x:0,
      y:0
    }

    // 動かすオブジェクトの位置
    this.dotPos = {
      x:0,
      y:0,
      vx:0,
      vy:0
    };
    this.elAnchorArray = Array.from(document.querySelectorAll('a:not(.no-stick)'));
    this.bindEMouseMove = this.eMouseMove.bind(this);
    this.bindMouseOverStalker = this.mouseOverStalker.bind(this);
    this.bindMouseOutStalker = this.mouseOutStalker.bind(this);
    this.bindUpdate = this.update.bind(this);
    this.hoverFlag = false;
    this.init();
  }

  event(){
    window.requestAnimationFrame(this.bindUpdate);
    window.addEventListener('mousemove', this.bindEMouseMove);

    for (let i = 0; i < this.elAnchorArray.length; i++) {
      //マウスホバー時
      this.elAnchorArray[i].addEventListener('mouseover', this.bindMouseOverStalker);

      //マウスホバー解除時
      this.elAnchorArray[i].addEventListener('mouseout', this.bindMouseOutStalker);
    }
  }
  mouseOverStalker(e){
    this.hoverFlag = true;
    this.elDot.classList.add('hov');
    this.addStyle(e.currentTarget);
    this.fixStalker(e.currentTarget)
  }
  mouseOutStalker(){
    this.hoverFlag = false;
    this.elDot.classList.remove('hov');
    this.resetStyle();
  }
  addStyle(elTarget){
    const elWidth = elTarget.clientWidth - this.elBorderWidth;
    const elHeight = elTarget.clientHeight - this.elBorderWidth;
    this.elDot.style.width = elWidth + 'px';
    this.elDot.style.height = elHeight + 'px';
    this.elDot.style.borderRadius = 0 + 'px';
  }
  resetStyle(){
    this.elDot.style.width = this.elDotWidth;
    this.elDot.style.height = this.elDotHeight;
    this.elDot.style.borderRadius = this.elDotBorderRadius;
  }
  fixStalker(elTarget){
    const fixX = elTarget.getBoundingClientRect().left;
    const fixY = elTarget.getBoundingClientRect().top;
    this.elDot.style.transform = "matrix(1, 0, 0, 1," + fixX + ", " + fixY + ")";
  }
  update() {
    if (!this.hoverFlag){
      // 目標値
      let tx = this.mouse.x;
      let ty = this.mouse.y;

      // イージング
      const ease = 0.25;
      this.dotPos.x += (tx - this.dotPos.x) * ease;
      this.dotPos.y += (ty - this.dotPos.y) * ease;

      let x = this.dotPos.x - this.elDot.clientWidth * 0.5;
      let y = this.dotPos.y - this.elDot.clientHeight * 0.5;

      // 位置の制御
      this.elDot.style.transform = "matrix(1, 0, 0, 1," + x + ", " + y + ")";
    }
    window.requestAnimationFrame(this.bindUpdate);
  }
  eMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
  init(){
    this.event();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new MouseStalker();
});
