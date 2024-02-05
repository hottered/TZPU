using DiscoveryService;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


List<ServiceInfo> services = new();

app.MapPost("/{serviceName}/{serviceUrl}", (string serviceName, string serviceUrl) =>
{
    var newService = new ServiceInfo
    {
        ServiceName = serviceName,
        ServiceURL = serviceUrl
    };
    
    services.Add(newService);
});

app.MapGet("/{serviceName}", (string serviceName) =>
{
    var result = services.FirstOrDefault(x => x.ServiceName.Equals(serviceName, StringComparison.CurrentCultureIgnoreCase));
    return result is null ? Results.NotFound() : Results.Ok(result.ServiceURL);
});

app.Run();