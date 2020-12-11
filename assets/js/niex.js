import EasyMDE from "easymde"
require("easymde/dist/easymde.min.css")

import Chartkick from "chartkick"
import ChartJS from "chart.js"

const resizeTextArea = (el) => {
    el.style.height = "5px"
    el.style.height = (el.scrollHeight)+"px"
}

export const hooks = {
    NiexChart: {
        mounted: function() {
            let data = JSON.parse(this.el.attributes['data-chart'].value)
            let f = Chartkick[data.type]
            let options = data.options || {}
            new f(this.el, data.data, options)
        },
        updated: function() {
            let data = JSON.parse(this.el.attributes['data-chart'].value)
            let f = Chartkick[data.type]
            let options = data.options || {}
            new f(this.el, data.data, options)
        }
    },

    NiexPage: {
        mounted: function() {
            window.addEventListener("keypress", (e) => {
                if(e.code === "KeyS" && e.metaKey) {
                    this.pushEvent("save", {})
                    e.preventDefault()
                    e.stopPropagation()
                }
            })
        }
    },

    NiexEditor: {
        mounted: function () {
            this.el.addEventListener("input", e => resizeTextArea(e.target));
            resizeTextArea(this.el)
        },
        updated: function () {
            resizeTextArea(this.el)
        }

    },

    NiexCodeEditor: {
        mounted: function () {
            this.el.addEventListener("input", e => resizeTextArea(e.target));
            resizeTextArea(this.el)

            this.el.addEventListener("keydown", (e) => {
                console.log(e.code)
                if (e.metaKey && e.code === "Enter") {
                    e.target.closest("form").querySelector("button[type='submit']").click()
                }
            })
        },
        updated: function () {
            resizeTextArea(this.el)
        }
    }
}