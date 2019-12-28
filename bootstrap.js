/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bootstrap.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"../pkg/pong_bg.wasm": function() {
/******/ 			return {
/******/ 				"./pong.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_cb_drop": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_cb_drop"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_cb_forget": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_cb_forget"](p0i32);
/******/ 					},
/******/ 					"__wbg_new_59cb74e423758ede": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_new_59cb74e423758ede"]();
/******/ 					},
/******/ 					"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_stack_558ba5917b466edd"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_error_4bb6c2a97407129a"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_instanceof_Window": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_instanceof_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_f_get_element_by_id_Document": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_get_element_by_id_Document"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_visibility_state_Document": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_visibility_state_Document"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_onvisibilitychange_Document": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_set_onvisibilitychange_Document"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_add_event_listener_with_callback_EventTarget": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_add_event_listener_with_callback_EventTarget"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_instanceof_HTMLCanvasElement": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_instanceof_HTMLCanvasElement"](p0i32);
/******/ 					},
/******/ 					"__widl_f_get_context_HTMLCanvasElement": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_get_context_HTMLCanvasElement"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_width_HTMLCanvasElement": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_width_HTMLCanvasElement"](p0i32);
/******/ 					},
/******/ 					"__widl_f_height_HTMLCanvasElement": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_height_HTMLCanvasElement"](p0i32);
/******/ 					},
/******/ 					"__widl_f_key_code_KeyboardEvent": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_key_code_KeyboardEvent"](p0i32);
/******/ 					},
/******/ 					"__widl_f_now_Performance": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_now_Performance"](p0i32);
/******/ 					},
/******/ 					"__widl_f_new_with_str_and_init_Request": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_new_with_str_and_init_Request"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_instanceof_Response": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_instanceof_Response"](p0i32);
/******/ 					},
/******/ 					"__widl_f_text_Response": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_text_Response"](p0i32);
/******/ 					},
/******/ 					"__widl_instanceof_WebGLRenderingContext": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_instanceof_WebGLRenderingContext"](p0i32);
/******/ 					},
/******/ 					"__widl_f_buffer_data_with_array_buffer_view_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_buffer_data_with_array_buffer_view_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_uniform4fv_with_f32_array_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_uniform4fv_with_f32_array_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_uniform_matrix4fv_with_f32_array_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_uniform_matrix4fv_with_f32_array_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__widl_f_attach_shader_WebGLRenderingContext": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_attach_shader_WebGLRenderingContext"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_bind_buffer_WebGLRenderingContext": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_bind_buffer_WebGLRenderingContext"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_clear_WebGLRenderingContext": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_clear_WebGLRenderingContext"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_clear_color_WebGLRenderingContext": function(p0i32,p1f32,p2f32,p3f32,p4f32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_clear_color_WebGLRenderingContext"](p0i32,p1f32,p2f32,p3f32,p4f32);
/******/ 					},
/******/ 					"__widl_f_compile_shader_WebGLRenderingContext": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_compile_shader_WebGLRenderingContext"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_create_buffer_WebGLRenderingContext": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_create_buffer_WebGLRenderingContext"](p0i32);
/******/ 					},
/******/ 					"__widl_f_create_program_WebGLRenderingContext": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_create_program_WebGLRenderingContext"](p0i32);
/******/ 					},
/******/ 					"__widl_f_create_shader_WebGLRenderingContext": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_create_shader_WebGLRenderingContext"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_draw_arrays_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_draw_arrays_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_enable_vertex_attrib_array_WebGLRenderingContext": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_enable_vertex_attrib_array_WebGLRenderingContext"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_get_attrib_location_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_get_attrib_location_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_get_program_parameter_WebGLRenderingContext": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_get_program_parameter_WebGLRenderingContext"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_get_shader_info_log_WebGLRenderingContext": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_get_shader_info_log_WebGLRenderingContext"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_get_shader_parameter_WebGLRenderingContext": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_get_shader_parameter_WebGLRenderingContext"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_get_uniform_location_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_get_uniform_location_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_link_program_WebGLRenderingContext": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_link_program_WebGLRenderingContext"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_shader_source_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_shader_source_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_use_program_WebGLRenderingContext": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_use_program_WebGLRenderingContext"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_vertex_attrib_pointer_with_i32_WebGLRenderingContext": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_vertex_attrib_pointer_with_i32_WebGLRenderingContext"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32);
/******/ 					},
/******/ 					"__widl_f_request_animation_frame_Window": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_request_animation_frame_Window"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_document_Window": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_document_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_f_performance_Window": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_performance_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_f_fetch_with_request_Window": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__widl_f_fetch_with_request_Window"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_call_222be890f6f564bb": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_call_222be890f6f564bb"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_a9cd98b36c38f53e": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_newnoargs_a9cd98b36c38f53e"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_6c4ea719458624eb": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_call_6c4ea719458624eb"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_new_66e20d51c3e33b63": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_new_66e20d51c3e33b63"]();
/******/ 					},
/******/ 					"__wbg_new_8b3eec454ca71e88": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_new_8b3eec454ca71e88"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_resolve_4e9c46f7e8321315": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_resolve_4e9c46f7e8321315"](p0i32);
/******/ 					},
/******/ 					"__wbg_then_79de0b6809569306": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_then_79de0b6809569306"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_then_5a9068d7b674caf9": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_then_5a9068d7b674caf9"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_globalThis_1c2aa6db3ecb073e": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_globalThis_1c2aa6db3ecb073e"]();
/******/ 					},
/******/ 					"__wbg_self_e5cdcdef79894248": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_self_e5cdcdef79894248"]();
/******/ 					},
/******/ 					"__wbg_window_44ec8ac43884a4cf": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_window_44ec8ac43884a4cf"]();
/******/ 					},
/******/ 					"__wbg_global_c9abcb94a14733fe": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_global_c9abcb94a14733fe"]();
/******/ 					},
/******/ 					"__wbindgen_is_undefined": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_is_undefined"](p0i32);
/******/ 					},
/******/ 					"__wbg_buffer_89a8560ab6a3d9c6": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_buffer_89a8560ab6a3d9c6"](p0i32);
/******/ 					},
/******/ 					"__wbg_newwithbyteoffsetandlength_7b9124ec8c6b9e18": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_newwithbyteoffsetandlength_7b9124ec8c6b9e18"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_set_c3a2ba27703a6186": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_set_c3a2ba27703a6186"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_random_40717e477b6813d8": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbg_random_40717e477b6813d8"]();
/******/ 					},
/******/ 					"__wbindgen_string_get": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_string_get"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_boolean_get": function(p0i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_boolean_get"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_memory": function() {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_memory"]();
/******/ 					},
/******/ 					"__wbindgen_closure_wrapper126": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_closure_wrapper126"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbindgen_closure_wrapper124": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_closure_wrapper124"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbindgen_closure_wrapper179": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/pong.js"].exports["__wbindgen_closure_wrapper179"](p0i32,p1i32,p2i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["../pkg/pong_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../pkg/pong_bg.wasm":"6c3f98d3a27070be1655"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bootstrap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bootstrap.js":
/*!**********************!*\
  !*** ./bootstrap.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// A dependency graph that contains any wasm must all be imported\n// asynchronously. This `bootstrap.js` file does the single async import, so\n// that no one else needs to worry about it again.\n__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./index.js */ \"./index.js\"))\n  .catch(e => console.error(\"Error importing `index.js`:\", e));\n\n\n//# sourceURL=webpack:///./bootstrap.js?");

/***/ })

/******/ });