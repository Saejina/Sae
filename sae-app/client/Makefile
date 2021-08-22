all: install

install:
	@printf "\033[0;33mInstalling NodeJS packages for sae-app\033[0m\n"
	@printf "\033[1;35mMake sure that you are running Node >= 12 (or use nvm to change your node version: https://github.com/nvm-sh/nvm)\033[0m\n"
	@yarn install

upgrade:
	@printf "\033[0;33mUpgrading NodeJS packages for sae-app\033[0m\n"
	@yarn upgrade

start:
	@yarn start

clean:
	@rm -f yarn-error.log
	@rm -rf build

format:
	@printf "\033[0;33mFormatting sae-app files...\033[0m\n"
	@yarn lint

build:
	@yarn build

deploy:
	@yarn deploy

host: build deploy


.PHONY: install start format clean upgrade
