import{a as s,b as i}from"../chunk-ZIMNNZGL.js";var r=s(t=>{var n=t&&t.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(i());(0,a.default)(async()=>{M.AutoInit(),document.querySelectorAll(".docs-collapsible-item").forEach(l=>{let c=M.Collapsible.getInstance(l);if(c.el.querySelector("li").classList.contains("active")){let e=c.el.querySelector(".collapsible-icon");e&&e.classList.add("collopen")}c.options.onOpenStart=e=>{let o=e.querySelector(".collapsible-icon");o&&o.classList.add("collopen")},c.options.onCloseStart=e=>{let o=e.querySelector(".collapsible-icon");o&&o.classList.remove("collopen")}})})});export default r();
