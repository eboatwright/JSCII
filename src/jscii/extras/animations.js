// A data class for storing information about animations
class Animation {
	constructor(id = "default", frames = [], frameDuration = 0, dontInterrupt = false) {
		this.id = id;
		this.frames = frames;
		this.frameDuration = frameDuration;
		this.dontInterrupt = dontInterrupt;
	}
}

// A component for handling Animations
class Animator extends Component {
	constructor(entity, animations = [], currentAnimation = 0) {
		super(entity);
		this.animations = animations;
		this.currentAnimation = currentAnimation;
		this.timer = 0;
		this.currentFrameIndex = 0;
		this.dontInterrupt = false;
	}

	update(level) {
		this.timer -= deltaTime;
		if(this.timer <= 0) {
			// Reset the timer
			this.timer = this.animations[this.currentAnimation].frameDuration;
			this.currentFrameIndex += 1;
			// Make sure the frame index isn't out of bounds
			if(this.currentFrameIndex >= this.animations[this.currentAnimation].frames.length) {
				// This means the animation is finished, so reset
				if(this.dontInterrupt) {
					this.dontInterrupt = false;
					this.currentFrameIndex -= 1;
				} else
					this.currentFrameIndex = 0;
			}
		}
	}

	changeAnimation(id) {
		// If it's playing an Animation that isn't allowed to be interrupted, don't change animations
		if(this.dontInterrupt)
			return;
		for(var i = 0; i < this.animations.length; i++) {
			if(this.animations[i].id == id) {
				this.currentAnimation = i;
				this.timer = 0;
				this.currentFrameIndex = 0;
				this.dontInterrupt = this.animations[i];
			}
		}
	}

	getFrame() {
		// Return the current character that should be rendered
		return this.animations[this.currentAnimation].frames[this.currentFrameIndex];
	}
}