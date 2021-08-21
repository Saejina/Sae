printf "==================================================================\n"
printf "|                                                                |\n"
printf "| \033[0;33mCreating and updating MySQL database for SaeBot...\033[0m             |\n"
printf "| \033[0;34mMake sure that you have MySQL or MariaDB installed.\033[0m            |\n"
printf "|                                                                |\n"
printf "==================================================================\n"

tmp=$(which mysql)
if [ $? != 0 ]
then
    printf $?
    exit 1
fi

sudo mysql -e "CREATE USER IF NOT EXISTS 'saejina'@'localhost' IDENTIFIED BY 'SaejinaDBPWD:)';"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS saejinaDB;"
sudo mysql -e "GRANT ALL PRIVILEGES ON saejinaDB.* TO 'saejina'@'localhost';"