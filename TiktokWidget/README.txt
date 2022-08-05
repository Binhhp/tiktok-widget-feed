Build docker image and publish heroku
1. Build docker containre: 
docker build -t tiktok-widget -f TiktokWidget//Dockerfile .
2. Run container:
docker run -d -p 80:80 tiktok-widget
3. Publish tag heroku
docker tag tiktok-widget registry.heroku.com/tiktok-widget/web
docker push registry.heroku.com/tiktok-widget/web
4. Releases heroku
heroku container:release -a tiktok-widget web

Publish package
In Forlder TikTokWidget (ASP.NET CORE) run cmd:
dotnet publish "TiktokWidget.csproj" -c Release
Copy bin/Release/publish/

Publish tiktok.js:
yarn run build:layout