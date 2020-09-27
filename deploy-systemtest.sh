git checkout master
git pull origin master
yarn install
npm run build:systemtest
ssh -i systemtest-ssh-key.pem root@139.180.136.101 << EOF
  mkdir -p /var/www/mobifone-contract-web
  rm -rf /var/www/mobifone-contract-web/build
EOF
scp -i systemtest-ssh-key.pem -C -r /Users/huyhq/Dev/Projects/mobifone-contract/mobifone-contract-web/build root@139.180.136.101:/var/www/mobifone-contract-web/build
scp -i systemtest-ssh-key.pem -C /Users/huyhq/Dev/Projects/mobifone-contract/mobifone-contract-web/package.json root@139.180.136.101:/var/www/mobifone-contract-web/package.json
scp -i systemtest-ssh-key.pem -C /Users/huyhq/Dev/Projects/mobifone-contract/mobifone-contract-web/server.js root@139.180.136.101:/var/www/mobifone-contract-web/server.js
ssh -i systemtest-ssh-key.pem root@139.180.136.101 << EOF
  cd /var/www/mobifone-contract-web
  npm install
  pm2 stop mobifone-contract-web
  pm2 start server.js --name mobifone-contract-web
EOF
