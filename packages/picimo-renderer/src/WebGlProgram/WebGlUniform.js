
/**
 * @private
 */
function createUniformSetter(uniform) {
  const { type, location } = uniform;
  const { gl } = uniform.glx;

  // https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html

  switch (type) {
    case gl.FLOAT:
      return value => gl.uniform1f(location, value);

    case gl.FLOAT_VEC2:
      return value => gl.uniform2f(location, value[0], value[1]);

    case gl.FLOAT_VEC3:
      return value => gl.uniform3f(location, value[0], value[1], value[2]);

    case gl.FLOAT_VEC4:
      return value => gl.uniform4f(location, value[0], value[1], value[2], value[3]);

    case gl.FLOAT_MAT4:
      return value => gl.uniformMatrix4fv(location, gl.FALSE, value.mat4);

    case gl.SAMPLER_2D:
      return value => gl.uniform1i(location, value);

    default:
      throw new Error(`WebGlUniform: unknown uniform type:${type}`);
  }
}

/** @private */
export default class WebGlUniform {
  constructor(program, index) {
    this.program = program;
    this.glx = program.glx;

    const { gl } = program.glx;
    const { glProgram } = program;

    const { name, size, type } = gl.getActiveUniform(glProgram, index);
    this.name = name;
    this.size = size;
    this.type = type;

    this.location = gl.getUniformLocation(glProgram, name);

    this.setValue = createUniformSetter(this);
  }
}
