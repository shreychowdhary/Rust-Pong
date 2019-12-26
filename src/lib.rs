use js_sys::Math::random;
use na::{Matrix4, Perspective3, Vector2, Vector3, Vector4};
use nalgebra as na;
use std::cell::RefCell;
use std::f32;
use std::rc::Rc;
use std::{error, panic};
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsCast, JsValue};
use web_sys::*;

#[macro_use]
pub mod utils;
mod errors;
mod extern_js;

struct Paddle {
    verticies: [f32; 12],
    position: Vector2<f32>,
    color: [f32; 4],
    buffer: WebGlBuffer,
    vert_pos_att: u32,
}

impl Paddle {
    pub fn new(
        (x, y): (f32, f32),
        color: [f32; 4],
        gl: &WebGlRenderingContext,
        vert_pos_att: u32,
    ) -> Paddle {
        let verticies = [
            0.025, 0.1, 0.025, -0.1, -0.025, 0.1, 0.025, -0.1, -0.025, 0.1, -0.025, -0.1,
        ];
        let buffer = gl.create_buffer().ok_or("failed to create buffer").unwrap();
        gl.bind_buffer(WebGlRenderingContext::ARRAY_BUFFER, Some(&buffer));
        unsafe {
            let vert_array = js_sys::Float32Array::view(&verticies);

            gl.buffer_data_with_array_buffer_view(
                WebGlRenderingContext::ARRAY_BUFFER,
                &vert_array,
                WebGlRenderingContext::STATIC_DRAW,
            );
        }
        Paddle {
            verticies,
            position: Vector2::new(x, y),
            color,
            buffer: buffer,
            vert_pos_att,
        }
    }
}

#[derive(Debug)]
struct Ball {
    verticies: [f32; 32],
    position: Vector2<f32>,
    velocity: Vector2<f32>,
    color: [f32; 4],
    buffer: WebGlBuffer,
    vert_pos_att: u32,
}

impl Ball {
    pub fn new(
        radius: f32,
        color: [f32; 4],
        gl: &WebGlRenderingContext,
        vert_pos_att: u32,
    ) -> Ball {
        let mut verticies = [0.0; 32];
        for i in 0..16 {
            verticies[2 * i] = (i as f32 / 16.0 * 2.0 * f32::consts::PI).cos() * radius;
            verticies[2 * i + 1] = (i as f32 / 16.0 * 2.0 * f32::consts::PI).sin() * radius;
        }
        let buffer = gl.create_buffer().ok_or("failed to create buffer").unwrap();
        gl.bind_buffer(WebGlRenderingContext::ARRAY_BUFFER, Some(&buffer));
        unsafe {
            let vert_array = js_sys::Float32Array::view(&verticies);

            gl.buffer_data_with_array_buffer_view(
                WebGlRenderingContext::ARRAY_BUFFER,
                &vert_array,
                WebGlRenderingContext::STATIC_DRAW,
            );
        }
        Ball {
            verticies,
            position: Vector2::new(0.0, 0.0),
            velocity: Vector2::new(
                (random() as f32 - 0.5) / 30.0,
                (random() as f32 - 0.5) / 100.0,
            ),
            color,
            buffer,
            vert_pos_att,
        }
    }

    pub fn reset(&mut self) {
        self.position = Vector2::new(0.0, 0.0);
        self.velocity = Vector2::new(
            (random() as f32 - 0.5) / 30.0,
            (random() as f32 - 0.5) / 100.0,
        );
    }
}

