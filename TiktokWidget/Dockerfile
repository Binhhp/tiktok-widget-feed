#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
RUN sed -i 's/TLSv1.2/TLSv1/g' /etc/ssl/openssl.cnf
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["TiktokWidget/TiktokWidget.csproj", "TiktokWidget/"]
COPY ["TiktokWidget.Service/TiktokWidget.Service.csproj", "TiktokWidget.Service/"]
COPY ["TiktokWidget.Common/TiktokWidget.Common.csproj", "TiktokWidget.Common/"]
RUN dotnet restore "TiktokWidget/TiktokWidget.csproj"
COPY . .
WORKDIR "/src/TiktokWidget"
RUN dotnet build "TiktokWidget.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TiktokWidget.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet TiktokWidget.dll
