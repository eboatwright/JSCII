class Animation {
	constructor(id = "default", frames = [], frameDuration = 0, dontInterrupt = false) {
		this.id = id;
		this.frames = frames;
		this.frameDuration = frameDuration;
		this.dontInterrupt = dontInterrupt;
	}
}

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
			this.timer = this.animations[this.currentAnimation].frameDuration;
			this.currentFrameIndex += 1;
			if(this.currentFrameIndex >= this.animations[this.currentAnimation].frames.length) {
				this.currentFrameIndex = 0;
			}
		}
	}

	changeAnimation(id) {
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
		return this.animations[this.currentAnimation].frames[this.currentFrameIndex];
	}
}