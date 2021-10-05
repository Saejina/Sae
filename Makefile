build-sae-app:
	@make -C sae-app/ build

clean:	clean-sae-bot clean-sae-app	clean-sae

clean-sae:
	@rm -rf *\~

clean-sae-bot:
	@make -C sae-bot clean

clean-sae-app:
	@make -C sae-app clean

deploy-sae-app:
	@make -C sae-app/build

format: format-sae-bot format-sae-app

format-sae-app:
	@cd sae-app && make format

format-sae-bot:
	@cd sae-bot && make format

host-sae-app:
	@make -C sae-app/ host

install: install-sae-app install-sae-bot

install-sae-app:
	@make -C sae-app install

install-sae-bot:
	@make -C sae-bot install

start-sae-app:
	@make -C sae-app start

start-sae-bot:
	@make -C sae-bot start

upgrade: upgrade-sae-app ugrade-sae-bot

upgrade-sae-app:
	@make -C sae-app upgrade

upgrade-sae-bot:
	@make -C sae-bot upgrade

.DEFAULT_GOAL:	install

.PHONY: clean 			\
		clean-sae 		\
		clean-sae-app 	\
		clean-sae-bot 	\
		format 			\
		format-sae-app 	\
		format-sae-bot 	\
		install 		\
		install-sae-app \
		install-sae-bot \
		start-sae-app 	\
		start-sae-bot 	\
		upgrade 		\
		upgrade-sae-app \
		upgrade-sae-bot
	