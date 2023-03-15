(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('KeyboardEvents extension needs to be run unsandboxed');
  }

  window.addEventListener("keydown", (event) => {
    KeyboardEvents.LastKeyPressed = event.key;
    KeyboardEvents.LastKeyCodePressed = event.code;
    Scratch.vm.runtime.startHats("zevestkeyboardevents_onKeyPressed");
  });

  window.addEventListener("keyup", (event) => {
    KeyboardEvents.LastKeyReleased = event.key;
    KeyboardEvents.LastKeyCodeReleased = event.code;
    Scratch.vm.runtime.startHats("zevestkeyboardevents_onKeyReleased");
  });

  class KeyboardEvents {
    static LastKeyPressed = "";
    static LastKeyCodePressed = "";
    static LastKeyReleased = "";
    static LastKeyCodeReleased = "";
    getInfo() {
      return {
        id: "zevestkeyboardevents",
        name: "Keyboard Events",
        color1: "#808080", // pure red
        color2: "#000000", // pure green
        color3: "#000000", // pure blue
        blocks: [
          {
            opcode: "onKeyPressed",
            blockType: Scratch.BlockType.HAT,
            text: "When any key pressed",
            isEdgeActivated: false
          },
          {
            opcode: "onKeyReleased",
            blockType: Scratch.BlockType.HAT,
            text: "When any key released",
            isEdgeActivated: false
          },
          {
            opcode: "KeyPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: "Key pressed",
          },
          {
            opcode: "KeyReleased",
            blockType: Scratch.BlockType.REPORTER,
            text: "Key released",
          },
          {
            opcode: "KeyCodePressed",
            blockType: Scratch.BlockType.REPORTER,
            text: "Key code pressed",
          },
          {
            opcode: "KeyCodeReleased",
            blockType: Scratch.BlockType.REPORTER,
            text: "Key code released",
          }
        ]
      };
    }

    KeyPressed() {
      return KeyboardEvents.LastKeyPressed.toString();
    }

    KeyReleased() {
      return KeyboardEvents.LastKeyReleased.toString();
    }

    KeyCodePressed() {
      return KeyboardEvents.LastKeyCodePressed.toString();
    }

    KeyCodeReleased() {
      return KeyboardEvents.LastKeyCodeReleased.toString();

    }
  }

  Scratch.extensions.register(new KeyboardEvents());
})(Scratch);