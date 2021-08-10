all: install

install: install-sae-app install-sae-bot

install-sae-app:
	@make -C sae-app install

install-sae-bot:
	@make -C sae-bot install

start-sae-app:
	@make -C sae-app start

start-sae-bot:
	@make -C sae-bot start

.PHONY: install install-sae-app install-sae-bot start-sae-app start-sae-bot