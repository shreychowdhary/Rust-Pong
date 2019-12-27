attribute vec2 position;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main() {
    gl_Position = uPMatrix*uMVMatrix*vec4(position,-1.0,1.0);
}