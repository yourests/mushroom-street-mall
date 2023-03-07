import mitt from "mitt"

const emitter = mitt()

const bus = {}
bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit
bus.$all = emitter.all

export default bus