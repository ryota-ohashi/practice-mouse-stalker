import './style.css'

class MouseStalker {

  constructor() {
    // 動かすオブジェクト
    this.elDot = document.querySelector('.dot');
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
    this.elAnchorArray = Array.from(document.querySelectorAll('a:not(.no_stick_)'));
    this.bindEMouseMove = this.eMouseMove.bind(this);
    this.bindMouseOverStalker = this.mouseOverStalker.bind(this);
    this.bindMouseOutStalker = this.mouseOutStalker.bind(this);
    this.bindUpdate = this.update.bind(this);
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
  mouseOverStalker(){
    this.hoverFlag = true;
    this.elDot.classList.add('hov_');
  }
  mouseOutStalker(){
    this.hoverFlag = false;
    this.elDot.classList.remove('hov_');
  }
  update() {

    // 画面
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 目標値
    // マウス座標
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
