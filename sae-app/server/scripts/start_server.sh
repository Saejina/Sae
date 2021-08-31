port=$(cat .env | grep 'PORT')
port=${port:5}
sh scripts/is_server_running.sh
if [[ $? == 1 ]]
then
    printf "\033[0;33mSomething is running on port ${port}. This might be our server.\n"
    printf "\033[0;35mIf this is not our server try changing the PORT= line in the .env file.\033[0m\n"
    exit 0
else
    printf "\033[0;33mThere is nothing running on port ${port}.\033[0m\n"
    printf "\033[0;32mStarting hosting...\033[0m\n"
    yarn host
fi
