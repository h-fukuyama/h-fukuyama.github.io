#build
npm run build

#ラズパイへの転送
scp -r build/ pi@10.2.127.41:/home/pi/Fukuyama/config_app/new_build

#ラズパイへのssh接続とビルドの置き換え
ssh pi@10.2.127.41 << 'ENDSSH'
cd /home/pi/Fukuyama/config_app
rm -rf build
mv new_build build
sudo systemctl restart config_app.service
ENDSSH

echo "Deployment completed successfully."