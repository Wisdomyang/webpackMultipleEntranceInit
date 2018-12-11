import Vue from "vue";
import testVue from "@/testvue/index";
import "./main.css";

new Vue({
  el: "#app",
  render: h => h(testVue)
});
