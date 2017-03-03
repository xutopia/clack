// an array of welcome messages for the splash page

export const welcomeMsgs = [
  "What is your name?",
  "Please enter your name!",
  "We want your name!",
  "Name?",
  "Name please!",
]

// export class RotateTxt {
//   constructor(el, toRotate, period) {
//     this.toRotate = toRotate;
//     this.el = el;
//     this.loopNum = 0;
//     this.period = parseInt(period, 10) || 2000;
//     this.txt = '';
//     this.tick();
//     this.isDeleting = false;
//   }
//
//   tick() {
//     const i = this.loopNum % this.toRotate.length;
//     const fullTxt = this.toRotate[i];
//
//     if (this.isDeleting) {
//       this.txt = fullTxt.substring(0, this.txt.length - 1);
//     } else {
//       this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }
//
//     this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
//
//     const that = this;
//     let delta = 200 - Math.random() * 100;
//
//     if (this.isDeleting) { delta /= 2; }
//
//     if (!this.isDeleting && this.txt === fullTxt) {
//       delta = this.period;
//       this.isDeleting = true;
//     } else if (this.isDeleting && this.txt === '') {
//       this.isDeleting = false;
//       this.loopNum++;
//       delta = 500;
//     }
//
//     setTimeout(() => {
//       that.tick();
//     }, delta);
//   }
// }
// RotateTxt.prototype.tick = () => {
//   const i = this.loopNum % this.toRotate.length;
//   const fullTxt = this.toRotate[i];
//
//   if (this.isDeleting) {
//     this.txt = fullTxt.substring(0, this.txt.length - 1);
//   } else {
//     this.txt = fullTxt.substring(0, this.txt.length + 1);
//   }
//
//   this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
//
//   const that = this;
//   let delta = 200 - Math.random() * 100;
//
//   if (this.isDeleting) { delta /= 2; }
//
//   if (!this.isDeleting && this.txt === fullTxt) {
//     delta = this.period;
//     this.isDeleting = true;
//   } else if (this.isDeleting && this.txt === '') {
//     this.isDeleting = false;
//     this.loopNum++;
//     delta = 500;
//   }
//
//   setTimeout(() => {
//     that.tick();
//   }, delta);
// };
//
// RotateTxt = (el, toRotate, period) => {
//   this.toRotate = toRotate;
//   this.el = el;
//   this.loopNum = 0;
//   this.period = parseInt(period, 10) || 2000;
//   this.txt = '';
//   this.tick();
//   this.isDeleting = false;
// };
//
// export RotateTxt;