#[wasm_bindgen]
pub fn init(vertex_shader: String, fragment_shader: String) {
    utils::set_panic_hook();
    let gl = create_context().unwrap();
    let program = setup_shaders(&gl, vertex_shader, fragment_shader);

    let vert_pos_att = gl.get_attrib_location(&program, "position") as u32;
    gl.enable_vertex_attrib_array(vert_pos_att);

    let color_uni = gl.get_uniform_location(&program, "color").unwrap();
    let mv_mat_loc = gl.get_uniform_location(&program, "uMVMatrix").unwrap();
    let p_mat_loc = gl.get_uniform_location(&program, "uPMatrix").unwrap();
    let mut ball = Ball::new(0.025, [1.0, 1.0, 1.0, 1.0], &gl, vert_pos_att);
    let mut player1 = Paddle::new((-0.9, 0.0), [1.0, 0.0, 0.0, 1.0], &gl, vert_pos_att);
    let mut player2 = Paddle::new((0.9, 0.0), [0.0, 0.0, 1.0, 1.0], &gl, vert_pos_att);

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();
    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        gl.clear_color(0.0, 0.0, 0.0, 1.0);
        gl.clear(WebGlRenderingContext::COLOR_BUFFER_BIT);
        let window = window();
        let document = document();
        let canvas: HtmlCanvasElement = document
            .get_element_by_id("canvas")
            .unwrap()
            .dyn_into()
            .unwrap();
        let p_mat = Matrix4::<f32>::new_perspective(
            canvas.width() as f32 / (canvas.height() as f32),
            3.14 / 3.0,
            0.01,
            200.0,
        );
        gl.uniform_matrix4fv_with_f32_array(Some(&p_mat_loc), false, p_mat.as_slice());

        gl.bind_buffer(WebGlRenderingContext::ARRAY_BUFFER, Some(&ball.buffer));
        gl.vertex_attrib_pointer_with_i32(
            ball.vert_pos_att,
            2,
            WebGlRenderingContext::FLOAT,
            false,
            0,
            0,
        );
        gl.uniform4fv_with_f32_array(Some(&color_uni), &ball.color);
        let mut mv_mat = Matrix4::<f32>::identity();
        mv_mat.append_translation_mut(&Vector3::new(ball.position.x, ball.position.y, 0.0));
        gl.uniform_matrix4fv_with_f32_array(Some(&mv_mat_loc), false, mv_mat.as_slice());
        gl.draw_arrays(WebGlRenderingContext::TRIANGLE_FAN, 0, 16);
        collision(&mut ball, &mut player1, &mut player2);
        ball.position += ball.velocity;
        gl.bind_buffer(WebGlRenderingContext::ARRAY_BUFFER, Some(&player1.buffer));
        gl.vertex_attrib_pointer_with_i32(
            player1.vert_pos_att,
            2,
            WebGlRenderingContext::FLOAT,
            false,
            0,
            0,
        );
        gl.uniform4fv_with_f32_array(Some(&color_uni), &player1.color);
        let mut mv_mat = Matrix4::<f32>::identity();
        mv_mat.append_translation_mut(&Vector3::new(player1.position.x, player2.position.y, 0.0));
        gl.uniform_matrix4fv_with_f32_array(Some(&mv_mat_loc), false, mv_mat.as_slice());
        gl.draw_arrays(WebGlRenderingContext::TRIANGLES, 0, 6);
        gl.bind_buffer(WebGlRenderingContext::ARRAY_BUFFER, Some(&player2.buffer));
        gl.vertex_attrib_pointer_with_i32(
            player2.vert_pos_att,
            2,
            WebGlRenderingContext::FLOAT,
            false,
            0,
            0,
        );
        gl.uniform4fv_with_f32_array(Some(&color_uni), &player2.color);
        let mut mv_mat = Matrix4::<f32>::identity();
        mv_mat.append_translation_mut(&Vector3::new(player2.position.x, player2.position.y, 0.0));
        gl.uniform_matrix4fv_with_f32_array(Some(&mv_mat_loc), false, mv_mat.as_slice());
        gl.draw_arrays(WebGlRenderingContext::TRIANGLES, 0, 6);
        request_animation_frame(f.borrow().as_ref().unwrap());
    }) as Box<FnMut()>));
    let window = window();
    request_animation_frame(g.borrow().as_ref().unwrap());
}

fn collision(ball: &mut Ball, player1: &mut Paddle, player2: &mut Paddle) {
    if ball.position.y < -0.552 || ball.position.y > 0.552 {
        ball.velocity.y = -ball.velocity.y;
    }

    if ball.position.x > 1.0 || ball.position.x < -1.0 {
        ball.reset();
    }
}

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn request_animation_frame(f: &Closure<dyn FnMut()>) {
    window()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK");
}

fn document() -> web_sys::Document {
    window()
        .document()
        .expect("should have a document on window")
}

fn create_context() -> Result<WebGlRenderingContext, JsValue> {
    let document = document();
    let canvas: HtmlCanvasElement = document.get_element_by_id("canvas").unwrap().dyn_into()?;
    let gl = canvas.get_context("webgl")?.unwrap().dyn_into()?;

    Ok(gl)
}

fn setup_shaders(
    gl: &WebGlRenderingContext,
    vertex_shader: String,
    fragment_shader: String,
) -> WebGlProgram {
    let vertex_shader =
        compile_shader(gl, WebGlRenderingContext::VERTEX_SHADER, &vertex_shader).unwrap();
    let fragment_shader =
        compile_shader(gl, WebGlRenderingContext::FRAGMENT_SHADER, &fragment_shader).unwrap();
    let program = gl.create_program().unwrap();

    gl.attach_shader(&program, &vertex_shader);
    gl.attach_shader(&program, &fragment_shader);
    gl.link_program(&program);

    if !gl
        .get_program_parameter(&program, WebGlRenderingContext::LINK_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        panic!("Failed to setup shaders");
    }
    gl.use_program(Some(&program));
    program
}

fn compile_shader(
    gl: &WebGlRenderingContext,
    shader_type: u32,
    source: &str,
) -> Result<WebGlShader, Box<dyn error::Error>> {
    let shader = gl
        .create_shader(shader_type)
        .ok_or_else(|| String::from("Unable to create shader object"))?;
    gl.shader_source(&shader, source);
    gl.compile_shader(&shader);

    if gl
        .get_shader_parameter(&shader, WebGlRenderingContext::COMPILE_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        Ok(shader)
    } else {
        Err(Box::new(errors::ShaderError(
            gl.get_shader_info_log(&shader)
                .unwrap_or_else(|| String::from("Unknown error creating shader")),
        )))
    }
}
