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
    velocity: Vector2<f32>,
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
            velocity: Vector2::zeros(),
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
    radius: f32,
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
            position: Vector2::zeros(),
            velocity: Vector2::new((random() as f32 - 0.5) * 2.0, 0.0).normalize(),
            color,
            buffer,
            vert_pos_att,
            radius,
        }
    }

    pub fn reset(&mut self) {
        self.position = Vector2::new(0.0, 0.0);
        self.velocity = Vector2::new((random() as f32 - 0.5) * 2.0, 0.0).normalize();
    }
}

#[derive(Debug, Copy, Clone)]
enum Movement {
    Up,
    Down,
    None,
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
    let last_time = Rc::new(RefCell::new(window().performance().unwrap().now()));
    let last_time_enter = last_time.clone();

    let user_movement = Rc::new(RefCell::new(Movement::None));
    let user_movement_down = user_movement.clone();
    let user_movement_up = user_movement.clone();

    let handle_keydown = Closure::wrap(Box::new(move |event: KeyboardEvent| {
        if event.key_code() == 87 {
            *user_movement_down.borrow_mut() = Movement::Up;
        } else if event.key_code() == 83 {
            *user_movement_down.borrow_mut() = Movement::Down;
        }
    }) as Box<dyn FnMut(_)>);

    document().add_event_listener_with_callback("keydown", handle_keydown.as_ref().unchecked_ref());
    handle_keydown.forget();
    let handle_keyup = Closure::wrap(Box::new(move |event: KeyboardEvent| {
        let mut mut_user_movement = user_movement_up.borrow_mut();
        match (event.key_code(), *mut_user_movement) {
            (87, Movement::Up) => *mut_user_movement = Movement::None,
            (83, Movement::Down) => *mut_user_movement = Movement::None,
            (_, _) => (),
        };
    }) as Box<dyn FnMut(_)>);
    document().add_event_listener_with_callback("keyup", handle_keyup.as_ref().unchecked_ref());
    handle_keyup.forget();

    let handle_visibility = Closure::wrap(Box::new(move || {
        if document().visibility_state() == VisibilityState::Visible {
            *last_time_enter.borrow_mut() = window().performance().unwrap().now();
        }
    }) as Box<dyn FnMut()>);
    document().set_onvisibilitychange(Some(handle_visibility.as_ref().unchecked_ref()));
    handle_visibility.forget();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        let cur_time = window().performance().unwrap().now();
        let time_delta = (cur_time - *last_time.borrow()) / 1000.0;
        *last_time.borrow_mut() = cur_time;
        gl.clear_color(0.0, 0.0, 0.0, 1.0);
        gl.clear(WebGlRenderingContext::COLOR_BUFFER_BIT);
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
        collision(&mut ball, &player1, &player2, time_delta as f32);
        ball.position += ball.velocity * time_delta as f32;

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
        mv_mat.append_translation_mut(&Vector3::new(player1.position.x, player1.position.y, 0.0));
        gl.uniform_matrix4fv_with_f32_array(Some(&mv_mat_loc), false, mv_mat.as_slice());
        gl.draw_arrays(WebGlRenderingContext::TRIANGLES, 0, 6);
        player1.position += player1.velocity * time_delta as f32;
        move_user(&mut player1, *user_movement.borrow());

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
        player2.position += player2.velocity * time_delta as f32;
        move_ai(&ball, &mut player2);
    }) as Box<dyn FnMut()>));

    request_animation_frame(g.borrow().as_ref().unwrap());
}

fn move_user(player: &mut Paddle, movement: Movement) {
    match movement {
        Movement::Up => {
            if player.position.y < 0.47 {
                player.velocity.y = 0.5;
            } else {
                player.velocity.y = 0.0;
            }
        }
        Movement::Down => {
            if player.position.y > -0.47 {
                player.velocity.y = -0.5;
            } else {
                player.velocity.y = 0.0;
            }
        }
        Movement::None => {
            player.velocity.y = 0.0;
        }
    }
}

fn move_ai(ball: &Ball, player: &mut Paddle) {
    if (ball.position.y - player.position.y).abs() < 0.05 {
        player.velocity.y = 0.0;
    } else if ball.position.y < player.position.y && player.position.y > -0.47 {
        player.velocity.y = -0.5;
    } else if ball.position.y > player.position.y && player.position.y < 0.47 {
        player.velocity.y = 0.5;
    }
}

fn collision(ball: &mut Ball, player1: &Paddle, player2: &Paddle, time_delta: f32) {
    let updated_pos = ball.position + ball.velocity * time_delta;
    if updated_pos.y < -0.552 || updated_pos.y > 0.552 {
        ball.velocity.y = -ball.velocity.y;
    }

    if circle_intersect_line(
        updated_pos,
        ball.radius,
        player1.position + Vector2::new(0.025, 0.1),
        player1.position + Vector2::new(0.025, -0.1),
    ) {
        ball.velocity.x = -ball.velocity.x * 1.01;
        ball.velocity.y += player1.velocity.y * 0.2;
    }

    if circle_intersect_line(
        updated_pos,
        ball.radius,
        player2.position + Vector2::new(-0.025, 0.1),
        player2.position + Vector2::new(-0.025, -0.1),
    ) {
        ball.velocity.x = -ball.velocity.x * 1.01;
        ball.velocity.y += player2.velocity.y * 0.2;
    }

    if updated_pos.x > 1.0 || updated_pos.x < -1.0 {
        ball.reset();
    }
}

fn circle_intersect_line(p: Vector2<f32>, radius: f32, a: Vector2<f32>, b: Vector2<f32>) -> bool {
    let line = a - b;
    let pa = p - a;
    let parallel = line.normalize().dot(&pa) * line.normalize();
    let perp = pa - parallel;
    perp.norm() <= radius && p.y - radius <= a.y && p.y + radius >= b.y
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

fn canvas() -> HtmlCanvasElement {
    document()
        .get_element_by_id("canvas")
        .unwrap()
        .dyn_into()
        .expect("should have canvas")
}

fn create_context() -> Result<WebGlRenderingContext, JsValue> {
    let gl = canvas().get_context("webgl")?.unwrap().dyn_into()?;

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
