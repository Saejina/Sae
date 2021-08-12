all: install upgrade

install:
	@echo -e "\033[0;33mInstalling NodeJS packages for sae-bot\033[0m"
	@echo -e "\033[1;35mMake sure that you are running Node 16.6.0 (or use nvm to change your node version: https://github.com/nvm-sh/nvm)\033[0m"
	@yarn install

upgrade:
	@echo -e "\033[0;33mUpgrading NodeJS packages for sae-bot\033[0m"
	@yarn upgrade

start:
	@yarn start

clean:
	@rm -f yarn-error.log

format:
	@echo -e "\033[0;33mFormatting sae-bot files...\033[0m"
	@yarn lint

.PHONY: install start format clean upgrade
