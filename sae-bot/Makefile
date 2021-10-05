clean:
	@find . -name '*.log' -delete
	@find . -name '*\~' -delete

database:
	@yarn run db

format:
	@printf "\033[0;33mFormatting sae-bot files...\033[0m\n"
	@yarn lint

host:
	@yarn host

install:
	@printf "\033[0;33mInstalling NodeJS packages for sae-bot\033[0m\n"
	@printf "\033[1;35mMake sure that you are running Node 16.6.0 (or use nvm to change your node version: https://github.com/nvm-sh/nvm)\033[0m\n"
	@yarn install

start:
	@yarn start

upgrade:
	@printf "\033[0;33mUpgrading NodeJS packages for sae-bot\033[0m\n"
	@yarn upgrade

.DEFAULT_GOAL:	install

.PHONY: clean 		\
		database	\
		format 		\
		host 		\
		install 	\
		start 		\
		upgrade
