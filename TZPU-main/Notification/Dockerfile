FROM mcr.microsoft.com/dotnet/aspnet:5.0.3 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:7186

FROM mcr.microsoft.com/dotnet/sdk:5.0.301 AS build
WORKDIR /src
COPY ["Notification.csproj", "."]
RUN dotnet restore "./Notification.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Notification.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Notification.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Notification.dll"]