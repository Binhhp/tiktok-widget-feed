
//Build image
docker build -t tiktok-widget -f TiktokWidget//Dockerfile .
//Run container
docker run -d -p 80:80 tiktok-widget
//push tag heroku
docker tag tiktok-widget registry.heroku.com/tiktok-widget/web
docker push registry.heroku.com/tiktok-widget/web
//releases heroku
heroku container:release -a tiktok-widget web