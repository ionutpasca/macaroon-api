'use strict';

class PublicUser {
	constructor(name, profileImgUrl, id) {
		this.name = name;
		this.profileImageUrl = profileImgUrl;
		this.id = id;
	};
};

module.exports = PublicUser;