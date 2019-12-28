import * as wasm from "pong";


wasm.load_text_file("vs.glsl").then((vs) => {
    wasm.load_text_file("fs.glsl").then((fs) => {
        wasm.init(vs, fs);
    })
});