all: all-sae-app all-sae-bot


install: install-sae install-sae-app install-sae-bot


all-sae-app:
	@make -C sae-app

all-sae-bot:
	@make -C sae-bot

upgrade-sae-app:
	@make -C sae-app upgrade

upgrade-sae-bot:
	@make -C sae-bot upgrade

install-sae:
	@yarn install

install-sae-app:
	@make -C sae-app install

install-sae-bot:
	@make -C sae-bot install


start-sae-app:
	@make -C sae-app start

start-sae-bot:
	@make -C sae-bot start


clean:	clean-sae-bot clean-sae-app

clean-sae-bot:
	@make -C sae-bot clean

clean-sae-app:
	@make -C sae-app clean

format-sae-bot:
	@cd sae-bot && make format

format-sae-app:
	@cd sae-app && make format

format: format-sae-bot format-sae-app

.PHONY: install \
	install-sae-app \
	install-sae-bot \
	start-sae-app \
	start-sae-bot \
	format-sae-app \
	format-sae-bot \
	format \
	clean-sae-bot \
	clean-sae-app \
