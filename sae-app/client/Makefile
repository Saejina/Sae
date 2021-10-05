build:
	@yarn build

clean:
	@find . -name '*.log' -delete
	@rm -rf build
	@find . -name '*\~' -delete

deploy:
	@yarn deploy

format:
	@printf "\033[0;33mFormatting sae-app client files...\033[0m\n"
	@yarn lint

host: build deploy

install:
	@printf "\033[0;33mInstalling NodeJS packages for sae-app\033[0m\n"
	@printf "\033[1;35mMake sure that you are running Node >= 12 (or use nvm to change your node version: https://github.com/nvm-sh/nvm)\033[0m\n"
	@yarn install

start:
	@yarn start

upgrade:
	@printf "\033[0;33mUpgrading NodeJS packages for sae-app\033[0m\n"
	@yarn upgrade

.DEFAULT_GOAL:	install

.PHONY:	build	\
		clean	\
		deploy	\
		format	\
		host	\
		install \
		start 	\
		upgrade
