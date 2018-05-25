const picimo = require('picimo'); // eslint-disable-line

const ctx = picimo.toolkit.compile(`
  WIDTH = 460
  HEIGHT = 320

  VertexObject myVertices {
    @vertexCount(4)

    position {
      x
      y
      z
    }
  }

  SpriteGroup myQuads {
    @vertexObject(myVertices)

    myVertices {
      @setSize(setSize)
      @prototype(myQuads)
    }
  }

  Entity SceneGraphNode {
    @children
  }

  Entity Scene extends SceneGraphNode {
    @renderable
  }

  Renderer {
    width WIDTH
    height HEIGHT
    sizeFit contain
  }

`, {

  setSize(w, h) {
    this.setWidthAndHeight(w, h);
  },

  myQuads: {
    translate(x, y) {
      this.setPosition(x, y);
    },
  },

});

const quads = ctx.create('myQuads', { capacity: 5000 });

const mySprite = quads.createSprite();

mySprite.translate(150, 90);

const scene = ctx.create('Scene');

scene.on('renderFrame', renderer => renderer.render(quads));

