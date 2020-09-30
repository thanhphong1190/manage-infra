git checkout master
git pull origin master
yarn install
npm run build:systemtest
ssh -i systemtest-ssh-key.pem root@139.180.136.101 << EOF
  mkdir -p /var/www/manage-infra
  rm -rf /var/www/manage-infra/build
EOF
scp -i systemtest-ssh-key.pem -C -r /Users/vnhuyha/Desktop/Work/Project/MBFManagerInfra/manage-infra/build root@139.180.136.101:/var/www/manage-infra/build
scp -i systemtest-ssh-key.pem -C /Users/vnhuyha/Desktop/Work/Project/MBFManagerInfra/manage-infra/package.json root@139.180.136.101:/var/www/manage-infra/package.json
scp -i systemtest-ssh-key.pem -C /Users/vnhuyha/Desktop/Work/Project/MBFManagerInfra/manage-infra/server.js root@139.180.136.101:/var/www/manage-infra/server.js
ssh -i systemtest-ssh-key.pem root@139.180.136.101 << EOF
  cd /var/www/manage-infra
  npm install
  pm2 stop manage-infra
  pm2 start server.js --name manage-infra
EOF
