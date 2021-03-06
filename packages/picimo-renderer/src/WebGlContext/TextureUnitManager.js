/* eslint no-param-reassign: 0 */

export default class TextureUnitManager {
  /**
   * @param {WebGlContext} glx
   */
  constructor(glx) {
    this.glx = glx;

    /**
     * texUnit -> WebGlTexture
     * @type {Array<number>}
     */
    this.boundTextures = new Array(glx.MAX_TEXTURE_IMAGE_UNITS);

    for (let i = 0; i < this.boundTextures.length; ++i) {
      this.boundTextures[i] = null;
    }

    this.lastBoundTexUnit = 0;
  }

  /**
   * Bind a *texture* to a *texture unit*.
   * @param {WebGlTexture} glTexture
   * @return {number} texture unit
   */
  bindWebGlTexture(glTexture) {
    let texUnit = this.boundTextures.indexOf(glTexture);

    if (texUnit < 0) {
      // texture is unbound
      // find a free texture unit ..
      for (let i = 0; i < this.boundTextures.length; ++i) {
        if (!this.boundTextures[i]) {
          texUnit = i;
          this.boundTextures[i] = glTexture;
          break;
        }
      }

      if (texUnit < 0) {
        // no free unit found
        // so we choose the lru texture unit

        texUnit = this.lastBoundTexUnit;

        const prevGlTex = this.boundTextures[texUnit];
        if (prevGlTex) prevGlTex.texUnit = -1;

        this.lastBoundTexUnit = (this.lastBoundTexUnit + 1) % this.glx.MAX_TEXTURE_IMAGE_UNITS;
      }

      this.glx.activeTexture(texUnit);
      this.glx.bindTexture2d(glTexture.glTexObj);

      glTexture.texUnit = texUnit;
    }

    return texUnit;
  }
}
